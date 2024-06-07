import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { readableNumber } from 'helpers/readableNumber';
import MarketListItem from './MarketListItem';
import Arrow from 'components/core/Arrow';

type MarketItem = {
  name: string,
  img: string,
  symbol: string,
  supplyAPY: number,
  borrowAPY: number,
  liquidity: number,
  collateral: number
}

const MarketList = () => {
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

  return (
    <Wrap className='frame'>
      <div className="market-top">
        <span className="text-22">{t("markets")}</span>
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
      </div>
      <div className="market-table">
        <table>
          <thead>
            <tr>
              <th>
                <span className="text-0 color-gray">{t("asset")}</span>
              </th>
              <th>
                <span className="text-0 color-gray">
                  {t("supplyAPY")}
                  <div className="sort-wrap">
                    <Arrow size='small' />
                    <Arrow size='small' isUp={false} />
                  </div>
                </span>
              </th>
              <th>
                <span className="text-0 color-gray">
                  {t("borrowAPY")}
                  <div className="sort-wrap">
                    <Arrow size='small' />
                    <Arrow size='small' isUp={false} />
                  </div>
                </span>
              </th>
              <th>
                <span className="text-0 color-gray">
                  {t("liquidity")}
                  <div className="sort-wrap">
                    <Arrow size='small' />
                    <Arrow size='small' isUp={false} />
                  </div>
                </span>
              </th>
              <th>
                <span className="text-0 color-gray">
                  {t("walletBalance")}
                  <div className="sort-wrap">
                    <Arrow size='small' />
                    <Arrow size='small' isUp={false} />
                  </div>
                </span>
              </th>
              <th>
                <span className="text-0 color-gray">
                  {t("collateral")}
                  <div className="sort-wrap">
                    <Arrow size='small' />
                    <Arrow size='small' isUp={false} />
                  </div>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => <MarketListItem data={item} key={index} hideNoBalance={hideNoBalance} />)}
          </tbody>
        </table>
      </div>
    </Wrap>
  );
}

export default MarketList;

const Wrap = styled.div`
  .market-top {
    display: flex;
    align-items: center;
    padding: 20px;
    gap: 40px;
    .hide-bt {
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
      margin-left: auto;
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
              display: flex;
              align-items: center;
              justify-content: flex-end;
              gap: 8px;
              .sort-wrap {
                display: flex;
                flex-direction: column;
                gap: 3px;
              }
            }
            &:nth-child(1) {
              text-align: left;
              > span {
                justify-content: flex-start;
              }
            }
          }
        }
      }
    }
  }
`
