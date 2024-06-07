import styled from "styled-components";
import { useEffect, useState } from "react";
import iconClose from "assets/images/icon-close.png";
import iconClose2 from "assets/images/icon-close-hover.png";
import { breakpointsMedias } from "configs/breakpoints";

interface IModalWrap {
  onClose: () => void;
  children: React.ReactElement;
  showCloseBt?: boolean;
  clickOutsideToClose?: boolean;
  maxZ?: boolean;
  onTop?: boolean;
  isDisabledClose?: boolean;
}

const ModalWrap = ({
  onClose,
  children,
  showCloseBt = true,
  clickOutsideToClose = true,
  maxZ,
  onTop,
  isDisabledClose,
}: IModalWrap) => {
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    setVisible(true);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  return (
    <Wrap
      onClick={(e) => {
        e.stopPropagation();
        clickOutsideToClose && onClose();
      }}
      className={`${maxZ ? "max-z" : ""} ${
        isDisabledClose ? "close-hidden" : "close-open"
      }`}
    >
      <div
        className={`modal-wrap ${onTop ? "modal-wrap-2" : ""} ${
          visible && "no-fade"
        }`}
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        <div className="modal-wrap-content">
          {showCloseBt && (
            <div className="modal-close" onClick={onClose}>
              {/* <MdClose size={30} color='#AF47D3' /> */}
              <img src={iconClose} alt="" />
            </div>
          )}
          <div className="modal-container">{children}</div>
        </div>
      </div>
    </Wrap>
  );
};

export default ModalWrap;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: flex-start;
  align-items: center;
  background-color: #000000e5;
  z-index: 666;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 50px 0;
  /* -webkit-transform: translate3d(0, 0, 1px);
  transform: translate3d(0, 0, 1px); */
  &.max-z {
    z-index: 667;
  }
  .modal-wrap {
    margin: auto;
    border-radius: 8px;
    transition: 0.8s;
    opacity: 0;
    transform: translateY(50px);
    &.no-fade {
      opacity: 1;
      transform: translateY(0);
    }
    .modal-wrap-content {
      background-color: #37373a;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      position: relative;
      .modal-close {
        position: absolute;
        top: 16px;
        right: 16px;
        cursor: pointer;
        > img {
          width: 24px;
          height: auto;
        }
        &:hover {
          > img {
            content: url(${iconClose2});
          }
        }
      }
      .modal-container {
      }
    }
  }
  span {
    white-space: normal;
  }
  .modal-wrap-2 {
    margin: 0 auto 10% auto;
  }
  &.close-hidden {
    .modal-wrap-content {
      .modal-close {
        cursor: not-allowed;
      }
    }
  }
  ${breakpointsMedias.max1199} {
  }
  ${breakpointsMedias.max767} {
    padding: 100px 0;
    .modal-wrap {
      border-radius: 8px;
      .modal-wrap-content {
        border-radius: 8px;
        .modal-close {
          top: 10px;
          right: 10px;
        }
      }
    }
  }
`;
