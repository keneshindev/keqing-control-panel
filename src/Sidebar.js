import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Link } from "react-router-dom";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"
let collapsed = false;
function CustomSidebar() {
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
                <MenuItem className="menu1" component={<Link to={"/"} />}
                icon={<MenuRoundedIcon />}>Menu</MenuItem>
                <MenuItem component={<Link to={"/test"} />}>Test</MenuItem>
            </Menu>
        </Sidebar>
        )
    }
    export default CustomSidebar