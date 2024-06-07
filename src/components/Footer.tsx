import styled from 'styled-components';
import { breakpointsMedias } from '../configs/breakpoints';
import logo from 'assets/images/logo-2.png';
import textLogo from 'assets/images/text-logo-2.png';
import { useTranslation } from 'react-i18next';
import { FaTelegramPlane } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";


export const listContact = [{
    icon: <FaTelegramPlane color='#0197EC' size={24} />,
    link: "LINK_TELE",
    bg: "#FFF"
}, {
    icon: <BsTwitterX color="black" size={20} />,
    link: "LINK_TWITTER",
    bg: "#FFF"
}]

const Footer = () => {
    const { t } = useTranslation()

    return (
        <Wrap className='footer' id='contact'>
            <div className="container">
                <div className="footer-left">
                    <div className="fl-logo">
                        <img src={logo} alt="" />
                    </div>
                    <div className="fl-text">
                        <div className="text-3 color-white">
                            <img src={textLogo} alt="" />
                        </div>
                        <span className="text-12 color-white">{t("copyright")}</span>
                    </div>
                </div>
                <div className="footer-right">
                    <span className="text-2">{t("socials")}</span>
                    <div className="fr-list">
                        {listContact.map((item, index) => <a key={index} href={item.link} target='_blank' rel='noreferrer' className='frl-item' style={{ backgroundColor: item.bg }}>
                            {item.icon}
                            <div className="" style={{ backgroundColor: item.bg }}></div>
                        </a>)}
                    </div>
                </div>
            </div>
        </Wrap>
    )
}

export default Footer

const Wrap = styled.div`
    width: 100%;
    background: #2E2E33;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    padding: 10px 0;
    .container {
        display: flex;
        align-items: center;
        height: 100%;
        justify-content: space-between;
        .footer-left {
            display: flex;
            align-items: center;
            gap: 20px;
            .fl-logo {
                display: flex;
                height: fit-content;
                width: 85px;
                > img {
                    width: 100%;
                    height: auto;
                }
            }
            .fl-text {
                display: flex;
                flex-direction: column;
                gap: 4px;
                justify-content: center;
                > div {
                    display: flex;
                    width: 120px;
                    > img {
                        width: 100%;
                        height: auto;
                    }
                }
            }
        }
        .footer-right {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 10px;
            .fr-list {
                display: flex;
                align-items: center;
                gap: 30px;
                .frl-item {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    > div {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        border-radius: 50%;
                        z-index: 0;
                        transition: 0.3s ease-in-out;
                    }
                    > svg {
                        z-index: 1;
                    }
                    &:hover {
                        > div {
                            filter: blur(10px);
                        }
                    }
                }
            }
        }
    }
    ${breakpointsMedias.max1199} {
        padding: 10px 0;
        .container {
            .footer-left {
                gap: 20px;
                .fl-logo {
                    width: 100px;
                }
                .fl-text {
                    > div {
                        width: 100px;
                    }
                }
            }
            .footer-right {
                gap: 12px;
                .fr-list {
                    gap: 30px;
                    .frl-item {
                        width: 40px;
                        height: 40px;
                    }
                }
            }
        }
    }
    ${breakpointsMedias.max767} {
        .container {
            .footer-left {
                gap: 12px;
            }
            .footer-right {
                gap: 12px;
                .fr-list {
                    gap: 30px;
                    .frl-item {
                        width: 40px;
                        height: 40px;
                    }
                }
            }
        }
    }
    ${breakpointsMedias.max550} {
        .container {
            flex-direction: column;
            gap: 20px;
            .footer-left {
                gap: 12px;
                flex-direction: column;
                align-items: center;
                .fl-text {
                    align-items: center;
                    > span {
                        text-align: center;
                    }
                }
                /* .fl-logo {
                    width: 50px;
                } */
            }
            .footer-right {
                gap: 12px;
                align-items: center;
                .fr-list {
                    gap: 30px;
                    .frl-item {
                        width: 40px;
                        height: 40px;
                    }
                }
            }
        }
    }
`;