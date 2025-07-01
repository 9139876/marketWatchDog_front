import {createContext} from 'react'
import RootStore from "./rootStore";

function getInitialStore(): RootStore {
    return new RootStore();
}

export const StoreContext = createContext<RootStore>(getInitialStore());