const db = require('./db');

db.schema.dropTableIfExists('yemek_listesi').then(() => {
  return db.schema.createTable('yemek_listesi', table => {
    table.increments('id').primary();
    table.date('tarih');
    table.string('ogle');
    table.string('aksam');
    table.datetime('eklenmis_veri');
  });
}).then(() => {
  console.log("✅ Yemek listesi tablosu oluşturuldu");

  const yemekVerileri = [
    {
      tarih: '2025-08-02',
      ogle: 'Mercimek Çorbası, Izgara Tavuk, Pilav, Yoğurt',
      aksam: 'Ezogelin Çorbası, Köfte, Makarna, Meyve'
    },
    {
      tarih: '2025-08-03',
      ogle: 'Tarhana Çorbası, Fırın Tavuk, Bulgur Pilavı, Ayran',
      aksam: 'Domates Çorbası, Kuru Fasulye, Pilav, Tatlı'
    }
  ].map(item => ({
    ...item,
    eklenmis_veri: new Date()
  }));

  return db('yemek_listesi').insert(yemekVerileri);
}).then(() => {
  console.log("✅ Yemek verileri eklendi");
  process.exit();
}).catch(err => {
  console.error("❌ Hata oluştu:", err);
  process.exit();
});

