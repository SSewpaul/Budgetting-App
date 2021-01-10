import React, { Component } from 'react';
import {
    Container,
    Form,
    FormGroup, 
    Label, 
    Input,
    Button,
    Col,
    Alert
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from '../actions/authActions';
import './FormStyle.css';

class RegistrationPage extends Component
{
    state={
        username:'',
        email:'',
        password:'',
        msg: null
    };

    static propTypes={
        isAuth: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps){
        const {error} =this.props;

        if(error !== prevProps.error){
            if(error.id==='REGISTER_FAIL'){
                this.setState({msg: error.msg.msg});
            }
            else
            {
                this.setState({msg:null});
            }
        }
    }

    onSubmit=e =>{
        e.preventDefault();

        const {username,email,password}=this.state;
        console.log(password);

        const newUser= {
            username,
            email,
            password
        };

        //Register
        this.props.register(newUser);   
    };

    onUsernameChange=e=>{
        this.setState({username: e.target.value});
    };

    onEmailChange=e=>{
        this.setState({email: e.target.value});
    };

    onPasswordChange=e=>{
        this.setState({password: e.target.value});
    };

    render(){
        return(
            <Container style={{marginTop:"5%"}}>
                <h2 className="title">Register</h2>
                <Form className="registration_form" onSubmit={this.onSubmit}>
                    { this.state.msg? <Alert color="danger">{this.state.msg}</Alert>: null}
                    <Col>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="text" name="username" id="username" placeholder="Username" onChange={this.onUsernameChange}/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="someone@example.com" onChange={this.onEmailChange}/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onPasswordChange}/>
                        </FormGroup>
                    </Col>
                    <Col>
                    <Button color="primary"block className="md">Register</Button>
                    </Col>
                    <br></br>
                    <Col>
                    <p style={{textAlign:"center"}}>Already have an account?
                    <Button color="primary"block className="md" href="/login">Login</Button>
                    </p>
                    </Col>
                </Form>

            </Container>

        );
    };
}

const mapStateToProps= state =>({
    isAuth: state.auth.isAuth,
    error: state.error
});

export default connect(mapStateToProps,{register})(RegistrationPage);

