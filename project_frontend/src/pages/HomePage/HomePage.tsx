import { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Table } from "../../components/Table/Table";
import "./HomePage.css";

const initialData = [
    {id: 1, name: "abc", surname: "xyz"},
    {id: 2, name: "abc", surname: "xyz"},
    {id: 3, name: "abc", surname: "xyz"},
    {id: 4, name: "abc", surname: "xyz"},
    {id: 5, name: "abc", surname: "xyz"},
    {id: 6, name: "def", surname: "xyz"}
];

const colNames: (keyof typeof initialData[0])[] = ["id", "name", "surname"];

export const HomePage = () => {
    const [tableData, setTableData] = useState(initialData);
    const [editingRowId, setEditingRowId] = useState<number | string | null>(null);

    const handleUpdateRow = (updatedRow: typeof initialData[0]) => {
        setTableData(currentData =>
            currentData.map(row => (row.id === updatedRow.id ? updatedRow : row))
        );
        setEditingRowId(null);
    };

    return (
        <div className="home-wrapper">
            <Navbar />
            <Table
                className="table"
                colNames={colNames}
                data={tableData}
                rowKey="id"
                editingRowId={editingRowId}
                onSetEditingRowId={setEditingRowId}
                onUpdateRow={handleUpdateRow}
                showActions={true}
                showFilters={true}
            />
        </div>
    );
};
