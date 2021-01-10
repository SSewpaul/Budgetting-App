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
        month: new Date().getUTCMonth(),
        year: new Date().getUTCFullYear(),
        strMonth: ''
    };

    componentDidMount(){
        if(this.state.year===0){
            var currentDate= new Date();
            var currentMonth=currentDate.getMonth();
            var currentYear=currentDate.getUTCFullYear();
            this.setState({month: currentMonth});
            this.setState({year: currentYear});
            console.log(this.state.year);
        }
        this.props.getItems(localStorage.getItem("username"),this.state.month,this.state.year);
        this.convertMonth(this.state.month);
    }

    static propTypes={
        auth:PropTypes.object.isRequired
    }

    convertMonth=(month)=>
    {
        switch (month)
        {
            case 0:
                return this.setState({strMonth:'January'});
        
            case 1:
                return this.setState({strMonth:'Febuary'});
         
            case 2:
                return this.setState({strMonth:'March'});
         
            case 3:
                return this.setState({strMonth:'April'});
         
            case 4:
                return this.setState({strMonth:'May'});
         
            case 5:
                return this.setState({strMonth:'June'});
         
            case 6:
                return this.setState({strMonth:'July'});
         
            case 7:
                return this.setState({strMonth:'August'});
         
            case 8:
                return this.setState({strMonth:'September'});
         
            case 9:
                return this.setState({strMonth:'October'});
         
            case 10:
                return this.setState({strMonth:'November'});

            case 11:
                return this.setState({strMonth:'December'});
            
            default:
                return this.state
        }
    }

    prevMonth=()=>
    {
        var newMonth=this.state.month;
        var newYear=this.state.year;
        if(this.state.month !== 0)
        {
            newMonth--;
            console.log(newMonth);
            this.setState({month: newMonth});
        }
        else
        {
            newYear--;
            newMonth=11;
            this.setState({month: newMonth});
            this.setState({year: newYear});
        }
        this.props.getItems(localStorage.getItem("username"),newMonth,newYear);
        this.convertMonth(newMonth);
    }

    nextMonth=()=>
    {
        var newMonth=this.state.month;
        var newYear=this.state.year;
        if(this.state.month !== 11)
        {
            newMonth++;
            this.setState({month: newMonth});
        }
        else
        {
            newYear++;
            newMonth=0;
            this.setState({month: newMonth});
            this.setState({year: newYear});
        }
        this.props.getItems(localStorage.getItem("username"),newMonth,newYear);
        this.convertMonth(newMonth);
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
                <Button style={{marginInline:"left"}} onClick={()=>this.prevMonth()}>&#171;</Button>
                &nbsp;
                <div style={{
                    width:"44%",
                    height:"auto",
                    display:"inline-block"
                    }}>
                    <h2 style={{textAlign:"center"}}>{this.state.strMonth},{this.state.year}</h2>
                </div>
                <Button onClick={()=>this.nextMonth()}>&#187;</Button>
                <br></br>
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
