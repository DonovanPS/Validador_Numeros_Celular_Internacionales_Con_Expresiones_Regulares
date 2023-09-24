import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { getAll } from '@/app/services/getAllService';

export default function Table({ table }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getAll(table);
                setData(response.response);
                console.log(response.response);
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
        <div className="card">
            {data.length > 0 && (
                <DataTable value={data} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                    {columns}
                </DataTable>
            )}
        </div>
    );
}
