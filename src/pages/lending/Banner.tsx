import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import logo from 'assets/images/logo.png';
import img1 from 'assets/images/img-lb-1.png';
import img2 from 'assets/images/img-lb-2.png';
import img3 from 'assets/images/img-lb-3.png';

const Banner = () => {
    const { t } = useTranslation();

    const data = [{
        img: img1,
        title: "lb1",
        text: "lb1Desc"
    }, {
        img: img2,
        title: "lb2",
        text: "lb2Desc"
    }, {
        img: img3,
        title: "lb3",
        text: "lb3Desc"
    }]

    return (
        <Wrap className='frame'>
            <div className='logo'>
                <img src={logo} alt="" />
            </div>
            <div className="banner-main">
                <div className='bm-item'>
                    <div className="bmi-img">
                        <img src={data[0].img} alt="" />
                    </div>
                    <span className="bmi-title text-1 color-white text-center">{t(data[0].title)}</span>
                    <span className="bmi-desc text-0 color-gray text-center">{t(data[0].text)}</span>
                </div>
                <div className="bm-space"></div>
                <div className='bm-item'>
                    <div className="bmi-img">
                        <img src={data[1].img} alt="" />
                    </div>
                    <span className="bmi-title text-1 color-white text-center">{t(data[1].title)}</span>
                    <span className="bmi-desc text-0 color-gray text-center">{t(data[1].text)}</span>
                </div>
                <div className="bm-space"></div>
                <div className='bm-item'>
                    <div className="bmi-img">
                        <img src={data[2].img} alt="" />
                    </div>
                    <span className="bmi-title text-1 color-white text-center">{t(data[2].title)}</span>
                    <span className="bmi-desc text-0 color-gray text-center">{t(data[2].text)}</span>
                </div>
            </div>
        </Wrap>
    );
}

export default Banner;

const Wrap = styled.div`
    padding: 20px;
    flex: 1;
    align-self: stretch;
    min-height: 100%;
    gap: 20px;
    position: relative;
    overflow: hidden;
    &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 0;
        background-image: linear-gradient(to right, #2f2e2e1f 20%, #100e9052 66%,#21909ab0 90%, #05e0f4b1 100%);

    }
    .logo {
        width: 100px;
        display: flex;
        z-index: 1;
        > img {
            width: 100%;
            height: auto;
        }
    }
    .banner-main {
        width: 100%;
        display: flex;
        z-index: 1;
        .bm-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 30%;
            gap: 10px;
            max-width: 220px;
            &:nth-child(3) {
                max-width: 260px;
            }
            .bmi-img {
                width: 80px;
                height: 80px;
                /* border-radius: 50%;
                display: flex;
                background: #4544448d; */
                > img {
                    width: 100%;
                    height: auto;
                }
            }
        }
        .bm-space {
            flex: 1;
            height: 1px;
            border-top: 1px dashed gray;
            margin-top: 40px;
        }
    }
`
