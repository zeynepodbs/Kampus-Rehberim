import React from 'react';

function Header() {
  return (
    <header style={{
      backgroundColor: '#001f54',  // lacivert arka plan
      padding: '10px 20px',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      {/* Logo kısmı */}
      <div style={{ fontWeight: 'bold', fontSize: '24px' }}>
        Kampüs Rehberim
      </div>

      {/* Menü kısmı */}
      <nav>
        <a href="/" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Anasayfa</a>
        <a href="/fakulteler" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Fakülteler</a>
        <a href="/danismanlar" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Danışmanlar</a>
        <a href="/yurtlar" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Yurtlarımız</a>
        <a href="/yemekhaneler" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Yemekhaneler</a>
        <a href="/kutuphaneler" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Kütüphaneler</a>
        <a href="/kantinler" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Kantinler</a>
        <a href="/kulupler" style={{ color: 'white',marginRight: '15px',  textDecoration: 'none' }}>Kulüpler</a>
        <a href="/fotokopi" style={{ color: 'white',marginRight: '15px', textDecoration: 'none' }}>Fotokopiler</a>
        <a href="/ulasim" style={{ color: 'white',marginRight: '15px', textDecoration: 'none' }}>Ulaşım </a>

      </nav>
    </header>
  );
}

export default Header;

