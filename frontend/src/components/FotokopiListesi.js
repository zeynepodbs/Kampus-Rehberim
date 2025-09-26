import React, { useEffect, useState } from 'react';

function FotokopiListesi() {
  const [fotokopiAlanlari, setFotokopiAlanlari] = useState([]);
  const [seciliKonum, setSeciliKonum] = useState('');
  const [arama, setArama] = useState('');
  const [tumKonumlar, setTumKonumlar] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/fotokopi')
      .then(res => res.json())
      .then(data => {
        setFotokopiAlanlari(data);
        setTumKonumlar([...new Set(data.map(f => f.konum))]);
      })
      .catch(err => console.error('Hata:', err));
  }, []);

  useEffect(() => {
    let url = 'http://localhost:3001/fotokopi?';
    if (seciliKonum) url += `konum=${encodeURIComponent(seciliKonum)}&`;
    if (arama) url += `arama=${encodeURIComponent(arama)}&`;

    fetch(url)
      .then(res => res.json())
      .then(data => setFotokopiAlanlari(data))
      .catch(err => console.error('Hata:', err));
  }, [seciliKonum, arama]);

  return (
    <div className="p-4 max-w-6xl mx-auto bg-[#fdfdf9] min-h-screen">
      {/* Başlık ve Filtreler */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold text-white bg-blue-900 px-6 py-3 rounded-md shadow-md">
          Kampüsteki Fotokopi Alanları
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Konum Seç */}
          <select
            id="konum"
            className="p-3 border-2 border-blue-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={seciliKonum}
            onChange={e => setSeciliKonum(e.target.value)}
          >
            <option value="">Tüm Konumlar</option>
            {tumKonumlar.map((konum, index) => (
              <option key={index} value={konum}>
                {konum}
              </option>
            ))}
          </select>
          {/* Arama */}
          <input
            type="text"
            placeholder="Fotokopi alanı ara..."
            className="p-3 border-2 border-orange-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={arama}
            onChange={e => setArama(e.target.value)}
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

      {/* Fotokopi Alanı Kartları */}
      {fotokopiAlanlari.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">Fotokopi alanı bulunamadı.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fotokopiAlanlari.map(fotokopi => (
            <div
              key={fotokopi.id}
              className="bg-blue-900 text-white rounded-lg p-5 shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-2">{fotokopi.isim}</h3>
              <p className="mb-1">
                <span className="text-orange-400 font-bold">Konum:</span> {fotokopi.konum}
              </p>
              <p>
                <span className="text-orange-400 font-bold">Açıklama:</span> {fotokopi.aciklama}
              </p>
          </div>

          ))}
        </div>
      )}
    </div>
  );
}

export default FotokopiListesi;
