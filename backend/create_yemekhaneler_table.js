// yemekhaneyi oluştur ve örnek verilerle doldur
const db = require('./db');

db.schema.dropTableIfExists('yemekhaneler').then(() => {
  return db.schema.createTable('yemekhaneler', table => {
    table.increments('id').primary();
    table.string('isim');
    table.string('konum');
    table.string('acilis_saati');
    table.string('kapanis_saati');
    table.decimal('ucret');
    table.datetime('eklenmis_veri');
  });
}).then(() => {
  const veriler = [
    {
      isim: 'Merkezi Yemekhane',
      konum: 'Sağlık Bilimleri Fakültesi Yanı',
      acilis_saati: '11:00',
      kapanis_saati: '19:00',
      ucret: 30
    },
    {
      isim: 'Edebiyat Fakültesi Yemekhanesi',
      konum: 'Edebiyat Fakültesi Yanı',
      acilis_saati: '11:00',
      kapanis_saati: '19:00',
      ucret: 30
    }
  ].map(item => ({
    ...item,
    eklenmis_veri: new Date()
  }));

  return db('yemekhaneler').insert(veriler);
}).then(() => {
  console.log("✅ Yemekhane verileri eklendi");
  process.exit();
}).catch(err => {
  console.error("❌ Hata oluştu:", err);
  process.exit();
});
