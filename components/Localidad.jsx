import { useState, useEffect } from 'react';
import { getDirecciones } from '@/Api/LocalidadHelper'
import { List } from '@/Api/ProvinciaHelper'

const Localidad = ({ seleccion }) => {

  const [provinciaSelect, setProvinciaSelect] = useState("");
  const [Provincias, setProvincias] = useState(null);
  const [Direcciones, setDirecciones] = useState([]);
  const [Calle, setCalle] = useState("");
  const [DireccionSelect, setDireccionSelect] = useState("");
  const [loading, setLoading] = useState(false);

  const styles = {
    container: {
      padding: '32px',
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0', // Borde sutil en lugar de sombra pesada
      borderRadius: '8px',
      fontFamily: 'Inter, system-ui, sans-serif',
      maxWidth: '600px', // Limite para no perder legibilidad
      textAlign: 'left'
    },
    fieldGroup: {
      marginBottom: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start' // Alinea labels e inputs a la izquierda
    },
    label: {
      fontSize: '13px',
      fontWeight: '600',
      textTransform: 'uppercase', // Estilo más "pro" y sobrio
      letterSpacing: '0.025em',
      marginBottom: '6px',
      color: '#64748b'
    },
    minilabel: {
      fontSize: '10px',
      fontWeight: '400',
      textTransform: 'lowercase', // Estilo más "pro" y sobrio
      letterSpacing: '0.025em',
      marginBottom: '6px',
      color: '#84898f'
    },
    input: {
      width: '100%',
      maxWidth: '400px', // Los campos no necesitan ser infinitos
      padding: '8px 12px',
      borderRadius: '6px',
      border: '1px solid #cbd5e1',
      fontSize: '15px',
      color: '#1e293b',
      backgroundColor: '#fff',
      outline: 'none',
      transition: 'all 0.2s ease'
    },
    button: {
      marginTop: '8px',
      padding: '10px 24px',
      backgroundColor: '#0f172a', // Azul oscuro/Negro profesional
      color: '#ffffff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'opacity 0.2s'
    },
    buttonDisabled: {
      backgroundColor: '#94a3b8',
      cursor: 'not-allowed',
      opacity: 0.7
    },
    helperText: {
      fontSize: '12px',
      color: '#94a3b8',
      marginTop: '4px'
    }
  };

  const provinciaChange = (e) => {
    setProvinciaSelect(e.target.value);
  };

  const FindDireccion = () => {
    setLoading(true);
    getDirecciones(provinciaSelect, Calle).then(data => {
      setDirecciones(data);
    })
      .catch(err => console.error(err)) // Siempre es bueno atrapar errores
      .finally(() => setLoading(false)); // Se apaga el loading al terminar, falle o no
  }

  const DireccionFinded = (calleselect) => {
    setDireccionSelect(calleselect);
    const encontrada = Direcciones.find(d => d.nomenclatura === calleselect);

    if (encontrada) {
      const nuevaUbicacion = {
        provincia: encontrada.provincia.nombre,
        calle: encontrada.nomenclatura,
        lat: encontrada.ubicacion.lat,
        long: encontrada.ubicacion.lon
      };

      seleccion(nuevaUbicacion); //devuelvo el valor al componente padre
    }
  };

  useEffect(() => {
    setLoading(true);

    if (Provincias) {
      setLoading(false);
      return;
    }

    List().then(data => {
      setProvincias(data);
    });

    setLoading(false);
  }, []);

  return (
    <>

      <div style={styles.container}>

        <div style={styles.fieldGroup}>
          <label style={styles.label} htmlFor="provincia">Provincia</label>
          <select
            required
            id="provincia"
            style={styles.input}
            value={provinciaSelect}
            onChange={provinciaChange}
          >
            <option value="" disabled>Seleccione una provincia...</option>
            {Provincias?.map((provincia, index) => (
              <option key={'prov' + index} value={provincia?.nombre}>
                {provincia?.descriptiontext}
              </option>
            ))}
          </select>
        </div>

        {/* Input de Calle - Aparece con una transición suave si provinciaSelect existe */}
        {provinciaSelect && (
          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="txtcalle">
              Calle y Altura
            </label>
            <label style={styles.minilabel} >
              (no es necesario que sea exacta, pero si real)
            </label>
            <input
              required
              type="text"
              id="txtcalle"
              placeholder="Ej: Corrientes 1234"
              style={styles.input}
              onChange={(e) => setCalle(e.target.value)}
            />
            <button
              style={{
                ...styles.button,
                ...((loading || Calle.length <= 5) ? styles.buttonDisabled : {})
              }}
              onClick={() => FindDireccion(provinciaSelect, Calle)}
              disabled={loading || Calle.length <= 5}
            >
              {loading ? 'Buscando...' : 'Buscar Dirección'}
            </button>
          </div>
        )}

        {loading && (
          <p style={styles.loadingText}>🔍 Localizando direcciones...</p>
        )}

        {/* Resultados */}
        {!loading && Direcciones?.length > 0 && (
          <div style={{ ...styles.fieldGroup, borderTop: '1px solid #edf2f7', paddingTop: '20px' }}>
            <label style={styles.label}>Direcciones Encontradas</label>
            <select
              required
              style={styles.input}
              value={DireccionSelect}
              onChange={(e) => DireccionFinded(e.target.value)}
            >
              <option value="" disabled>Seleccione el resultado exacto</option>
              {Direcciones?.map((direccion, index) => (
                <option key={'op' + index} value={direccion.nomenclatura}>
                  {direccion.nomenclatura}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </>

  );
};

export default Localidad;