import { useMemo } from 'react'
import { Address, useAccount, useContractRead, useContractWrite } from 'wagmi'
import { ABI_TOKEN, CONTRACT_MULTI } from 'environments'
import { parseEther } from 'viem';

interface IUseApprove {
    token: Address,
    amount: string
}
const AMOUNT_TOKEN = "1000000000";
const useApproveToken = ({ token, amount }: IUseApprove) => {
    const { address } = useAccount()
    const { data, isSuccess: isSuccessAllowance } = useContractRead({
        address: token,
        abi: ABI_TOKEN,
        functionName: 'allowance',
        args: [address, CONTRACT_MULTI],
        watch: true
    })

    const { write, isLoading, isSuccess } = useContractWrite({
        address: token,
        abi: ABI_TOKEN,
        functionName: 'approve',
        args: [CONTRACT_MULTI, parseEther((Number(amount) * 2).toString())]
    })
    const onApprove = () => {
        try {
            if (!write) {
                return;
            }
            write()
        } catch (error) {
            console.log("error approve", error)
        }
    }

    const allowances = useMemo(() => {
        if (data) {
            return data as bigint
        }
        return 0n
    }, [data, isSuccessAllowance])

    const isApproved = useMemo(() => {
        if (allowances > parseEther((Number(amount) * 2).toString()) || isSuccess) {
            return true
        }
        return false
    }, [isSuccess, allowances])

    return { isApproved, onApprove, isLoadingApprove: isLoading, isSuccess }
}

export default useApproveToken