const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.send("Kampüs Rehberim API çalışıyor 🚀");
});

app.get("/kantinler", async (req, res) => {
  const { fakulte } = req.query;

  try {
    let query = db("kantinler").select("*");

    if (fakulte) {
      query = query.where("fakulte_adi", fakulte);
    }

    const kantinler = await query;
    res.json(kantinler);
  } catch (error) {
    res.status(500).json({ hata: "Kantinler alınamadı", detay: error.message });
  }
});

app.get('/kutuphaneler', async (req, res) => {
  const { isim } = req.query;
  console.log('Gelen query:', req.query);

  try {
    let query = db('kutuphaneler').select('*');

    if (isim) {
      query = query.whereRaw('LOWER(isim) = ?', [isim.toLowerCase()]);
    }

    const kutuphaneler = await query;
    res.json(kutuphaneler);
  } catch (error) {
    console.error(error);
    res.status(500).json({ hata: 'Kütüphaneler alınamadı', detay: error.message });
  }
});

app.get('/yemekhaneler', async (req, res) => {
  try {
    const { arama, konum } = req.query;
    let sorgu = db('yemekhaneler').select('*');

    if (konum) {
      sorgu = sorgu.where('konum', konum);
    }

    if (arama) {
      sorgu = sorgu.where('isim', 'like', `%${arama}%`);
    }

    const veriler = await sorgu;
    res.json(veriler);
  } catch (err) {
    res.status(500).json({ hata: 'Yemekhane verileri alınamadı', detay: err.message });
  }
});

app.get('/yemeklistesi', async (req, res) => {
  try {
    const bugun = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const sonuc = await db('yemek_listesi').where('tarih', bugun).first();

    if (!sonuc) {
      return res.status(404).json({ mesaj: 'Bugün için yemek bulunamadı' });
    }

    res.json(sonuc);
  } catch (err) {
    console.error('Hata:', err);
    res.status(500).json({ hata: 'Sunucu hatası' });
  }
});

app.get('/fakulteler', async (req, res) => {
  try {
    const fakulteler = await db('fakulteler').select('*');
    res.json(fakulteler);
  } catch (error) {
    res.status(500).json({ hata: "Fakülteler alınamadı", detay: error.message });
  }
});

app.get('/fotokopi', async (req, res) => {
  try {
    const { konum, arama } = req.query;

    let query = db('fotokopi_alanlari').select('*');

    if (konum) {
      query = query.where('konum', konum);
    }
    if (arama) {
      query = query.where('isim', 'like', `%${arama}%`);
    }

    const fotokopiAlanlari = await query;
    res.json(fotokopiAlanlari);
  } catch (error) {
    res.status(500).json({ hata: 'Fotokopi alanları alınamadı', detay: error.message });
  }
});

app.get('/yurtlar', async (req, res) => {
  try {
    const { isim, tur } = req.query;   // ?isim=...&tur=KYK / Özel

    let query = db('yurtlar').select('*');   // tablo adı yurtlar

    if (isim) {
      query = query.where('isim', 'like', `%${isim}%`);
    }
    if (tur) {
      query = query.where('tur', tur);       // KYK / Özel
    }

    const yurtlar = await query;
    res.json(yurtlar);
  } catch (error) {
    console.error('Yurtları alırken hata:', error);
    res.status(500).json({ hata: 'Yurt verileri alınamadı', detay: error.message });
  }
});

app.get('/kulupler', async (req, res) => {
  try {
    const { isim, fakulte } = req.query;  // ?isim=...&fakulte=...

    let query = db('ogrenci_kulupleri').select('*');

    if (isim) {
      query = query.where('isim', 'like', `%${isim}%`);
    }

    if (fakulte) {
      query = query.where('fakulte', fakulte);
    }

    const kulupler = await query;
    res.json(kulupler);
  } catch (error) {
    console.error('Kulüpler alınırken hata:', error);
    res.status(500).json({ hata: 'Kulüp verileri alınamadı', detay: error.message });
  }
});

app.get('/danismanlar', async (req, res) => {
  try {
    const { fakulte, isim } = req.query; // ?fakulte=...&isim=...

    let query = db('akademik_danismanlar').select('*');

    if (fakulte) {
      query = query.where('fakulte', fakulte);
    }

    if (isim) {
      query = query.where('isim', 'like', `%${isim}%`);
    }

    const danismanlar = await query;
    res.json(danismanlar);
  } catch (error) {
    console.error('Danışmanlar alınırken hata:', error);
    res.status(500).json({ hata: 'Danışman verileri alınamadı', detay: error.message });
  }
});

app.get('/ulasim', async (req, res) => {
  try {
    const { guzergah, arac_turu } = req.query;
    let query = db('ulasim').select('*');

    if (guzergah) {
      query = query.where('guzergah', 'like', `%${guzergah}%`);
    }

    if (arac_turu) {
      query = query.where('arac_turu', arac_turu);
    }

    const ulasimlar = await query;
    res.json(ulasimlar);
  } catch (error) {
    console.error('Ulaşım verisi alınamadı:', error);
    res.status(500).json({ hata: 'Ulaşım verisi alınamadı', detay: error.message });
  }
});

// --- ETKİNLİKLER ---
app.get('/etkinlikler', async (req, res) => {
  try {
    const { ad, tarih } = req.query;
    let query = db('etkinlikler').select('*');

    if (ad) {
      query = query.where('ad', 'like', `%${ad}%`);
    }

    if (tarih) {
      query = query.where('tarih', tarih);
    }

    const etkinlikler = await query;
    res.json(etkinlikler);
  } catch (error) {
    console.error('Etkinlikler verisi alınamadı:', error);
    res.status(500).json({ hata: 'Etkinlikler verisi alınamadı', detay: error.message });
  }
});

app.post('/etkinlikler', async (req, res) => {
  try {
    const { ad, aciklama, tarih, konum } = req.body;
    await db('etkinlikler').insert({ ad, aciklama, tarih, konum, eklenmis_veri: new Date() });
    res.json({ mesaj: 'Etkinlik başarıyla eklendi' });
  } catch (error) {
    console.error('Etkinlik eklenemedi:', error);
    res.status(500).json({ hata: 'Etkinlik eklenemedi', detay: error.message });
  }
});


// --- DUYURULAR ---
app.get('/duyurular', async (req, res) => {
  try {
    const { baslik, tarih } = req.query;
    let query = db('duyurular').select('*');

    if (baslik) {
      query = query.where('baslik', 'like', `%${baslik}%`);
    }

    if (tarih) {
      query = query.where('tarih', tarih);
    }

    const duyurular = await query;
    res.json(duyurular);
  } catch (error) {
    console.error('Duyurular verisi alınamadı:', error);
    res.status(500).json({ hata: 'Duyurular verisi alınamadı', detay: error.message });
  }
});

app.post('/duyurular', async (req, res) => {
  try {
    const { baslik, icerik, tarih } = req.body;
    await db('duyurular').insert({ baslik, icerik, tarih, eklenmis_veri: new Date() });
    res.json({ mesaj: 'Duyuru başarıyla eklendi' });
  } catch (error) {
    console.error('Duyuru eklenemedi:', error);
    res.status(500).json({ hata: 'Duyuru eklenemedi', detay: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});

