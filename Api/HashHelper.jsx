import Hashids from 'hashids';

// 1. Creamos la instancia AQUÍ (invocando la clase con 'new')
const hashids = new Hashids("Pueyrredom22#", 8);

// 2. Exportamos funciones limpias
export const encriptarId = (id) => {
  if (!id) return '';
  return hashids.encode(id);
};

export const desencriptarId = (hash) => 
  {
  let s = '';
  if (!hash) return null;
  try{
  s = hashids.decode(hash)[0];
  }
  catch{
  }
  return s;
};