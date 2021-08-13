import React, {useContext, useEffect} from 'react';
import {Col, Row} from "react-bootstrap";
import {Context} from "index";
import {observer} from "mobx-react-lite";
import MyButton from "./MyButton/MyButton";
import MyHr from "./MyHr/MyHr";
import {deleteLink, deleteLinks} from "http/linkAPI";


const LinkDetail = observer(({getAndSetLinks}) => {
    const {links, user} = useContext(Context)

    const activeLink = links.activeLink
    const serverUrl = process.env.REACT_APP_SERVER_URL

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return `${date.toLocaleString('eng', {month: 'short'}).toUpperCase()} 
         ${date.getDate()}, ${date.toLocaleString().substr(12, 5)}`
    }

    const formatUrl = (url) => {
        return url.length > 50 ? `${url.substr(0, 60)} + ...` : url
    }

    const shortUrlFormat = (url) => {
        return `${serverUrl.split('/')[2]}/s/${url}`
    }

    const deleteLinkFromDb = (linkId) => {
        deleteLink(user.user.id ,linkId).then(r => {
            getAndSetLinks(user.user.id)
        })
    }

    const deleteLinksFromDb = (links) => {
        let ids = links.map(link => link._id)
        ids = ids.join(',')
        deleteLinks(user.user.id, ids).then(r => {
            getAndSetLinks(user.user.id)
        })
        window.location.reload()
    }

    const getTotalClicksAndSelected = (links) => {
        let clickCount = 0
        let selectedCount = 0
        links.map(link => {
            selectedCount++
            clickCount+= link.countFollows
        })
        selectedCount+= selectedCount > 1 ? ' links selected' : ' link selected'
        return {
            clicks: clickCount,
            selected: selectedCount
        }
    }

    return (
        <Col md={8} className={'link-detail pt-5 px-5'}>
            {links.checkedLinks.length ?
                <div className={'link-detail__checked-info mt-5 d-flex flex-column justify-content-center align-items-center'}>
                    <MyButton callBack={() => deleteLinksFromDb(links.checkedLinks)} classes="mb-5 fs-5"
                              text="DELETE"/>
                    <h4 className={"d-bloc mb-2"}>{getTotalClicksAndSelected(links.checkedLinks).selected}</h4>
                    <div><i style={{fontSize: '90px'}} className="fas fa-chart-bar"></i></div>
                    <h4 className={"d-flex justify-content-center mt-4 flex-column align-items-center"}>
                        <div className={'fw-bolder'}>{getTotalClicksAndSelected(links.checkedLinks).clicks}</div>
                        <div className={"fs-5"}>total click</div>
                    </h4>
                </div>
                :
                <div>
                    {activeLink !== undefined ?
                        <div className={'link-detail__body px-2'}>
                            <div>
                                <div
                                    className={'link-detail__date mb-1'}>CREATED {formatDate(activeLink.date)} | {user.user.name}</div>
                                <h2>{activeLink.title}</h2>
                                <a className={'link-detail__link'} target="_blank"
                                   href={activeLink.fullUrl}>{formatUrl(activeLink.fullUrl)}</a>
                            </div>

                            <div className="link-detail__actions">
                                <a href={`${process.env.REACT_APP_SERVER_URL}s/${activeLink.shortUrl}`}>
                                    {shortUrlFormat(activeLink.shortUrl)}
                                </a>
                                <div className="link-detail__btns">
                                    <MyButton
                                        callBack={() => navigator.clipboard.writeText(shortUrlFormat(activeLink.shortUrl))}
                                        classes="ms-3 fs-6" text="COPY"/>
                                    <MyButton callBack={() => deleteLinkFromDb(activeLink._id)} classes="ms-3 fs-6"
                                              text="DELETE"/>
                                </div>
                            </div>

                            <MyHr color={"#B0927B"} height={2}/>

                            <div className="link-detail__counts mt-3">
                                <span className={'fw-bolder fs-5 me-1'}>{activeLink.countFollows}</span><i
                                className="fas fa-align-left"></i>
                                <p className={'fw-normal'}>TOTAL CLICK</p>
                            </div>
                        </div>
                        :
                        <h2 className={'d-inline-block fs-4 mx-auto'}>No Link Selected</h2>
                    }
                </div>
            }
        </Col>
    );
});

export default LinkDetail;