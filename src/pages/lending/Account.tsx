import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const Account = () => {
    const { t } = useTranslation();
    const [data, setData] = useState([
        {
            color: "#0F8558",
            name: "DEXs listing",
            value: 1
        },
        {
            color: "transparent",
            name: "Fairlaunch",
            value: 30
        },

        {
            color: "#2158ff8f",
            name: "Game drops",
            value: 69
        },

    ])

    return (
        <Wrap className='frame'>
            <span className="text-22 color-white">{t("accStatus")}</span>
            <div className="acc-main">
                <div className="am-chart">
                    <Doughnut
                        options={{
                            responsive: true,
                            maintainAspectRatio: true,
                            cutout: 63,
                            spacing: 2
                        }}

                        data={{
                            datasets: [{
                                label: "",
                                data: data.map(item => item.value),
                                borderWidth: 0,
                                backgroundColor: data.map(item => item.color),
                            }]
                        }}
                    />
                    <div className="amc-label">
                        <span className="text-2 color-blue">60</span>
                        <span className="text-1 color-blue">Low Risk</span>
                    </div>
                </div>
                <div className="am-value">
                    <div className="amv-item">
                        <span className="text-0 color-gray">{t("netAPY")}</span>
                        <span className="text-2 color-white">{42.56} %</span>
                    </div>
                    <div className="amv-item">
                        <span className="text-0 color-gray">{t("netWorth")}</span>
                        <span className="text-2 color-white">{42.56}</span>
                    </div>
                </div>
            </div>
        </Wrap>
    );
}

export default Account;

const Wrap = styled.div`
    padding: 20px;
    width: 30%;
    align-self: stretch;
    min-height: 100%;
    gap: 20px;
    .acc-main {
        display: flex;
        width: 100%;
        /* align-items: center; */
        padding-left: 10px;
        .am-chart {
            width: 160px;
            height: 160px;
            display: flex;
            transform: rotate(125deg);
            position: relative;
            .amc-label {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -43%) rotate(-125deg);
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }
        .am-value {
            display: flex;
            flex-direction: column;
            gap: 20px;
            flex: 1;
            .amv-item {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                gap: 4px;
            }
        }
    }
`
