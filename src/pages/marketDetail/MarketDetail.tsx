import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { MdNavigateNext } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { readableNumber } from 'helpers/readableNumber';
import CheckBox from 'components/core/CheckBox';

type MarketItem = {
    name: string,
    img: string,
    symbol: string,
    supplyAPY: number,
    borrowAPY: number,
    liquidity: number,
    collateral: number
}

const MarketDetail = () => {
    const { t } = useTranslation();
    const [searchVal, setSearchVal] = useState("");
    const [data, setData] = useState<any[]>([]);
    const [hideNoBalance, setHideNoBalance] = useState<boolean>(false)

    const getData = () => {

    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Wrap className=''>
            <div className="container">
                <div className="md-title">Back</div>
                <div className="md-name">
                    <span className="text-22">Market Details</span>
                </div>
            </div>
        </Wrap>
    );
}

export default MarketDetail;

const Wrap = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .home {
        display: flex;
        margin-top: 90px;
        margin-bottom: 100px;
        gap: 20px;
        flex-direction: column;
        .page-frame {
            display: flex;
            width: 100%;
            gap: 20px;
        }
    }
`
