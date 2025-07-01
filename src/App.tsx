import React from 'react';
import {Alert, Layout, theme} from 'antd';
import MainTree from "./components/mainTree";

const {Header, Content, Footer} = Layout;

const App: React.FC = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    return (
        <Layout>
            <Header style={{display: 'flex', alignItems: 'center'}}>
                <Alert type="success" message="Соединение с сервером" showIcon/>
                {/*<div className="demo-logo"/>*/}
                {/*<Menu*/}
                {/*    theme="dark"*/}
                {/*    mode="horizontal"*/}
                {/*    defaultSelectedKeys={['2']}*/}
                {/*    items={items}*/}
                {/*    style={{flex: 1, minWidth: 0}}*/}
                {/*/>*/}
            </Header>
            <Content style={{padding: '0 48px'}}>
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <MainTree/>
                </div>
            </Content>
            <Footer style={{
                textAlign: 'right',
                fontFamily: 'cursive',
                fontWeight: 'bold',
                fontSize: 'large'
            }}>
                Market WatchDog ©{new Date().getFullYear()} Created by Insider.
            </Footer>
        </Layout>
    );
};

export default App;