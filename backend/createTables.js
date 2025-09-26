const db = require('./db');

db.schema.dropTableIfExists('kantinler').then(() => {
  return db.schema.createTable('kantinler', table => {
    table.increments('id').primary();
    table.string('isim');
    table.string('konum');
    table.string('fakulte_adi'); // ✅ yeni sütun
    table.time('acilis_saati');
    table.time('kapanis_saati');
    table.datetime('eklenmis_veri');
  });
}).then(() => {
  console.log("✅ Tablo oluşturuldu");

  const fakulteKantinleri = [
    { isim: 'AÖF Kantini', konum: 'Giriş Kat', fakulte_adi: 'Açık ve Uzaktan Öğretim Fakültesi' },
    { isim: 'Diş Hekimliği Fakültesi Kantini', konum: 'Zemin Kat', fakulte_adi: 'Diş Hekimliği Fakültesi' },
    { isim: 'Eczacılık Fakültesi Kantini', konum: 'Bahçe Yanı', fakulte_adi: 'Eczacılık Fakültesi' },
    { isim: 'Edebiyat Fakültesi Kantini', konum: 'A Blok', fakulte_adi: 'Edebiyat Fakültesi' },
    { isim: 'Fen Fakültesi Kantini', konum: 'B Blok', fakulte_adi: 'Fen Fakültesi' },
    { isim: 'Güzel Sanatlar Fakültesi Kantini', konum: 'Ana Giriş', fakulte_adi: 'Güzel Sanatlar Fakültesi' },
    { isim: 'Hemşirelik Fakültesi Kantini', konum: '1. Kat', fakulte_adi: 'Hemşirelik Fakültesi' },
    { isim: 'Hukuk Fakültesi Kantini', konum: 'D Blok Altı', fakulte_adi: 'Hukuk Fakültesi' },
    { isim: 'İİBF Kantini', konum: 'Bahçe', fakulte_adi: 'İktisadi ve İdari Bilimler Fakültesi' },
    { isim: 'İlahiyat Fakültesi Kantini', konum: 'Bina Yanı', fakulte_adi: 'İlahiyat Fakültesi' },
    { isim: 'İletişim Fakültesi Kantini', konum: 'Zemin Kat', fakulte_adi: 'İletişim Fakültesi' },
    { isim: 'KKEF Kantini', konum: 'Giriş Kat', fakulte_adi: 'Kazım Karabekir Eğitim Fakültesi' },
    { isim: 'Mimarlık Fakültesi Kantini', konum: 'A Blok', fakulte_adi: 'Mimarlık ve Tasarım Fakültesi' },
    { isim: 'Mühendislik Fakültesi Kantini', konum: 'C Blok', fakulte_adi: 'Mühendislik Fakültesi' },
    { isim: 'Oltu Sosyal Bilimler Fakültesi Kantini', konum: 'Yan Bina', fakulte_adi: 'Oltu Beşeri ve Sosyal Bilimler Fakültesi' },
    { isim: 'Sağlık Bilimleri Fakültesi Kantini', konum: 'Arka Bahçe', fakulte_adi: 'Sağlık Bilimleri Fakültesi' },
    { isim: 'Spor Bilimleri Fakültesi Kantini', konum: 'Spor Kompleksi', fakulte_adi: 'Spor Bilimleri Fakültesi' },
    { isim: 'Su Ürünleri Fakültesi Kantini', konum: 'Bina Altı', fakulte_adi: 'Su Ürünleri Fakültesi' },
    { isim: 'Tıp Fakültesi Kantini', konum: 'Hastane Yanı', fakulte_adi: 'Tıp Fakültesi' },
    { isim: 'Turizm Fakültesi Kantini', konum: 'Zemin Kat', fakulte_adi: 'Turizm Fakültesi' },
    { isim: 'Uygulamalı Bilimler Fakültesi Kantini', konum: 'A Blok', fakulte_adi: 'Uygulamalı Bilimler Fakültesi' },
    { isim: 'Veteriner Fakültesi Kantini', konum: 'Çiftlik Girişi', fakulte_adi: 'Veteriner Fakültesi' },
    { isim: 'Ziraat Fakültesi Kantini', konum: 'Arka Giriş', fakulte_adi: 'Ziraat Fakültesi' }
  ];

  const fullData = fakulteKantinleri.map(item => ({
    ...item,
    acilis_saati: '08:00',
    kapanis_saati: '18:00',
    eklenmis_veri: new Date()
  }));

  return db('kantinler').insert(fullData);
}).then(() => {
  console.log("✅ Tüm kantinler eklendi");
  process.exit();
}).catch(err => {
  console.error("❌ Hata oluştu:", err);
  process.exit();
});
