import { Fill } from '@/Api/BaseHelper';

export const GetRates = async (IdProductStore) =>
{
let data;
let tempdata;
let url = 'api/UserRate/GetRates';
let param = [{ "IdProductStore": IdProductStore }];
try 
{
    tempdata = await Fill(url,param,'GET','','P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en get Rates',ex);
}
return data;
}


export const InsertCommentBuyer = async (IdOrderStore,RateValue,RateText,IsAnonimo, Token) =>
{
let data;
let tempdata;
let url = 'api/UserRate/InsertCommentBuyer';
let param = 
    { 
    "IdOrderStore": IdOrderStore
    ,"RateValue": RateValue
    ,"RateText": RateText
    ,"IsAnonimo": IsAnonimo
    };
try 
{
    tempdata = await Fill(url,param,'POST',Token,'B');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en get InsertCommentBuyer',ex);
}
return data;
}


export const InsertCommentSeller = async (IdOrderStore,RateValue,RateText,IsAnonimo, Token) =>
{
let data;
let tempdata;
let url = 'api/UserRate/InsertCommentSeller';
let param = 
    { 
    "IdOrderStore": IdOrderStore
    ,"RateValue": RateValue
    ,"RateText": RateText
    ,"IsAnonimo": IsAnonimo
    };
try 
{
    tempdata = await Fill(url,param,'POST',Token,'B');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en get InsertCommentSeller',ex);
}
return data;
}


export const List = async (IdUserDataStore, Token) =>
{
let data;
let tempdata;
let url = 'api/UserRate/List';
let param = [{ "IdUserDataStore": IdUserDataStore }];
try 
{
    tempdata = await Fill(url,param,'GET',Token,'P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en List Rate',ex);
}
return data;
}


export const ShowCommentBuyer = async (IdOrderStore,Token) => {
    let data;
    let tempdata;
    let url = 'api/UserRate/ShowCommentBuyer';
    let lParam = [{ "IdOrderStore": IdOrderStore }];
    const method = 'GET';
try 
{
    tempdata = await Fill(url,lParam,method,Token,'P');
    data = tempdata;
}
catch(ex)
{
    console.error('Error en ShowCommentBuyer',ex);
}
return data;
}



export const ShowCommentSeller = async (IdOrderStore,Token) => {
    let data;
    let tempdata;
    let url = 'api/UserRate/ShowCommentSeller';
    let lParam = [{ "IdOrderStore": IdOrderStore }];
    const method = 'GET';
try 
{
    tempdata = await Fill(url,lParam,method,Token,'P');
    data = tempdata;
}
catch(ex)
{
    console.error('Error en ShowCommentSeller',ex);
}
return data;
}