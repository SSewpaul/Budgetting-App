import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
} from 'reactstrap';
import Logout from './Logout';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class NavigationBar extends Component {
    state = {
        isOpen: false
    };

    static propTypes={
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render(){
        const {isAuth, user}= this.props.auth;
        console.log(isAuth);
        const loggedInLink=(
            <Fragment>
                <NavItem>
                    <NavLink href="https://github.com//SSewpaul">
                        GitHub
                    </NavLink>
                </NavItem>
                <NavItem>
                    <Logout/>
                </NavItem>
                <NavItem>
                    <span className="navbar-text ml-2"><strong>{user? `Hello ${user.username}!`:''}</strong></span>
                </NavItem>
            </Fragment>
        );

        const notAuthLinks=(
            <Fragment>
                <NavItem>
                    <NavLink href="/login">
                        Login/Register
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="https://github.com//SSewpaul">
                        GitHub
                    </NavLink>
                </NavItem> 
            </Fragment>
        );


        return(
            <div>
                <Navbar color="dark" dark expand="md">
                    <Container>
                        <NavbarBrand href="/" style={{position:"absolute-left"}}>Budgetting App</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}></NavbarToggler>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" style={{position: "absolute-right"}} navbar>
                                {isAuth ? loggedInLink:notAuthLinks};                                      
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state =>({
    auth:state.auth
});

export default connect(mapStateToProps,null)(NavigationBar);