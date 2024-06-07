import { ABI_MULTI, CONTRACT_MULTI } from 'environments'
import { useMemo } from 'react'
import { Address, useAccount, useContractRead } from 'wagmi'
interface IUseAllowance {
    spender: Address,
    isOldToken?: boolean
}
const useAllowance = ({ spender, isOldToken }: IUseAllowance) => {
    const { address } = useAccount()
    const { data, isSuccess } = useContractRead({
        address: CONTRACT_MULTI,
        abi: ABI_MULTI,
        functionName: 'allowance',
        args: [address, spender],
        watch: true
    })
    const allowances = useMemo(() => {
        if (!isSuccess) {
            return 0
        }
        return Number(data)
    }, [data, isSuccess])
    return { allowances, isAllowanceSuccess: isSuccess }
}

export default useAllowance