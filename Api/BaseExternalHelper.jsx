

function toQueryString(params) {
  if (!Array.isArray(params) || params.length === 0) return '';
  const obj = params[0];
  return Object.entries(obj)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

export const Fill = async (BaseUrl,Url, lParam, Method,Token) => {
  let response;
  let data = [];
  let Parameters;
  const headers = {};
  try {
  
    // Construye el objeto de opciones para fetch
    const fetchOptions = {
      method: Method
    };

      if (Token && Token.trim() !== '') 
      {
        headers['Authorization'] = 'Bearer ' + Token;
        fetchOptions.credentials = 'include'; // Incluye cookies para autenticación
      }

      if (Token && Token.trim() === '') 
      {
        fetchOptions.credentials = 'omit'; 
      }
    
    if (Method !== 'GET' && Method !== 'HEAD') {
      headers['Content-Type'] = 'application/json';
      fetchOptions.body = JSON.stringify(lParam); // Usa lParam como body para POST
    }

    if(Method === 'GET' || Method === 'DELETE' ){
      Parameters = toQueryString(lParam);
    }
    
    // Si hay headers, agrégalos a las opciones de fetch
    if (Object.keys(headers).length > 0) {
      fetchOptions.headers = headers;
    }


    if(Method === 'GET' || Method === 'DELETE' ){
    response = await fetch(BaseUrl + Url + '?' + Parameters, fetchOptions);
    }

    if(Method === 'PUT' || Method === 'POST' || Method === 'PATCH' ){
      response = await fetch(BaseUrl +Url, fetchOptions);
    }

    if 
      ( 
      (response?.status >= 201 && response?.status < 300) ||
      (response?.status >= 400 && response?.status < 600) 
      )
    {
      data = response;
      
    }
    else{
      data = await response?.json();
    }

    
  }
  catch (ex) {
    console.error('Error Fill', ex);
  }
  return data;
};


export const EmptyAllProperties = (obj) => {
  const objVaciado = {};

  for (const key in obj) {
    
    if (obj.hasOwnProperty(key)) 
    {
        objVaciado[key] = null;
    }
  }
  return objVaciado;
}

export const ChangePropertyValue = (obj, propiedad, nuevoValor) => {
   
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('El primer argumento debe ser un objeto válido.');
  }
  if (typeof propiedad !== 'string') {
    throw new Error('La propiedad debe ser una cadena.');
  }
  return {
    ...obj,
    [propiedad]: nuevoValor
  };
};

