import React, { useEffect, useState } from 'react';

export default function Etkinlikler() {
  const [etkinlikler, setEtkinlikler] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/etkinlikler')
      .then(res => res.json())
      .then(data => setEtkinlikler(data))
      .catch(err => console.error('Etkinlikler alınamadı:', err));
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-3">Etkinlikler</h2>
      <ul className="space-y-2">
        {etkinlikler.map(etkinlik => (
          <li key={etkinlik.id} className="border-b pb-2">
            <strong>{etkinlik.baslik}</strong>
            <p className="text-sm text-gray-600">{etkinlik.tarih}</p>
            <p className="text-sm">{etkinlik.aciklama}</p>
            <p className="text-sm text-gray-600">{etkinlik.saat}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
