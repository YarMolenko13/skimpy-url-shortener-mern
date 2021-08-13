import React, {useContext, useRef, useState} from 'react';
import {Button, Card, Container, FormControl, InputGroup} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import {LOGIN_URL, HOME_URL, LINKS_URL} from "../utils/consts";
import validator from "../utils/validator"
import {registration, getUser} from '../http/userAPI'
import {Context} from 'index.js'


const Registration = () => {
    const {user} = useContext(Context)
    const history = useHistory()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [validationMsg, setValidationMsg] = useState(null)

    const passwordInput = useRef(null)

    const changeInputType = (input) => {
        input.type = input.type === 'password' ? 'text' : 'password'
    }

    const toRegister = async (form) => {
        try {
            const data = await registration(form)
            const userData = await getUser(data.user.id)
            user.setUser(userData)
            user.setIsAuth(true)
            // TODO: account url
            history.push(LINKS_URL)
        } catch (e) {
            // TODO: обработка ошибки
            alert('Registration failed. Please, try later')
        }
    }

    const submitForm = () => {
        const form = {name, email, password}
        const validationResult = validator.validateForm(form)
        setValidationMsg(validationResult)
        if (!validationResult) {
            toRegister(form)
        }
    }

    const keySubmitForm = (e) => {
        if (e.key === 'Enter') {
            submitForm()
        }
    }

    return (
        <div className={"form"}>
            <Container>
                <Card className={"form__card mx-auto p-4"} onKeyUp={(e) => keySubmitForm(e)}>
                    <Card.Title className={"form__title mx-auto"}>
                        <p>Create an account</p>
                        Already have an account? <span><Link className={"form__get-started"} to={LOGIN_URL}>Log in</Link></span>
                    </Card.Title>
                    { validationMsg ?
                        <div className="validation__msg mb-3 danger">*{validationMsg}</div>
                        : ''
                    }
                    <InputGroup className="mb-1">
                        <FormControl
                            className={"form__input mb-4"}
                            onChange={event => setName(event.target.value)}
                            value={name}
                            placeholder="Your name"
                            type={"email"}
                        />
                    </InputGroup>
                    <InputGroup className="mb-1">
                        <FormControl
                            className={"form__input mb-4"}
                            onChange={event => setEmail(event.target.value)}
                            value={email}
                            placeholder="Your email"
                            type={"email"}
                        />
                    </InputGroup>
                    <InputGroup>
                        <FormControl
                            className={"form__input form__input_pass "}
                            onChange={event => setPassword(event.target.value)}
                            value={password}
                            ref={passwordInput}
                            placeholder="And password"
                            type={"password"}
                            aria-describedby="basic-addon1"
                        />
                        <Button onClick={() => changeInputType(passwordInput.current)} variant="main" id="button-addon1">
                            <i className="fas fa-eye"></i>
                        </Button>
                    </InputGroup>

                    <div className="form__footer d-flex flex-column mt-3">
                        <div className="validation d-flex justify-content-start">
                            <div className="validation__field me-5 d-flex align-items-center">8 or more characters</div>
                            <div className="validation__field d-flex align-items-center">1 number</div>
                        </div>
                        <Button onClick={submitForm} className={"form__btn mt-4"} variant="main">Register</Button>
                    </div>
                </Card>
            </Container>
        </div>
    );
};

export default Registration;