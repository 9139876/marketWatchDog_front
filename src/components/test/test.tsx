import React from "react";
import {FC} from "react";
import {Button} from 'antd';
import {useStores} from "../../stores/hooks/useStores";
import {observer} from "mobx-react";

const TestComponent: FC = observer(() => {
    const {testStore} = useStores();

    return (
        <div>
            <div>
                {`Число: ${testStore.tesValue}`}
            </div>
            <Button
                type="primary"
                onClick={testStore.updateTestValue}>
                Обновить
            </Button>
        </div>
    );
});

export default TestComponent;
