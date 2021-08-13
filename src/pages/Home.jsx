import React, {useContext} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {Context} from 'index'
import homeBg from 'assets/img/home_bg.jpg'
import {useHistory} from "react-router-dom";
import {LINKS_URL, LOGIN_URL} from "../utils/consts";

const Home = () => {
    const {user} = useContext(Context)
    const history = useHistory()

    const getStartedBtnClick = () => {
        window.location = user.isAuth ? `${user.user.id}/links` : LOGIN_URL
    }

    return (
        <div className="home">
            <Container>
                <Row>
                    <Col md={7} className={"pt-5 home__left"}>
                        <h2>Short links, big results</h2>
                        <h3>A URL shortener built with powerful tools to help you grow and protect your brand.</h3>
                        <Button onClick={getStartedBtnClick} className={"mt-3"} variant="main">Get started</Button>
                    </Col>
                    <Col md={5}>
                        <img src={homeBg} className={"home__bg no-blue"}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;