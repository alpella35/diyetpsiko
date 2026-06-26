import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppContent } from './App';

const domain = 'https://diyetizmir.fit';
const blogImg = (slug) => `${domain}/blog/${slug}.svg`;

const pages = {
  '/': {
    title: 'D&P Psikoloji ve Beslenme Merkezi | Psiko-Beslenme | İzmir Psikolog & Diyetisyen',
    desc: 'Psikolog ve diyetisyen desteğiyle psiko-beslenme programı. İzmir Alsancak\'ta bireysel terapi, duygusal yeme danışmanlığı ve online seans. Hemen randevu alın.',
    ogTitle: 'D&P Psikoloji ve Beslenme | Psiko-Beslenme Merkezi İzmir',
    image: `${domain}/og-image.jpg`
  },
  '/hizmetler': {
    title: 'Hizmetlerimiz | D&P Psikoloji ve Beslenme | İzmir Psikolog & Diyetisyen',
    desc: 'Psikolojik danışmanlık, beslenme danışmanlığı ve psiko-beslenme programları. İzmir Alsancak\'ta yüz yüze ve online terapi hizmetleri.',
    ogTitle: 'Hizmetlerimiz | D&P Psikoloji ve Beslenme Merkezi',
    image: `${domain}/og-image.jpg`
  },
  '/psiko-beslenme': {
    title: 'Psiko-Beslenme Programı | D&P | İzmir Psikolog ve Diyetisyen',
    desc: 'Psikolog ve diyetisyenin birlikte çalıştığı psiko-beslenme programı ile duygusal yeme, kilo yönetimi ve motivasyon sorunlarına kalıcı çözüm. İzmir\'de yüz yüze ve online.',
    ogTitle: 'Psiko-Beslenme Programı | D&P Psikoloji ve Beslenme',
    image: `${domain}/og-image.jpg`
  },
  '/duygusal-yeme': {
    title: 'Duygusal Yeme Terapisi | D&P Psikoloji ve Beslenme | İzmir',
    desc: 'Duygusal yeme döngüsünü bilimsel yöntemlerle kırın. Stres, üzüntü ve kaygı kaynaklı yeme atakları için psikolog ve diyetisyen desteği.',
    ogTitle: 'Duygusal Yeme Terapisi | D&P Psikoloji',
    image: `${domain}/og-image.jpg`
  },
  '/online-terapi': {
    title: 'Online Psikolog ve Diyetisyen | D&P | Türkiye\'nin Her Yerinden',
    desc: 'Türkiye\'nin her yerinden güvenli online psikolog ve diyetisyen seansları. İzmir Alsancak merkezli, tüm şehirlere online terapi hizmeti.',
    ogTitle: 'Online Psikolog ve Diyetisyen | D&P Psikoloji',
    image: `${domain}/og-image.jpg`
  },
  '/uzmanlik-alanlari': {
    title: 'Uzmanlık Alanlarımız | D&P | Klinik Psikoloji ve Beslenme',
    desc: 'Yetişkin psikoterapisi, klinik beslenme takibi ve psiko-beslenme dönüşüm programı. Uzman psikolog ve diyetisyen kadrosu.',
    ogTitle: 'Uzmanlık Alanlarımız | D&P Psikoloji',
    image: `${domain}/og-image.jpg`
  },
  '/hakkimizda': {
    title: 'Hakkımızda | D&P Psikoloji ve Beslenme Merkezi | İzmir',
    desc: 'Psikoloji ve beslenmeyi birleştiren bütüncül yaklaşımımızla tanışın. Klinik psikolog ve uzman diyetisyen ekibimiz İzmir Alsancak\'ta.',
    ogTitle: 'Hakkımızda | D&P Psikoloji',
    image: `${domain}/og-image.jpg`
  },
  '/iletisim': {
    title: 'İletişim | D&P Psikoloji ve Beslenme | İzmir Alsancak',
    desc: 'Randevu ve bilgi için iletişim formu. D&P Psikoloji ve Beslenme Merkezi, Alsancak İzmir. Yüz yüze ve online seans için hemen ulaşın.',
    ogTitle: 'İletişim | D&P Psikoloji',
    image: `${domain}/og-image.jpg`
  },
  '/blog': {
    title: 'Psiko-Beslenme Blogu | D&P | Psikoloji ve Beslenme Yazıları',
    desc: 'Psikoloji, beslenme ve bütüncül sağlık üzerine bilimsel rehberler. Duygusal yeme, psiko-beslenme, online terapi ve daha fazlası.',
    ogTitle: 'Psiko-Beslenme Blogu | D&P',
    image: `${domain}/og-image.jpg`
  },
  '/admin': {
    title: 'Admin Paneli | D&P Psikoloji ve Beslenme',
    desc: 'Yönetim paneli',
    image: `${domain}/og-image.jpg`
  },
  '/blog/psiko-beslenme-nedir': {
    title: 'Psiko-Beslenme Nedir? Psikolog ve Diyetisyen Birlikte Çalışmalı | D&P Blog',
    desc: 'Psiko-beslenme kavramını bilimsel temelleriyle ele alıyor, psikolog ve diyetisyenin neden birlikte çalışması gerektiğini açıklıyoruz. Bütüncül sağlık rehberi.',
    ogTitle: 'Psiko-Beslenme Nedir? | D&P Blog',
    date: '2025-01-15',
    tags: ['psiko-beslenme', 'bütüncül sağlık', 'psikolog', 'diyetisyen'],
    image: blogImg('psiko-beslenme-nedir')
  },
  '/blog/duygusal-yeme-dongusu': {
    title: 'Duygusal Yeme Döngüsünden Kurtulma: 7 Adımlı Rehber | D&P Blog',
    desc: 'Duygusal yeme döngüsünü kırmak için bilimsel 7 adımlı rehber. Stres yemesiyle başa çıkma, duygusal tetikleyicileri tanıma ve sağlıklı alışkanlıklar.',
    ogTitle: 'Duygusal Yeme Döngüsünden Kurtulma Rehberi | D&P',
    date: '2025-01-10',
    tags: ['duygusal yeme', 'stres yönetimi', 'yeme bozukluğu', 'terapi'],
    image: blogImg('duygusal-yeme')
  },
  '/blog/online-terapi-verimli-mi': {
    title: 'Online Terapi Verimli mi? Araştırmalar Ne Diyor? | D&P Blog',
    desc: 'Online psikolog seanslarının etkinliği üzerine bilimsel araştırmalar ve danışan deneyimleri. Online terapi yüz yüze kadar etkili mi? Detaylı analiz.',
    ogTitle: 'Online Terapi Verimli mi? | D&P Blog',
    date: '2025-01-05',
    tags: ['online terapi', 'psikolog', 'uzaktan terapi', 'D&P'],
    image: blogImg('online-terapi')
  },
  '/blog/izmir-psikolog-rehberi': {
    title: '2025 İzmir Psikolog Rehberi: Doğru Terapisti Seçme Kılavuzu | D&P Blog',
    desc: 'İzmir\'de psikolog seçerken dikkat edilmesi gerekenler. Alsancak, Karşıyaka, Bornova bölgelerinde uzman seçimi, terapi yöntemleri ve ücret rehberi.',
    ogTitle: 'İzmir Psikolog Rehberi 2025 | D&P',
    date: '2025-01-01',
    tags: ['izmir psikolog', 'terapi rehberi', 'alsancak', 'uzman seçimi'],
    image: blogImg('izmir-psikolog')
  },
  '/blog/stres-ve-beslenme': {
    title: 'Stres ve Beslenme İlişkisi: Kortizolü Dengeleyen Besinler | D&P Blog',
    desc: 'Stres vücudunuzu nasıl etkiliyor? Kortizol seviyesini düşüren besinler, stres yönetiminde beslenmenin rolü ve D&P psiko-beslenme yaklaşımı.',
    ogTitle: 'Stres ve Beslenme İlişkisi | D&P Blog',
    date: '2025-06-01',
    tags: ['stres yönetimi', 'kortizol', 'beslenme', 'psiko-beslenme'],
    image: blogImg('stres-ve-beslenme')
  },
  '/blog/izmir-diyetisyen-rehberi': {
    title: 'İzmir Diyetisyen Rehberi: Doğru Uzmanı Bulma Kılavuzu | D&P Blog',
    desc: 'İzmir\'de diyetisyen ararken nelere dikkat etmeli? Alsancak, Karşıyaka, Bornova\'da uzman diyetisyen seçimi ve psiko-beslenme yaklaşımı.',
    ogTitle: 'İzmir Diyetisyen Rehberi | D&P Blog',
    date: '2025-06-05',
    tags: ['izmir diyetisyen', 'diyetisyen rehberi', 'alsancak', 'kilo yönetimi'],
    image: blogImg('izmir-diyetisyen')
  },
  '/blog/pcos-ve-beslenme': {
    title: 'PCOS ve Beslenme: Hormon Dostu Diyet Rehberi | D&P Blog',
    desc: 'Polikistik over sendromunda beslenme nasıl olmalı? İnsülin direnci, kilo yönetimi ve hormonal denge için bilimsel beslenme stratejileri.',
    ogTitle: 'PCOS ve Beslenme Rehberi | D&P Blog',
    date: '2025-06-10',
    tags: ['PCOS', 'polikistik over', 'hormon beslenme', 'insülin direnci'],
    image: blogImg('pcos-beslenme')
  },
  '/blog/bilincli-yeme-mindful-eating': {
    title: 'Bilinçli Yeme (Mindful Eating) Nedir? 5 Temel İlke | D&P Blog',
    desc: 'Mindful eating (bilinçli yeme) nedir, nasıl yapılır? Otomatik pilotta yemek yeme alışkanlığından kurtulmak için 5 temel ilke ve uygulama rehberi.',
    ogTitle: 'Bilinçli Yeme (Mindful Eating) | D&P Blog',
    date: '2025-06-15',
    tags: ['mindful eating', 'bilinçli yeme', 'farkındalık', 'yeme bozukluğu'],
    image: blogImg('mindful-eating')
  },
  '/blog/sosyal-kaygi-ve-terapi': {
    title: 'Sosyal Kaygı Bozukluğu: Belirtiler, Nedenler ve Terapi Yöntemleri | D&P Blog',
    desc: 'Sosyal kaygı nedir, nasıl tedavi edilir? Sosyal ortamlarda yaşanan yoğun kaygının nedenleri, BDT ile tedavi yöntemleri ve online terapi seçenekleri.',
    ogTitle: 'Sosyal Kaygı Bozukluğu | D&P Blog',
    date: '2025-06-20',
    tags: ['sosyal kaygı', 'kaygı bozukluğu', 'terapi', 'online terapi'],
    image: blogImg('sosyal-kaygi')
  },
  '/blog/depresyon-ve-beslenme': {
    title: 'Depresyon ve Beslenme İlişkisi: Beyni İyileştiren Besinler | D&P Blog',
    desc: 'Depresyon beslenmeyi nasıl etkiler? Omega-3\'ten D vitaminine, bağırsak-beyin ekseninde depresyonla mücadelede beslenmenin bilimsel rolü.',
    ogTitle: 'Depresyon ve Beslenme | D&P Blog',
    date: '2025-06-25',
    tags: ['depresyon', 'beslenme', 'omega-3', 'bağırsak-beyin ekseni'],
    image: blogImg('depresyon-beslenme')
  },
  '/blog/cocuklarda-saglikli-beslenme': {
    title: 'Çocuklarda Sağlıklı Beslenme Alışkanlıkları: Ebeveynler İçin Rehber | D&P Blog',
    desc: 'Çocuklara sağlıklı beslenme alışkanlığı nasıl kazandırılır? Yemek seçme davranışı, öğün düzeni ve ebeveyn stratejileri.',
    ogTitle: 'Çocuklarda Sağlıklı Beslenme | D&P Blog',
    date: '2025-06-30',
    tags: ['çocuk beslenmesi', 'yemek seçme', 'ebeveyn rehberi', 'sağlıklı beslenme'],
    image: blogImg('cocuk-beslenmesi')
  },
  '/site-haritasi': {
    title: 'Site Haritası | D&P Psikoloji ve Beslenme Merkezi | İzmir',
    desc: 'D&P Psikoloji ve Beslenme Merkezi tüm sayfaların listesi. Psiko-beslenme, blog yazıları, hizmetler ve daha fazlası.',
    ogTitle: 'Site Haritası | D&P',
    image: `${domain}/og-image.jpg`
  }
};

