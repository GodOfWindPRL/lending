import { ABI_MULTI, CONTRACT_MULTI } from 'environments'
import { useMemo } from 'react'
import { useAccount, useContractRead } from 'wagmi'

const useFee = () => {
    const { address } = useAccount()
    const { data, isError, isSuccess, isLoading } = useContractRead({
        address: CONTRACT_MULTI,
        abi: ABI_MULTI,
        functionName: 'getFee',
        args: [address],
        watch: true
    })
    const sendFee = useMemo(() => {
        if (data) {
            return Number(data)
        }
        return 0
    }, [data, isSuccess]);

    // console.log(isJoin)

    return { sendFee, isLoading, isError, isSuccess }
}

export default useFee