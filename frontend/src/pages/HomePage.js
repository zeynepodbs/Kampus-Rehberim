import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUniversity, FaChalkboardTeacher, FaBuilding, FaUtensils,
  FaBook, FaCoffee, FaUsers, FaCopy, FaBus
} from 'react-icons/fa';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function HomePage() {
  const navigate = useNavigate();
  const [etkinlikler, setEtkinlikler] = useState([]);
  const [duyurular, setDuyurular] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/etkinlikler')
      .then(res => res.json())
      .then(data => setEtkinlikler(data))
      .catch(err => console.error('Etkinlikler alınamadı:', err));

    fetch('http://localhost:3001/duyurular')
      .then(res => res.json())
      .then(data => setDuyurular(data))
      .catch(err => console.error('Duyurular alınamadı:', err));
  }, []);

  const buttons = [
    { label: 'Fakültelerimiz', icon: <FaUniversity size={40} />, path: '/fakulteler' },
    { label: 'Akademik Kadromuz', icon: <FaChalkboardTeacher size={40} />, path: '/danismanlar' },
    { label: 'Yurtlarımız', icon: <FaBuilding size={40} />, path: '/yurtlar' },
    { label: 'Yemekhanelerimiz', icon: <FaUtensils size={40} />, path: '/yemekhaneler' },
    { label: 'Kütüphanelerimiz', icon: <FaBook size={40} />, path: '/kutuphaneler' },
    { label: 'Fakültelerdeki Kantinlerimiz', icon: <FaCoffee size={40} />, path: '/kantinler' },
    { label: 'Fakülte Kulüpleri', icon: <FaUsers size={40} />, path: '/kulupler' },
    { label: 'Fotokopi Alanlarımız', icon: <FaCopy size={40} />, path: '/fotokopi' },
    { label: 'Kampüs İçi Ulaşım', icon: <FaBus size={40} />, path: '/ulasim' },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {/* Slider */}
      <div  style={{ marginBottom: '30px' }}>
        <Slider {...sliderSettings}>
          {[
            'baharsenligi.png',
            'kariyergunleri.png',
            'teknolojiyapayzeka.png',
            'acikhavasinemasi.png',
            'tiyatrogosterisi.png',
            'vizehaftasi.png',
            'kayityenileme.png',
          ].map((img, i) => (
            <div key={i}>
              <img
                src={`/images/${img}`}
                alt=""
                style={{ width: '100%', borderRadius: '8px', maxHeight: '400px', objectFit: 'cover' }}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Butonlar */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '30px' }}>
        {buttons.map((btn, index) => (
          <div
            key={index}
            onClick={() => navigate(btn.path)}
            style={{
              width: '180px',
              height: '180px',
              border: '2px solid #002147',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#002147';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = 'black';
            }}
          >
            {btn.icon}
            <span style={{ marginTop: '10px', fontSize: '16px', fontWeight: 'bold' }}>{btn.label}</span>
          </div>
        ))}
      </div>

      {/* Etkinlikler ve Duyurular */}
      <div
        style={{
          display: 'flex',
          gap: '20px',
          marginTop: '40px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {/* Etkinlikler */}
        <div
          style={{
            flex: '1',
            minWidth: '300px',
            maxWidth: '500px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            padding: '25px',
            textAlign: 'left',
          }}
        >
          <h2
            style={{
              borderBottom: '3px solid #002147',
              paddingBottom: '12px',
              marginBottom: '20px',
              color: '#002147',
              fontWeight: '700',
              fontSize: '1.6rem',
            }}
          >
            Etkinlikler
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {etkinlikler.map(e => (
              <li
                key={e.id}
                style={{
                  marginBottom: '16px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #ddd',
                  cursor: 'default',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={ev => (ev.currentTarget.style.backgroundColor = '#f5faff')}
                onMouseLeave={ev => (ev.currentTarget.style.backgroundColor = 'transparent')}
              >
                <strong style={{ fontSize: '1.1rem', color: '#003366' }}>{e.baslik}</strong>
                <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>
                  <span>{e.tarih}</span> &nbsp;&bull;&nbsp; <span>{e.konum}</span> &nbsp;&bull;&nbsp; <span>{e.saat}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Duyurular */}
        <div
          style={{
            flex: '1',
            minWidth: '300px',
            maxWidth: '500px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            padding: '25px',
            textAlign: 'left',
          }}
        >
          <h2
            style={{
              borderBottom: '3px solid #002147',
              paddingBottom: '12px',
              marginBottom: '20px',
              color: '#002147',
              fontWeight: '700',
              fontSize: '1.6rem',
            }}
          >
            Duyurular
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {duyurular.map(d => (
              <li
                key={d.id}
                style={{
                  marginBottom: '16px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #ddd',
                  cursor: 'default',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={ev => (ev.currentTarget.style.backgroundColor = '#f5faff')}
                onMouseLeave={ev => (ev.currentTarget.style.backgroundColor = 'transparent')}
              >
                <strong style={{ fontSize: '1.1rem', color: '#003366' }}>{d.baslik}</strong>
                <div style={{ fontSize: '0.9rem', color: '#444', marginTop: '6px' }}>
                  <span>{d.tarih}</span> &nbsp;&bull;&nbsp; <span>{d.icerik}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
