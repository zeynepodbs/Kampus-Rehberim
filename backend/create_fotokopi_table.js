const db = require('./db');

db.schema.dropTableIfExists('fotokopi_alanlari').then(() => {
  return db.schema.createTable('fotokopi_alanlari', table => {
    table.increments('id').primary();
    table.string('isim');         // Fotokopi alanının adı
    table.string('konum');        // Nerede olduğu (örn: Edebiyat Fakültesi)
    table.string('aciklama');     // İstersen açıklama veya not
    table.datetime('eklenmis_veri');
  });
}).then(() => {
  console.log("✅ Fotokopi alanları tablosu oluşturuldu");

  const fotokopiVeri = [
    { isim: 'Edebiyat Fotokopi', konum: 'Edebiyat Fakültesi', aciklama: '2. katta, çalışma odası yakınında' },
    { isim: 'Mühendislik Fotokopi', konum: 'Mühendislik Fakültesi', aciklama: 'Zemin kat, kantin yanında' },
    { isim: 'Fen Fotokopi', konum: 'Fen Fakültesi', aciklama: 'Merdiven çıkışında' },
    { isim: 'Merkez Fotokopi', konum: 'Merkezi Yemekhane Yanı', aciklama: 'Geniş alan, 10 cihaz mevcut' },
    { isim: 'Eğitim Fotokopi', konum: 'Kazım Karabekir Eğitim Fakültesi', aciklama: 'Giriş kapısının sol tarafı' }
  ].map(item => ({
    ...item,
    eklenmis_veri: new Date()
  }));

  return db('fotokopi_alanlari').insert(fotokopiVeri);
}).then(() => {
  console.log("✅ Fotokopi alanları verileri eklendi");
  process.exit();
}).catch(err => {
  console.error("❌ Hata oluştu:", err);
  process.exit();
});
