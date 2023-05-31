import { useState } from "react"
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Link } from "react-router-dom";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import "./app.css";
function CustomSidebar() {
    let [collapsed, setCollapsed] = useState(false)
    return (
        <Sidebar className="sidebar" collapsed={collapsed}>
            <Menu
                menuItemStyles={{
                    button: {
                        [`&.active`]: {
                            backgroundColor: '#13395e',
                            color: '#b6c8d9'
                        }
                    }
                }}
            >
                <MenuItem className="menu1" icon={<MenuRoundedIcon onClick={() => setCollapsed(!collapsed)} />}>Menu</MenuItem>
                <MenuItem component={<Link to={"/test"} />} icon={<SettingsRoundedIcon />}>Test</MenuItem>
                <MenuItem component={<Link to={"/info"} />} icon={<InfoRoundedIcon />}>Info</MenuItem>
            </Menu>
        </Sidebar>
        )
    }
    export default CustomSidebar