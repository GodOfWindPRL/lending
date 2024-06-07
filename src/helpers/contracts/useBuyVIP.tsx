import { notifyToastify } from 'configs/notifyToastify'
import { ABI_MULTI, CONTRACT_MULTI } from 'environments'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { parseEther } from 'viem'
import { useContractWrite, useWaitForTransaction } from 'wagmi'

export const priceVIP = "2"

const useBuyVIP = () => {
    const { t } = useTranslation()
    const { write, isLoading, isSuccess, isError, data, error } = useContractWrite({
        address: CONTRACT_MULTI,
        abi: ABI_MULTI,
        functionName: 'register',
        args: [],
        value: parseEther(priceVIP)
    })

    const { status } = useWaitForTransaction({
        confirmations: 1,
        hash: data?.hash
    })

    const onBuyVIP = () => {
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
            notifyToastify("error", t("buyVIPError"))
        }
        if (status === "success") {
            notifyToastify("success", t("buyVIPSuccess"))
        }
    }, [status])

    useEffect(() => {
        if (error) {
            notifyToastify("error", t("buyVIPError"))
        }
    }, [error])

    return { onBuyVIP, isLoadingBuyVIP: isLoading || (isSuccess && status === "loading"), isSuccess: status === "success", isError }
}

export default useBuyVIP