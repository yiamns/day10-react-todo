import React from 'react';
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu } from 'antd';
import { HomeOutlined, CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import './layouts.css';

const items = [
    {
        key: '/',
        icon: <HomeOutlined style={{ fontSize: '20px' }} />,
        label: <Link to="/">Home</Link>,
    },
    {
        key: '/done',
        icon: <CheckCircleOutlined style={{ fontSize: '20px' }} />,
        label: <Link to="/done">Done List</Link>,
    },
    {
        key: '/about',
        icon: <InfoCircleOutlined style={{ fontSize: '20px' }} />,
        label: <Link to="/about">About us</Link>,
    },
];

export function DefaultLayout() {
    const location = useLocation();

    return (
        <div>
            <header>
                <Menu
                    mode="horizontal"
                    selectedKeys={[location.pathname]}
                    items={items}
                    className="nav-bar"
                />
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
