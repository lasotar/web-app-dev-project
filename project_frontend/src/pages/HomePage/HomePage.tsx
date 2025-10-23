import {useEffect, useState} from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Table } from "../../components/Table/Table";
import "./HomePage.css";
import { getTableData, updateTableRow } from "../../services/table.service";

export const HomePage = () => {
    const [userTableData, setUserTableData] = useState<Record<string, any>[]>([]);
    const [showUserTable, setShowUserTable] = useState<boolean>(false);
    const [itemTableData, setItemTableData] = useState<Record<string, any>[]>([]);
    const [showItemTable, setShowItemTable] = useState<boolean>(false);
    const [companyTableData, setCompanyTableData] = useState<Record<string, any>[]>([]);
    const [showCompanyDataTable, setShowCompanyDataTable] = useState<boolean>(false);
    
    const [userEditingRowId, setUserEditingRowId] = useState<number | string | null>(null);
    const [itemEditingRowId, setItemEditingRowId] = useState<number | string | null>(null);
    const [companyEditingRowId, setCompanyEditingRowId] = useState<number | string | null>(null);

    const handleUpdateRow = (tableName: string, updatedRow: Record<string, any>) => {
        updateTableRow(tableName, updatedRow.id, updatedRow).subscribe({
            next: () => {
                switch (tableName) {
                    case "Users":
                        setUserTableData(currentData =>
                            currentData.map(row => (row.id === updatedRow.id ? updatedRow : row))
                        );
                        setUserEditingRowId(null);
                        break;
                    case "Items":
                        setItemTableData(currentData =>
                            currentData.map(row => (row.id === updatedRow.id ? updatedRow : row))
                        );
                        setItemEditingRowId(null);
                        break;
                    case "CompanyData":
                        setCompanyTableData(currentData =>
                            currentData.map(row => (row.id === updatedRow.id ? updatedRow : row))
                        );
                        setCompanyEditingRowId(null);
                        break;
                }
            },
            error: (error) => {
                console.error(`Failed to update row in ${tableName}`, error);
                switch (tableName) {
                    case "Users": setUserEditingRowId(null); break;
                    case "Items": setItemEditingRowId(null); break;
                    case "CompanyData": setCompanyEditingRowId(null); break;
                }
            }
        });
    };

    useEffect(() => {
        getTableData("Users").subscribe({
            next: (data) => {
                setUserTableData(data);
                setShowUserTable(true);
            },
        })

        getTableData("Items").subscribe({
            next: (data) => {
                setItemTableData(data);
                setShowItemTable(true);
            },
        })

        getTableData("CompanyData").subscribe({
            next: (data) => {
                setCompanyTableData(data);
                setShowCompanyDataTable(true);
            },
        })
    }, []);

    return (
        <div className="home-wrapper">
            <Navbar />
            { showUserTable &&
                <Table
                    title="Users"
                    className="table"
                    data={userTableData}
                    rowKey="id"
                    editingRowId={userEditingRowId}
                    onSetEditingRowId={setUserEditingRowId}
                    onUpdateRow={(row) => handleUpdateRow("Users", row)}
                    showActions={true}
                    showFilters={true}
                />
            }
            { showItemTable &&
                <Table
                    title="Items"
                    className="table"
                    data={itemTableData}
                    rowKey="id"
                    editingRowId={itemEditingRowId}
                    onSetEditingRowId={setItemEditingRowId}
                    onUpdateRow={(row) => handleUpdateRow("Items", row)}
                    showActions={true}
                    showFilters={true}
                />
            }
            { showCompanyDataTable &&
                <Table
                    title="Company Data"
                    className="table"
                    data={companyTableData}
                    rowKey="id"
                    editingRowId={companyEditingRowId}
                    onSetEditingRowId={setCompanyEditingRowId}
                    onUpdateRow={(row) => handleUpdateRow("CompanyData", row)}
                    showActions={true}
                    showFilters={true}
                />
            }
        </div>
    );
};
