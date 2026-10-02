//https://codesandbox.io/p/sandbox/react-image-file-resizer-demo-iplgp?file=%2Fsrc%2FApp.js%3A23%2C39
import { useEffect, useState, useRef } from "react";
import Resizer from "react-image-file-resizer";

/*
Resizer.imageFileResizer(
  file, // Is the file of the image which will resized.
  maxWidth, // Is the maxWidth of the resized new image.
  maxHeight, // Is the maxHeight of the resized new image.
  compressFormat, // Is the compressFormat of the resized new image.
  quality, // Is the quality of the resized new image.
  rotation, // Is the degree of clockwise rotation to apply to uploaded image.
  responseUriFunc, // Is the callBack function of the resized new image URI.
  outputType, // Is the output type of the resized new image.
  minWidth, // Is the minWidth of the resized new image.
  minHeight // Is the minHeight of the resized new image.
);

*/
const ImageResizerComponent = ({ imagetext, nametext, classimg, quality = 100, ww = 400, hh = 400 }) => {

  const [newImageUri, setNewImageUri] = useState("");
  const [Logo] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjU2IiB2aWV3Qm94PSIwIDAgMTIwIDU2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjU2IiByeD0iNCIgZmlsbD0iI0YxRjVGOSIvPgo8cGF0aCBkPSJNNjUuNjU4OSAzNS4xOTRDNjguMDU2NCAzNS4xOTQgNzAgMzMuMjUwNCA3MCAzMC44NTI5QzcwIDI4LjQ1NTQgNjguMDU2NCAyNi41MTE3IDY1LjY1ODkgMjYuNTExN0g2NS42MzQ1QzY1LjY1MDcgMjYuMzMzIDY1LjY1ODkgMjYuMTUyIDY1LjY1ODkgMjUuOTY5MUM2NS42NTg5IDIyLjY3MjQgNjIuOTg2NCAyMCA1OS42ODk5IDIwQzU2LjM5MzMgMjAgNTMuNzIwOSAyMi42NzI0IDUzLjcyMDkgMjUuOTY5MUM1My43MjA5IDI1Ljk3NDIgNTMuNzIwOSAyNS45Nzk0IDUzLjcyMDkgMjUuOTg0NUM1MS41OTc5IDI2LjQxNTUgNTAgMjguMjkyNSA1MCAzMC41NDI3QzUwIDMzLjExMTUgNTIuMDgyNCAzNS4xOTM5IDU0LjY1MTEgMzUuMTkzOSIgZmlsbD0iI0YxRjVGOSIvPgo8cGF0aCBkPSJNNjUuNjU4OSAzNS4xOTRDNjguMDU2NCAzNS4xOTQgNzAgMzMuMjUwNCA3MCAzMC44NTI5QzcwIDI4LjQ1NTQgNjguMDU2NCAyNi41MTE3IDY1LjY1ODkgMjYuNTExN0g2NS42MzQ1QzY1LjY1MDcgMjYuMzMzIDY1LjY1ODkgMjYuMTUyIDY1LjY1ODkgMjUuOTY5MUM2NS42NTg5IDIyLjY3MjQgNjIuOTg2NCAyMCA1OS42ODk5IDIwQzU2LjM5MzMgMjAgNTMuNzIwOSAyMi42NzI0IDUzLjcyMDkgMjUuOTY5MUM1My43MjA5IDI1Ljk3NDIgNTMuNzIwOSAyNS45Nzk0IDUzLjcyMDkgMjUuOTg0NUM1MS41OTc5IDI2LjQxNTUgNTAgMjguMjkyNSA1MCAzMC41NDI3QzUwIDMzLjExMTUgNTIuMDgyNCAzNS4xOTM5IDU0LjY1MTEgMzUuMTkzOSIgc3Ryb2tlPSIjOTBBMUI5IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNNjAuMjI5MSAzNS4xOTNWMjkuNzY2NlpNNjAuMjI5MSAyOS43NjY2TDYyLjM5OTcgMzEuOTM3MlpNNjAuMjI5MSAyOS43NjY2TDU4LjA1ODYgMzEuOTM3MloiIGZpbGw9IiNGMUY1RjkiLz4KPHBhdGggZD0iTTYwLjIyOTEgMzUuMTkzVjI5Ljc2NjZNNjAuMjI5MSAyOS43NjY2TDYyLjM5OTcgMzEuOTM3Mk02MC4yMjkxIDI5Ljc2NjZMNTguMDU4NiAzMS45MzcyIiBzdHJva2U9IiM5MEExQjkiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=");
  const [ClassImg,setClassImg] = useState("");


      useEffect(() => 
      {
        ClassImg === "" ? 
        setClassImg("h-20 w-20 rounded-2xl object-cover ring-2 ring-indigo-500 ring-offset-2 cursor-pointer") : 
        setClassImg(ClassImg)

      }, []);
  
const calcularDimensionesOptimas = (originalW, originalH, maxW, maxH) => {
  // Calculamos la proporción de escala para cada eje
  const ratioX = maxW / originalW;
  const ratioY = maxH / originalH;

  // Usamos el ratio menor para asegurar que la imagen quepa en el "contenedor"
  // sin salirse de ninguno de los dos límites.
  const escala = Math.min(ratioX, ratioY);
 
  // Opcional: Si no quieres que imágenes pequeñas se agranden y pierdan calidad
  const factorFinal = escala > 1 ? 1 : escala;

  return {
    width: Math.round(originalW * factorFinal),
    height: Math.round(originalH * factorFinal)
  };
};

const getImageDimensions = (file) => {
  return new Promise((resolve, reject) => {
    // 1. Creamos una URL temporal para el archivo
    const url = URL.createObjectURL(file);
    
    // 2. Creamos un objeto de imagen nativo de JS
    const img = new Image();

    // 3. Cuando la imagen termine de "renderizarse" internamente
    img.onload = () => {
      const dimensions = {
        width: img.width,
        height: img.height
      };

      console.log(`Dimensiones obtenidas: ${dimensions.width}px x ${dimensions.height}px`);

      // Importante: Liberar la memoria de la URL creada
      URL.revokeObjectURL(url);
      resolve(dimensions);
    };

    // Manejo de errores (por si el archivo no es una imagen válida)
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject("No se pudieron obtener las dimensiones. ¿Es un archivo de imagen válido?");
    };
    // Asignamos la URL al src para iniciar la carga
    img.src = url;
  });
};

  const resizeFile = (file,w,h) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        w, // maxWidth
        h, // maxHeight
        "JPEG", // compressFormat
        quality, // quality (0-100)
        0, // rotation
        (uri) => {
          resolve(uri);
        },
        "base64" // outputType (base64, blob, or file)
      );
    });


