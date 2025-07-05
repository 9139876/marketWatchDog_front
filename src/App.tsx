import React from 'react';
import {Alert, Empty, Layout} from 'antd';
import MainTree from "./components/mainTree";
import {useStores} from "./stores/hooks/useStores";
import {observer} from "mobx-react";
import styles from "./app.module.css";

const {Header, Footer} = Layout;

const App = observer(() => {
    const {appStateStore} = useStores();

    return (
        <div className={styles.wrapper}>

            <div className={styles.headerWrapper}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <div>
                        <Alert type="success" message="Соединение с сервером" showIcon/>
                    </div>
                    <div>
                        <Alert type="success" message="Соединение с сервером" showIcon/>
                    </div>
                    <div>
                        <Alert type="success" message="Соединение с сервером" showIcon/>
                    </div>
                    <div>
                        <Alert type="success" message="Соединение с сервером" showIcon/>
                    </div>
                </div>

                {/*<Header style={{display: 'flex', alignItems: 'center'}}>*/}
                {/*    <div>*/}
                {/*        <Alert type="success" message="Соединение с сервером" showIcon/>*/}
                {/*    </div>*/}
                {/*</Header>*/}
            </div>

            <div className={styles.bodyWrapper}>
                {appStateStore.connectedToServer
                    ? <MainTree/>
                    : <Empty style={{paddingTop: '5em'}} styles={{image: {height: '10em'}}} description={<div style={{color: 'red', fontSize: '3em', fontFamily: 'cursive'}}>Нет соединения с сервером :(</div>}/>}
            </div>

            <div className={styles.footerWrapper}>
                <Footer style={{
                    textAlign: 'right',
                    fontFamily: 'cursive',
                    fontWeight: 'bold',
                    fontSize: 'large',
                    padding: '1em'
                }}>
                    Market WatchDog ©{new Date().getFullYear()} Created by Insider.
                </Footer>
            </div>

        </div>
    );
});

export default App;