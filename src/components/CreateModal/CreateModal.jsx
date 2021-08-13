import React, {useContext, useState} from 'react';
import './style.scss'
import {Modal, Button, InputGroup, Form, FormControl} from "react-bootstrap";
import {Context} from 'index'
import {createLink} from "../../http/linkAPI";
import {observer} from "mobx-react-lite";
import validator from "../../utils/validator";


const CreateModal = observer(({getAndSetLinks}) => {
    const {links, user} = useContext(Context)
    const [title, setTitle] = useState('')
    const [fullUrl, setFullUrl] = useState('')
    const [validateMsg, setValidateMsg] = useState(null)

    const userId = user.user.id

    const closeModal = () => {
        setTitle('')
        setFullUrl('')
        setValidateMsg(null)
        links.setIsCreateModal(false)
    }

    const submitForm = () => {
        const validateResult = validator.validateCreateLinkForm({title, fullUrl})
        if (!validateResult) {
            closeModal()
            createLink(userId, {title, fullUrl}).then(() => {getAndSetLinks(userId)})
            return
        }
        setValidateMsg(validateResult)
    }

    const keySubmitForm = (e) => {
        if (e.key === 'Enter') {
            submitForm()
        }
    }

    return (
        <Modal
            show={links.isCreateModal}
            keyboard={true}
            centered
            onHide={closeModal}
        >
            <Modal.Header>
                <Modal.Title>Create link</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form  className={"py-2"} onKeyUp={(e) => keySubmitForm(e)}>
                    <Form.Text style={{marginTop: '-18px'}} color={"danger"} className="validation__msg d-block danger mb-2">{validateMsg}</Form.Text>
                    <InputGroup className="mb-3">
                        <FormControl
                            className={"form__input"}
                            onChange={event => setTitle(event.target.value)}
                            value={title}
                            placeholder="Link title"
                            type={"text"}
                        />
                    </InputGroup>
                    <InputGroup>
                        <FormControl
                            className={"form__input"}
                            onChange={event => setFullUrl(event.target.value)}
                            value={fullUrl}
                            placeholder="Past long url"
                            type={"text"}
                        />
                    </InputGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className={'modal-btn modal-close'} variant="main" onClick={closeModal}>
                    Close
                </Button>
                <Button className={'modal-btn modal-create'} variant="main" onClick={submitForm}>Create</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateModal;