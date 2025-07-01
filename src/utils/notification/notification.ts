import {notification} from 'antd';

// const [api] = notification.useNotification();

export default class Notification {
    static notifyError = (text: string, title: string = "Ошибка") => {
        // api['error']({message: title, description: text});
        console.error(`ERROR - ${text}`)
        notification.error({message: title, description: text});
    }
}