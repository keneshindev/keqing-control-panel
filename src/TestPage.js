import { useSelector } from 'react-redux';
import store from './store';
function testDispatch() {
    store.dispatch({ type: 'user/userChanged', payload: { username: "Keneshin"+Math.floor(Math.random()*100), token: "test"}})
}
let selectUser = state => state.user
function TestPage() {
    let user = useSelector(selectUser)
    return (
        <>
            <h1>Hello, this is a test page!</h1>
            <h2>Currently logged in as: {user.username}</h2>
            <button onClick={testDispatch}>Test</button>
        </>
    )
}
export default TestPage