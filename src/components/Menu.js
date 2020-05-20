import React, { Component } from 'react';
import {Route,Link} from "react-router-dom";

const menus = [
    {
        name: 'Home',
        to: '/',
        exact: true
    },
    {
        name: 'A^B mod C',
        to: '/mod-calculator',
        exact: true
    },
    {
        name: 'Nghịch đảo',
        to: '/mod-inverse',
        exact: true
    },
    {
        name: 'Căn nguyên thủy',
        to: '/mod-primitive-root',
        exact: true
    },
    {
        name: 'Logarit',
        to: '/mod-logarit',
        exact: true
    },
    {
        name: 'MH RSA',
        to: '/encrypt-RSA',
        exact: true
    },
    {
        name: 'MH Diffie-Hellman',
        to: '/encrypt-Diffie-Hellman',
        exact: true
    },
    {
        name: 'MH Elgaman',
        to: '/encrypt-Elgaman',
        exact: true
    }
];

const MenuLink = ({name, to, activeClassWhenExact}) => {
    return (
        <Route path={to} exact={activeClassWhenExact} children={({match}) => {
            return (
                <li className="nav-item">
                    <Link to={to} className={ match ? 'nav-link active' : 'nav-link'}>{name}</Link>
                </li>
            )
        }}/>
    )
}


export default class Menu extends Component {

    showMenus = (menus) => {
        let result = null;
            if (menus.length > 0) {
                result = menus.map((menu, index) => {
                    return (
                        <MenuLink
                            key={index}
                            name={menu.name}
                            to={menu.to}
                            activeClassWhenExact={menu.exact}
                        />
                    )
                });
            }
        return result;
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#primaryMenu" aria-controls="primaryMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
                </button>
                <a href="http://nhduc.info" className="navbar-brand" target="_blank" rel="noopener noreferrer"><img src="images/header-logo.png" style={{width: '50px'}} alt="" className="logo" /></a>
                <div className="collapse navbar-collapse" id="primaryMenu">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    {this.showMenus(menus)}
                </ul>
                </div>
            </nav>
            
        )
    }
}
