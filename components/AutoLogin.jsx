'use client'
import { useEffect } from "react"
import { LoginApp } from "@/Api/UserAppHelper";
import { createDate } from "@/Api/BaseHelper";
import useOrderStore from '@/lib/features/order/useOrderStore';

const Autologin = () => {

    const { addOrder, removeOrder, clearOrder, deleteOrder } = useOrderStore();
    
    useEffect(() => {

    CreateToken(true).then(() => {
        console.log('Token creado o actualizado:');
    });
    
    }, []);

    const CreateToken = async (newToken = false) => {
        const DATE_NOW = new Date();
        const EXPIRATION_DATE_KEY = 'ExpirationDate';
        const TOKEN_KEY = 'token';
        var tokendata;
        let isExpired = true;
        const storedExpirationTimestamp = localStorage.getItem(EXPIRATION_DATE_KEY);
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const expirationTime = storedExpirationTimestamp ? parseInt(storedExpirationTimestamp, 10) : null;

        if (expirationTime && storedToken) {
            isExpired = DATE_NOW.getTime() >= expirationTime;
        }

        if (!storedToken || isExpired  || newToken) {

            const logMessage = storedToken ? "Actualizando token por vencimiento." : "Creando token por primera vez (no encontrado).";
            
            if(newToken) {
                localStorage.clear();
            }

            //tokendata = await LoginApp('sirfreedom', 'alex22'); // 1
            tokendata = await LoginApp('sircode', 'alex22');  // 2  yo soy este.  
            //tokendata = await LoginApp('admin', 'alex22'); // 3
            
            clearOrder();
            localStorage.setItem('username', tokendata.userName);
            localStorage.setItem('nombre', tokendata.nombre);
            localStorage.setItem('apellido', tokendata.apellido);
            localStorage.setItem('descriptiontext', tokendata.descriptionText);
            localStorage.setItem('provincia', tokendata.provincia);
            localStorage.setItem('calle', tokendata.calle);
            localStorage.setItem('logoimgtext', tokendata.logoImgText);
            localStorage.setItem('email', tokendata.email);
            localStorage.setItem('contact', tokendata.contact);
            localStorage.setItem('latitud', tokendata.latitud);
            localStorage.setItem('longitud', tokendata.longitud);
            localStorage.setItem('iduserdatastore', tokendata.idUserDataStore); 
            localStorage.setItem('validuser',tokendata.validuser);

            for (var i=0; i < tokendata.orders; i++) {
                addOrder(1);
            } 

            const expirationDate = createDate(
                tokendata.expirationYear,
                tokendata.expirationMonth,
                tokendata.expirationDay,
                tokendata.expirationHour,
                tokendata.expirationMinute
            );
            
            localStorage.setItem(EXPIRATION_DATE_KEY, expirationDate.getTime());
            localStorage.setItem(TOKEN_KEY, tokendata.token);
            console.log(logMessage, " Nuevo token:", tokendata.token, " Expira en:", expirationDate );
            console.log('Datos del usuario:', tokendata);
        }
    };

    return (
        <>

        </>
    );
};

export default Autologin;