// Blog tag pages
const allTags = [
  ['psiko-beslenme', 'Psiko-Beslenme'],
  ['butuncul-saglik', 'Bütüncül Sağlık'],
  ['psikolog', 'Psikolog'],
  ['diyetisyen', 'Diyetisyen'],
  ['duygusal-yeme', 'Duygusal Yeme'],
  ['stres-yonetimi', 'Stres Yönetimi'],
  ['yeme-bozuklugu', 'Yeme Bozukluğu'],
  ['terapi', 'Terapi'],
  ['online-terapi', 'Online Terapi'],
  ['uzaktan-terapi', 'Uzaktan Terapi'],
  ['d-p', 'D&P'],
  ['izmir-psikolog', 'İzmir Psikolog'],
  ['terapi-rehberi', 'Terapi Rehberi'],
  ['alsancak', 'Alsancak'],
  ['uzman-secimi', 'Uzman Seçimi'],
  ['kortizol', 'Kortizol'],
  ['beslenme', 'Beslenme'],
  ['stres', 'Stres'],
  ['izmir-diyetisyen', 'İzmir Diyetisyen'],
  ['diyetisyen-rehberi', 'Diyetisyen Rehberi'],
  ['kilo-yonetimi', 'Kilo Yönetimi'],
  ['pcos', 'PCOS'],
  ['polikistik-over', 'Polikistik Over'],
  ['hormon-beslenme', 'Hormon Beslenme'],
  ['insulin-direnci', 'İnsülin Direnci'],
  ['kadin-sagligi', 'Kadın Sağlığı'],
  ['mindful-eating', 'Mindful Eating'],
  ['bilincli-yeme', 'Bilinçli Yeme'],
  ['farkindalik', 'Farkındalık'],
  ['yeme-bozuklugu', 'Yeme Bozukluğu'],
  ['saglikli-beslenme', 'Sağlıklı Beslenme'],
  ['sosyal-kaygi', 'Sosyal Kaygı'],
  ['kaygi-bozuklugu', 'Kaygı Bozukluğu'],
  ['bdt', 'BDT'],
  ['depresyon', 'Depresyon'],
  ['omega-3', 'Omega-3'],
  ['bagirsak-beyin-ekseni', 'Bağırsak-Beyin Ekseni'],
  ['ruh-sagligi', 'Ruh Sağlığı'],
  ['cocuk-beslenmesi', 'Çocuk Beslenmesi'],
  ['yemek-secme', 'Yemek Seçme'],
  ['ebeveyn-rehberi', 'Ebeveyn Rehberi'],
  ['aile', 'Aile']
];

