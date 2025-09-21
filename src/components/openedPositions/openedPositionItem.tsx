import React, {ReactNode} from "react";
import {OpenedPositionInfo} from "../../models/openedPositions/openedPositionInfo";
import {PositionDirectionTypeEnum} from "../../models/openedPositions/positionDirectionTypeEnum";

const OpenedPositionItem = (openedPositionInfo: OpenedPositionInfo): ReactNode => {

    // const openedTime = `${openedPositionInfo.openedTime?.toLocaleDateString()} ${openedPositionInfo.openedTime?.toLocaleTimeString()}`;

    return (
        <div>
            <div>{openedPositionInfo.symbol}</div>

            <div>{openedPositionInfo.type === PositionDirectionTypeEnum.Long
                ? (<div>Длинная</div>)
                : (<div>Короткая</div>)}
            </div>


        </div>
    )
};

export default OpenedPositionItem;