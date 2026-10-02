import { Fill } from '@/Api/BaseHelper';
import { IDAPP } from '@/Api/BaseHelper';

export const Find = async () =>
{
let data;
let tempdata;
let url = 'api/HeadSlide/Find';
let lParam = [{ "IdAppConfig": IDAPP }];
try 
{
    tempdata = await Fill(url,lParam,'GET','','P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en get HeadSlide',ex);
}
return data;
}



/*


*/