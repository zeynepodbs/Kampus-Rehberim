import React, { useEffect, useState } from 'react';

function FakulteListesi() {
  const [fakulteler, setFakulteler] = useState([]);
  const [seciliFakulteId, setSeciliFakulteId] = useState('');
  const [arama, setArama] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/fakulteler')
      .then(res => res.json())
      .then(data => setFakulteler(data))
      .catch(err => console.error('Hata:', err));
  }, []);

  const handleSecim = (id) => {
    setSeciliFakulteId(id);
  };

  // Fakülte id filtresi
  let gosterilecekFakulteler = seciliFakulteId
    ? fakulteler.filter(f => f.id === Number(seciliFakulteId))
    : fakulteler;

  // Arama filtresi
  gosterilecekFakulteler = gosterilecekFakulteler.filter(f =>
    f.isim.toLowerCase().includes(arama.toLowerCase())
  );

  return (
    <div className="p-4 max-w-6xl mx-auto bg-[#fdfdf9] min-h-screen">
      {/* Başlık + Filtreler */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold text-white bg-blue-900 px-6 py-3 rounded-md shadow-md">
          Fakülteler Hakkında Bilgi
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Fakülte Seç Dropdown */}
          <select
            id="fakulteSelect"
            className="p-3 border-2 border-blue-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={seciliFakulteId}
            onChange={e => handleSecim(e.target.value)}
          >
            <option value="">Tüm Fakülteler</option>
            {fakulteler.map(fakulte => (
              <option key={fakulte.id} value={fakulte.id}>
                {fakulte.isim}
              </option>
            ))}
          </select>

          {/* Arama Kutusu */}
          <input
            type="text"
            placeholder="Fakülte ara..."
            className="p-3 border-2 border-orange-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={arama}
            onChange={e => setArama(e.target.value)}
          />
        </div>
      </div>

      {/* Aktif Filtre Rozetleri */}
      {(seciliFakulteId || arama) && (
        <div className="mb-4 flex flex-wrap gap-2">
          {seciliFakulteId && (
            <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm shadow">
              Fakülte ID: {seciliFakulteId}
              <button
                className="ml-2 font-bold"
                onClick={() => setSeciliFakulteId('')}
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

      {/* Fakülte Kartları */}
      {gosterilecekFakulteler.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">Fakülte bulunamadı.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gosterilecekFakulteler.map(fakulte => (
            <div
              key={fakulte.id}
              className="bg-blue-900 text-white rounded-lg p-5 shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-2">{fakulte.isim}</h3>
              <p className="mb-1">
                <span className="font-bold text-orange-500">Adres:</span> {fakulte.adres}
              </p>
              <p className="mb-1">
                <span className="font-bold text-orange-500">Bölümler:</span>
              </p>
              <ul className="list-disc list-inside mb-2">
                {JSON.parse(fakulte.bolumler).map((bolum, i) => (
                  <li key={i}>{bolum}</li>
                ))}
              </ul>
              <p className="mb-1">
                <span className="font-bold text-orange-500">Telefon:</span> {fakulte.telefon}
              </p>
              <p className="truncate">
                <span className="font-bold text-orange-500">E-posta:</span> {fakulte.email}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FakulteListesi;
