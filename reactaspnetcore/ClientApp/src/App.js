import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Layout from './components/Layout';

class App extends Component {
    static displayName = 'App';

    render() {
        return (
            <Layout>
                <Routes>
                    {AppRoutes.map((route, index) => (
                        <Route key={index} {...route} />
                    ))}
                </Routes>
            </Layout>
        );
    }
}

export default App;
