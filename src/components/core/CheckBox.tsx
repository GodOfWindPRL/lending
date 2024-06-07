import styled from "styled-components";
import { MdDone } from "react-icons/md";
import configColor from "configs/configColor";

interface ICheckBox {
    className?: string;
    checked: boolean;
    onCheck: () => void;
}
const CheckBox = ({ className, checked, onCheck }: ICheckBox) => {
    return (
        <Wrap className={`${className} ${checked ? "checked" : ""}`} onClick={onCheck}>
            <div>
                {checked && <MdDone color="white" size={16} />}
            </div>
        </Wrap>
    );
};

export default CheckBox;

const Wrap = styled.div`
    cursor: pointer;
    width: fit-content;
    > div {
        border-radius: 4px;
        width: 20px;
        height: 20px;
        transition: 0.3s;
        background-color: #000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    &.checked {
        > div {
            background-color: ${configColor.colorBlue};
        }
    }
`;
