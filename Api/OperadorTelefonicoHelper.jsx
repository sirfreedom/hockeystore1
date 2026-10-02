import { Fill } from '@/Api/BaseHelper';
import { MASTERTOKEN } from '@/Api/BaseHelper';

export const GetInfo = async (Telefono) =>
{
let data;
let tempdata;
let url = 'api/OperadorTelefonico/Get';
let param = [{ "Telefono": Telefono  }];
try 
{
    tempdata = await Fill(url,param,'GET',MASTERTOKEN,'P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en OperadorTelefonico',ex);
}
return data;
}