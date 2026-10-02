import { Fill } from '@/Api/BaseHelper';
import { MASTERTOKEN } from '@/Api/BaseHelper';
import { IDAPP } from '@/Api/BaseHelper';


export const SendCode = async (IdUserDataStore) =>
{
let data;
let tempdata;
let url = 'api/Notification/SendCode';
let param = [{ "IdApp": IDAPP, "IdUserDataStore": IdUserDataStore }];
try 
{
    if(IdUserDataStore === 0){
        return;
    }

    tempdata = await Fill(url,param,'POST',MASTERTOKEN,'P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en SendCode',ex);
}
return data;
}


export const SendCodeLostPassword = async (Email) =>
{
let data;
let tempdata;
let url = 'api/Notification/SendCodeLostPassword';
let param = [{ "IdApp": IDAPP, "Email": Email }];
try 
{
    tempdata = await Fill(url,param,'POST',MASTERTOKEN,'P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en SendCodeLostPassword',ex);
}
return data;
}