allTags.forEach(([slug, label]) => {
  pages[`/blog/etiket/${slug}`] = {
    title: `${label} Yazıları | D&P Psikoloji ve Beslenme Blogu`,
    desc: `"${label}" etiketli blog yazıları. Psiko-beslenme, psikoloji ve beslenme alanında ${label.toLowerCase()} hakkında bilimsel rehberler.`,
    ogTitle: `${label} Yazıları | D&P Blog`,
    image: `${domain}/og-image.jpg`
  };
});

// Blog category pages
const categories = [
  ['psiko-beslenme', 'Psiko-Beslenme'],
  ['duygusal-yeme', 'Duygusal Yeme'],
  ['online-terapi', 'Online Terapi'],
  ['rehber', 'Rehber'],
  ['beslenme', 'Beslenme'],
  ['psikoloji', 'Psikoloji']
];

categories.forEach(([slug, label]) => {
  pages[`/blog/kategori/${slug}`] = {
    title: `${label} Kategorisi | D&P Psikoloji ve Beslenme Blogu`,
    desc: `${label} kategorisindeki blog yazıları. Psikoloji ve beslenme alanında ${label.toLowerCase()} ile ilgili güncel içerikler.`,
    ogTitle: `${label} | D&P Blog`,
    image: `${domain}/og-image.jpg`
  };
});

