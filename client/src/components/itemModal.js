import  React,{Component} from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Button,
    Label,
    Input
} from 'reactstrap';
import {connect} from 'react-redux';
import {postItem} from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component{
    state={
        isModalOpen:false,
        name: '',
        cost: '',
        category: '',
        isExpense:false
    };

    toggle=()=>{
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    };

    onNameChange= e=>{
        this.setState({name: e.target.value});
    };

    onCostChange= e=>{
        if(this.state.isExpense===true)
        {
            this.setState({cost: -e.target.value});
        }
        else
        {
            this.setState({cost: e.target.value});
        }        
    };

    onCategoryChange= e=>{
        this.setState({category: e.target.value});
        console.log(this.state.category);
    };

    onExpenseChange= e=>{
        this.setState({isExpense: e.target.checked});
    };

    onSubmit=e =>{
        e.preventDefault();
        const newItem={
            name:this.state.name,
            cost:this.state.cost,
            category:this.state.category,
            username: localStorage.getItem("username")
        };
        this.props.postItem(newItem);
        this.toggle();
        
    };

    static propTypes={
        auth: PropTypes.object.isRequired
    }

    render(){
        return(
            <div>
                <Button
                    color="dark"
                    style={{marginBottom: '2rem', marginTop:'2rem', marginLeft:'14%'}}
                    onClick={this.toggle}
                >
                Add Item
                </Button>

                <Modal
                    isOpen = {this.state.isModalOpen}
                    toggle = {this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add expense or revenue</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item Name</Label>
                                <Input type="text" name="name" id="item" placeholder="add item" onChange={this.onNameChange}/>
                                <br></br>
                                <Label for="expense">Expense</Label>
                                <Input style={{marginLeft: '2rem'}}  checked={this.state.isExpense} type="checkbox" name="expense" id="expense" placeholder="add item" onChange={this.onExpenseChange}/>
                                <br></br>
                                <Label for="cost">Amount</Label>
                                <Input type="number" name="Cost" id="cost" placeholder="add cost" onChange={this.onCostChange}/>
                                <br></br>
                                <Label for="catgory">Category</Label>
                                <select name="Category" id="category" value={this.state.category} placeholder=" "  onChange={this.onCategoryChange} style={{marginLeft: '1rem'}}>
                                    <option value=" "></option>
                                    <option value="food">food</option>
                                    <option value="rent">rent</option>
                                    <option value="saving">saving</option>
                                    <option value="income">income</option>
                                </select>
                                <br></br>
                                <Button>Add Item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

//ItemModal.propTypes={
//    postItems:PropTypes.func.isRequired,
//    item:PropTypes.object.isRequired
//};

const mapStateToProp= state=>({
    item:state.item
});
export default connect(mapStateToProp,{postItem})(ItemModal);

