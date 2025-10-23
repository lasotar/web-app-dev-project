import { createRequest } from "./api.service";

export const getTableData = (tableName: string) => {
    return createRequest<Record<string, any>[]>('GET', `Table/${tableName}`)
};

export const updateTableRow = (tableName: string, id: string | number, rowData: Record<string, any>) => {
    return createRequest<boolean>('PUT', `Table/${tableName}/${id}`, rowData);
};
