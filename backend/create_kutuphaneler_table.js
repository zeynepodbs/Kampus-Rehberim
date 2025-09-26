const db = require('./db'); // db bağlantını doğru yoldan çağırdığından emin ol

db.schema.dropTableIfExists('kutuphaneler').then(() => {
  return db.schema.createTable('kutuphaneler', table => {
    table.increments('id').primary();
    table.string('isim');
    table.string('konum');
    table.string('fakulte_adi'); // Fakülte bilgisini boş bırakabilirsin ya da doldurabilirsin
    table.time('acilis_saati');   // açılış saati
    table.time('kapanis_saati');  // kapanış saati
    table.datetime('eklenmis_veri');
  });
}).then(() => {
  console.log("✅ Kütüphaneler tablosu oluşturuldu");

  const kutuphanelerData = [
    { isim: 'Merkez Kütüphane', konum: 'Ana Kampüs', fakulte_adi: '', acilis_saati: '08:00', kapanis_saati: '22:00' },
    { isim: 'Okuma Salonu 1', konum: 'Fen Fakültesi Yanı', fakulte_adi: '', acilis_saati: '09:00', kapanis_saati: '20:00' },
    { isim: 'Okuma Salonu 2', konum: 'Mühendislik Fakültesi', fakulte_adi: '', acilis_saati: '09:00', kapanis_saati: '21:00' }
  ].map(item => ({
    ...item,
    eklenmis_veri: new Date()
  }));

  return db('kutuphaneler').insert(kutuphanelerData);
}).then(() => {
  console.log("✅ Kütüphaneler verileri eklendi");
  process.exit();
}).catch(err => {
  console.error("❌ Hata oluştu:", err);
  process.exit();
});

