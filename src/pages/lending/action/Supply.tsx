import Button from "components/core/Button";
import { breakpointsMedias } from "configs/breakpoints";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useBalanceToken from "helpers/contracts/useBalanceToken";
import { useLockBodyScroll } from "helpers/hooks/useLockBodyScroll";
import numeral from "numeral";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";
import styled from "styled-components";

dayjs.extend(relativeTime);

interface IModalSuccess {
    data: any;
}


const Supply = ({ data }: IModalSuccess) => {
    useLockBodyScroll();
    const { t } = useTranslation();
    const { balanceString } = useBalanceToken({ token: data.collateralAddress });
    const [amount, setAmount] = useState("");
    const [riskVal, setRiskVal] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            setRiskVal(Math.ceil(Math.random() * 100))
        }, 500)

    }, [])

    return (
        <Wrap className="modal-body">
            <div className="row">
                <span className="text-0 color-gray">{t("walletBalance")}</span>
                <span className="text-0 color-white">{numeral(balanceString).format("0a,0.[00]")} {data.collateralSymbol}</span>
            </div>
            <div className="row frame-input mb-input">
                <div className="">
                    <NumericFormat
                        inputMode="decimal"
                        allowedDecimalSeparators={[",", "."]}
                        value={amount}
                        onValueChange={(values: any) => {
                            setAmount(values.value);
                        }}
                        thousandSeparator={true}
                        placeholder={t("enterSupplyAmount")}
                        className="size-1 color-white"
                        allowNegative={false}
                        decimalScale={4}
                    />
                </div>
                <span className="text-0 color-white">{t("max")}</span>
            </div>
            <div className="row">
                <span className="text-0 color-gray">{t("borrowLimit")}</span>
                <span className="text-0 color-gray">${numeral(balanceString).format("0a,0.[00]")}</span>
            </div>
            <div className="row">
                <span className="text-0 color-gray">{t("riskValue")}</span>
                <span className="text-0 color-gray">{numeral(balanceString).format("0a,0.[00]")}</span>
            </div>
            <div className="risk">
                <div className="risk-range" style={{ width: `${riskVal}%` }}></div>
                <div className="risk-mark"></div>
            </div>
            <div className="row">
                <span className="text-0 color-gray">{t("supplyAPY")}</span>
                <span className="text-0 color-white">{(data.depositedAPY * 100).toFixed(2)}%</span>
            </div>
            <div className="row">
                <span className="text-0 color-gray">{data.collateralSymbol} {t("supplyBalance")}</span>
                <span className="text-0 color-white">{numeral(balanceString).format("0a,0.[00]")}</span>
            </div>
            <div className="row-bt">
                <Button text="supply" typeBt="gray"/>
            </div>
        </Wrap>
    );
};

export default Supply;

const Wrap = styled.div`

  ${breakpointsMedias.max1199} {

  }
`;
