import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppContent } from './App';

const domain = 'https://diyetizmir.fit';

const pages = {
  '/': {
    title: 'D&P Psikoloji ve Beslenme Merkezi | Psiko-Beslenme | İzmir Psikolog & Diyetisyen',
    desc: 'Psikolog ve diyetisyen desteğiyle psiko-beslenme programı. İzmir Alsancak\'ta bireysel terapi, duygusal yeme danışmanlığı ve online seans. Hemen randevu alın.',
    ogTitle: 'D&P Psikoloji ve Beslenme | Psiko-Beslenme Merkezi İzmir'
  },
  '/hizmetler': {
    title: 'Hizmetlerimiz | D&P Psikoloji ve Beslenme | İzmir Psikolog & Diyetisyen',
    desc: 'Psikolojik danışmanlık, beslenme danışmanlığı ve psiko-beslenme programları. İzmir Alsancak\'ta yüz yüze ve online terapi hizmetleri.',
    ogTitle: 'Hizmetlerimiz | D&P Psikoloji ve Beslenme Merkezi'
  },
  '/psiko-beslenme': {
    title: 'Psiko-Beslenme Programı | D&P | İzmir Psikolog ve Diyetisyen',
    desc: 'Psikolog ve diyetisyenin birlikte çalıştığı psiko-beslenme programı ile duygusal yeme, kilo yönetimi ve motivasyon sorunlarına kalıcı çözüm. İzmir\'de yüz yüze ve online.',
    ogTitle: 'Psiko-Beslenme Programı | D&P Psikoloji ve Beslenme'
  },
  '/duygusal-yeme': {
    title: 'Duygusal Yeme Terapisi | D&P Psikoloji ve Beslenme | İzmir',
    desc: 'Duygusal yeme döngüsünü bilimsel yöntemlerle kırın. Stres, üzüntü ve kaygı kaynaklı yeme atakları için psikolog ve diyetisyen desteği.',
    ogTitle: 'Duygusal Yeme Terapisi | D&P Psikoloji'
  },
  '/online-terapi': {
    title: 'Online Psikolog ve Diyetisyen | D&P | Türkiye\'nin Her Yerinden',
    desc: 'Türkiye\'nin her yerinden güvenli online psikolog ve diyetisyen seansları. İzmir Alsancak merkezli, tüm şehirlere online terapi hizmeti.',
    ogTitle: 'Online Psikolog ve Diyetisyen | D&P Psikoloji'
  },
  '/uzmanlik-alanlari': {
    title: 'Uzmanlık Alanlarımız | D&P | Klinik Psikoloji ve Beslenme',
    desc: 'Yetişkin psikoterapisi, klinik beslenme takibi ve psiko-beslenme dönüşüm programı. Uzman psikolog ve diyetisyen kadrosu.',
    ogTitle: 'Uzmanlık Alanlarımız | D&P Psikoloji'
  },
  '/hakkimizda': {
    title: 'Hakkımızda | D&P Psikoloji ve Beslenme Merkezi | İzmir',
    desc: 'Psikoloji ve beslenmeyi birleştiren bütüncül yaklaşımımızla tanışın. Klinik psikolog ve uzman diyetisyen ekibimiz İzmir Alsancak\'ta.',
    ogTitle: 'Hakkımızda | D&P Psikoloji'
  },
  '/iletisim': {
    title: 'İletişim | D&P Psikoloji ve Beslenme | İzmir Alsancak',
    desc: 'Randevu ve bilgi için iletişim formu. D&P Psikoloji ve Beslenme Merkezi, Alsancak İzmir. Yüz yüze ve online seans için hemen ulaşın.',
    ogTitle: 'İletişim | D&P Psikoloji'
  },
  '/blog': {
    title: 'Psiko-Beslenme Blogu | D&P | Psikoloji ve Beslenme Yazıları',
    desc: 'Psikoloji, beslenme ve bütüncül sağlık üzerine bilimsel rehberler. Duygusal yeme, psiko-beslenme, online terapi ve daha fazlası.',
    ogTitle: 'Psiko-Beslenme Blogu | D&P'
  },
  '/admin': {
    title: 'Admin Paneli | D&P Psikoloji ve Beslenme',
    desc: 'Yönetim paneli'
  },
  '/blog/psiko-beslenme-nedir': {
    title: 'Psiko-Beslenme Nedir? Psikolog ve Diyetisyen Birlikte Çalışmalı | D&P Blog',
    desc: 'Psiko-beslenme kavramını bilimsel temelleriyle ele alıyor, psikolog ve diyetisyenin neden birlikte çalışması gerektiğini açıklıyoruz. Bütüncül sağlık rehberi.',
    ogTitle: 'Psiko-Beslenme Nedir? | D&P Blog'
  },
  '/blog/duygusal-yeme-dongusu': {
    title: 'Duygusal Yeme Döngüsünden Kurtulma: 7 Adımlı Rehber | D&P Blog',
    desc: 'Duygusal yeme döngüsünü kırmak için bilimsel 7 adımlı rehber. Stres yemesiyle başa çıkma, duygusal tetikleyicileri tanıma ve sağlıklı alışkanlıklar.',
    ogTitle: 'Duygusal Yeme Döngüsünden Kurtulma Rehberi | D&P'
  },
  '/blog/online-terapi-verimli-mi': {
    title: 'Online Terapi Verimli mi? Araştırmalar Ne Diyor? | D&P Blog',
    desc: 'Online psikolog seanslarının etkinliği üzerine bilimsel araştırmalar ve danışan deneyimleri. Online terapi yüz yüze kadar etkili mi? Detaylı analiz.',
    ogTitle: 'Online Terapi Verimli mi? | D&P Blog'
  },
  '/blog/izmir-psikolog-rehberi': {
    title: '2025 İzmir Psikolog Rehberi: Doğru Terapisti Seçme Kılavuzu | D&P Blog',
    desc: 'İzmir\'de psikolog seçerken dikkat edilmesi gerekenler. Alsancak, Karşıyaka, Bornova bölgelerinde uzman seçimi, terapi yöntemleri ve ücret rehberi.',
    ogTitle: 'İzmir Psikolog Rehberi 2025 | D&P'
  },
  '/blog/stres-ve-beslenme': {
    title: 'Stres ve Beslenme İlişkisi: Kortizolü Dengeleyen Besinler | D&P Blog',
    desc: 'Stres vücudunuzu nasıl etkiliyor? Kortizol seviyesini düşüren besinler, stres yönetiminde beslenmenin rolü ve D&P psiko-beslenme yaklaşımı.',
    ogTitle: 'Stres ve Beslenme İlişkisi | D&P Blog'
  },
  '/blog/izmir-diyetisyen-rehberi': {
    title: 'İzmir Diyetisyen Rehberi: Doğru Uzmanı Bulma Kılavuzu | D&P Blog',
    desc: 'İzmir\'de diyetisyen ararken nelere dikkat etmeli? Alsancak, Karşıyaka, Bornova\'da uzman diyetisyen seçimi ve psiko-beslenme yaklaşımı.',
    ogTitle: 'İzmir Diyetisyen Rehberi | D&P Blog'
  },
  '/blog/pcos-ve-beslenme': {
    title: 'PCOS ve Beslenme: Hormon Dostu Diyet Rehberi | D&P Blog',
    desc: 'Polikistik over sendromunda beslenme nasıl olmalı? İnsülin direnci, kilo yönetimi ve hormonal denge için bilimsel beslenme stratejileri.',
    ogTitle: 'PCOS ve Beslenme Rehberi | D&P Blog'
  },
  '/blog/bilincli-yeme-mindful-eating': {
    title: 'Bilinçli Yeme (Mindful Eating) Nedir? 5 Temel İlke | D&P Blog',
    desc: 'Mindful eating (bilinçli yeme) nedir, nasıl yapılır? Otomatik pilotta yemek yeme alışkanlığından kurtulmak için 5 temel ilke ve uygulama rehberi.',
    ogTitle: 'Bilinçli Yeme (Mindful Eating) | D&P Blog'
  },
  '/blog/sosyal-kaygi-ve-terapi': {
    title: 'Sosyal Kaygı Bozukluğu: Belirtiler, Nedenler ve Terapi Yöntemleri | D&P Blog',
    desc: 'Sosyal kaygı nedir, nasıl tedavi edilir? Sosyal ortamlarda yaşanan yoğun kaygının nedenleri, BDT ile tedavi yöntemleri ve online terapi seçenekleri.',
    ogTitle: 'Sosyal Kaygı Bozukluğu | D&P Blog'
  },
  '/blog/depresyon-ve-beslenme': {
    title: 'Depresyon ve Beslenme İlişkisi: Beyni İyileştiren Besinler | D&P Blog',
    desc: 'Depresyon beslenmeyi nasıl etkiler? Omega-3\'ten D vitaminine, bağırsak-beyin ekseninde depresyonla mücadelede beslenmenin bilimsel rolü.',
    ogTitle: 'Depresyon ve Beslenme | D&P Blog'
  },
  '/blog/cocuklarda-saglikli-beslenme': {
    title: 'Çocuklarda Sağlıklı Beslenme Alışkanlıkları: Ebeveynler İçin Rehber | D&P Blog',
    desc: 'Çocuklara sağlıklı beslenme alışkanlığı nasıl kazandırılır? Yemek seçme davranışı, öğün düzeni ve ebeveyn stratejileri.',
    ogTitle: 'Çocuklarda Sağlıklı Beslenme | D&P Blog'
  }
};

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

  const elements = new Set([
    { type: 'meta', props: { name: 'description', content: page.desc } },
    { type: 'meta', props: { property: 'og:url', content: fullUrl } },
    { type: 'meta', props: { property: 'og:title', content: page.ogTitle || page.title } },
    { type: 'meta', props: { property: 'og:description', content: page.desc } },
    { type: 'meta', props: { name: 'twitter:title', content: page.ogTitle || page.title } },
    { type: 'meta', props: { name: 'twitter:description', content: page.desc } },
    { type: 'link', props: { rel: 'canonical', href: fullUrl } }
  ]);

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
