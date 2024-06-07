import numeral from "numeral";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import iconFire from "assets/images/fire.svg";
import { useAccount } from "wagmi";
import useBalanceToken from "helpers/contracts/useBalanceToken";
import { useState } from "react";
import ModalBorrowSupply from "./action/ModalBorrowSupply";

interface IPositionTableItem {
    data: any;
    hideNoBalance: boolean
}

const MarketItem = ({
    data,
    hideNoBalance
}: IPositionTableItem) => {
    const { balanceString } = useBalanceToken({ token: data.collateralAddress })
    const [show, setShow] = useState<"supply" | "borrow" | null>(null);

    return (
        <>
            <Wrap
                className={`${(hideNoBalance && Number(balanceString) === 0) ? "hide" : ""}`}
            >
                <td className="td-icon">
                    <div>
                        <div className="mi-img">
                            <img src={data.jlogoUrl} alt="" />
                        </div>
                        <div className="mi-title">
                            <span className="text-1 color-white">{data.collateralSymbol}</span>
                            <span className="text-0 color-gray">{data.collateralName}</span>
                        </div>
                    </div>
                </td>
                <td className="td-right">
                    <div>
                        <span className={`text-1 color-white`}>{(data.depositedAPY * 100).toFixed(2)}%</span>
                        {data.depositedAPY * 100 >= 5 && <img src={iconFire} alt="" />}
                    </div>
                </td>
                <td className="td-right">
                    <div>
                        <span className={`text-1 color-white`}>{(data.borrowedAPY * 100).toFixed(2)}%</span>
                    </div>
                </td>
                <td className="td-right">
                    <div>
                        <span className={`text-1 color-white`}>{numeral(data.totalCash / Math.pow(10, data.collateralDecimal)).format("0a,0.[00]")} {data.collateralSymbol}</span>
                    </div>
                </td>
                <td className="td-right">
                    <div>
                        <span className={`text-1 color-white`}>{numeral(balanceString).format("0a,0.[00]")} {data.collateralSymbol}</span>
                    </div>
                </td>
                <td className="td-right">
                    <div>
                        <span className={`text-1 color-white`}>{numeral(data.totalSupply / Math.pow(10, data.collateralDecimal)).format("0a,0.[00]")} {data.collateralSymbol}</span>
                    </div>
                </td>
                <td className="td-right td-action">
                    <div>
                        <span className={`text-1 color-white bt-supply`} onClick={() => { setShow("supply") }}>Supply</span>
                        <span className={`text-1 color-white bt-borrow`} onClick={() => { setShow("borrow") }}>Borrow</span>
                    </div>
                </td>
            </Wrap>
            {show === "supply" && <ModalBorrowSupply typeModal="supply" data={data} onClose={() => { setShow(null) }} />}
            {show === "borrow" && <ModalBorrowSupply typeModal="borrow" data={data} onClose={() => { setShow(null) }} />}
        </>
    );
};

export default MarketItem;

const Wrap = styled.tr`
    cursor: pointer;
    height: 40px;
    &.hide {
        display: none;
    }
    > td {
        > div {
            padding: 16px;
        }
    }
    .td-icon {
        > div {
            display: flex;
            align-items: center;
            gap: 10px;
            .mi-img {
                width: 40px;
                display: flex;
                > img {
                    width: 100%;
                    height: auto;
                }
            }
            .mi-title {
                display: flex;
                flex-direction: column;
            }
        }
    }
    .td-right {
        > div {
            display: flex;
            justify-content: flex-end;
            text-align: right;
        }
    }
    .td-action {
        > div {
            gap: 10px;
            align-items: center;
           
            > span {
                padding: 4px 8px;
                border-radius: 4px;
            }
        }
    }
    .bt-supply {
        border: 1px solid #8d73cf;
        color: #8d73cf;
    }
    .bt-borrow {
        border: 1px solid #13c013;
        color: #13c013;
    }
`;
