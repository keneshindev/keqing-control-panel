import { useSubmit } from "react-router-dom"
import store from './store';
function testLogin(submit) {
    store.dispatch({ type: 'user/userChanged', payload: { username: "Keneshin", token: "test" }})
    submit(null, {
        method: "post",
        action: "/login"
    })
}
function LoginPage() {
    const submit = useSubmit();
    return (
        <>
            <h1>This is empty right now</h1>
            <button onClick={() => testLogin(submit)}>Test</button>
        </>
    )
}
export default LoginPage