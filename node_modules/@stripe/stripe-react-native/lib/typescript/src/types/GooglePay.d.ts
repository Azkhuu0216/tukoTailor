export declare type PresentParams = PresentType & {
    clientSecret: string;
};
export declare type PresentType = {
    forSetupIntent?: true;
    currencyCode: string;
} | {
    forSetupIntent?: false;
};
export declare type InitParams = {
    merchantName: string;
    countryCode: string;
    /**
     * Billing address collection configuration.
     */
    billingAddressConfig?: BillingAddressConfig;
    /**
     * Flag to indicate whether Google Pay collect the customer's email address.
     *
     * Default to `false`.
     */
    isEmailRequired?: boolean;
} & IsSupportedParams;
export declare type IsSupportedParams = {
    testEnv?: boolean;
    /**
     * If `true`, Google Pay is considered ready if the customer's Google Pay wallet
     * has an existing payment method.
     */
    existingPaymentMethodRequired?: boolean;
};
export interface BillingAddressConfig {
    isRequired?: boolean;
    /**
     * Billing address format required to complete the transaction.
     */
    format?: 'FULL' | 'MIN';
    /**
     * Set to true if a phone number is required to process the transaction.
     */
    isPhoneNumberRequired?: boolean;
}
export interface CreatePaymentMethodParams {
    currencyCode: string;
    amount: number;
}
