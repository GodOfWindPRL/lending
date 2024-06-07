import ModalWrap from "components/core/ModalWrap";
import { breakpointsMedias } from "configs/breakpoints";
import configColor from "configs/configColor";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useLockBodyScroll } from "helpers/hooks/useLockBodyScroll";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Supply from "./Supply";
import Withdraw from "./Withdraw";
import Borrow from "./Borrow";

dayjs.extend(relativeTime);

interface IModalSuccess {
  onClose: () => void;
  data: any;
  typeModal: "borrow" | "supply"
}

type TabState2 = "borrow" | "repay"
type TabState = "supply" | "withdraw"

const ModalBorrowSupply = ({ onClose, data, typeModal }: IModalSuccess) => {
  useLockBodyScroll();
  const { t } = useTranslation();
  const [tab2, setTab2] = useState<TabState2>("borrow");
  const [tab, setTab] = useState<TabState>("supply");

  const dataTab = ["supply", "withdraw"] as TabState[]
  const dataTab2 = ["borrow", "repay"] as TabState2[]

  return (
    <ModalWrap onClose={onClose} showCloseBt={true} clickOutsideToClose={true}>
      <Wrap>
        <div className="modal-title">
          <div className="mt-img">
            <img src={data.jlogoUrl} alt="" />
          </div>
          <span className="text-22 color-white">{data.collateralSymbol}</span>
        </div>
        {typeModal === "supply" ? <>
          <div className={`modal-tab`}>
            {dataTab.map((item, index) => <div key={index} className={`mt-item text-1 color-${tab === item ? "active" : "gray"}`} onClick={(() => { setTab(item) })}>{t(item)}</div>)}
            <div className={`mt-bar ${tab === "supply" ? "mt-bar-1" : "mt-bar-2"}`}></div>
          </div>
          {tab === "supply" ? <Supply data={data} />
            : <Withdraw data={data} />}
        </> : <>
          <div className={`modal-tab modal-tab-2`}>
            {dataTab2.map((item, index) => <div key={index} className={`mt-item text-1 color-${tab2 === item ? "active" : "gray"}`} onClick={(() => { setTab2(item) })}>{t(item)}</div>)}
            <div className={`mt-bar ${tab2 === "borrow" ? "mt-bar-1" : "mt-bar-2"}`}></div>
          </div>
          {tab2 === "borrow" ? <Borrow data={data} />
            : <Borrow data={data} />}
        </>}

      </Wrap>
    </ModalWrap>
  );
};

export default ModalBorrowSupply;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 32px);
  max-width: 468px;
  padding-bottom: 20px;
  .modal-title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    gap: 8px;
    .mt-img {
        display: flex;
        > img {
            width: 30px;
            height: auto;
        }
    }
  }
  .modal-tab {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid gray;
    position: relative;
    .mt-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      cursor: pointer;
    }
    .color-active {
      &:first-child {
        color: ${configColor.colorBlue};
      }
      &:nth-child(2) {
        color: #d062ee;
      }
    }
    .mt-bar {
      position: absolute;
      width: 70px;
      height: 2px;
      bottom: -1px;
      transition: 0.3s;
      transform: translateX(-50%);
    }
    .mt-bar-1 {
      left: 25%;
      background: ${configColor.colorBlue};
    }
    .mt-bar-2 {
      left: 75%;
      background: #d062ee;
    }
  }
  .modal-tab-2 {
    .color-active {
      &:first-child {
        color: #21e1b1;
      }
      &:nth-child(2) {
        color: #ed9531;
      }
    }
    .mt-bar-1 {
      background: #21e1b1;
    }
    .mt-bar-2 {
      background: #ed9531;
    }
  }
  .modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 20px;
    gap: 20px;
    .mb-input {
      margin-top: -10px;
      margin-bottom: 10px;
      > div {
        flex: 1;
        display: flex;
        > input {
          width: 100%;
        }
      }
    }
    .risk {
      width: 100%;
      height: 5px;
      border-radius: 3px;
      background: #7e7b7b3b;
      position: relative;
      margin-bottom: 10px;
      .risk-mark {
        position: absolute;
        left: 80%;
        top: 0;
        width: 5px;
        height: 5px;
        background: red;
      }
      .risk-range {
        height: 5px;
        border-radius: 3px;
        background: #ff000071;
        transition: 0.5s;
      }
    }
    .row-bt {
      width: 100%;
      margin-top: 40px;
    }
  }
  .modal-bt {
    width: 100%;
  }
  ${breakpointsMedias.max1199} {
    padding: 31px 15px;
    max-width: 343px;
    .modal-title {
      margin-bottom: 24px;
    }
    .modal-body {
     
    }
  }
`;
