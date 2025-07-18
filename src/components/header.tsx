import {observer} from "mobx-react";
import {useStores} from "../stores/hooks/useStores";
import styles from "../app.module.css";
import {Alert} from "antd";
import React from "react";

const Header = observer(() => {

    const {applicationSettingsStore} = useStores();

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
            <div>
                <Alert type="success" message={`Сервер: ${applicationSettingsStore.backendOrigin}`} showIcon/>
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
        </div>);

});

export default Header;