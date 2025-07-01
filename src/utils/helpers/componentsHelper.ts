import {useEffect, useRef} from "react";

export const useComponentDidMount = (handler: any) => {
    return useEffect(() => handler(), []);
};

export const useComponentDidUpdate = (handler: any, deps: any) => {
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;

            return;
        }

        return handler();
    }, deps);
};

export const useComponentWillUnmount = (handler: any) => {
    return useEffect(() => handler, []);
};