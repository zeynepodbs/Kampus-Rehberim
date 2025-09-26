const db = require('./db');

db.schema.dropTableIfExists('fakulteler').then(() => {
  return db.schema.createTable('fakulteler', table => {
    table.increments('id').primary();
    table.string('isim');
    table.string('adres');
    table.text('bolumler'); // JSON string olarak fakülte bölümleri
    table.string('telefon');
    table.string('email');
    table.datetime('eklenmis_veri');
  });
}).then(() => {
  console.log("✅ Fakülteler tablosu oluşturuldu");

  const fakulteData = [
  {
    isim: 'Açık ve Uzaktan Öğretim Fakültesi',
    adres: 'Atatürk Üniversitesi Kampüsü, Erzurum',
    bolumler: JSON.stringify(['Uzaktan Eğitim', 'Bilgisayar Programcılığı']),
    telefon: '0444 111 2222',
    email: 'aof@uni.edu.tr'
  },
  {
    isim: 'Diş Hekimliği Fakültesi',
    adres: 'Kampüs Mah. Diş Hekimliği Blokları, Erzurum',
    bolumler: JSON.stringify(['Diş Hekimliği']),
    telefon: '0444 333 4444',
    email: 'dishekimligi@uni.edu.tr'
  },
  {
    isim: 'Eczacılık Fakültesi',
    adres: 'Fen Fakültesi Yanı, Erzurum',
    bolumler: JSON.stringify(['Eczacılık']),
    telefon: '0444 555 6666',
    email: 'eczacilik@uni.edu.tr'
  },
  {
    isim: 'Edebiyat Fakültesi',
    adres: 'Edebiyat Fakültesi Binası, Erzurum',
    bolumler: JSON.stringify(['Türk Dili ve Edebiyatı', 'Tarih', 'Felsefe']),
    telefon: '0444 777 8888',
    email: 'edebiyat@uni.edu.tr'
  },
  {
    isim: 'Fen Fakültesi',
    adres: 'Fen Fakültesi Kampüsü, Erzurum',
    bolumler: JSON.stringify(['Matematik', 'Fizik', 'Kimya']),
    telefon: '0444 999 0000',
    email: 'fen@uni.edu.tr'
  },
  {
    isim: 'Güzel Sanatlar Fakültesi',
    adres: 'Güzel Sanatlar Kampüsü, Erzurum',
    bolumler: JSON.stringify(['Resim', 'Heykel', 'Grafik Tasarım']),
    telefon: '0444 123 9876',
    email: 'guzelsanatlar@uni.edu.tr'
  },
  {
    isim: 'Hemşirelik Fakültesi',
    adres: 'Sağlık Bilimleri Kampüsü, Erzurum',
    bolumler: JSON.stringify(['Hemşirelik']),
    telefon: '0444 321 6543',
    email: 'hemsirelik@uni.edu.tr'
  },
  {
    isim: 'Hukuk Fakültesi',
    adres: 'Hukuk Fakültesi Binası, Erzurum',
    bolumler: JSON.stringify(['Hukuk']),
    telefon: '0444 456 7890',
    email: 'hukuk@uni.edu.tr'
  },
  {
    isim: 'İktisadi ve İdari Bilimler Fakültesi',
    adres: 'İİBF Kampüsü, Erzurum',
    bolumler: JSON.stringify(['İktisat', 'İşletme', 'Kamu Yönetimi']),
    telefon: '0444 147 2583',
    email: 'iibf@uni.edu.tr'
  },
  {
    isim: 'İlahiyat Fakültesi',
    adres: 'İlahiyat Kampüsü, Erzurum',
    bolumler: JSON.stringify(['Temel İslam Bilimleri', 'Felsefe']),
    telefon: '0444 369 2581',
    email: 'ilahiyat@uni.edu.tr'
  },
  {
    isim: 'İletişim Fakültesi',
    adres: 'İletişim Kampüsü, Erzurum',
    bolumler: JSON.stringify(['Gazetecilik', 'Radyo TV ve Sinema']),
    telefon: '0444 741 8529',
    email: 'iletisim@uni.edu.tr'
  },
  {
    isim: 'Kazım Karabekir Eğitim Fakültesi',
    adres: 'KK Eğitim Kampüsü, Erzurum',
    bolumler: JSON.stringify(['Sınıf Öğretmenliği', 'Matematik Öğretmenliği']),
    telefon: '0444 963 8527',
    email: 'kke@uni.edu.tr'
  },
  {
    isim: 'Mimarlık ve Tasarım Fakültesi',
    adres: 'Mimarlık Kampüsü, Erzurum',
    bolumler: JSON.stringify(['Mimarlık', 'Endüstri Ürünleri Tasarımı']),
    telefon: '0444 753 1596',
    email: 'mimarlik@uni.edu.tr'
  },
  {
    isim: 'Mühendislik Fakültesi',
    adres: 'Mühendislik Kampüsü, Erzurum',
    bolumler: JSON.stringify(['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği']),
    telefon: '0444 852 9631',
    email: 'muhendislik@uni.edu.tr'
  },
  {
    isim: 'Oltu Beşeri ve Sosyal Bilimler Fakültesi',
    adres: 'Oltu Kampüsü, Erzurum',
    bolumler: JSON.stringify(['Sosyoloji', 'Psikoloji']),
    telefon: '0444 951 7532',
    email: 'oltu@uni.edu.tr'
  },
  {
    isim: 'Sağlık Bilimleri Fakültesi',
    adres: 'Sağlık Bilimleri Kampüsü, Erzurum',
    bolumler: JSON.stringify(['Beslenme ve Diyetetik', 'Fizyoterapi']),
    telefon: '0444 753 2589',
    email: 'saglikbilimleri@uni.edu.tr'
  },
  {
    isim: 'Spor Bilimleri Fakültesi',
    adres: 'Spor Kampüsü, Erzurum',
    bolumler: JSON.stringify(['Beden Eğitimi ve Spor Öğretmenliği']),
    telefon: '0444 147 9632',
    email: 'sporbilimleri@uni.edu.tr'
  },
  {
    isim: 'Su Ürünleri Fakültesi',
    adres: 'Su Ürünleri Kampüsü, Erzurum',
    bolumler: JSON.stringify(['Su Ürünleri Mühendisliği']),
    telefon: '0444 369 7410',
    email: 'suurunleri@uni.edu.tr'
  },
  {
    isim: 'Tıp Fakültesi',
    adres: 'Tıp Fakültesi Kampüsü, Erzurum',
    bolumler: JSON.stringify(['Tıp']),
    telefon: '0444 258 3691',
    email: 'tip@uni.edu.tr'
  },
  {
    isim: 'Turizm Fakültesi',
    adres: 'Turizm Kampüsü, Erzurum',
    bolumler: JSON.stringify(['Turizm ve Otelcilik']),
    telefon: '0444 159 7538',
    email: 'turizm@uni.edu.tr'
  },
  {
    isim: 'Uygulamalı Bilimler Fakültesi',
    adres: 'Uygulamalı Bilimler Kampüsü, Erzurum',
    bolumler: JSON.stringify(['Gıda Mühendisliği', 'Çevre Mühendisliği']),
    telefon: '0444 753 9512',
    email: 'uygulamali@uni.edu.tr'
  },
  {
    isim: 'Veteriner Fakültesi',
    adres: 'Veteriner Kampüsü, Erzurum',
    bolumler: JSON.stringify(['Veterinerlik']),
    telefon: '0444 852 7410',
    email: 'veteriner@uni.edu.tr'
  },
  {
    isim: 'Ziraat Fakültesi',
    adres: 'Ziraat Kampüsü, Erzurum',
    bolumler: JSON.stringify(['Tarım Mühendisliği', 'Bahçe Bitkileri']),
    telefon: '0444 951 1478',
    email: 'ziraat@uni.edu.tr'
  }
  ].map(item => ({
    ...item,
    eklenmis_veri: new Date()
  }));

  return db('fakulteler').insert(fakulteData);
}).then(() => {
  console.log("✅ Fakülteler verileri eklendi");
  process.exit();
}).catch(err => {
  console.error("❌ Hata oluştu:", err);
  process.exit();
});
