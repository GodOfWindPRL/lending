import configColor from 'configs/configColor'
import styled from 'styled-components'
interface LoadingSprinProps {
    size?: "small" | "normal",
    color?: "primary"
}
const LIST_COLOR = { "primary": configColor.colorWhite }
const LoadingSpinner = ({ size = "normal", color = "primary" }: LoadingSprinProps) => {
    return (
        <Wrap className={`${size}`} color={LIST_COLOR[color]}>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </Wrap >
    )
}

export default LoadingSpinner
interface WrapProps {
    color: string
}
const Wrap = styled.div<WrapProps>`
    .lds-spinner {
    color: #fff;
    display: flex;
    position: relative;
    width: 20px;
    height: 20px;
    }
    .lds-spinner div {
    transform-origin: 10px 10px;
    animation: lds-spinner 1.2s linear infinite;
    }
    .lds-spinner div:after {
        content: " ";
        display: block;
        position: absolute;
        top: 1px;
        left: 10px;
        width: 1.5px;
        height: 5px;
        border-radius: 30%;
        background: ${({ color }) => color};
    }
    &.small{
        .lds-spinner {
            color: #fff;
            display: flex;
            position: relative;
            width: 15px;
            height: 15px;
        }
        .lds-spinner div {
            transform-origin: 9px 9px;
            animation: lds-spinner 1.2s linear infinite;
        }
        .lds-spinner div:after {
            content: " ";
            display: block;
            position: absolute;
            top: 1px;
            left: 9px;
            width: 1px;
            height: 4px;
            border-radius: 30%;
            background: ${configColor.colorWhite};
        }
    }
    .lds-spinner div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
    }
    .lds-spinner div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
    }
    .lds-spinner div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
    }
    .lds-spinner div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
    }
    .lds-spinner div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
    }
    .lds-spinner div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
    }
    .lds-spinner div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
    }
    .lds-spinner div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
    }
    .lds-spinner div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
    }
    .lds-spinner div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
    }
    .lds-spinner div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
    }
    .lds-spinner div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
    }
    @keyframes lds-spinner {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
    }
`