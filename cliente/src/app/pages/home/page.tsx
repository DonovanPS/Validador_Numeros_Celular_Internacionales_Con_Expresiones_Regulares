"use client"

import './page.css';

import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { validatePhoneNumber } from '@/app/services/numberService';
import ShowToast from '@/app/components/toast';

const PhoneNumberValidation: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('');


    const [showToast, setShowToast] = useState(false);

    const [toastSeverity, setToastSeverity] = useState('');
    const [toastSummary, setToastSummary] = useState('');
    const [toastDetail, setToastDetail] = useState('');

    const validatePhoneNumberHandler = async () => {
        try {
            const phoneNumberWithPlus = "+" + phoneNumber;
            const response = await validatePhoneNumber(phoneNumberWithPlus);

            // Muestra el Toast utilizando la referencia
            if (response.response.isValid) {
                setToastSeverity('success');
                setToastSummary('Éxito');
                setToastDetail('Número de teléfono válido para el país de ' + response.response.countryName);
            } else {
                setToastSeverity('warn');
                setToastSummary('Advertencia');
                setToastDetail('Número de teléfono no válido para el país de ' + response.response.countryName);
            }
        } catch (error) {
            setToastSeverity('error');
            setToastSummary('Error');
            setToastDetail('Número de teléfono no válido');
        }

        // Alternar el valor de showToast entre true y false
        setShowToast((prevShowToast) => !prevShowToast);

    };

    return (
        <div className="container">
            <div className="card">
                <h1>Validación de Número de Teléfono</h1>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-plus"></i>
                    </span>
                    <InputNumber
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.value)}
                        useGrouping={false}
                        placeholder="Escribe el número de teléfono"
                    />



                    <Button label="Validar" onClick={validatePhoneNumberHandler} />
                </div>
            </div>

            {/* Utiliza el componente ShowToast para mostrar el Toast */}
            <ShowToast severity={toastSeverity} summary={toastSummary} detail={toastDetail} show={showToast} />
        </div>
    );
};

export default PhoneNumberValidation;