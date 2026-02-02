import { useState, useCallback } from 'react';
import {
    CheckTransactionStatusRequest,
    CheckTransactionStatusResponse,
} from '../types/checkTransaction.types';
import { checkTransactionStatus } from '../api/payments.api';

type UseCheckTransactionStatusReturn = {
    checkStatus: (
        payload: CheckTransactionStatusRequest
    ) => Promise<CheckTransactionStatusResponse | null>;
    loading: boolean;
    error: string | null;
};

export const useCheckTransactionStatus =
    (): UseCheckTransactionStatusReturn => {
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);

        const checkStatus = useCallback(
            async (
                payload: CheckTransactionStatusRequest
            ): Promise<CheckTransactionStatusResponse | null> => {
                try {
                    setLoading(true);
                    setError(null);

                    const response = await checkTransactionStatus(payload);

                    if (!response?.status) {
                        const msg =
                            response?.result?.body?.resultInfo?.resultMsg ||
                            'Transaction status check failed';

                        setError(msg);
                        return null;
                    }

                    return response;
                } catch (err: any) {
                    const message =
                        err?.response?.data?.message ||
                        err?.message ||
                        'Network error';

                    setError(message);
                    return null;
                } finally {
                    setLoading(false);
                }
            },
            []
        );

        return {
            checkStatus,
            loading,
            error,
        };
    };
