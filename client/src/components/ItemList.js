import React,{ Component } from 'react'
import {
    Container,
    Table,
    Button
} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {getItems} from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemList extends Component{

    componentDidMount(){
        this.props.getItems();
    }

    render() {
        const {items}=this.props.item;
        return(
            <Container>
                <Button color="dark" 
                style={{marginTop:'10px'}} 
                onClick={()=>{
                    const name = prompt('Enter Item');
                    const cost = prompt('Enter cost');
                    const category = prompt('Enter cat');
                    const username = prompt('Enter user');
                    if(name){
                        this.setState(state=>({
                            items: [...this.state.items,{id:uuid(), name, cost, category,username}]
                        }));
                    }
                }
                }>Add Item</Button>
        
                <TransitionGroup>
                    <Table hover style={{width:"50%"}}>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Cost</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        {items.map(({id,name,cost,category})=>(
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <tbody>
                                    <tr>
                                        <td>
                                            <Button 
                                                className="rm-btn"
                                                color="danger"
                                                size="sm"
                                                onClick={()=>
                                                {
                                                    this.setState(state=>({
                                                        items: state.items.filter(item=>item.id !==id)
                                                    }));
                                                }}>&times;
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
    item:PropTypes.object.isRequired
};

const mapStateToProps=(state)=>({
    item:state.item
});

export default connect(mapStateToProps,{getItems})(ItemList);
