import React, { Component } from 'react';
import {
    Container,
    Form,
    FormGroup, 
    Label, 
    Input,
    Button,
    Col,
    Alert,
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../actions/authActions';
import './FormStyle.css';

class LoginPage extends Component
{
    state={
        username:'',
        password:'',
        msg: null
    };

    static propTypes={
        isAuth: PropTypes.bool,
        error: PropTypes.object.isRequired,
        Login: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps){
        const {error} =this.props;

        if(error !== prevProps.error){
            if(error.id==='LOGIN_FAIL'){
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

        const {username, password}=this.state;

        const User= {
            username,
            password
        };

        //Login
        this.props.login(User);   
    };

    onUsernameChange=e=>{
        this.setState({username: e.target.value});
    };

    onPasswordChange=e=>{
        this.setState({password: e.target.value});
    };

    render(){
        return(
            <Container style={{marginTop:"5%"}}>
                <h2 className="title">Login</h2>
                <Form className="login_form" onSubmit={this.onSubmit}>
                    { this.state.msg? <Alert color="danger">{this.state.msg}</Alert>: null}
                    <Col>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="text" name="username" id="username" placeholder="Username" onChange={this.onUsernameChange}/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onPasswordChange}/>
                        </FormGroup>
                    </Col>
                    <Col>
                    <Button color="primary"block className="md">Login</Button>
                    </Col>
                    <br></br>
                    <Col>
                    <p style={{textAlign:"center"}}>Don't have an account?
                    <Button color="primary"block className="md" href="/register">Register</Button>
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

export default connect(mapStateToProps,{login})(LoginPage);

