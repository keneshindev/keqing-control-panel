import { useState } from "react"
import { useSubmit } from "react-router-dom"
import store from './store';
import './login.css';
import config from './config.json';
import { Button, TextField, FormControlLabel, Switch } from "@mui/material"
function LoginPage() {
    const submit = useSubmit();
    let [authState, setAuthState] = useState({})
    let [errorState, setErrorState] = useState({})
    let [shakeState, setShakeState] = useState({})
    async function login() {
        setShakeState({ password: false, email: false })
        if (errorState.password || errorState.email) {
            setShakeState({ password: !!errorState.password, email: !!errorState.email })
            setTimeout(() => setShakeState({ password: false, email: false }), 500)
            return
        }
        let request = await fetch(config.endpoint + "/auth/login", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ ...authState, rememberPassword: undefined })
        })
        let data = await request.json()
        if (request.status != 200) {
            if (request.status == 404) {
                setErrorState({ ...errorState, email: "Incorrect email." })
                setShakeState({ password: !!errorState.password, email: !!errorState.email })
                setTimeout(() => setShakeState({ password: false, email: false }), 500)
            }
            if (request.status == 401) {
                setErrorState({ ...errorState, password: "Incorrect password." })
                setShakeState({ password: !!errorState.password, email: !!errorState.email })
                setTimeout(() => setShakeState({ password: false, email: false }), 500)
            }
            return
        }
        if (authState.rememberPassword) localStorage.setItem("token", data.token)
        store.dispatch({ type: 'user/userChanged', payload: data })
        submit(null, {
            method: "post",
            action: "/login"
        })
    }
    function emailOnChange(event) {
        setErrorState({ ...errorState, email: null })
        let { value } = event.target
        if (!value) return setErrorState({ ...errorState, email: "Email cannot be empty." })
        let isValid = (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g).test(value)
        if (!isValid) setErrorState({ ...errorState, email: "Invalid email." })
        else setAuthState({ ...authState, email: value })
    }
    function passwordOnChange(event) {
        setErrorState({ ...errorState, password: null })
        let { value } = event.target
        if (!value) return setErrorState({ ...errorState, password: "Password cannot be empty." })
        if (value.length < 8) setErrorState({ ...errorState, password: "Password must be 8 characters or longer." })
        else setAuthState({ ...authState, password: value })
    }
    return (
        <div className="loginHeader">
            <h1>Welcome!</h1>
            <TextField required error={!!errorState.email} helperText={errorState.email ?? ""} style={{ marginBottom: "10px", width: "80%" }} className={shakeState.email ? "error" : ""} label="Email" onChange={emailOnChange} />
            <TextField required error={!!errorState.password} helperText={errorState.password ?? ""} style={{ width: "80%" }} className={shakeState.password ? "error" : ""} type="password" label="Password" onChange={passwordOnChange} />
            <FormControlLabel control={<Switch onChange={event => setAuthState({ ...authState, rememberPassword: event.target.checked })}/>} label="Remember password?" />
            <Button variant="contained" style={{ width: "80%", backgroundColor: "#969696" }} onClick={login}>Login</Button>
        </div>
    )
}
export default LoginPage