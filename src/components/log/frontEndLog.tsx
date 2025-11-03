import {observer} from "mobx-react";
import {useStores} from "../../stores/hooks/useStores";
import React, {ReactNode} from "react";
import {formatDateTimeRusStr} from "../../utils/helpers/stringHelper";
import FrontEndLogItem from "../../models/frontEndLog/frontEndLogItem";
import {Button} from "antd";

const FrontEndLog = observer(() => {
    const {frontEndLogStore} = useStores();

    const mapToListItem = (item: FrontEndLogItem): ReactNode => {
        return <div style={{color: "red"}}>&#9679; {`[${formatDateTimeRusStr(item.time)}]: ${item.description}`}</div>
    }

    return (
        <div>
            <div style={{minHeight: '12em', maxHeight: '12em', overflow: 'auto', border: 'black', borderStyle: 'double', padding: '0.5em'}}>
                {frontEndLogStore.logItems.map(mapToListItem)}
            </div>

            <Button style={{margin: '1em'}} onClick={() => frontEndLogStore.addEvent('This is the FrontEndError')}>
                FrontEndError
            </Button>
        </div>

    );
});

export default FrontEndLog;