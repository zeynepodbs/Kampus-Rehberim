const db = require('./db');

db.schema.dropTableIfExists('yurtlar').then(() => {
  return db.schema.createTable('yurtlar', table => {
    table.increments('id').primary();
    table.string('isim');
    table.string('konum');
    table.text('aciklama');
    table.string('tur');            // KYK / Özel gibi
    table.integer('kapasite');
    table.string('telefon');
    table.string('email');
    table.text('resimler');         // JSON.stringify ile birden fazla resim
    table.datetime('eklenmis_veri');
  });
}).then(() => {
  console.log("✅ Yurtlar tablosu oluşturuldu");

  const yurtVeri = [
    {
      isim: 'Edebiyat KYK Kız Yurdu',
      konum: 'Edebiyat Fakültesi yanı',
      aciklama: '400 kişilik KYK yurdu.',
      tur: 'KYK',
      kapasite: 400,
      telefon: '0442 123 45 67',
      email: 'edebiyat@kyk.gov.tr',
      resimler: JSON.stringify(['edebiyat.jpg'])
    },
    {
      isim: 'Merkez KYK Erkek Yurdu',
      konum: 'Ana kampüs içinde',
      aciklama: '700 kişilik KYK yurdu.',
      tur: 'KYK',
      kapasite: 700,
      telefon: '0442 123 32 98',
      email: 'merkez@kyk.gov.tr',
      resimler: JSON.stringify(['merkez.jpg'])
    },
    {
      isim: 'Zeynep Hanım KYK Kız Yurdu',
      konum: 'Ana yemekhane karşısında',
      aciklama: '1000 kişilik KYK yurdu.',
      tur: 'KYK',
      kapasite: 1000,
      telefon: '0442 123 40 87',
      email: 'zeynephanim@kyk.gov.tr',
      resimler: JSON.stringify(['zeynep.jpg'])
    },
    {
      isim: 'Banu Hanım Özel Erkek Yurdu',
      konum: 'Merkez kütüphane yanı',
      aciklama: '800 kişilik özel erkek yurdu.',
      tur: 'Özel',
      kapasite: 800,
      telefon: '0442 123 34 87',
      email: 'banuhanim@kyk.gov.tr',
      resimler: JSON.stringify(['banu.jpg'])
    },
    {
      isim: 'Samsun Özel Kız Yurdu',
      konum: 'Mühendislik Fakültesi karşısı',
      aciklama: 'Özel yurt, çift kişilik odalar.',
      tur: 'Özel',
      kapasite: 150,
      telefon: '0442 765 43 21',
      email: 'samsun@yurt.com',
      resimler: JSON.stringify(['samsun.jpg'])
    }
  ].map(item => ({
    ...item,
    eklenmis_veri: new Date()
  }));

  return db('yurtlar').insert(yurtVeri);
}).then(() => {
  console.log("✅ Yurt verileri eklendi");
  process.exit();
}).catch(err => {
  console.error("❌ Hata oluştu:", err);
  process.exit();
});
