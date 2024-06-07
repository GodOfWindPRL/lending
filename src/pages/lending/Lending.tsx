import styled from 'styled-components';
import Footer from 'components/Footer';
import { useTranslation } from 'react-i18next';
import configColor from 'configs/configColor';
import Account from './Account';
import Banner from './Banner';
import Markets from './Markets';

const Lending = () => {
  const { t } = useTranslation()

  return (
    <Wrap>
      <div className="container home">
        <div className="page-title">
          <span className="text-22 color-white">{t("supplyBorrow")}</span>
          <span className="text-1 color-gray">{t("supplyBorrowDesc")}</span>
        </div>
        <div className="page-frame">
          <Account />
          <Banner />
        </div>
        <Markets />
      </div>
      <Footer />
    </Wrap>
  );
}

export default Lending;

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
      padding-left: 20px;
      position: relative;
      &::before {
        position: absolute;
        content: "";
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 6px;
        height: 80%;
        background: ${configColor.colorBlue};
      }
    }
    .page-frame {
      display: flex;
      width: 100%;
      gap: 20px;
    }
  }
`
