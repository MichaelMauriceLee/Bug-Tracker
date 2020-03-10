import React, {Component} from 'react'
import {Input, Label, Menu} from 'semantic-ui-react'
import {NavLink} from "react-router-dom";

/*
 * Dashboard for the 
 */

const NavSideBar = () => {
    return (
        <Menu vertical fixed='left' inverted>
            <Menu.Item
                name='dashboard'
                header as={NavLink} exact to='/dashboard'
            >
                My Dashboard
            </Menu.Item>
            <Menu.Item
                name='teams'
                header as={NavLink} exact to='/teams'
            >
                My Teams
            </Menu.Item>
            <Menu.Item
                name='tickets'
                header as={NavLink} exact to='/tickets'
            >
                My Tickets
            </Menu.Item>
        </Menu>
    )
}

export default NavSideBar
