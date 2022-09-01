import type { PaymentIntent } from '../types';
/**
 * useConfirmPayment hook
 */
export declare function useConfirmPayment(): {
    confirmPayment: (paymentIntentClientSecret: string, data?: import("../types/PaymentMethod").CreateParams | undefined, options?: PaymentIntent.ConfirmOptions) => Promise<import("../types").ConfirmPaymentResult>;
    loading: boolean;
};
