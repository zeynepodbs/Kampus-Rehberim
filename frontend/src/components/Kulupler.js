import React, { useEffect, useState } from 'react';

function Kulupler() {
  const [kulupler, setKulupler] = useState([]);
  const [arama, setArama] = useState('');
  const [fakulteFiltre, setFakulteFiltre] = useState('');

  useEffect(() => {
    const fetchKulupler = async () => {
      try {
        let url = 'http://localhost:3001/kulupler';
        const params = [];
        if (arama) params.push(`isim=${encodeURIComponent(arama)}`);
        if (fakulteFiltre) params.push(`fakulte=${encodeURIComponent(fakulteFiltre)}`);
        if (params.length > 0) url += `?${params.join('&')}`;

        const res = await fetch(url);
        const data = await res.json();
        setKulupler(data);
      } catch (err) {
        console.error('Kulüpler alınamadı:', err);
      }
    };

    fetchKulupler();
  }, [arama, fakulteFiltre]);

  return (
    <div className="p-4 bg-[#fdfdf9] min-h-screen max-w-6xl mx-auto">
      {/* Başlık + Filtreler */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold text-white bg-blue-900 px-6 py-3 rounded-md shadow-md">
          Öğrenci Kulüpleri
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Fakülte filtre */}
          <select
            className="p-3 border-2 border-blue-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={fakulteFiltre}
            onChange={e => setFakulteFiltre(e.target.value)}
          >
            <option value="">Tüm Fakülteler</option>
            <option value="Edebiyat Fakültesi">Edebiyat Fakültesi</option>
            <option value="Mühendislik Fakültesi">Mühendislik Fakültesi</option>
            <option value="Güzel Sanatlar Fakültesi">Güzel Sanatlar Fakültesi</option>
            <option value="İletişim Fakültesi">İletişim Fakültesi</option>
            <option value="Beden Eğitimi Fakültesi">Beden Eğitimi Fakültesi</option>
            <option value="İktisat Fakültesi">İktisat Fakültesi</option>
            <option value="Sosyal Bilimler Fakültesi">Sosyal Bilimler Fakültesi</option>
          </select>

          {/* Arama kutusu */}
          <input
            type="text"
            placeholder="Kulüp adına göre ara..."
            className="p-3 border-2 border-orange-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={arama}
            onChange={e => setArama(e.target.value)}
          />
        </div>
      </div>

      {/* Aktif Filtre Rozeti */}
      {(fakulteFiltre || arama) && (
        <div className="mb-4 flex flex-wrap gap-2">
          {fakulteFiltre && (
            <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm shadow">
              Fakülte: {fakulteFiltre}
              <button
                className="ml-2 font-bold"
                onClick={() => setFakulteFiltre('')}
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

      {/* Kulüp Kartları */}
      {kulupler.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kulupler.map((kulup, i) => (
            <div
              key={i}
              className="bg-blue-900 text-white rounded-lg shadow-md p-5 transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <img
                src={`http://localhost:3001${kulup.logo_url}`}
                alt={kulup.isim}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold mb-2">{kulup.isim}</h3>
              <p className="text-orange-400 font-medium mb-1">{kulup.fakulte}</p>
              <p className="line-clamp-3">{kulup.aciklama}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">Kulüp bulunamadı.</p>
      )}
    </div>
  );
}

export default Kulupler;
