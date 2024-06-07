import { breakpointsMedias } from 'configs/breakpoints'
import styled from 'styled-components'

interface IArrow {
    isUp?: boolean,
    colorType?: "smoke" | "violet" | "pink" | "yellow" | "dark" | "green" | "red"
    className?: string,
    size?: "big" | "normal" | "small",
    onClick?: () => void
}

const Arrow = ({ isUp = true, colorType = "smoke", className, size = "normal", onClick }: IArrow) => {

    return (
        <Wrap className={`${className} arr-${size} arr-${colorType} arr-${isUp ? "up" : ""}`} onClick={onClick}>

        </Wrap>
    )
}

export default Arrow

const Wrap = styled.div`
    width: 0;
    height: 0;
    border-radius: 4px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #EDEDED;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    transform: rotateX(180deg);
    &.arr-big {
        border-left-width: 14px;
        border-right-width: 14px;
        border-bottom-width: 14px;
    }
    &.arr-normal {
        border-left-width: 10px;
        border-right-width: 10px;
        border-bottom-width: 10px;
    }
    &.arr-small {
        border-left-width: 6px;
        border-right-width: 6px;
        border-bottom-width: 6px;
    }
    &.arr-violet {
        border-bottom-color: #351A6F;
    }
    &.arr-pink {
        border-bottom-color: #F25AA0;
    }
    &.arr-yellow {
        border-bottom-color: #FFB935;
    }
    &.arr-dark {
        border-bottom-color: #97A2C0;
    }
    &.arr-green {
        border-bottom-color: #00AA48;
    }
    &.arr-red {
        border-bottom-color: red;
    }
    &.arr-up {
        transform: rotateX(0);
    }
    ${breakpointsMedias.max1199} {
        &.arr-small {
            border-left-width: 6px;
            border-right-width: 6px;
            border-bottom-width: 6px;
        }
    }
    ${breakpointsMedias.max767} {
        &.arr-big {
            border-left-width: 12px;
            border-right-width: 12px;
            border-bottom-width: 12px;
        }
        &.arr-normal {
            border-left-width: 8px;
            border-right-width: 8px;
            border-bottom-width: 8px;
        }
    }
`