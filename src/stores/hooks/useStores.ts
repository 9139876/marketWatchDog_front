import { useContext } from 'react';
import RootStore from '../rootStore';
import { StoreContext } from '../storeContext'

export const useStores = (): RootStore => useContext(StoreContext);