import { Fill, IDAPP } from '@/Api/BaseHelper';


export const Insert = async (Order,Token) => {
    let data;
    let url = 'api/OrderStore/Insert';
    const method = 'POST';
try 
{
    data = await Fill(url,Order,method,Token,'B');
}
catch(ex)
{
    console.error('Error en Insert Order',ex);
}
return data;
}


export const Buyer = async (IdUserDataStore,Token) => {
    let data;
    let tempdata;
    let url = 'api/OrderStore/Buyer';
    let lParam = [{ "IdUserDataStore": IdUserDataStore }];
    const method = 'GET';
try 
{
    tempdata = await Fill(url,lParam,method,Token,'P');
    data = tempdata;
}
catch(ex)
{
    console.error('Error en Buyer Order',ex);
}
return data;
}


export const Seller = async (IdUserDataStore,Token) => {
    let data;
    let tempdata;
    let url = 'api/OrderStore/Seller';
    let lParam = [{ "IdUserDataStore": IdUserDataStore }];
    const method = 'GET';
try 
{
    tempdata = await Fill(url,lParam,method,Token,'P');
    data = tempdata;
}
catch(ex)
{
    console.error('Error en Seller Order',ex);
}
return data;
}


export const List = async (IdUserDataStore,Token) => {
    let data;
    let tempdata;
    let url = 'api/OrderStore/List';
    let lParam = [{ "IdUserDataStore": IdUserDataStore }];
    const method = 'GET';
try 
{
    tempdata = await Fill(url,lParam,method,Token,'P');
    data = tempdata;
}
catch(ex)
{
    console.error('Error en List Order',ex);
}
return data;
}


export const TypeOrderStoreCanceled = async (FilterText,Token) => {
    let data;
    let tempdata;
    let url = 'api/OrderStore/TypeOrderStoreCanceled';
    let lParam = [{ "FilterText": FilterText }];
    const method = 'GET';
try 
{
    tempdata = await Fill(url,lParam,method,Token,'P');
    data = tempdata;
}
catch(ex)
{
    console.error('Error en TypeOrderStoreCanceled Order',ex);
}
return data;
}


export const Delete = async (idorderstore,idtypeorderstorecanceled,descriptiontext,Token) => {
    let data;
    let tempdata;
    let url = 'api/OrderStore/Delete';
    let lParam = 
    { 
        "IdApp": IDAPP,
        "IdOrderStore": idorderstore, 
        "idtypeorderstorecanceled": idtypeorderstorecanceled,
        "descriptiontext" : descriptiontext
    };
    const method = 'DELETE';
try 
{
    if(idorderstore === 0 || idtypeorderstorecanceled <0){
        return;
    }

    tempdata = await Fill(url,lParam,method,Token,'B');
    data = tempdata;
}
catch(ex)
{
    console.error('Error en Delete',ex);
}
return data;
}


