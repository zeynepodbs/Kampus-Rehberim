// create_ulasim_table.js
const db = require('./db'); // db bağlantını doğru yoldan çağırdığından emin ol

db.schema.dropTableIfExists('ulasim').then(() => {
  return db.schema.createTable('ulasim', table => {
    table.increments('id').primary();
    table.string('guzergah');       // güzergah adı
    table.string('arac_turu');      // araç türü (Otobüs, Minibüs vb.)
    table.string('kalkis_noktasi'); // kalkış yeri
    table.string('varis_noktasi');  // varış yeri
    table.string('saatler');        // sefer saatleri (string olarak)
    table.decimal('ucret', 8, 2);   // ücret (örnek: 15.00)
    table.datetime('eklenmis_veri');// eklenme zamanı
  });
}).then(() => {
  console.log("✅ Ulaşım tablosu oluşturuldu");

  const ulasimData = [
    {
      guzergah: 'Kampüs - Şehir Merkezi',
      arac_turu: 'Otobüs',
      kalkis_noktasi: 'Ana Kampüs',
      varis_noktasi: 'Şehir Merkezi',
      saatler: '07:00, 08:00, 09:00, 10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00, 17:00, 18:00, 19:00, 20:00, 21:00, 22:00',
      ucret: 20.00
    },
    {
      guzergah: 'Kampüs - Yurtlar Bölgesi',
      arac_turu: 'Minibüs',
      kalkis_noktasi: 'Ana Kampüs',
      varis_noktasi: 'Yurtlar Bölgesi',
      saatler: '07:00, 08:00, 09:00, 10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00, 17:00, 18:00, 19:00, 20:00, 21:00, 22:00',
      ucret: 20.00
    },
    {
      guzergah: 'Kampüs - Yemekhaneler',
      arac_turu: 'Otobüs',
      kalkis_noktasi: 'Ana Kampüs',
      varis_noktasi: 'Edebiyat Fakültesi Yemekhanesi',
      saatler: '07:00, 08:00, 09:00, 10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00, 17:00, 18:00, 19:00, 20:00, 21:00, 22:00',
      ucret: 20.00
    },
    {
      guzergah: 'Kampüs - Fakülteler',
      arac_turu: 'Otobüs',
      kalkis_noktasi: 'Ana Kampüs',
      varis_noktasi: 'Edebiyat Fakültesi',
      saatler: '07:00, 08:00, 09:00, 10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00, 17:00, 18:00, 19:00, 20:00, 21:00, 22:00',
      ucret: 20.00
    },
    {
      guzergah: 'Kampüs - Kütüphaneler',
      arac_turu: 'Otobüs',
      kalkis_noktasi: 'Okuma Salonu 2',
      varis_noktasi: 'Okuma Salonu',
      saatler: '07:00, 08:00, 09:00, 10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00, 17:00, 18:00, 19:00, 20:00, 21:00, 22:00',
      ucret: 20.00
    }
  ].map(item => ({
    ...item,
    eklenmis_veri: new Date()
  }));

  return db('ulasim').insert(ulasimData);
}).then(() => {
  console.log("✅ Ulaşım verileri eklendi");
  process.exit();
}).catch(err => {
  console.error("❌ Hata oluştu:", err);
  process.exit();
});
