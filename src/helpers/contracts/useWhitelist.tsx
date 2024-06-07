import { ABI_MULTI, CONTRACT_MULTI } from 'environments'
import { useMemo } from 'react'
import { useAccount, useContractRead } from 'wagmi'

const useWhitelist = () => {
    const { address } = useAccount()
    const { data, isError, isSuccess, isLoading } = useContractRead({
        address: CONTRACT_MULTI,
        abi: ABI_MULTI,
        functionName: 'whitelist',
        args: [address],
        watch: true
    })
    const isWhitelist = useMemo(() => {
        if (data) {
            return data
        }
        return false
    }, [data, isSuccess]);

    // console.log(isJoin)

    return { isWhitelist, isLoading, isError, isSuccess }
}

export default useWhitelist