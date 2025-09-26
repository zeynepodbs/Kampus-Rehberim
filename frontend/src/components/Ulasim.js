import React, { useEffect, useState } from 'react';

function Ulasim() {
  const [ulasimListesi, setUlasimListesi] = useState([]);
  const [guzergah, setGuzergah] = useState('');
  const [aracTuru, setAracTuru] = useState('');

  useEffect(() => {
    const fetchUlasim = async () => {
      try {
        let url = 'http://localhost:3001/ulasim';
        const params = [];
        if (guzergah) params.push(`guzergah=${encodeURIComponent(guzergah)}`);
        if (aracTuru) params.push(`arac_turu=${encodeURIComponent(aracTuru)}`);
        if (params.length > 0) url += `?${params.join('&')}`;

        const res = await fetch(url);
        const data = await res.json();
        setUlasimListesi(data);
      } catch (err) {
        console.error('Ulaşım verisi alınamadı:', err);
      }
    };

    fetchUlasim();
  }, [guzergah, aracTuru]);

  return (
    <div className="p-4 bg-[#fdfdf9] min-h-screen max-w-6xl mx-auto">
      {/* Başlık + Filtreler */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold text-white bg-blue-900 px-6 py-3 rounded-md shadow-md">
          Ulaşım Bilgileri
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Güzergah arama */}
          <input
            type="text"
            placeholder="Güzergah ara..."
            value={guzergah}
            onChange={e => setGuzergah(e.target.value)}
            className="p-3 border-2 border-orange-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* Araç Türü seçimi */}
          <select
            value={aracTuru}
            onChange={e => setAracTuru(e.target.value)}
            className="p-3 border-2 border-blue-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white text-black"
          >
            <option value="">Tüm Araç Türleri</option>
            <option value="Otobüs">Otobüs</option>
            <option value="Minibüs">Minibüs</option>
          </select>
        </div>
      </div>

      {/* Aktif Filtre Rozetleri */}
      {(guzergah || aracTuru) && (
        <div className="mb-4 flex flex-wrap gap-2">
          {guzergah && (
            <span className="inline-flex items-center bg-green-500 text-white px-3 py-1 rounded-full text-sm shadow">
              Güzergah: {guzergah}
              <button
                className="ml-2 font-bold"
                onClick={() => setGuzergah('')}
              >
                ×
              </button>
            </span>
          )}
          {aracTuru && (
            <span className="inline-flex items-center bg-orange-500 text-white px-3 py-1 rounded-full text-sm shadow">
              Araç Türü: {aracTuru}
              <button
                className="ml-2 font-bold"
                onClick={() => setAracTuru('')}
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}

      {/* Ulaşım Kartları */}
      {ulasimListesi.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ulasimListesi.map((item) => (
            <div
              key={item.id}
              className="bg-blue-900 text-white rounded-lg shadow-md p-5 transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <p>
                <strong className="text-orange-400 font-bold">Güzergah:</strong> {item.guzergah}
              </p>
              <p className="mb-1">
                <strong className="text-orange-400 font-bold">Araç Türü:</strong> {item.arac_turu}
              </p>
              <p>
                <strong className="text-orange-400 font-bold">Kalkış Noktası:</strong> {item.kalkis_noktasi}
              </p>
              <p>
                <strong className="text-orange-400 font-bold">Varış Noktası:</strong> {item.varis_noktasi}
              </p>
              <p>
                <strong className="text-orange-400 font-bold">Çalışma Saatleri:</strong> {item.saatler}
              </p>
              <p>
                <strong className="text-orange-400 font-bold">Ücret:</strong> {item.ucret} TL
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">Sonuç bulunamadı.</p>
      )}
    </div>
  );
}

export default Ulasim;
