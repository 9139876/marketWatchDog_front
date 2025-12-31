// noinspection HttpUrlsUsage

import {observer} from "mobx-react";
import {useStores} from "../stores/hooks/useStores";
import {Alert, Input, InputNumber, Select} from "antd";
import React, {useState} from "react";
import {DealerTypeEnum} from "../models/enums/dealerTypeEnum";
import {formatDateTimeRusStr} from "../utils/helpers/stringHelper";
import StrongButton from "../customControls/strongButton";
import strongButtonStyles from "../customControls/strongButton.module.css";

const Header = observer(() => {

    const httpStr = 'http://';

    const {appStateStore} = useStores();
    const [origin, setOrigin] = useState(appStateStore.getBackendOrigin().replace(httpStr, ''));
    const [connectButtonDisabled, setConnectButtonDisabled] = useState(false);

    const onChangeOrigin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrigin(event.target.value);
        appStateStore.setBackendOrigin(`${httpStr}${event.target.value}`);
    }

    const tryConnectToServer = async () => {
        setConnectButtonDisabled(true);
        await appStateStore.connectToServer();
        setConnectButtonDisabled(false);
    }

    const getDealers = () => {
        return Object.values(DealerTypeEnum).map(item =>
            ({
                value: item,
                label: item.toString()
            }));
    }

    return (
        <div style={{display: 'flex', justifyContent: 'right', alignItems: 'center', height: '100%'}}>
            <div>
                {
                    appStateStore.getConnectedToServerStatus()
                        ? <div style={{marginLeft: '1em', display: 'flex', alignItems: 'center'}}>
                            <div style={{display: "flex", alignItems: 'center', marginRight: '1em'}}>
                                <div style={{paddingRight: "0.5em", fontWeight: 'bold', fontSize: '1.5em'}}>Интервал обновления:</div>

                                <InputNumber<string>
                                    style={{width: "4em"}}
                                    value={appStateStore.updateInterval.toString()}
                                    min="3"
                                    max="30"
                                    step="1"
                                    onChange={appStateStore.setUpdateInterval}
                                    stringMode
                                />
                            </div>

                            <div style={{marginRight: '1em', fontWeight: 'bold', fontSize: '1.5em'}}>
                                {`Последнее обновление: ${formatDateTimeRusStr(appStateStore.lastUpdatedTime)}`}
                            </div>

                            <Alert
                                style={{fontWeight: 'bold', fontSize: '1.2em'}}
                                type='success'
                                message={`${origin} - ${appStateStore.getDealerType()}`}
                                showIcon/>
                        </div>
                        :
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                            <div>
                                <Input
                                    style={{width: "30em"}}
                                    disabled={appStateStore.getConnectedToServerStatus()}
                                    addonBefore={`Сервер: ${httpStr}`}
                                    value={origin}
                                    onChange={onChangeOrigin}/>
                            </div>
                            <div style={{marginLeft: '1em'}}>
                                <Select

                                    disabled={appStateStore.getConnectedToServerStatus()}
                                    style={{width: "10em"}}
                                    placeholder="Выбор дилера"
                                    options={getDealers()}
                                    value={appStateStore.getDealerType()}
                                    onChange={appStateStore.setDealerType}
                                />
                            </div>
                        </div>
                }
            </div>

            <div style={{marginLeft: '1em', marginRight: '1em'}}>
                {
                    connectButtonDisabled
                        ?
                        <StrongButton
                            key='connecting'
                            className={strongButtonStyles.grayButton}
                            onClick={appStateStore.disconnectToServer}
                        >
                            Подключение...
                        </StrongButton>
                        :
                        (
                            appStateStore.getConnectedToServerStatus()
                                ?
                                <StrongButton
                                    key='disconnectToServer'
                                    className={strongButtonStyles.redButton}
                                    onClick={appStateStore.disconnectToServer}
                                >
                                    Отключиться
                                </StrongButton>
                                :
                                <StrongButton
                                    key='tryConnectToServer'
                                    className={strongButtonStyles.greenButton}
                                    disabled={connectButtonDisabled}
                                    onClick={tryConnectToServer}
                                >
                                    Подключиться
                                </StrongButton>
                        )
                }
            </div>
        </div>);

});

export default Header;