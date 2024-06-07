import { breakpointsMedias } from 'configs/breakpoints'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import LoadingSpinner from './LoadingSpinner'

interface IB extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string,
    typeBt?: "blue" | "cyan" | "white" | "gray",
    className?: string,
    disabled?: boolean,
    isLoading?: boolean,
}

const Button = ({ text, typeBt = "blue", className, disabled = false, isLoading = false, ...props }: IB) => {
    const { t } = useTranslation()
    return (
        <Wrap className={`${isLoading ? "bt-loading" : ""} bt-${typeBt} ${className}`} disabled={disabled || isLoading} {...props}>
            {!!isLoading ? <LoadingSpinner color='primary' />
                : <span className={`text-1 text-center color-white`}>
                    {t(text)}
                </span>}
        </Wrap>
    )
}
export default Button

const Wrap = styled.button`
    /* max-width: 100%; */
    width: 100%;
    height: 42px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-position: center;
    border-radius: 6px;
    padding: 0 20px;
    transition: 0.3s ease-in-out;
    &.bt-blue {
        background-color: #262262;
        span {
            font-family: "Kanit-Semibold";
        }
    }
    &.bt-cyan {
        background-color: #0197EC;
    }
    &.bt-gray {
        background-color: #53545A;
    }
    &.bt-white {
        background-color: #fff;
        span {
            color: black !important;
        }
    }
    &:hover {
        &.bt-blue {
            background-color: #1423af;
        }
        &.bt-cyan {
            background-color: #0556ac;
        }
        &.bt-white {
            background-color: #bdb6b6;
        }
    }
    &:disabled{
        opacity: 0.4;
        cursor: not-allowed;
    }
    &.bt-loading {
        opacity: 0.4;
        cursor: not-allowed;
        :hover {

        }
    }
    ${breakpointsMedias.max1199} {
       
    }
`