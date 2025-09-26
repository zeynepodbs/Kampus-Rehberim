import React, { useEffect, useState } from 'react';

const fakulteler = [
  'Açık ve Uzaktan Öğretim Fakültesi',
  'Diş Hekimliği Fakültesi',
  'Eczacılık Fakültesi',
  'Edebiyat Fakültesi',
  'Fen Fakültesi',
  'Güzel Sanatlar Fakültesi',
  'Hemşirelik Fakültesi',
  'Hukuk Fakültesi',
  'İktisadi ve İdari Bilimler Fakültesi',
  'İlahiyat Fakültesi',
  'İletişim Fakültesi',
  'Kazım Karabekir Eğitim Fakültesi',
  'Mimarlık ve Tasarım Fakültesi',
  'Mühendislik Fakültesi',
  'Oltu Beşeri ve Sosyal Bilimler Fakültesi',
  'Sağlık Bilimleri Fakültesi',
  'Spor Bilimleri Fakültesi',
  'Su Ürünleri Fakültesi',
  'Tıp Fakültesi',
  'Turizm Fakültesi',
  'Uygulamalı Bilimler Fakültesi',
  'Veteriner Fakültesi',
  'Ziraat Fakültesi'
];

function KantinListesi() {
  const [kantinler, setKantinler] = useState([]);
  const [seciliFakulte, setSeciliFakulte] = useState('');
  const [arama, setArama] = useState('');

  useEffect(() => {
    let url = 'http://localhost:3001/kantinler';
    if (seciliFakulte) {
      url += `?fakulte=${encodeURIComponent(seciliFakulte)}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => setKantinler(data))
      .catch(err => console.error('Hata:', err));
  }, [seciliFakulte]);

  const filtrelenmisKantinler = kantinler.filter(k =>
    k.isim.toLowerCase().includes(arama.toLowerCase())
  );

  return (
    <div className="p-4 max-w-4xl mx-auto bg-[#fdfdf9] min-h-screen">
      {/* Başlık + Filtreler */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold text-white bg-blue-900 px-6 py-3 rounded-md shadow-md">
          Kampüsteki Kantinler
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Fakülte seçimi */}
          <select
            id="fakulte"
            className="p-3 border-2 border-blue-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 w-full md:w-auto"
            value={seciliFakulte}
            onChange={e => setSeciliFakulte(e.target.value)}
          >
            <option value="">Tüm Fakülteler</option>
            {fakulteler.map(fakulte => (
              <option key={fakulte} value={fakulte}>
                {fakulte}
              </option>
            ))}
          </select>

          {/* Arama */}
          <input
            id="arama"
            type="text"
            placeholder="Kantin adına göre ara..."
            className="p-3 border-2 border-orange-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 w-full md:w-auto"
            value={arama}
            onChange={e => setArama(e.target.value)}
          />
        </div>
      </div>

      {/* Aktif filtre rozetleri */}
      {(seciliFakulte || arama) && (
        <div className="mb-4 flex flex-wrap gap-2">
          {seciliFakulte && (
            <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm shadow">
              Fakülte: {seciliFakulte}
              <button
                className="ml-2 font-bold"
                onClick={() => setSeciliFakulte('')}
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

      {/* Kantin kartları */}
      {filtrelenmisKantinler.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">Kantin bulunamadı.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrelenmisKantinler.map(kantin => (
            <div
              key={kantin.id}
              className="bg-blue-900 text-white rounded-lg p-5 shadow-md flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2">{kantin.isim}</h3>
              <p>
                <strong className="text-orange-400 font-bold">Fakülte:</strong> {kantin.fakulte_adi}
              </p>
              <p>
                <strong className="text-orange-400 font-bold">Konum:</strong> {kantin.konum}
              </p>
              <p>
                <strong className="text-orange-400 font-bold">Çalışma Saatleri:</strong> {kantin.acilis_saati} - {kantin.kapanis_saati}
              </p>
            </div>

          ))}
        </div>
      )}
    </div>
  );
}

export default KantinListesi;
