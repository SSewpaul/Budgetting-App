import React,{ Component } from 'react'
import {
    Container,
    Table,
    Button
} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {getItems,deleteItem} from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemList extends Component{

    componentDidMount(){
        this.props.getItems();
    }

    render() {
        const {items}=this.props.item;
        return(
            <Container>
                <TransitionGroup>
                    <Table hover style={{width:"50%"}}>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Cost</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        {items.map(({_id,name,cost,category})=>(
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <tbody>
                                    <tr>
                                        <td>
                                            <Button 
                                                className="rm-btn"
                                                color="danger"
                                                size="sm"
                                                onClick={this.props.deleteItem.bind(this,_id)}
                                            >&times;
                                            </Button>
                                            {name}
                                        </td>
                                        <td>{cost}</td>
                                        <td>{category}</td>
                                    </tr>
                                </tbody>
                            </CSSTransition>
                        ))}
                    </Table>
                </TransitionGroup>
            </Container>
        );
    }
}

ItemList.propTypes={
    getItems:PropTypes.func.isRequired,
    item:PropTypes.object.isRequired,
    deleteItem:PropTypes.func.isRequired
};

const mapStateToProps=(state)=>({
    item:state.item
});

export default connect(mapStateToProps,{getItems,deleteItem})(ItemList);
