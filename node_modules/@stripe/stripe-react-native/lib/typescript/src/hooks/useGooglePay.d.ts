import type { GooglePay } from '../types';
/**
 * useGooglePay hook
 */
export declare function useGooglePay(): {
    loading: boolean;
    isGooglePaySupported: (params?: GooglePay.IsSupportedParams | undefined) => Promise<boolean>;
    initGooglePay: (params: GooglePay.InitParams) => Promise<import("../types").GooglePayInitResult>;
    presentGooglePay: (params: GooglePay.PresentParams) => Promise<import("../types").PayWithGooglePayResult>;
    createGooglePayPaymentMethod: (params: GooglePay.CreatePaymentMethodParams) => Promise<import("../types").CreateGooglePayPaymentMethodResult>;
};
