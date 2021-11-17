export interface Account {
    id?: string,
    name: string,
    address: string,
    geoLat: string,
    geoLon: string,
    amount: string,
    cleaningArea: string,
    alarmKey: string,
    status: string,
    assignedTo: string,
    franchiseId: string,
    schedule: { mon: boolean, tue: boolean,wed: boolean,thu: boolean,fri: boolean,sat: boolean,sun: boolean, wke: boolean },
    contact: { name: string, phone: string, cell: string, email: string },
    createdAt?: Date
}