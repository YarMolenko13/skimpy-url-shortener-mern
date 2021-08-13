import React, {useContext, useRef, useState} from 'react';
import {Container, Card, InputGroup, FormControl} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import {LINKS_URL, RECOVER_PASSWORD_URL, REGISTER_URL} from "../utils/consts";
import {Button} from "react-bootstrap";
import {getUser, login} from "../http/userAPI";
import {Context} from 'index'

const Login = () => {
    const {user} = useContext(Context)
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const passwordInput = useRef(null)

    const changeInputType = (input) => {
        input.type = input.type === 'password' ? 'text' : 'password'
    }

    const submitForm = async () => {
        try {
            let form = {email, password}
            const data = await login(form)
            const userData = await getUser(data.user.id)
            user.setUser(userData)
            user.setIsAuth(true)
            // TODO: account url
            history.push(LINKS_URL)
        } catch (e) {
            // TODO: обработка ошибки
            alert('Bad credentials')
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
                        <p>Log in and start sharing</p>
                        Don't have an account? <span><Link className={"form__get-started"} to={REGISTER_URL}>Get started</Link></span>
                    </Card.Title>
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
                        <Link className={"form__forget ms-auto"} to={RECOVER_PASSWORD_URL}>Forgot your password?</Link>
                        <Button onClick={submitForm} className={"form__btn mt-4"} variant="main">Log in</Button>
                    </div>
                </Card>
            </Container>
        </div>
    );
};

export default Login;