import { Fill } from '@/Api/BaseHelper';
import { IDAPP } from '@/Api/BaseHelper';

export const Get = async () =>
{
let data;
let tempdata;
let url = 'api/AppStoreConfig/Get/';
let param = [{ "Id": IDAPP }]; //Id de aplicacion
try 
{
    tempdata = await Fill(url,param,'GET','','P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en get AppStoreConfig',ex);
}
return data;
}