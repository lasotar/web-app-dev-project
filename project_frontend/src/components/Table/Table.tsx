import { useState, useEffect, useMemo } from "react";
import "./Table.css";

type DataObject = {
    [key: string]: any;
}

type TableProps<T extends DataObject> = {
    colNames: (keyof T)[];
    data: T[];
    rowKey: keyof T;
    className?: string;
    editingRowId: number | string | null;
    onSetEditingRowId: (id: number | string | null) => void;
    onUpdateRow: (updatedRow: T) => void;
    showActions?: boolean;
    showFilters?: boolean;
};


export const Table = <T extends DataObject>({
    colNames,
    data,
    rowKey,
    className,
    editingRowId,
    onSetEditingRowId,
    onUpdateRow,
    showActions = false,
    showFilters = true
}: TableProps<T>) => {
    const [editedRow, setEditedRow] = useState<T | null>(null);
    const [filterQuery, setFilterQuery] = useState<string>("");
    const [filterColumn, setFilterColumn] = useState<keyof T>(colNames[0]);

    const filteredData = useMemo(() => {
        if (!filterQuery) {
            return data;
        }
        return data.filter(row =>
            String(row[filterColumn]).toLowerCase().includes(filterQuery.toLowerCase())
        );
    }, [data, filterQuery, filterColumn])

    useEffect(() => {
        if (editingRowId !== null) {
            const rowToEdit = data.find(row => row[rowKey] === editingRowId);
            setEditedRow(rowToEdit || null);
        } else {
            setEditedRow(null);
        }
    }, [editingRowId, data, rowKey]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof T) => {
        if (editedRow) {
            setEditedRow({ ...editedRow, [field]: e.target.value });
        }
    };

    const handleSave = () => {
        if (editedRow) {
            onUpdateRow(editedRow);
        }
    };

    return (
        <>
            {showFilters && (
                <div className="filter-wrapper">
                    <select
                        value={String(filterColumn)}
                        onChange={(e) => setFilterColumn(e.target.value as keyof T)}
                        className="filter-select"
                    >
                        {colNames.map(name => 
                                      <option key={String(name)}>{String(name)}</option>
                         )}
                    </select>
                    <input
                        type="text"
                        onChange={(e) => setFilterQuery(e.target.value)}
                        value={filterQuery}
                        className="filter-input"
                    />
                </div>
            )}
            <div className="table-wrapper">
                <table className={`table ${className ?? ""}`}>
                    <thead className="table-header">
                        <tr className="table-row">
                            {colNames.map((colName) => (
                                <th key={String(colName)} className="table-head">{String(colName)}</th>
                            ))}
                            {showActions && <th className="table-head">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {filteredData.length === 0 ? (
                            <tr className="table-row">
                                <td colSpan={colNames.length + 1} className="table-cell">No data</td>
                            </tr>
                        ) : (
                            filteredData.map((item, index) => {
                                const isEditing = item[rowKey] === editingRowId;
                                return (
                                    <tr key={String(item[rowKey]) || index} className="table-row">
                                        {colNames.map((colName) => (
                                            <td key={String(colName)} className="table-cell">
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={editedRow ? String(editedRow[colName]) : ''}
                                                        onChange={e => handleInputChange(e, colName)}
                                                    />
                                                ) : (
                                                    String(item[colName])
                                                )}
                                            </td>
                                        ))}
                                        {showActions &&
                                            <td className="table-cell">
                                        {isEditing ? (
                                            <>
                                                <button onClick={handleSave}>Save</button>
                                                <button onClick={() => onSetEditingRowId(null)}>Cancel</button>
                                            </>
                                        ) : (
                                            <button onClick={() => onSetEditingRowId(item[rowKey])}>Edit</button>
                                        )}
                                        </td>
                                        }
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};
