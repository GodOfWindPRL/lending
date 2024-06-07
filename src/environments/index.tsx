import { Address } from 'wagmi'
import ABI_MULTI from 'environments/abi/abi-multi.json'
import ABI_TOKEN from 'environments/abi/abi-token.json'

const CONTRACT_MULTI = process.env.REACT_APP_CONTRACT_MULTI as Address

export {
    CONTRACT_MULTI,
    ABI_MULTI,
    ABI_TOKEN
}

