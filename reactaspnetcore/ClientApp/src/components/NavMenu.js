import React, { useState, useEffect } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo6.png';
import './NavMenu.css';
import { message } from 'antd';


const NavMenu = () => {
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
    const [collapsed, setCollapsed] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const isNavVisible = prevScrollpos > currentScrollPos || currentScrollPos < 10;
            setPrevScrollpos(currentScrollPos);
            setIsNavVisible(isNavVisible);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollpos]);

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };

    const handleLogout = () => {
        navigate('/login', { state: { message: 'Çıkış yapıldı' } });
        message.success('Çıkış başarılı!');
    };

    return (
        <header className={`header-area ${isNavVisible ? 'nav-visible' : 'nav-hidden'}`}>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand tag={Link} to="/" className="d-flex align-items-center">
                    <img src={logo} alt="Logo" className="logo" />
                    <span className="ml-2">SORU BANK</span>
                </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/login">GİRİŞ YAP</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/register">KAYIT OL</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="text-dark" onClick={handleLogout}>ÇIKIŞ YAP</NavLink>
                        </NavItem>
                    </ul>
                </Collapse>
            </Navbar>
        </header>
    );
}

export default NavMenu;
