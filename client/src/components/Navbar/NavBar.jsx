import React, {useContext} from 'react';
import {Container, Nav, Navbar, Dropdown} from "react-bootstrap";
import './navBar.scss'
import logo from 'assets/img/logo.png'
import {HOME_URL, LOGIN_URL, REGISTER_URL} from "utils/consts";
import {Context} from 'index'
import {observer} from "mobx-react-lite";
import { useHistory} from "react-router-dom";
import MyButton from "../MyButton/MyButton";


const NavBar = observer (({logOut, createLinkModal}) => {
    const {user} = useContext(Context)
    const userData = user.user
    const history = useHistory()

    return (
        <Navbar className={"navbar"} variant="dark">
            <Container>
                <Navbar.Brand className={"navbar__logo"} href={HOME_URL}>
                    <img src={logo} alt="logo" width={50} height={50}/>
                    <span>Skimpy</span>
                </Navbar.Brand>
                <div className={"d-flex align-center"}>
                    { user.isAuth && history.location.pathname.split('/')[2] === 'links' &&
                        <MyButton callBack={createLinkModal} classes={"me-3 px-4"} fontSize={20} text="Create"></MyButton>
                    }
                    { user.isAuth ?
                        <Dropdown className="d-inline mx-2 dropdown">
                            <Dropdown.Toggle variant="outline-warning" className="dropdown__toggle" id="dropdown-autoclose-true">
                                {userData.name}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown__menu">
                                <Dropdown.Item className="dropdown__item" href="/">Home</Dropdown.Item>
                                <Dropdown.Item className="dropdown__item" href={'/' + userData.id + '/links'}>My Links</Dropdown.Item>
                                <Dropdown.Divider></Dropdown.Divider>
                                <Dropdown.Item className="dropdown__item" onClick={logOut} eventKey="4">Log out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        :
                        <Nav>
                            <Nav.Link className={"navbar__link"} href={LOGIN_URL}>Log in</Nav.Link>
                            <Nav.Link className={"navbar__link"} href={REGISTER_URL}>Get started</Nav.Link>
                        </Nav>
                    }
                </div>
            </Container>
        </Navbar>
    );
});

export default NavBar;