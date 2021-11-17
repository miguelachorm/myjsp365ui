export interface Franchise {
    id?: string,
    name: string,
    parent: string,
    parentRef: string,
    royalty: string,
    addSvcRoyalty: string,
    approvingEmail: string,
    createdAt?: Date
}