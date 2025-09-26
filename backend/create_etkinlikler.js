const db = require('./db'); // db.js içinde knex config var

db.schema.dropTableIfExists('etkinlikler').then(() => {
  return db.schema.createTable('etkinlikler', table => {
    table.increments('id').primary();
    table.string('baslik');       // Etkinlik başlığı
    table.string('aciklama');     // Detay açıklama
    table.string('tarih');        // Etkinlik tarihi (YYYY-MM-DD)
    table.string('konum');
    table.string('saat');       // Nerede yapılacak
    table.datetime('eklenmis_veri');
  });
}).then(() => {
  console.log("✅ Etkinlikler tablosu oluşturuldu");

  const etkinlikVeri = [
    { baslik: 'Bahar Şenliği', aciklama: 'Konserler ve çeşitli aktiviteler', tarih: '2025-05-15', konum: 'Merkez Kampüs',saat: '10:00-21:00' },
    { baslik: 'Kariyer Günleri', aciklama: 'Firmalarla tanışma ve staj fırsatları', tarih: '2025-04-10', konum: 'Mühendislik Fakültesi Konferans Salonu',saat:'11:00-15:00' },
    { baslik: 'Tiyatro Gösterisi', aciklama: 'Üniversite tiyatro topluluğu gösterisi', tarih: '2025-03-20', konum: 'Edebiyat Fakültesi Tiyatro Salonu',saat:'20:00' },
    { baslik: 'Teknoloji ve Yapay Zeka Atölyesi', aciklama: 'Yapay zeka, veri bilimi ve robotik alanında temel eğitim ve uygulama çalışmaları', tarih: '2025-11-08', konum: 'Mühendislik Fakültesi Laboratuvarı',saat:'13:00-17:00' },
    { baslik: 'Açık Hava Film Gecesi', aciklama: 'Kampüs bahçesinde dev ekranda film gösterimi, öğrencilere ücretsiz patlamış mısır ve içecek', tarih: '2025-09-25', konum: 'Kampüs Açık Hava Sahnesi',saat:'20:00' }
  ].map(item => ({
    ...item,
    eklenmis_veri: new Date()
  }));

  return db('etkinlikler').insert(etkinlikVeri);
}).then(() => {
  console.log("✅ Etkinlik verileri eklendi");
  process.exit();
}).catch(err => {
  console.error("❌ Hata oluştu:", err);
  process.exit();
});
