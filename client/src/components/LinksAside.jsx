import React, {useContext, useState} from 'react';
import {Col, Row, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "index";
import MyHr from "./MyHr/MyHr";
import MyButton from "./MyButton/MyButton";
// import MyHr from "MyHr/MyHr";


const LinksAside = observer((props) => {
    const {links} = useContext(Context)

    const countLinks = Object.keys(links.links).length
    const resultWord = countLinks>1 ? 'Results' : 'Result'

    const changeLink = (link, linkIndex) => {
        links.setIndexOfActiveLink(linkIndex)
        links.setActiveLink(link)
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return `${date.toLocaleString('eng', {month: 'short'}).toUpperCase()} 
        ${date.getDate()}`
    }

    const createLinkModal = () => {
        links.setIsCreateModal(true)
    }

    const checkboxClick = (target, link) => {
        if (target.checked) {
            link.isChecked = true
        } else {
            link.isChecked = false
        }
    }

    return (
        <Col className={"links__aside aside-links"} md={4}>
            <Row className={"aside-links__result d-flex justify-content-between flex-nowrap pe-2"}>
                <span className={'fs-6'}>{`${countLinks} ${resultWord}`}</span>
                <span className={'fs-6'}>Clicks all time</span>
            </Row>

            <div>
                { links.links.count() ===0 ?
                    // <h2 className={"ms-0 ps-0 mt-3 fs-1"}>There are no links</h2>
                    <MyButton callBack={createLinkModal} text={"CREATE YOUR FIRST LINK"} classes={"aside-links__add-first"} />
                    :
                    Object.keys(links.links).map((key, i) => {
                        let link = links.links[key]
                        let shortUrl = `${process.env.REACT_APP_SERVER_URL}${link.shortUrl}`
                        return (
                            <Row className={`py-2 my-2 d-flex align-items-center ` +
                            `${links.indexOfActiveLink === i ? 'aside-link-active': 'aside-link'}`}
                                 onClick={() => changeLink(link, i)}
                                 key={i}
                            >
                                <Col className={"aside-link__info d-inline-flex flex-column" }>
                                    <span className={"aside-link__date"}>{formatDate(link.date)}</span>
                                    <span className={"aside-link__title"}>
                                        <span className={"me-4"}>{link.title}</span>
                                        <Form.Check
                                            onChange={e => checkboxClick(e.target, link)}
                                            className={"aside-link__checkbox"}
                                            type={"checkbox"}
                                            id={`default-checkbox`}
                                        />
                                    </span>
                                    <span className={"aside-link__short-url"}>{shortUrl}</span>
                                </Col>
                            </Row>
                        )
                    })
                }
            </div>

        </Col>
    );
});

export default LinksAside;