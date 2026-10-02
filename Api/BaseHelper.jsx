const BASEURL = 'https://sirfreedom.somee.com/'; //produccion
//const BASEURL = 'https://localhost:5000/'; //desarrollo
//const BASEURL = 'http://localhost:8080/'; //Docker
export const MASTERTOKEN = 'KNj5WcPJ9n9TShJRxNVt2znWa+GBs7ci9X4lW0XPTSBcN6GrSAuqa1hlDeeg/Rh7';
export const IDAPP = 1;

function toQueryString(params) {
  if (!Array.isArray(params) || params.length === 0) return '';
  const obj = params[0];
  
  return Object.entries(obj)
    .map(([key, value]) => {
      const formattedKey = key.toLowerCase();
      return `${encodeURIComponent(formattedKey)}=${encodeURIComponent(value)}`;
    })
    .join('&');
}


export const Fill = async (Url, lParam, Method, Token, SenderType) => {
  let response;
  let data = [];
  let tempdata = [];
  let Parameters;
  const headers = {};
  try {

    const fetchOptions = {
      method: Method,
      credentials: 'include'
    };

    if (Token && Token !== '') {
      headers['Authorization'] = 'Bearer ' + Token;
    }

    //Body
    if (SenderType === 'B') {
      headers['Content-Type'] = 'application/json';
      fetchOptions.body = JSON.stringify(lParam);
    }

    //Parameter
    if (SenderType === 'P') {
      Parameters = toQueryString(lParam);
    }

    if (Object.keys(headers).length > 0) {
      fetchOptions.headers = headers;
    }

    if (SenderType === 'P') {
      response = await fetch(BASEURL + Url + '?' + Parameters, fetchOptions);
    }

    if (SenderType === 'B') {
      response = await fetch(BASEURL + Url, fetchOptions);
    }

     if 
      ( 
      (response?.status >= 201 && response?.status < 300) ||
      (response?.status >= 400 && response?.status < 422) || 
      (response?.status >= 423 && response?.status < 600) 
      )
    {
      data = response;
      const tempdata = { data: [], status: response.status };
      data = tempdata;
    }

    if (response?.status === 200 || response?.status === 422) // ok or unprocesable entity (validation error) 
    {
      data = await response?.json();
      data.status = response.status; ////le escribimos una propiedad status con el status para manejar cuestiones de front
    }

  }
  catch (ex)
  {
    console.error('Error Fill', ex);
  }
  return data;
};


export const EmptyAllProperties = (obj) => {
  const objVaciado = {};

  for (const key in obj) {

    if (obj.hasOwnProperty(key)) {
      objVaciado[key] = null;
    }
  }
  return objVaciado;
}

export const getKey = (key) => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return "";
  }

  try {
    const value = localStorage.getItem(key);
    
    if (value === null || value === "undefined" || value === "null" || value === undefined || value === "undefined") {
      return "";
    }
    
    return value;
  } catch (e) {
    console.error(`Error accediendo a localStorage para la llave "${key}":`, e);
    return "";
  }
};



export const setKey = (key, value) => {
  // 1. Validar que estemos en el cliente (el navegador)
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    // 2. Validar que la key sea válida
    if (!key) {
      console.warn("localStorage: No se proporcionó una clave (key) válida.");
      return false;
    }

    // 3. Convertir el valor a string (localStorage solo guarda texto)
    const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
    
    window.localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    // 4. Capturar errores comunes (ej: QuotaExceededError si se llena el almacenamiento)
    console.error("Error guardando en localStorage:", error);
    return false;
  }
};


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



export const createDate = (year, month, day, hour, minute) => {
  var fecha;
  try {

    if (
      typeof year !== 'number' ||
      typeof month !== 'number' ||
      typeof day !== 'number' ||
      typeof hour !== 'number' ||
      typeof minute !== 'number'
    ) 
    {
      //throw new Error('Todos los parámetros deben ser números');
      return;
    }
    // Ajustamos el mes (JavaScript usa 0-11)
    const monthIndex = month - 1;

    // Creamos el objeto Date
    fecha = new Date(year, monthIndex, day, hour, minute);

    // Verificamos si la fecha es válida
    if (isNaN(fecha.getTime())) {
      throw new Error('Fecha inválida');
    }

    // Verificamos que los valores ingresados coincidan con los de la fecha creada
    // (por si JavaScript ajustó automáticamente valores fuera de rango)
    if (
      fecha?.getFullYear() !== year ||
      fecha?.getMonth() !== monthIndex ||
      fecha?.getDate() !== day ||
      fecha?.getHours() !== hour ||
      fecha?.getMinutes() !== minute
    ) {
      throw new Error('Los valores proporcionados no corresponden a una fecha válida');
    }

  }
  catch (e) {
    throw e;
  }
  return fecha;
}