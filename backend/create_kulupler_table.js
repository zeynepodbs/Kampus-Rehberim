const db = require('./db');

db.schema.dropTableIfExists('ogrenci_kulupleri').then(() => {
  return db.schema.createTable('ogrenci_kulupleri', table => {
    table.increments('id').primary();
    table.string('isim');          // Kulüp ismi
    table.string('fakulte');       // Bağlı olduğu fakülte
    table.text('aciklama');        // Kulüp açıklaması
    table.string('iletisim');      // Örn: Instagram adresi
    table.string('toplanti_saati');// Toplantı günü/saati
    table.string('logo_url');      // Logo resim yolu
    table.datetime('eklenmis_veri');
  });
}).then(() => {
  console.log("✅ ogrenci_kulupleri tablosu oluşturuldu");

  const kulupVeri = [
  {
    isim: 'Yapay Zeka Kulübü',
    fakulte: 'Mühendislik Fakültesi',
    aciklama: 'Yapay zeka, makine öğrenimi ve robotik ile ilgilenen öğrencilerin kulübü.',
    iletisim: 'instagram.com/yapayzeka_kulubu',
    toplanti_saati: 'Salı 17:00',
    logo_url: '/img/yapayzeka.png'
  },
  {
    isim: 'Tiyatro Kulübü',
    fakulte: 'Edebiyat Fakültesi',
    aciklama: 'Sahne sanatlarına ilgi duyan öğrenciler için tiyatro atölyeleri ve gösteriler.',
    iletisim: 'instagram.com/tiyatro_kulubu',
    toplanti_saati: 'Cuma 16:00',
    logo_url: '/img/tiyatro.png'
  },
  {
    isim: 'Müzik Kulübü',
    fakulte: 'Güzel Sanatlar Fakültesi',
    aciklama: 'Müzik yapan ve dinleyen öğrenciler için konser ve etkinlik düzenleyen topluluk.',
    iletisim: 'instagram.com/muzik_kulubu',
    toplanti_saati: 'Perşembe 18:00',
    logo_url: '/img/muzik.png'
  },
  {
    isim: 'Fotoğrafçılık Kulübü',
    fakulte: 'İletişim Fakültesi',
    aciklama: 'Fotoğraf çekmeyi seven öğrenciler için atölyeler ve geziler düzenleyen kulüp.',
    iletisim: 'instagram.com/fotograf_kulubu',
    toplanti_saati: 'Çarşamba 16:30',
    logo_url: '/img/fotograf.png'
  },
  {
    isim: 'Dağcılık ve Doğa Sporları Kulübü',
    fakulte: 'Beden Eğitimi Fakültesi',
    aciklama: 'Doğa yürüyüşleri, tırmanış ve kamp etkinlikleri düzenleyen kulüp.',
    iletisim: 'instagram.com/dagcilik_kulubu',
    toplanti_saati: 'Cumartesi 10:00',
    logo_url: '/img/dagcilik.png'
  },
  {
    isim: 'Girişimcilik Kulübü',
    fakulte: 'İktisat Fakültesi',
    aciklama: 'İş fikirleri geliştirme, seminerler ve networking etkinlikleri.',
    iletisim: 'instagram.com/girisim_kulubu',
    toplanti_saati: 'Pazartesi 17:30',
    logo_url: '/img/girisim.png'
  },
  {
    isim: 'Bilim Kurgu ve Fantastik Kurgu Kulübü',
    fakulte: 'Edebiyat Fakültesi',
    aciklama: 'Bilim kurgu kitapları, filmleri ve masa oyunları üzerine etkinlikler.',
    iletisim: 'instagram.com/bilimkurgu_kulubu',
    toplanti_saati: 'Cuma 18:00',
    logo_url: '/img/bilimkurgu.png'
  },
  {
    isim: 'Dans Kulübü',
    fakulte: 'Güzel Sanatlar Fakültesi',
    aciklama: 'Modern dans, halk oyunları ve salsa çalışmaları.',
    iletisim: 'instagram.com/dans_kulubu',
    toplanti_saati: 'Salı 15:00',
    logo_url: '/img/dans.png'
  },
  {
    isim: 'Kitap Kulübü',
    fakulte: 'Edebiyat Fakültesi',
    aciklama: 'Okuma grupları ve kitap yorumlama buluşmaları.',
    iletisim: 'instagram.com/kitap_kulubu',
    toplanti_saati: 'Çarşamba 17:00',
    logo_url: '/img/kitap.png'
  },
  {
    isim: 'Toplumsal Sorumluluk Kulübü',
    fakulte: 'Sosyal Bilimler Fakültesi',
    aciklama: 'Sosyal sorumluluk projeleri, gönüllülük ve yardım faaliyetleri.',
    iletisim: 'instagram.com/sorumluluk_kulubu',
    toplanti_saati: 'Pazar 14:00',
    logo_url: '/img/sorumluluk.png'
  }
 ].map(item => ({
   ...item,
   eklenmis_veri: new Date()
 }));

  return db('ogrenci_kulupleri').insert(kulupVeri);
}).then(() => {
  console.log("✅ Öğrenci kulüpleri verileri eklendi");
  process.exit();
}).catch(err => {
  console.error("❌ Hata oluştu:", err);
  process.exit();
});
