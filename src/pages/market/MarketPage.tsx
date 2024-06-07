import styled from 'styled-components';
import Footer from 'components/Footer';
import { useTranslation } from 'react-i18next';
import configColor from 'configs/configColor';
import Markets from 'pages/lending/Markets';
import numeral from 'numeral';
import { useState } from 'react';
import MarketList from './MarketList';

const MarketPage = () => {
  const { t } = useTranslation();
  const [data, setData] = useState({
    totalSupply: 67654563664,
    supplyVolume: 324325,
    suppliers: 256435,
    dailyReward: 345446
  })

  return (
    <Wrap>
      <div className="container home">
        <div className="page-title">
          <span className="text-22 color-white">{t("markets")}</span>
        </div>
        <div className="page-frame">
          <div className="frame market-supply">
            <div className="row-space">
              <span className="text-1 color-white">{t("totalSupply")}</span>
              <span className="text-22 color-blue">${numeral(data.totalSupply).format("0a,0")}</span>
            </div>
            <div className="row-space">
              <div className="flex-col">
                <span className="text-0 color-gray">{t("24hSupplyVolume")}</span>
                <span className="text-1 color-white">${numeral(data.supplyVolume).format("0a,0")}</span>
              </div>
              <div className="flex-col align-right">
                <span className="text-0 color-gray">{t("suppliers")}</span>
                <span className="text-1 color-white">${numeral(data.suppliers).format("0a,0")}</span>
              </div>
            </div>
          </div>
          <div className="frame market-borrow">
            <div className="row-space">
              <span className="text-1 color-white">{t("totalBorrow")}</span>
              <span className="text-22 color-blue">${numeral(data.totalSupply).format("0a,0")}</span>
            </div>
            <div className="row-space">
              <div className="flex-col">
                <span className="text-0 color-gray">{t("24hBorrowVolume")}</span>
                <span className="text-1 color-white">${numeral(data.supplyVolume).format("0a,0")}</span>
              </div>
              <div className="flex-col align-right">
                <span className="text-0 color-gray">{t("borrowers")}</span>
                <span className="text-1 color-white">${numeral(data.suppliers).format("0a,0")}</span>
              </div>
            </div>
          </div>
          <div className="frame market-mining">
            <span className="text-1 color-white">{t("dailyMiningReward")}</span>
            <span className="text-22 color-yellow">${numeral(data.dailyReward).format("0a,0")}</span>
          </div>
        </div>
        <MarketList />
      </div>
      <Footer />
    </Wrap>
  );
}

export default MarketPage;

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
    .page-title {
      display: flex;
      flex-direction: column;
      gap: 4px;
      position: relative;
    }
    .page-frame {
      display: flex;
      width: 100%;
      gap: 20px;
      .frame {
        padding: 0;
        flex: 1;
        .row-space {
          padding: 10px 20px;
          &:first-child {
            border-bottom: 1px solid #6e646468;
          }
        }
        &:last-child {
          width: 20%;
          flex: none;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
      }
    }
  }
`
