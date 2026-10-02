import { Fill } from '@/Api/BaseHelper';
import { MASTERTOKEN } from '@/Api/BaseHelper';

export const Insert = async (idcategory,productname,iduserdatastore,descriptiontext,isnew,price,quantity,youtubelink,imgtext1,imgtext2,imgtext3,imgtext4,Token) => {
    let data;
    const method = 'POST';
    let url = 'api/ProductStore/Insert';
    let param = 
    {
       "idcategory": idcategory,
       "productname": productname,
        "iduserdatastore": iduserdatastore,
        "descriptiontext": descriptiontext,
        "isnew": isnew,
        "price": price,
        "quantity": quantity,
        "youtubelink": youtubelink,
        "imgtext1": imgtext1,
        "imgtext2": imgtext2,
        "imgtext3": imgtext3,
        "imgtext4": imgtext4
    };
try 
{
    data = await Fill(url,param,method,Token,'B');
}
catch(ex)
{
    console.error('Error en Insert ProductStore',ex);
}
return data;
}

export const Update = async (id,idcategory,productname,descriptiontext,isnew,price,quantity,youtubelink,Token) => {
    let data;
    const method = 'PUT';
    let url = 'api/ProductStore/Update';
    let param = 
    {
       "id": id
       ,"productname": productname
       ,"idcategory": idcategory
       ,"descriptiontext": descriptiontext
       ,"isnew": isnew
       ,"price": price
       ,"quantity": quantity
       ,"youtubelink": youtubelink
    };
try 
{
    data = await Fill(url,param,method,Token,'B');
}
catch(ex)
{
    console.error('Error en Insert ProductStore',ex);
}
return data;
}


export const MyProducts = async (IdUserDataStore,Token) =>
{
let data;
let tempdata;
let url = 'api/ProductStore/MyProducts';
let param = [{ "IdUserDataStore": IdUserDataStore  }];
try 
{
    tempdata = await Fill(url,param,'GET',Token,'P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en get MyProducts',ex);
}
return data;
}

export const List = async () =>
{
let data;
let tempdata;
let url = 'api/ProductStore/List';
let param = [];
try 
{
    tempdata = await Fill(url,param,'GET','','P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en get List',ex);
}
return data;
}


export const NewProducts = async () =>
{
let data;
let tempdata;
let url = 'api/ProductStore/NewProducts';
let param = [];
try 
{
    tempdata = await Fill(url,param,'GET','','P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en get MyProducts',ex);
}
return data;
}

export const Get = async (Id) =>
{
let data;
let tempdata;
let url = 'api/ProductStore/Get';
let param = [{ "IdProductStore": Id }];
try 
{
    tempdata = await Fill(url,param,'GET','','P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en get MyProducts',ex);
}
return data;
}


export const GetImages = async (Id) =>
{
let data;
let tempdata;
let url = 'api/ProductImageStore/GetImages';
let param = [{ "IdProductStore": Id }];
try 
{
    tempdata = await Fill(url,param,'GET','','P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en get MyProducts',ex);
}
return data;
}


export const Disabled = async (IdProductStore, isDisabled,Token) =>
{
let data;
let tempdata;
let url = 'api/ProductStore/Disabled';
let param = [{ "IdProductStore": IdProductStore, "isDisabled": isDisabled } ];
try 
{
    tempdata = await Fill(url,param,'PATCH',Token,'P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en Disabled product',ex);
}
return data;
}


export const Delete = async (IdProductStore,Token) =>
{
let data;
let tempdata;
let url = 'api/ProductStore/Delete';
let param = [{ "IdProductStore": IdProductStore } ];
try 
{
    tempdata = await Fill(url,param,'DELETE',Token,'P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en Delete product',ex);
}
return data;
}



export const ProductStore = async (UserName,Token) =>
{
let data;
let tempdata;
let url = 'api/ProductStore/Store';
let param = [{ "UserName": UserName  }];
try 
{
    tempdata = await Fill(url,param,'GET',Token,'P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en get ProductStore',ex);
}
return data;
}


export const Find = async (FindText) =>
{
let data;
let tempdata;
let url = 'api/ProductStore/Find';
let param = [{ "FindText": FindText  }];
try 
{
    if(FindText === ''){
        return;
    }

    tempdata = await Fill(url,param,'GET','','P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en get Find',ex);
}
return data;
}


export const SelectedTreeMenu = async (IdCategory) =>
{
let data;
let tempdata;
let url = 'api/ProductStore/SelectedTreeMenu';
let param = [{ "IdCategory": IdCategory  }];
try 
{
    tempdata = await Fill(url,param,'GET','','P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en get SelectedTreeMenu',ex);
}
return data;
}


export const getCart = async (ProductId) =>
{
let data;
let tempdata;
let url = 'api/ProductStore/Cart';
try 
{
    tempdata = await Fill(url,ProductId,'POST',MASTERTOKEN,'B');
    data = await tempdata;
}   
catch(ex)
{
    console.error('Error en Cart',ex);
}
return data;
}