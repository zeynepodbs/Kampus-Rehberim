import React, { useEffect, useState } from 'react';

function KutuphaneListesi() {
  const [kutuphaneler, setKutuphaneler] = useState([]);
  const [tumKutuphaneIsimleri, setTumKutuphaneIsimleri] = useState([]);
  const [seciliKutuphane, setSeciliKutuphane] = useState('');
  const [arama, setArama] = useState('');

  // Tüm kütüphane isimlerini bir kere çek
  useEffect(() => {
    fetch('http://localhost:3001/kutuphaneler')
      .then(res => res.json())
      .then(data => {
        const isimler = Array.from(new Set(data.map(k => k.isim)));
        setTumKutuphaneIsimleri(isimler);
      })
      .catch(console.error);
  }, []);

  // Seçilen kütüphane ve filtrelenmiş veriyi çek
  useEffect(() => {
    let url = 'http://localhost:3001/kutuphaneler';
    if (seciliKutuphane) {
      url += `?isim=${encodeURIComponent(seciliKutuphane)}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => setKutuphaneler(data))
      .catch(err => console.error('Hata:', err));
  }, [seciliKutuphane]);

  // Arama ile filtrele
  const filtrelenmisKutuphaneler = kutuphaneler.filter(k =>
    k.isim.toLowerCase().includes(arama.toLowerCase())
  );

  return (
    <div className="p-4 max-w-6xl mx-auto bg-[#fdfdf9] min-h-screen">
      {/* Başlık + Filtreler */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold text-white bg-blue-900 px-6 py-3 rounded-md shadow-md">
          Kütüphaneler
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Kütüphane seçimi */}
          <select
            id="kutuphane"
            value={seciliKutuphane}
            onChange={e => setSeciliKutuphane(e.target.value)}
            className="p-3 border-2 border-blue-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 w-full md:w-auto"
          >
            <option value="">Tüm Kütüphaneler</option>
            {tumKutuphaneIsimleri.map(isim => (
              <option key={isim} value={isim}>
                {isim}
              </option>
            ))}
          </select>

          {/* Arama kutusu */}
          <input
            id="arama"
            type="text"
            placeholder="Kütüphane adına göre ara..."
            value={arama}
            onChange={e => setArama(e.target.value)}
            className="p-3 border-2 border-orange-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 w-full md:w-auto"
          />
        </div>
      </div>

      {/* Aktif filtre rozetleri */}
      {(seciliKutuphane || arama) && (
        <div className="mb-6 flex flex-wrap gap-2">
          {seciliKutuphane && (
            <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm shadow">
              Kütüphane: {seciliKutuphane}
              <button
                className="ml-2 font-bold"
                onClick={() => setSeciliKutuphane('')}
              >
                ×
              </button>
            </span>
          )}
          {arama && (
            <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm shadow">
              Arama: {arama}
              <button
                className="ml-2 font-bold"
                onClick={() => setArama('')}
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}

      {/* Kütüphane kartları */}
      {filtrelenmisKutuphaneler.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">Kütüphane bulunamadı.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtrelenmisKutuphaneler.map(kutuphane => (
            <li
              key={kutuphane.id}
              className="p-5 bg-blue-900 text-white rounded-lg shadow-md flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-2">{kutuphane.isim}</h3>
              <p>
                <span className="text-orange-400 font-bold">Konum:</span> {kutuphane.konum}
              </p>
              <p>
                <span className="text-orange-400 font-bold">Çalışma Saatleri:</span> {kutuphane.acilis_saati} - {kutuphane.kapanis_saati}
              </p>
            </li>

          ))}
        </ul>
      )}
    </div>
  );
}

export default KutuphaneListesi;

