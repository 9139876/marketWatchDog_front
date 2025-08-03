import React from 'react';
import {Empty, Layout} from 'antd';
import MainTree from "./components/mainTree";

import {useStores} from "./stores/hooks/useStores";
import {observer} from "mobx-react";
import styles from "./app.module.css";
import Header from "./components/header";
import EditMarketSignalSettingsModal from "./components/modals/editMarketSignalSettingsModal";
import ClosePositionModal from "./components/modals/closePositionModal";
import AddTriggerModal from "./components/modals/addTriggerModal";
import OpenPositionModal from "./components/modals/openPositionModal";

const {Footer} = Layout;

const App = observer(() => {
    const {appStateStore} = useStores();

    return (
        <div className={styles.wrapper}>

            <div className={styles.headerWrapper}>
                <Header/>
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

            <EditMarketSignalSettingsModal/>
            <OpenPositionModal/>
            <ClosePositionModal/>
            <AddTriggerModal/>

        </div>
    );
});

export default App;