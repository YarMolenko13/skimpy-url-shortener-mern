import React from 'react';
import {Container, Row} from "react-bootstrap";

import './footer.scss'

const Footer = () => {
    return (
        <div className={"footer"}>
            <Container>
                <Row className={"py-4"}>
                    <span>© 2021 YarMolenko13</span>
                </Row>
            </Container>
        </div>
    );
};

export default Footer;