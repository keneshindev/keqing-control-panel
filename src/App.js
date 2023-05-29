import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom"
function App() {
  return (
    <div className="App" style={{display: "flex", height: "100vh"}}>
      <Sidebar />
      <div className="details">
        <Outlet />
      </div>
    </div>
  );
}

export default App;