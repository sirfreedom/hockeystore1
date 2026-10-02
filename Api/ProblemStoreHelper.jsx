import { Fill } from '@/Api/BaseHelper';
import { MASTERTOKEN } from '@/Api/BaseHelper';

export const Insert = async (IdTypeProblemStore, Email ,DescriptionText,TypeProblemStore ) => {
    let data;
    let url = 'api/ProblemStore/Insert';
    const method = 'POST';
    let param = { "IdTypeProblemStore": IdTypeProblemStore,"Email": Email, "DescriptionText": DescriptionText, "TypeProblemStore": TypeProblemStore };
    try {
        data = await Fill(url, param, method, MASTERTOKEN, 'B');
    }
    catch (ex) {
        console.error('Error en Insert ProblemStore', ex);
    }
    return data;
}


export const ListType = async () => {
    let data;
    let tempdata;
    let url = 'api/ProblemStore/ListType';
    const method = 'GET';
    let param = [];
    try 
    {
        tempdata = await Fill(url, param, method, '', 'P');
        data = tempdata;
    }
    catch (ex) {
        console.error('Error en ProblemType', ex);
    }
    return data;
}
