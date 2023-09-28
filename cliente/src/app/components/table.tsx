import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getAll } from '@/app/services/getAllService';

import './speedDialStyles.css'; 

export default function Table({ table }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                console.log("Se realiza la peticion al back end para obtener los datos de la tabla: " + table)
                
                const response = await getAll(table);
                setData(response.response);
          
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [table]);

    // Genera dinámicamente las columnas
    const columns = Object.keys(data[0] || {}).map((key) => (
        <Column key={key} field={key} header={key} style={{ width: '25%' }} />
    ));

    return (
        <div className="p-card p-table-card"> 
            {data.length > 0 && (
                <DataTable
                    value={data}
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    className="p-datatable-custom"
                >
                    {columns}
                </DataTable>
            )}
        </div>
    );
}
