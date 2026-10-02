'use client'
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }) {

const layoutStyles = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh', // Hace que el layout ocupe toda la pantalla
  gap: '20px'          // Esto crea una separación automática (margen) entre cada sección
};

const mainStyles = {
  flex: 1 // Hace que el contenido del medio crezca y empuje al footer hacia abajo
};

const footerStyles = {
  marginTop: 'auto' // Asegura que el footer se quede abajo si hay poco contenido
};

    return (
        <>
<div style={layoutStyles}>
      {/* Sección del encabezado que junta Banner y Navbar */}
      <header>
        <Banner />
        <Navbar />
      </header>

      {/* Sección principal para el contenido variable */}
      <main style={mainStyles}>
        {children}
      </main>

      {/* Sección del pie de página */}
      <footer style={footerStyles}>
        <Footer />
      </footer>
    </div>
        </>
    );
}
