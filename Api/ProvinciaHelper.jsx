import { Fill } from '@/Api/BaseHelper';

export const List = async () =>
{
let data;
let tempdata;
let url = 'api/Provincia/List';
let lParam = [];
try 
{
    tempdata = await Fill(url,lParam,'GET','','P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en get Provincia',ex);
}
return data;
}
