import React from 'react';
import {Layout} from 'antd';
import MainTree from "./components/mainTree";

import {useStores} from "./stores/hooks/useStores";
import {observer} from "mobx-react";
import styles from "./app.module.css";
import Header from "./components/header";
import EditMarketSignalSettingsModal from "./components/modals/editMarketSignalSettingsModal";
import ClosePositionModal from "./components/modals/closePositionModal";
import AddWatchDogModal from "./components/modals/addWatchDogModal";
import OpenPositionModal from "./components/modals/openPositionModal";
import EditWatchDogModal from "./components/modals/editWatchDogModal";
import commonStyles from "./commonStyles/commonStyles.module.css";

const {Footer} = Layout;

const App = observer(() => {
    const {appStateStore} = useStores();

    return (
        <div className={styles.wrapper}>

            <div className={styles.headerWrapper}>
                <Header/>
            </div>

            <div className={styles.bodyWrapper}>
                {appStateStore.getConnectedToServerStatus()
                    ? <MainTree/>
                    : <div className={commonStyles.redText} style={{paddingTop: '5em', fontSize: 'xxx-large', textAlign:'center'}}>Нет соединения с сервером</div>}
            </div>

            <div className={styles.footerWrapper}>
                <Footer style={{
                    textAlign: 'right',
                    fontSize: 'x-large',
                    padding: '1em'
                }}>
                    Market WatchDog ©{new Date().getFullYear()} Created by Insider.
                </Footer>
            </div>

            <EditMarketSignalSettingsModal/>
            <OpenPositionModal/>
            <ClosePositionModal/>
            <AddWatchDogModal/>
            <EditWatchDogModal/>
        </div>
    );
});

export default App;