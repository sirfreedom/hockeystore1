import { Fill } from '@/Api/BaseHelper';
import { IDAPP } from '@/Api/BaseHelper';

export const InProduct = async (IdProduct) =>
{
let data;
let tempdata;
let url = 'api/QuestionStore/InProduct/';
let param = [{ "IdProductStore": IdProduct }];
try 
{
    tempdata = await Fill(url,param,'GET','','P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en QuestionStore InProduct',ex);
}
return data;
}


export const WaitingToResponse = async (IdUserDataStore,Token) =>
{
let data;
let tempdata;
let url = 'api/QuestionStore/WaitingToResponse/';
let param = [{ "IdUserDataStore": IdUserDataStore }];
try 
{
    tempdata = await Fill(url,param,'GET',Token,'P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en QuestionStore WaitingToResponse',ex);
}
return data;
}


export const InsertQuestion = async (IdProduct,IdUserStore,QuestionText,Token) =>
{
let data;
let tempdata;
let url = 'api/QuestionStore/InsertQuestion';
let param = { "idproductstore": IdProduct,"iduserstore": IdUserStore, "questiontext": QuestionText, "IdApp": IDAPP };
try 
{
    tempdata = await Fill(url,param,'POST',Token,'B');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en QuestionStore Insert',ex);
}
return data;
}


export const InsertAnswer = async (IdQuestionStore, AnswerText,Token) =>
{
let data;
let tempdata;
let url = 'api/QuestionStore/InsertAnswer';
let param = { "idquestionstore": IdQuestionStore,"answertext": AnswerText, "IdApp": IDAPP };
try 
{
    tempdata = await Fill(url,param,'PATCH',Token,'B');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en QuestionStore InsertAnswer',ex);
}
return data;
}


export const Delete = async (IdQuestionStore,Token) =>
{
let data;
let tempdata;
let url = 'api/QuestionStore/Delete/';
let param = [{ "IdQuestionStore": IdQuestionStore }];
try 
{
    tempdata = await Fill(url,param,'DELETE',Token,'P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en QuestionStore Delete',ex);
}
return data;
}


export const Get = async (IdQuestionStore,Token) =>
{
let data;
let tempdata;
let url = 'api/QuestionStore/Get/';
let param = [{ "IdQuestionStore": IdQuestionStore }];
try 
{
    tempdata = await Fill(url,param,'GET',Token,'P');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en QuestionStore Get',ex);
}
return data;
}
