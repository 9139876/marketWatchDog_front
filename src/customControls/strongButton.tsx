import React, {CSSProperties} from 'react';

interface StrongButtonProps {
    children: string;
    className: string;

    style?: CSSProperties | undefined;
    disabled?: boolean | undefined;
    onClick?: React.MouseEventHandler<HTMLElement> | undefined;
    key?: React.Key | null | undefined
}

const StrongButton = (props: StrongButtonProps) => {
    return <button
        key={props.key}
        disabled={props.disabled ?? false}
        className={props.className}
        style={props.style}
        onClick={props.onClick}
    >
        {props.children}
    </button>
}

export default StrongButton;