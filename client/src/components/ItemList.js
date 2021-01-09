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

    state={
        username:''
    };

    componentDidMount(){
        this.props.getItems(localStorage.getItem("username"),1,2021);
        console.log(localStorage.getItem("username"));
    }

    static propTypes={
        auth:PropTypes.object.isRequired
    }

    loggedIn=uname=>
    {
        this.setState({username:uname});
    }
    //componentDidUpdate()
    //{
    //    const {isAuth,user}=this.props.auth
    //    if(isAuth){
    //        this.props.getItems(user.username,1,2021);
    //    }
    //}

    //onChange=(e)=>
    //{
    //    e.preventDefault();
    //    var tot=0;
    //    items.forEach(({cost})=>(tot+={cost}));
    //    this.setState({total:tot});
    //}

    render() {
        const {items}=this.props.item;
        var total=0;
        var expenses=0;
        var incomes=0;
        items.map(function(item)
        {
            total+=item.cost;
            if(item.cost<=0){
                expenses+=item.cost;
            }
            else{
                incomes+=item.cost;
            }
        });

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
                        <tr>net revenue={incomes}</tr>                     
                        <tr>net expense={expenses}</tr>
                        <tr>net amount={total}</tr>                    
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
    item:state.item,
    auth:state.auth
});

export default connect(mapStateToProps,{getItems,deleteItem})(ItemList);
