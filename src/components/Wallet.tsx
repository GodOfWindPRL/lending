import { useWeb3Modal } from '@web3modal/wagmi/react'
import iconNetwork from 'assets/images/icon-network.svg'
import Button from 'components/core/Button'
import { useTranslation } from 'react-i18next'
import { AiOutlinePoweroff } from 'react-icons/ai'
import styled from 'styled-components'
import { useAccount, useBalance, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi'
import numeral from 'numeral'
import useBalanceToken from 'helpers/contracts/useBalanceToken'
import { formatNumber } from 'helpers/format/formatNumber'
import { subStringAddress } from 'configs/subStringAddress'
import configColor from 'configs/configColor'
import { breakpointsMedias } from 'configs/breakpoints'
import { chains } from 'configs/chains'

const DEFAULT_CHAIN = chains[0].id;

const Wallet = () => {
    const { disconnect } = useDisconnect()
    //switch network
    const { chain } = useNetwork();
    const { chains } = useSwitchNetwork()
    const { t } = useTranslation()
    const isTrueNetwork = (chain?.id === DEFAULT_CHAIN)
    const { open } = useWeb3Modal()
    const { isConnected, address } = useAccount()
    const balance = useBalance({ address: address });

    return (
        <Wrap>
            <div>
                {
                    (isConnected) ?
                        !isTrueNetwork ?
                            <div className='bt-wrong' onClick={() => disconnect()}>
                                <p className='color-red'>{t("wrongNetwork")}<br />{`(${chains.length && chains[0].name})`}</p>
                                <div className='bt-wrong-icon'>
                                    <AiOutlinePoweroff size={"1.5rem"} className="text-primary" color='red' />
                                </div>
                                {/* <div className='bt-wrong-bt'>
                                    <span className='color-red'>Disconnect</span>
                                </div> */}
                            </div>
                            :
                            <div className="bt-connected" >
                                <div className='btc-network' >
                                    <p className='text-1'>{subStringAddress(address)}</p>
                                    <div onClick={() => open()}  >
                                        <img alt="network" className='' src={iconNetwork} />
                                    </div>
                                </div>
                                <div className='text-1 color-yellow'>
                                    {numeral(formatNumber(balance.toString(), 1e18)).format("0,0.[00]")} BNB
                                </div>
                                {/*  */}
                            </div>
                        :
                        <Button className='' typeBt='cyan' text={"Connect wallet"} onClick={() => open()} />
                }
            </div>

        </Wrap>
    )
}

export default Wallet

const Wrap = styled.div`
    width: fit-content;
    display: flex;
    align-items: center;
    > div {
        display: flex;
        align-items: center;
    }
    .bt-wrong {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-end;
        cursor: pointer;
        > p {
            margin-right: 8px;
        }
        /* .bt-wrong-icon {
            display: none;
            ${breakpointsMedias.max767} {
                display: flex;
            }
        } */
        /* .bt-wrong-bt {
            display: block;
            ${breakpointsMedias.max767} {
                display: none;
            }
        } */
    }
    .bt-connected {
        display: flex;
        cursor: pointer;
        flex-direction: column;
        gap: 4px;
        align-items: flex-end;
        .btc-network {
            display: flex;
            align-items: center;
            gap: 6px;
            > div {
                > img {
                    width: 20px;
                    height: auto;
                }
            }
        }
    }

    //setting
    position: relative;
`