"use client"

import Menu from "@/app/components/speedDial"
import Table from "@/app/components/table"
import { useSearchParams } from "next/navigation";
import './page.css'


function formatTableName(tabla: string): string {
    switch (tabla) {
        case 'phonenumber':
            return 'Phone number';
        case 'regexpattern':
            return 'Regex pattern';
        default:
            return tabla; 
    }
}

const ViwPhoneNumbers = () => {
    const searchParams = useSearchParams()
    const tabla = searchParams.get('data') as string;

   
    const formattedTableName = formatTableName(tabla);

    return (
        <div className="container2">
            <div className="card2">
                <h1>{formattedTableName}</h1>

                <div className="table-container">
                    <Table table={tabla} />
                </div>
            </div>
            <Menu/>
        </div >
    )
}

export default ViwPhoneNumbers
