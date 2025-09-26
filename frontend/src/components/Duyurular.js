import React, { useEffect, useState } from 'react';

export default function Duyurular() {
  const [duyurular, setDuyurular] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/duyurular')
      .then(res => res.json())
      .then(data => setDuyurular(data))
      .catch(err => console.error('Duyurular alınamadı:', err));
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-3">Duyurular</h2>
      <ul className="space-y-2">
        {duyurular.map(duyuru => (
          <li key={duyuru.id} className="border-b pb-2">
            <strong>{duyuru.baslik}</strong>
            <p className="text-sm text-gray-600">{duyuru.tarih}</p>
            <p className="text-sm">{duyuru.icerik}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
