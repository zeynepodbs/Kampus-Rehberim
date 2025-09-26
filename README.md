# Kampüs Rehberi Web Uygulaması
Bu proje, üniversite öğrencilerinin kampüs olanaklarına kolay erişmesini sağlayan bir web platformudur.
Kullanıcılar; fakülteler,akademik danışmanlar, yurtlar, yemekhaneler, kütüphaneler,fakültelerdeki kantinler, kulüpler, fotokopi alanları, etkinlikler, duyurular ve kampüs içi ulaşım gibi bilgileri görüntüleyebilirler.

## Özellikler
- Ana sayfa slider ile etkinlik ve duyuruların gösterimi
- Modüllere ikonlu hızlı erişim
- Dinamik veri çekme (backend API)
- Fakülteler, danışmanlar, yurtlar, yemekhaneler, kütüphaneler, kantinler, kulüpler, fotokopi alanları ve kampüs içi ulaşım modülleri
- Arama ve filtreleme özellikleri ile kullanıcıların bilgileri kolayca bulabilmesi
- Responsive ve kullanıcı dostu tasarım

## Teknolojiler
- Frontend: React, React Router, React Icons, React Slick
- Backend: Node.js
- Veri tabanı: SQLite
- Stil: Tailwind CSS

## Kurulum

1. **Depoyu klonlayın:**  
   ```bash
   git clone https://github.com/kullaniciadi/proje-adi.git

2. **Proje dizinine gidin:** 
    cd kampus-rehberim

3. **Bağımlılıkları yükleyin:**
    Projenin çalışması için gerekli paketleri yükleyin:
   ```bash
    npm install
    Buradaki `npm install`, **package.json dosyasında listelenen tüm frontend (React) ve backend (Node.js) paketlerini** bilgisayarınıza indirir ve projede kullanıma hazır hâle getirir.

4. **Backend sunucusunu başlatın:**
    Node.js backend sunucusunu çalıştırmak için proje dizininde şu komutu kullanın:
   ```bash
   node index.js
   Sunucu varsayılan olarak http://localhost:3001 adresinde çalışacaktır.

5. **Frontend uygulamayı başlatın:**
    React uygulamasını çalıştırmak için proje dizininde şu komutu kullanın:
   ```bash
   npm start
   Uygulama tarayıcıda varsayılan olarak http://localhost:3000 adresinde açılacaktır.

## Klasör Yapısı
kampus-rehberim
|___backend
    |___node_modules
    |___public/img : Kulüp ikonlarının yer aldığı klasör.
    |___create_danismanlar_table.js : Danışmanlar tablosu.
    |___create_duyurular.js : Duyurular tablosu.
    |___create_etkinlikler.js : Etkinlikler tablosu.
    |___create_fakulteler_table.js : Fakülteler tablosu.
    |___create_fotokopi_table.js : Fotokopi alanları tablosu.
    |___create_kulupler_table.js : Kulüpler tablosu.
    |___create_kutuphaneler_table.js : Kütüphaneler tablosu.
    |___create_ulasim_table.js : Ulaşım tablosu.
    |___create_yemek_listesi_table.js : Yemek listesi tablosu.
    |___create_yemekhaneler_table.js : Yemekhaneler tablosu.
    |___createTables.js : Kantinler tablosu.
    |___db.js : Veritabanı bağlantısı.
    |___index.js : API çağrıları.
    |___kampus.db
    |___package-lock.json
    |___package.json
    |___veritabani.sqlite
|___frontend
    |___node_modules
    |___public
        |___images : Slider afişlerinin bulunduğu klasör.
        |___img: Yurt görsellerinin bulunduğu klasör.
        |___index.html
        |___manifest.json
        |___robots.txt
    |___src
        |___components
            |___Danismanlar.js : Danışmanlar modülü tasarımı.
            |___Duyurular.js : Duyurular modülü tasarımı.
            |___Etkinlikler.js : Etkinlikler modülü tasarımı.
            |___FakulteListesi.js : Fakülteler modülü tasarımı.
            |___Footer.js : Alt Bilgi tasarımı.
            |___FotokopiListesi.js : Fotokopi alanları modülü tasarımı.
            |___Header.js : Üst menü tasarımı.
            |___KantinListesi.js : Kantinler modülü tasarımı.
            |___Kulupler.js : Kulüpler modülü tasarımı.
            |___KutuphaneListesi.js : Kütüphaneler modülü tasarımı.
            |___Slider.js : slider tasarımı.
            |___Ulasim.js : Ulaşım modülü tasarımı.
            |___YemekhaneListesi.js : Yemekhaneler modülü tasarımı.
            |___Yurtlar.js : Yurtlar modülü tasarımı.
        |___pages
            |___HomePage.js : Anasafa tasarımı.
            |___Slider.css : Slider tasarımı için css dosyası.
        |___App.css
        |___App.js
        |___App.test.js
        |___index.css
        |___index.js
        |___logo.svg
        |___reportWebVitals.js
        |___setupTests.js
    |___.gitignore
    |___package-lock.json
    |___package.json
    |___postcss.config.js
    |___tailwind.config.js

## Kullanım
- Ana sayfada slider ile etkinlik ve duyurular görüntülenir.
- İkonlu butonlar ile modüllere hızlı erişim sağlanır.
- Arama ve filtreleme özellikleri ile kullanıcılar istedikleri bilgiyi kolayca bulabilir.
- Tüm modüller responsive tasarım ile mobil ve masaüstü cihazlarda düzgün çalışır.

## Katkıda Bulunanlar
- [Zeynep Odabaş] - Proje geliştirme, frontend ve backend entegrasyonu

