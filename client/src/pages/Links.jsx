import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {getLinks} from "http/linkAPI";
import {Context} from "index";
import CreateModal from "components/CreateModal/CreateModal";
import LinksAside from "components/LinksAside";
import LinkDetail from "../components/LinkDetail";


const Links = () => {
    const {links, user} = useContext(Context)


    const userId = user.user.id

    const getAndSetLinks = (userId) => {
        getLinks(userId).then(r => links.setLinks(r))
    }

    useEffect(() => {
        getAndSetLinks(userId)
    })


    return (
        <div className={"links"}>
            <CreateModal getAndSetLinks={getAndSetLinks}/>
            <Container>
                <Row className={"links__body flex-row d-flex"} style={{height: '100vh'}}>
                    <LinksAside />
                    <LinkDetail getAndSetLinks={getAndSetLinks} />
                </Row>
            </Container>
        </div>
    );
};

export default Links;