const handleRemoveImage = (e) => {
    e.stopPropagation(); // Evita que se dispare el click del input si estuvieran encimados
    setNewImageUri("");
    imagetext(""); // Notifica al padre que ya no hay imagen
  };

  const onChange = async (event) => {
    try {
      const file = event.target.files[0];

      const { width, height } = await getImageDimensions(file);
      console.log(`Dimensiones originales: ${width}px x ${height}px`);
      
      const { width: newW, height: newH } = calcularDimensionesOptimas(width, height, ww, hh);

      console.log(`Dimensiones óptimas: ${newW}px x ${newH}px`);

      if (file) {
        const imageUri = await resizeFile(file,newW,newH);
        setNewImageUri(imageUri);
        imagetext(imageUri);
      }
    } 
    catch (err) {
      console.log(err);
    }

  };

  return (

    <div className="flex flex-col items-start gap-2">

    <div className="App">
      <label className="text-sm text-gray-500 mb-1">{nametext}</label>
      <input type="file" onChange={onChange} accept="image/*"  style={{ display: 'none' }} />
      <img src={newImageUri ? newImageUri : Logo }  alt="" className={classimg}  />
    </div>
    
    {newImageUri && (
       <button
            onClick={handleRemoveImage}
            className=""
            title="Eliminar imagen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
     </div>

)};

export default ImageResizerComponent;