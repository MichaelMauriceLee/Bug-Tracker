import NavSideBar from "./NavSideBar";
import NavBar from "./NavBar";
import React, {Fragment} from "react";

const NavMenu = () => {
    return (
        <Fragment>
            <NavSideBar/>
            <NavBar/>
        </Fragment>
    )
}

export default NavMenu