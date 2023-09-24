"use client"

import './page.css';

import React, { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';

import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Button } from 'primereact/button';
import { validatePhoneNumber } from '@/app/services/numberService';
import ShowToast from '@/app/components/toast';

import Menu from '@/app/components/speedDial';

const PhoneNumberValidation= () => {
    const [phoneNumber, setPhoneNumber] = useState('');


    const [showToast, setShowToast] = useState(false);

    const [toastSeverity, setToastSeverity] = useState('');
    const [toastSummary, setToastSummary] = useState('');
    const [toastDetail, setToastDetail] = useState('');

    const validButton = useRef(null);
    const [visible, setVisible] = useState<boolean>(false);

    const validatePhoneNumberHandler = async () => {
        try {
            const phoneNumberWithPlus = "+" + phoneNumber;
            const response = await validatePhoneNumber(phoneNumberWithPlus);

            
            if (response.response.isValid) {
                setToastSeverity('success');
                setToastSummary('Éxito');
                setToastDetail('Número de teléfono válido para el país de ' + response.response.countryName);

                setVisible(true);

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


    const accept = () => {
        console.log("aceptado");

    };

    const reject = () => {
        console.log("rechazado");

    };



    return (
        <div className="container">
            <div className="card">
                <h1>Validación de Número de Teléfono</h1>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-plus"></i>
                    </span>
                    <InputText
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Escribe el número de teléfono"
                    />

                    <ConfirmPopup target={validButton.current} visible={visible} onHide={() => setVisible(false)}
                        message="Guardar numero" icon="pi pi-question" accept={accept} reject={reject} />

                    <Button ref={validButton} onClick={() => {
                        validatePhoneNumberHandler();
                    }} label="Validar" />

                </div>
            </div>

            <ShowToast severity={toastSeverity} summary={toastSummary} detail={toastDetail} show={showToast} />
            <Menu />
        </div>
    );
};

export default PhoneNumberValidation;