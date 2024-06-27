import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu'; 
import Footer from './Footer';
import './Layout.css';

class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div className="layout">
                <NavMenu />
                <div className="content">
                    <Container tag="main">
                        {this.props.children}
                    </Container>
                </div>
                <Footer /> 
            </div>
        );
    }
}

export default Layout;
