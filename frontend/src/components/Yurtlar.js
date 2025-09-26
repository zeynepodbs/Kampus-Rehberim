import React, { useEffect, useState } from 'react';

function Yurtlar() {
  const [yurtlar, setYurtlar] = useState([]);
  const [arama, setArama] = useState('');
  const [turFiltre, setTurFiltre] = useState('');

  useEffect(() => {
    const fetchYurtlar = async () => {
      try {
        let url = 'http://localhost:3001/yurtlar';
        const params = [];
        if (arama) params.push(`isim=${arama}`);
        if (turFiltre) params.push(`tur=${turFiltre}`);
        if (params.length > 0) url += `?${params.join('&')}`;

        const res = await fetch(url);
        const data = await res.json();
        setYurtlar(data);
      } catch (err) {
        console.error('Yurtlar alınamadı:', err);
      }
    };

    fetchYurtlar();
  }, [arama, turFiltre]);

  return (
    <div className="p-4 bg-[#fdfdf9] min-h-screen max-w-6xl mx-auto">
      {/* Başlık */}
      <h2 className="text-3xl font-bold text-white bg-blue-900 px-6 py-3 rounded-md shadow-md mb-6">
        Kampüs Yurtları ve Barınma
      </h2>

      {/* Filtre & Arama */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Yurt adı ara..."
          className="p-3 border-2 border-orange-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 w-full md:w-1/2"
          value={arama}
          onChange={e => setArama(e.target.value)}
        />
        <select
          className="p-3 border-2 border-blue-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 w-full md:w-1/2"
          value={turFiltre}
          onChange={e => setTurFiltre(e.target.value)}
        >
          <option value="">Tüm Türler</option>
          <option value="KYK">KYK</option>
          <option value="Özel">Özel</option>
        </select>
      </div>

      {/* Aktif Filtre Rozeti */}
      {(arama || turFiltre) && (
        <div className="mb-4 flex flex-wrap gap-2">
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
          {turFiltre && (
            <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm shadow">
              Tür: {turFiltre}
              <button
                className="ml-2 font-bold"
                onClick={() => setTurFiltre('')}
              >
                ×
              </button>
            </span>
          )}
          
        </div>
      )}

      {/* Yurt Kartları */}
      {yurtlar.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {yurtlar.map((yurt) => {
            let resimListesi = [];
            try {
              resimListesi = JSON.parse(yurt.resimler);
            } catch {
              resimListesi = [];
            }
            const ilkResim = resimListesi.length > 0 ? `/img/${resimListesi[0]}` : '/default-yurt.jpg';

            return (
              <div
                key={yurt.id}
                className="bg-blue-900 text-white rounded-lg shadow-md p-4 transform transition duration-300 hover:scale-105 hover:shadow-lg"
              >
                <img
                  src={ilkResim}
                  alt={yurt.isim}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h3 className="text-lg font-semibold mb-1">{yurt.isim}</h3>
                <p><span className="text-orange-400 font-semibold">Tür:</span> {yurt.tur}</p>
                <p><span className="text-orange-400 font-semibold">Konum:</span> {yurt.konum}</p>
                <p><span className="text-orange-400 font-semibold">Açıklama:</span> {yurt.aciklama}</p>
                <p><span className="text-orange-400 font-semibold">Kapasite:</span> {yurt.kapasite}</p>
                <p><span className="text-orange-400 font-semibold">Telefon:</span> {yurt.telefon}</p>
                <p><span className="text-orange-400 font-semibold">Email:</span> {yurt.email}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">Sonuç bulunamadı.</p>
      )}
    </div>
  );
}

export default Yurtlar;
