const db = require('./db'); // db.js içinde knex config var

db.schema.dropTableIfExists('duyurular').then(() => {
  return db.schema.createTable('duyurular', table => {
    table.increments('id').primary();
    table.string('baslik');       // Duyuru başlığı
    table.string('icerik');       // Duyuru metni
    table.string('tarih');        // Duyuru tarihi (YYYY-MM-DD)
    table.datetime('eklenmis_veri');
  });
}).then(() => {
  console.log("✅ Duyurular tablosu oluşturuldu");

  const duyuruVeri = [
    { baslik: 'Vize Haftası Programı', icerik: 'Vize sınavları 14-20 Nisan arası yapılacaktır.', tarih: '2025-04-01' },
    { baslik: 'Kütüphane Çalışma Saatleri', icerik: 'Kütüphane 24 saat açık olacaktır.', tarih: '2025-03-25' },
    { baslik: 'Bahar Dönemi Kayıt Yenileme', icerik: 'Kayıt yenileme işlemleri 1-5 Şubat arası yapılacaktır.', tarih: '2025-02-01' },
    { baslik: 'Burs Başvuru Duyurusu', icerik: '2025–2026 eğitim yılı için karşılıksız burs başvuruları başladı. Son başvuru tarihi 15 Ekim 2025.', tarih: '2025-09-01' },
    { baslik: 'Spor Takımı Seçmeleri', icerik: ' Üniversitemizin basketbol, voleybol ve futbol takımlarına yeni oyuncu seçmeleri yapılacaktır.', tarih: ' 2025-09-10' }
  ].map(item => ({
    ...item,
    eklenmis_veri: new Date()
  }));

  return db('duyurular').insert(duyuruVeri);
}).then(() => {
  console.log("✅ Duyuru verileri eklendi");
  process.exit();
}).catch(err => {
  console.error("❌ Hata oluştu:", err);
  process.exit();
});
