export interface Billing {
    id?: '',
    addressl1: string,
    city: string,
    state: string,
    zip: string,
    ccName: string,
    ccNumber: string,
    ccExpMonth: string,
    ccExpYear: string,
    ccCsv: string,
    ccAgreement: boolean,
    createdAt?: Date
}