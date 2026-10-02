
import { Fill } from '@/Api/BaseExternalHelper';
const BASEURL = 'https://apis.datos.gob.ar/georef/api/';

export const getProvincias = async () => {
    let data;
    let tempdata;
    let param = [];
    let UrlGet = 'provincias';
    //const ids = ['02', '06'];
    try {
        tempdata = await Fill(BASEURL, UrlGet, param, 'GET');
        data = tempdata.provincias;
        //data = tempdata.provincias.filter(u => ids.includes(u.id));

        var dataModificada = data?.map(provincia => {
            let textoDescripcion = provincia.nombre;

            if (provincia.nombre === "Ciudad Autónoma de Buenos Aires") {
                textoDescripcion = "Capital Federal - CABA -";
            }

            return {
                ...provincia,
                descriptiontext: textoDescripcion
            };
        });

    }
    catch (ex) {
        console.error('Error', ex);
    }
    return dataModificada;
}


export const getDirecciones = async (provincia, calle) => {
    let data;
    let tempdata;
    let param = [];
    let UrlGet = 'direcciones';
    try {
        param = [{ provincia: provincia, direccion: calle }];

        if (provincia.length === 0 || calle.length === 0) {
            return [];
        }

        tempdata = await Fill(BASEURL, UrlGet, param, 'GET');
        data = tempdata.direcciones;
    }
    catch (ex) {
        console.error('Error', ex);
    }
    return data;
}








