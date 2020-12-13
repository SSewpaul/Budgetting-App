import React,{ Component } from 'react'
import {
    Container, 
    TableName, 
    Table,
    Button
} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {v4 as uuid} from 'uuid';

class ItemList extends Component{
    state={
        items:[
            {id:uuid(), name:'Milk', cost:100, category:'food', username:'John'},
            {id:uuid(), name:'Water', cost:100, category:'food', username:'John'},
            {id:uuid(), name:'spoon', cost:100, category:'other', username:'Jack'},
            {id:uuid(), name:'rent', cost:100, category:'rent', username:'Jill'}
        ]
    }

    render() {
        const {items}=this.state;
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
                    <Table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        {items.map(({id,name,cost})=>(
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <tbody>
                                    <tr>
                                        <td>{name}</td>
                                        <td>{cost}</td>
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

export default ItemList;
