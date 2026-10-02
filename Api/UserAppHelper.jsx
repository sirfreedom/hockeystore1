import { Fill } from '@/Api/BaseHelper';
import { MASTERTOKEN } from '@/Api/BaseHelper';
import { IDAPP } from '@/Api/BaseHelper';

export const Insert = async (nombre,apellido,pass,username,descriptiontext,provincia,calle,logoimgtext,email,contact,lat,long) => {
    let data;
    let url = 'Account/Insert';
    const method = 'POST';
    let param = 
    {
       "idapp": IDAPP,
       "idtypeuserapp" : 4,
        "nombre": nombre,
        "apellido": apellido,
        "pass": pass,
        "username": username,
        "descriptiontext": descriptiontext,
        "provincia": provincia,
        "calle": calle,
        "logoimgtext": logoimgtext,
        "email": email,
        "contact": contact,
        "latitud": lat,
        "longitud": long
    };
try 
{
    data = await Fill(url,param,method,MASTERTOKEN,'B');
}
catch(ex)
{
    console.error('Error en Insert Account',ex);
}
return data;
}


export const LoginApp = async (username,pass) =>
{
let data;
let tempdata;
let url = 'Account/Login';
let param = { "username": username, "pass": pass };
try 
{
    tempdata = await Fill(url,param,'POST',MASTERTOKEN,'B');
    data = tempdata;
}
catch(ex)
{
    console.error('Error en login User',ex);
}
return data;
}


export const ChangePassword = async (Code,Pass) =>
{
let data;
let tempdata;
let url = 'Account/ChangePassword';
let param = { "Code": Code, "Pass": Pass };
try 
{
    tempdata = await Fill(url,param,'PATCH',MASTERTOKEN,'B');
    data = tempdata;
}
catch(ex)
{
    console.error('Error en ChangePassword',ex);
}
return data;
}