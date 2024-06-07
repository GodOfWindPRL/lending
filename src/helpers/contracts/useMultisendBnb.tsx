import BigNumber from 'bignumber.js'
import { notifyToastify } from 'configs/notifyToastify'
import { ABI_MULTI, CONTRACT_MULTI } from 'environments'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { parseEther } from 'viem'
import { useContractWrite, useWaitForTransaction } from 'wagmi'

interface ISend {
    list: string[],
    amountPerAddress: string,
    totalFee: string
}

const useMultisendBnb = ({ list, amountPerAddress, totalFee }: ISend) => {
    const { t } = useTranslation()
    const { write, isLoading, isSuccess, isError, data, error } = useContractWrite({
        address: CONTRACT_MULTI,
        abi: ABI_MULTI,
        functionName: 'multiSend',
        args: [list, parseEther(amountPerAddress)],
        value: parseEther(totalFee) + parseEther(BigNumber(amountPerAddress).multipliedBy(list.length).toString(10))
    })

    const { status } = useWaitForTransaction({
        confirmations: 1,
        hash: data?.hash
    })

    const onSend = () => {
        try {
            if (!write) {
                return;
            }
            write()
        } catch (error: any) {
            notifyToastify("error", error.message)
        }
    }

    useEffect(() => {
        if (status === "error") {
            notifyToastify("error", "Multisend error")
        }
        if (status === "success") {
            notifyToastify("success", t("Multisend successful"))
        }
    }, [status])

    useEffect(() => {
        if (error) {
            notifyToastify("error", "Multisend error")
        }
    }, [error])

    return { onSend, isLoadingSend: isLoading || (isSuccess && status === "loading"), isSuccess: status === "success", isError }
}

export default useMultisendBnb