export async function prerender(data) {
  const { url } = data;
  const page = pages[url];
  if (!page) {
    return { html: '', head: { title: 'D&P Psikoloji ve Beslenme', lang: 'tr' }, links: new Set() };
  }

  const html = renderToString(
    <StaticRouter location={url}>
      <AppContent />
    </StaticRouter>
  );

  const fullUrl = `${domain}${url}`;

    const isBlogPost = url.startsWith('/blog/') && !url.includes('/etiket/') && !url.includes('/kategori/');
    const isAdmin = url === '/admin';
    const pageImage = page.image || `${domain}/og-image.jpg`;

    const elements = new Set([
      { type: 'meta', props: { name: 'description', content: page.desc } },
      { type: 'meta', props: { property: 'og:url', content: fullUrl } },
      { type: 'meta', props: { property: 'og:title', content: page.ogTitle || page.title } },
      { type: 'meta', props: { property: 'og:description', content: page.desc } },
      { type: 'meta', props: { property: 'og:image', content: pageImage } },
      { type: 'meta', props: { name: 'twitter:title', content: page.ogTitle || page.title } },
      { type: 'meta', props: { name: 'twitter:description', content: page.desc } },
      { type: 'meta', props: { name: 'twitter:image', content: pageImage } },
      { type: 'link', props: { rel: 'canonical', href: fullUrl } }
    ]);

    if (isBlogPost) {
      elements.add({ type: 'meta', props: { property: 'article:published_time', content: page.date || '2025-01-01' } });
      elements.add({ type: 'meta', props: { property: 'article:author', content: 'D&P Psikoloji ve Beslenme Merkezi' } });
      if (page.tags) {
        page.tags.forEach(tag => {
          elements.add({ type: 'meta', props: { property: 'article:tag', content: tag } });
        });
      }
    }

    if (isAdmin) {
      elements.add({ type: 'meta', props: { name: 'robots', content: 'noindex, nofollow' } });
    }

    return {
      html,
      head: {
        title: page.title,
        lang: 'tr',
        elements
      },
      links: new Set(Object.keys(pages))
    };
}
