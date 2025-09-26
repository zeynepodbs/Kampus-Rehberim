import React, { useEffect, useState } from 'react';

function YemekhaneListesi() {
  const [yemekhaneler, setYemekhaneler] = useState([]);
  const [seciliKonum, setSeciliKonum] = useState('');
  const [arama, setArama] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/yemekhaneler')
      .then(res => res.json())
      .then(data => setYemekhaneler(data))
      .catch(err => console.error('Hata:', err));
  }, []);

  const yemekListesi = [
    {
      tarih: '2025-08-02',
      ogle: 'Mercimek Çorbası, Izgara Tavuk, Pilav, Yoğurt',
      aksam: 'Ezogelin Çorbası, Köfte, Makarna, Meyve'
    },
    {
      tarih: '2025-08-03',
      ogle: 'Tarhana Çorbası, Fırın Tavuk, Bulgur Pilavı, Ayran',
      aksam: 'Domates Çorbası, Kuru Fasulye, Pilav, Tatlı'
    }
  ];

  const konumlar = [...new Set(yemekhaneler.map(y => y.konum))];

  const filtrelenmisYemekhaneler = yemekhaneler.filter(y =>
    y.isim.toLowerCase().includes(arama.toLowerCase()) &&
    (seciliKonum === '' || y.konum === seciliKonum)
  );

  return (
    <div className="p-4 bg-[#fdfdf9] min-h-screen max-w-6xl mx-auto">
      {/* Başlık + Filtreler */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold text-white bg-blue-900 px-6 py-3 rounded-md shadow-md">
          Kampüsteki Yemekhaneler
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Konum filtre */}
          <select
            className="p-3 border-2 border-blue-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={seciliKonum}
            onChange={(e) => setSeciliKonum(e.target.value)}
          >
            <option value="">Tüm Konumlar</option>
            {konumlar.map((konum, index) => (
              <option key={index} value={konum}>
                {konum}
              </option>
            ))}
          </select>

          {/* Arama kutusu */}
          <input
            type="text"
            placeholder="Yemekhane ara..."
            className="p-3 border-2 border-orange-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={arama}
            onChange={(e) => setArama(e.target.value)}
          />
        </div>
      </div>

      {/* Aktif Filtre Rozetleri */}
      {(seciliKonum || arama) && (
        <div className="mb-4 flex flex-wrap gap-2">
          {seciliKonum && (
            <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm shadow">
              Konum: {seciliKonum}
              <button
                className="ml-2 font-bold"
                onClick={() => setSeciliKonum('')}
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

      {/* Yemekhane Kartları */}
      {filtrelenmisYemekhaneler.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filtrelenmisYemekhaneler.map((yemekhane) => (
            <div
              key={yemekhane.id}
              className="bg-blue-900 text-white rounded-lg shadow-md p-5 transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-2">{yemekhane.isim}</h3>
              <p className="mb-1">
                <span className="font-bold text-orange-500">Konum:</span> {yemekhane.konum}
              </p>
              <p className="mb-1">
                <span className="font-bold text-orange-500">Çalışma Saatleri:</span> {yemekhane.acilis_saati} - {yemekhane.kapanis_saati}
              </p>
              <p>
                <span className="font-bold text-orange-500">Ücret:</span> {yemekhane.ucret} TL
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">Yemekhane bulunamadı.</p>
      )}

      {/* Yemek Listesi */}
      <h3 className="text-2xl font-bold text-white bg-blue-900 px-6 py-3 rounded-md shadow-md mb-4">
        Yemek Listesi
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {yemekListesi.map((gun, i) => (
          <div
            key={i}
            className="bg-blue-900 text-white rounded-lg shadow-md p-5 transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <p>
              <span className="font-bold text-orange-500">Tarih:</span> {gun.tarih}
            </p>
            <p>
              <span className="font-bold text-orange-500">Öğle:</span> {gun.ogle}
            </p>
            <p>
              <span className="font-bold text-orange-500">Akşam:</span> {gun.aksam}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YemekhaneListesi;
