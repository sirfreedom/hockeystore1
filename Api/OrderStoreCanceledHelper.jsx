import { Fill } from '@/Api/BaseHelper';


export const BuyerRejected = async (IdUserDataStore,Token) => {
    let data;
    let tempdata;
    let url = 'api/OrderStoreCanceledHistory/BuyerRejected';
    let lParam = [{ "IdUserDataStore": IdUserDataStore }];
    const method = 'GET';
try 
{
    tempdata = await Fill(url,lParam,method,Token,'P');
    data = tempdata;
}
catch(ex)
{
    console.error('Error en BuyerRejected Order',ex);
}
return data;
}


export const SellerRejected = async (IdUserDataStore,Token) => {
    let data;
    let tempdata;
    let url = 'api/OrderStoreCanceledHistory/SellerRejected';
    let lParam = [{ "IdUserDataStore": IdUserDataStore }];
    const method = 'GET';
try 
{
    tempdata = await Fill(url,lParam,method,Token,'P');
    data = tempdata;
}
catch(ex)
{
    console.error('Error en SellerRejected Order',ex);
}
return data;
}