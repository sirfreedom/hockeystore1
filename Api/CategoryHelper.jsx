import { Fill } from '@/Api/BaseHelper';
import { IDAPP } from '@/Api/BaseHelper';

export const Marquee = async () =>
{
let data;
let tempdata;
let url = 'api/Category/Marquee/';
let param = [{ "IdAppConfig": IDAPP }];
try 
{
    tempdata = await Fill(url,param,'GET','','P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en get Category',ex);
}
return data;
}


export const List = async () =>
{
let data;
let tempdata;
let url = 'api/Category/List/';
let param = [{ "IdAppConfig": IDAPP }];
try 
{
    tempdata = await Fill(url,param,'GET','','P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en get Category',ex);
}
return data;
}


export const TreeMenu = async () =>
{
let data;
let tempdata;
let url = 'api/Category/TreeMenu/';
let param = [{ "IdAppConfig": IDAPP }];
try 
{
    tempdata = await Fill(url,param,'GET','','P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en get Category',ex);
}
return data;
}