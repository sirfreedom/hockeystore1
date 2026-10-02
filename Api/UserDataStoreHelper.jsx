import { Fill } from '@/Api/BaseHelper';
import { MASTERTOKEN } from '@/Api/BaseHelper';


export const UserStore = async (username) =>
{
let data;
let tempdata;
let url = 'api/UserDataStore/Store/';
let param = [{ "UserName": username  }];
try 
{
    tempdata = await Fill(url,param,'GET',MASTERTOKEN,'P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en Userstore ',ex);
}
return data;
}

export const getDashboard = async (IdUserDataStore,Token) =>
{
let data;
let tempdata;
let url = 'api/UserDataStore/Dashboard';
let param = [{ "IdUserDataStore": IdUserDataStore  }];
try 
{
    tempdata = await Fill(url,param,'GET',Token,'P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en Dashboard',ex);
}
return data;
}


export const Save = async (IdUserDataStore,Username,Contact,Email,DescriptionText,Calle,Provincia,Latitud,Longitud,Token) =>
{
let data;
let tempdata;
let url = 'api/UserDataStore/Save';
let param = 
    { 
    "iduserdatastore": IdUserDataStore, 
    "username": Username, 
    "contact":Contact, 
    "email":Email, 
    "descriptiontext": DescriptionText, 
    "calle": Calle, 
    "provincia" : Provincia, 
    "latitud": Latitud,
    "longitud": Longitud
    };
try 
{
    tempdata = await Fill(url,param,'PATCH',Token,'B');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en Save',ex);
}
return data;
}


export const Get = async (IdUserDataStore,Token) =>
{
let data;
let tempdata;
let url = 'api/UserDataStore/Get';
let param = [{ "IdUserDataStore": IdUserDataStore }];
try 
{
    tempdata = await Fill(url,param,'GET',Token,'P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en Save',ex);
}
return data;
}


export const SaveLogo = async (IdUserDataStore,LogoImgText,Token) =>
{
let data;
let tempdata;
let url = 'api/UserDataStore/SaveLogo';
let param = { "IdUserDataStore": IdUserDataStore, "logoimgtext" : LogoImgText };
try 
{
    tempdata = await Fill(url,param,'PATCH',Token,'B');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en SaveLogo',ex);
}
return data;
}


export const Verified = async (Code) =>
{
let data;
let tempdata;
let url = 'api/UserDataStore/Verified';
let param = [{ "Code": Code }];
try 
{
    tempdata = await Fill(url,param,'PATCH',MASTERTOKEN,'P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en Verified',ex);
}
return data;
}