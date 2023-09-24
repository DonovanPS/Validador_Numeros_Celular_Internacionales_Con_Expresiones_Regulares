import React, { useState } from 'react';
import { SpeedDial } from 'primereact/speeddial';
import { MenuItem } from 'primereact/menuitem';
import { useRouter } from 'next/navigation'; // Importa desde next/router en lugar de next/navigation

const Menu = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(router.pathname);

    const items: MenuItem[] = [
        {
            label: 'Validate',
            icon: 'pi pi-check',
            command: () => {
                router.push('/pages/home');
            },
        },
        {
            label: 'Saved Numbers',
            icon: 'pi pi-list',
            command: () => {
                router.push('/pages/phoneNumbers?data=phonenumber');
            },
        },
        {
            label: 'Regex List',
            icon: 'pi pi-file',
            command: () => {
                router.push('/pages/phoneNumbers?data=regexpattern');
            },
        },
    ];

    return (
        <>
            <SpeedDial model={items} radius={120} type="quarter-circle" direction="up-left" style={{ right: 50, bottom: 50 }} buttonClassName="p-button-help" />
        </>
    );
};

export default Menu;
