import { useSelector } from "react-redux"
import LastSeen from "./LastSeen";
let selector = store => store.machineInfo
function InfoPage() {
    let state = useSelector(selector)
    return (
        <div>
            <h1>Info page</h1>
            <h2>Machine name: {state.platform}</h2>
            <h2>Machine start: {<LastSeen date={new Date(state.uptime ?? Date.now())}/>}</h2>
            <h2>Bot user: {state.username}</h2>
        </div>
    )
}
export default InfoPage