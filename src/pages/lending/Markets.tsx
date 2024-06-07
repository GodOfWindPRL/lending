import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { MdNavigateNext } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from 'react';
import MarketItem from './MarketItem';
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

const Markets = () => {
  const { t } = useTranslation();
  const [searchVal, setSearchVal] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [hideNoBalance, setHideNoBalance] = useState<boolean>(false)

  const getData = () => {
    fetch("https://labc.ablesdxd.link/justlend/markets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const result = await res.json();
      setData(result.data.jtokenList)
    }).catch(() => {

    })
  }

  useEffect(() => {
    getData()
  }, [])

  console.log(readableNumber("987654321", 3))
  // console.log(readableNumber("1234567", 4))

  return (
    <Wrap className='frame'>
      <div className="market-top">
        <span className="text-22">{t("markets")}</span>
        <div className="hide-bt" onClick={() => { setHideNoBalance(!hideNoBalance) }}>
          <CheckBox checked={hideNoBalance} onCheck={() => { }} />
          <span className="text-0 color-gray">{t("hideNoBalance")}</span>
        </div>
        <div className="mt-search">
          <FaSearch color='white' />
          <div>
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className='text-0 color-white'
              placeholder={t("searchByMarket")}
            />
          </div>
        </div>
        <div className="mt-more">
          <span className="text-02 color-white">{t("more")}</span>
          <MdNavigateNext color='white' size={24} />
        </div>
      </div>
      <div className="market-table">
        <table>
          <thead>
            <tr>
              <th>
                <span className="text-0 color-gray">{t("asset")}</span>
              </th>
              <th>
                <span className="text-0 color-gray">{t("supplyAPY")}</span>
              </th>
              <th>
                <span className="text-0 color-gray">{t("borrowAPY")}</span>
              </th>
              <th>
                <span className="text-0 color-gray">{t("liquidity")}</span>
              </th>
              <th>
                <span className="text-0 color-gray">{t("walletBalance")}</span>
              </th>
              <th>
                <span className="text-0 color-gray">{t("collateral")}</span>
              </th>
              <th>
                <span className="text-0 color-gray"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => <MarketItem data={item} key={index} hideNoBalance={hideNoBalance} />)}
          </tbody>
        </table>
      </div>
    </Wrap>
  );
}

export default Markets;

const Wrap = styled.div`
  .market-top {
    display: flex;
    align-items: center;
    padding: 20px;
    gap: 40px;
    .hide-bt {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
    }
    .mt-search {
      background: #000;
      border-radius: 6px;
      padding: 6px 12px;
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
      max-width: 200px;
      > div {
        flex: 1;
        display: flex;
        input {
          background: transparent;
          width: 100%;
        }
      }
    }
    .mt-more {
      display: flex;
      align-items: center;
      gap: 4px;
      > span {
        margin-bottom: 2px;
      }
    }
  }
  .market-table {
    width: 100%;
    display: flex;
    > table {
      width: 100%;
      min-height: 500px;
      border-collapse: collapse;
      > thead {
        > tr {
          > th {
            background: #0000005b;
            height: 36px;
            text-align: right;
            > span {
              padding: 0 16px;
            }
            &:nth-child(1) {
              text-align: left;
            }
          }
        }
      }
    }
  }
`
