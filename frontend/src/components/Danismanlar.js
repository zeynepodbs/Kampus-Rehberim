import React, { useEffect, useState } from 'react';

function Danismanlar() {
  const [danismanlar, setDanismanlar] = useState([]);
  const [fakulteFiltre, setFakulteFiltre] = useState('');
  const [arama, setArama] = useState('');

  useEffect(() => {
    const fetchDanismanlar = async () => {
      try {
        let url = 'http://localhost:3001/danismanlar';
        if (fakulteFiltre) {
          url += `?fakulte=${encodeURIComponent(fakulteFiltre)}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setDanismanlar(data);
      } catch (err) {
        console.error('Danışmanlar alınamadı:', err);
      }
    };

    fetchDanismanlar();
  }, [fakulteFiltre]);

  // Arama filtresi (isim veya unvan içinde geçenleri filtreler)
  const filtrelenmisDanismanlar = danismanlar.filter(d =>
    d.isim.toLowerCase().includes(arama.toLowerCase()) ||
    d.unvan.toLowerCase().includes(arama.toLowerCase())
  );

  return (
    <div className="p-4 bg-[#fdfdf9] min-h-screen max-w-6xl mx-auto">
      {/* Başlık + Filtreler */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold text-white bg-blue-900 px-6 py-3 rounded-md shadow-md">
          Akademik Danışmanlar
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Fakülte filtre */}
          <select
            className="p-3 border-2 border-blue-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={fakulteFiltre}
            onChange={e => setFakulteFiltre(e.target.value)}
          >
            <option value="">Tüm Fakülteler</option>
            <option value="Açık ve Uzaktan Öğretim Fakültesi">Açık ve Uzaktan Öğretim Fakültesi</option>
            <option value="Diş Hekimliği Fakültesi">Diş Hekimliği Fakültesi</option>
            <option value="Eczacılık Fakültesi">Eczacılık Fakültesi</option>
            <option value="Edebiyat Fakültesi">Edebiyat Fakültesi</option>
            <option value="Fen Fakültesi">Fen Fakültesi</option>
            <option value="Güzel Sanatlar Fakültesi">Güzel Sanatlar Fakültesi</option>
            <option value="Hemşirelik Fakültesi">Hemşirelik Fakültesi</option>
            <option value="Hukuk Fakültesi">Hukuk Fakültesi</option>
            <option value="İktisadi ve İdari Bilimler Fakültesi">İktisadi ve İdari Bilimler Fakültesi</option>
            <option value="İlahiyat Fakültesi">İlahiyat Fakültesi</option>
            <option value="İletişim Fakültesi">İletişim Fakültesi</option>
            <option value="Kazım Karabekir Eğitim Fakültesi">Kazım Karabekir Eğitim Fakültesi</option>
            <option value="Mimarlık ve Tasarım Fakültesi">Mimarlık ve Tasarım Fakültesi</option>
            <option value="Mühendislik Fakültesi">Mühendislik Fakültesi</option>
            <option value="Oltu Beşeri ve Sosyal Bilimler Fakültesi">Oltu Beşeri ve Sosyal Bilimler Fakültesi</option>
            <option value="Sağlık Bilimleri Fakültesi">Sağlık Bilimleri Fakültesi</option>
            <option value="Spor Bilimleri Fakültesi">Spor Bilimleri Fakültesi</option>
            <option value="Su Ürünleri Fakültesi">Su Ürünleri Fakültesi</option>
            <option value="Tıp Fakültesi">Tıp Fakültesi</option>
            <option value="Turizm Fakültesi">Turizm Fakültesi</option>
            <option value="Uygulamalı Bilimler Fakültesi">Uygulamalı Bilimler Fakültesi</option>
            <option value="Veteriner Fakültesi">Veteriner Fakültesi</option>
            <option value="Ziraat Fakültesi">Ziraat Fakültesi</option>
          </select>

          {/* Arama kutusu */}
          <input
            type="text"
            placeholder="İsim veya unvan ara..."
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

      {/* Danışman Kartları */}
      {filtrelenmisDanismanlar.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrelenmisDanismanlar.map((danisman, i) => (
            <div
              key={i}
              className="bg-blue-900 text-white rounded-lg shadow-md p-5 transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-2">{danisman.isim}</h3>
              <p className="text-white font-bold mb-1">{danisman.unvan}</p>
              <p className="mb-1">
                <strong className="text-orange-400 font-bold">Fakülte:</strong> {danisman.fakulte}
              </p>
              <p className="truncate">
                <strong className="text-orange-400 font-bold">Email:</strong> {danisman.eposta}
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

export default Danismanlar;

