import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link, useParams } from 'react-router-dom';
import {
  Rocket, Shield, CreditCard, LayoutTemplate,
  Smartphone, Database, Cpu, Building2, UserCog,
  LineChart, Network, BarChart3, Store, Search,
  Truck, Microscope, Leaf, Globe, ChevronRight,
  MapPin, Mail, Phone, Clock, MessageSquare,
  Send, X, Menu, ChevronDown, ChevronUp, ArrowRight,
  Calendar, Star, Users, BookOpen, CheckCircle,
  TrendingUp, Heart, Brain, Apple
} from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { supabase, supabaseConfig } from './lib/supabase';

// --- DATA ---

const servicesData = [
  {
    icon: <Smartphone className="w-6 h-6 text-indigo-500" />,
    title: 'Bireysel Psikolojik Danışmanlık',
    desc: 'Kaygı, stres, tükenmişlik ve ilişki sorunlarında uzman psikolog desteği.',
    fullDesc: 'Bireysel seanslarımızda duygularınızı güvenli bir alanda ele alır, stres kaynaklarını birlikte analiz eder ve günlük yaşamda uygulayabileceğiniz güçlü başa çıkma becerileri geliştiririz.',
    slug: 'bireysel-psikolojik-danismanlik'
  },
  {
    icon: <CreditCard className="w-6 h-6 text-emerald-500" />,
    title: 'Kişiye Özel Beslenme Danışmanlığı',
    desc: 'Yaşam tarzınıza, sağlık geçmişinize ve hedeflerinize uygun sürdürülebilir planlar.',
    fullDesc: 'Diyetisyenlerimiz standart listeler yerine kan değerleri, uyku düzeni, iş temposu ve damak tadınızı dikkate alan kişiye özel beslenme programları oluşturur; haftalık takiplerle planı size göre günceller.',
    slug: 'kisiye-ozel-beslenme'
  },
  {
    icon: <LineChart className="w-6 h-6 text-rose-500" />,
    title: 'Psiko-Beslenme Entegre Programı',
    desc: 'Duygusal yeme, kilo yönetimi ve motivasyon için ortak uzman takibi.',
    fullDesc: 'Psikolog ve diyetisyenlerimizin birlikte yürüttüğü bu programda yeme davranışlarınızı etkileyen duygusal tetikleyiciler keşfedilir, sağlıklı alışkanlıklar adım adım kalıcı hale getirilir.',
    slug: 'psiko-beslenme'
  },
  {
    icon: <Shield className="w-6 h-6 text-slate-700" />,
    title: 'Online Seans ve Gizli Takip',
    desc: 'Türkiye\'nin her yerinden güvenli altyapı ile online görüşme imkânı.',
    fullDesc: 'Yoğun temponuzda destekten uzak kalmamanız için online seans seçenekleri sunuyoruz. Gizlilik ilkesiyle tüm süreçler etik kurallar çerçevesinde korunur ve danışan bilgileriniz titizlikle saklanır.',
    slug: 'online-seans'
  },
  {
    icon: <Leaf className="w-6 h-6 text-lime-500" />,
    title: 'Kadın Sağlığı ve Hormon Dostu Beslenme',
    desc: 'PCOS, tiroid, menopoz ve adet döngüsüne özel beslenme desteği.',
    fullDesc: 'Hormon dengesini destekleyen, semptomları hafifletmeye yardımcı ve günlük yaşama uygulanabilir planlar hazırlarız. Gerekli durumlarda doktor takibiyle koordineli ilerleriz.',
    slug: 'kadin-sagligi-beslenme'
  },
  {
    icon: <Globe className="w-6 h-6 text-blue-400" />,
    title: 'Kurumsal İyi Oluş Programları',
    desc: 'Çalışanlar için stres yönetimi, sağlıklı beslenme ve sürdürülebilir performans.',
    fullDesc: 'Kurumlara özel atölye, seminer ve bireysel danışmanlık paketleri ile ekiplerin zihinsel dayanıklılığını ve sağlıklı yaşam alışkanlıklarını güçlendiren kapsamlı wellbeing çözümleri sunuyoruz.',
    slug: 'kurumsal-wellbeing'
  }
];

const homeBoxesData = [
  {
    id: 1,
    icon: <Rocket className="w-7 h-7 text-indigo-600" />,
    bg: 'bg-indigo-50',
    title: 'Bütüncül Değerlendirme',
    desc: 'İlk görüşmede psikolojik ve beslenme alışkanlıklarınızı birlikte analiz ediyoruz.',
    fullDesc: 'İlk adımda yaşam rutininiz, stres düzeyiniz, uyku ve beslenme düzeniniz detaylı şekilde değerlendirilir. Bu analiz, size özel ve gerçekçi bir iyileşme planının temelini oluşturur.'
  },
  {
    id: 2,
    icon: <Shield className="w-7 h-7 text-slate-800" />,
    bg: 'bg-slate-50',
    title: 'Güvenli ve Etik Süreç',
    desc: 'Tüm görüşmeler etik ilkelere uygun, gizlilik odaklı ve profesyonel şekilde yürütülür.',
    fullDesc: 'Danışan mahremiyeti birinci önceliğimizdir. Seans notları ve süreç bilgileri sadece uzman ekibimiz tarafından takip edilir; güvenli, yargısız ve destekleyici bir alan sunarız.'
  },
  {
    id: 3,
    icon: <CreditCard className="w-7 h-7 text-emerald-600" />,
    bg: 'bg-emerald-50',
    title: 'Adım Adım Takip',
    desc: 'Haftalık görüşmeler ve ara takiplerle süreci canlı, ölçülebilir ve motive edici tutuyoruz.',
    fullDesc: 'Belirlenen hedefler doğrultusunda düzenli ölçüm, geri bildirim ve plan güncellemesi yaparız. Böylece kısa süreli diyet veya geçici motivasyon yerine kalıcı alışkanlık dönüşümü sağlarız.'
  }
];

const expertiseData = [
  { icon: <MessageSquare className="w-10 h-10 text-indigo-600" />, title: 'Yetişkin Psikoterapisi', desc: 'Kaygı bozuklukları, özgüven sorunları, ilişki çatışmaları ve yaşam geçiş dönemlerinde bilimsel terapi yaklaşımları ile destek veriyoruz.' },
  { icon: <Leaf className="w-10 h-10 text-emerald-500" />, title: 'Klinik Beslenme Takibi', desc: 'İnsülin direnci, kilo yönetimi, sindirim hassasiyetleri ve metabolik sağlık için kişiselleştirilmiş, sürdürülebilir beslenme planları hazırlıyoruz.' },
  { icon: <Network className="w-10 h-10 text-fuchsia-600" />, title: 'Psiko-Beslenme Dönüşüm Programı', desc: 'Duygusal yeme davranışını dönüştürmek için psikolog ve diyetisyenin birlikte çalıştığı çok disiplinli bir takip modeli uyguluyoruz.' }
];

const blogPosts = [
  {
    slug: 'psiko-beslenme-nedir',
    title: 'Psiko-Beslenme Nedir? Psikolog ve Diyetisyen Neden Birlikte Çalışmalı?',
    excerpt: 'Psiko-beslenme, ruh sağlığı ve beslenmenin kesişim noktasında yükselen bütüncül bir yaklaşım. Peki neden psikolog ve diyetisyen aynı anda çalışmalı?',
    date: '2025-01-15',
    readTime: 8,
    category: 'psiko-beslenme',
    image: '/blog/psiko-beslenme-nedir.svg',
    tags: ['psiko-beslenme', 'bütüncül sağlık', 'psikolog', 'diyetisyen'],
    content: (
      <>
        <p>Son yıllarda sağlık dünyasında en çok duyduğumuz kavramlardan biri <strong>psiko-beslenme</strong>. Peki psiko-beslenme tam olarak nedir, neden bu kadar önemlidir ve en önemlisi, psikolog ile diyetisyen neden birlikte çalışmalıdır?</p>

        <p>Bu yazıda psiko-beslenme kavramını bilimsel temelleriyle ele alacak, zihin-beden bağlantısının sağlığımız üzerindeki dönüştürücü gücünü keşfedeceğiz.</p>

        <h2>Psiko-Beslenme Nedir?</h2>

        <p>Psiko-beslenme, <strong>psikoloji</strong> ve <strong>beslenme bilimini</strong> birleştiren bütüncül bir sağlık yaklaşımıdır. Temel prensibi şudur: Zihin ve beden birbirinden ayrı düşünülemez. Duygusal durumumuz yeme alışkanlıklarımızı doğrudan etkilerken, beslenme şeklimiz de ruh halimizi, enerji seviyemizi ve bilişsel fonksiyonlarımızı belirler.</p>

        <p>Psiko-beslenme yaklaşımında, bireyin yeme davranışları sadece fizyolojik ihtiyaçlar üzerinden değil, aynı zamanda duygusal tetikleyiciler, stres faktörleri, geçmiş deneyimler ve psikolojik örüntüler çerçevesinde değerlendirilir.</p>

        <div className="bg-indigo-50 rounded-xl p-6 my-6 border border-indigo-100">
          <p className="font-bold text-indigo-900 mb-2">Özetle:</p>
          <p className="text-indigo-800">Psiko-beslenme = Psikolojik danışmanlık + Beslenme danışmanlığı = Bütüncül iyi oluş</p>
        </div>

        <h2>Psikolog ve Diyetisyen Neden Birlikte Çalışmalı?</h2>

        <p>Geleneksel sağlık hizmetlerinde psikolog ve diyetisyen genellikle ayrı ayrı çalışır. Oysa araştırmalar gösteriyor ki, özellikle şu durumlarda bu iki uzmanlığın birlikte çalışması çok daha etkili sonuçlar veriyor:</p>

        <h3>1. Duygusal Yeme Bozukluğu</h3>
        <p>Stres, üzüntü, can sıkıntısı veya yalnızlık gibi duygusal tetikleyicilerle yemek yeme davranışı, <strong>duygusal yeme</strong> olarak adlandırılır. Bu durumda diyetisyen sadece bir beslenme programı hazırlar ancak duygusal tetikleyicilerle baş etmek için psikolojik destek şarttır. Psiko-beslenme programında psikolog, duygusal tetikleyicileri keşfederken diyetisyen, sağlıklı beslenme alışkanlıklarını kazandırır.</p>

        <h3>2. Kilo Yönetimi ve Motivasyon</h3>
        <p>Kilo verme süreci sadece fizyolojik değil, aynı zamanda psikolojik bir yolculuktur. Motivasyon dalgalanmaları, özgüven sorunları, beden algısı bozuklukları gibi psikolojik faktörler kilo yönetimini doğrudan etkiler. Psikolog ve diyetisyenin birlikte çalışması, bu sürecin her aşamasında bütüncül destek sağlar.</p>

        <h2>Psiko-Beslenme Hangi Durumlarda Önerilir?</h2>

        <ul>
          <li><strong>Duygusal yeme alışkanlığı:</strong> Stresliyken sürekli yemek yeme ihtiyacı hissediyorsanız</li>
          <li><strong>Tıkınırcasına yeme bozukluğu:</strong> Kontrol edemediğiniz yeme atakları yaşıyorsanız</li>
          <li><strong>Kilo verme plateau:</strong> Diyet yapmanıza rağmen kilo veremiyorsanız</li>
          <li><strong>Yeme bozuklukları:</strong> Anoreksiya, bulimia gibi durumlarda</li>
          <li><strong>Kronik stres ve beslenme ilişkisi:</strong> Stres kaynaklı sindirim sorunları yaşıyorsanız</li>
          <li><strong>Hormonal dengesizlikler:</strong> PCOS, tiroid sorunları gibi durumlarda</li>
          <li><strong>Vücut algısı sorunları:</strong> Kendi bedeninizle barışık değilseniz</li>
        </ul>

        <h2>Psiko-Beslenme Süreci Nasıl İşler?</h2>

        <p>D&P Psikoloji ve Beslenme Merkezi'nde uyguladığımız psiko-beslenme programı 4 aşamadan oluşur:</p>

        <p><strong>1. Bütüncül Değerlendirme:</strong> İlk seansta psikolog ve diyetisyen birlikte bir ön değerlendirme yapar. Yaşam tarzınız, stres düzeyiniz, beslenme alışkanlıklarınız, duygusal durumunuz ve sağlık geçmişiniz detaylıca analiz edilir.</p>

        <p><strong>2. Kişiselleştirilmiş Plan:</strong> Değerlendirme sonuçlarına göre psikolog ve diyetisyen size özel bir yol haritası oluşturur. Bu plan, hem psikolojik danışmanlık seanslarını hem de beslenme takibini içerir.</p>

        <p><strong>3. Haftalık Takip:</strong> Her hafta düzenli görüşmelerle ilerleme ölçülür. Psikoloğunuz duygusal durumunuzu, diyetisyeniniz beslenme günlüğünüzü değerlendirir. Gerektiğinde plan güncellenir.</p>

        <p><strong>4. Kalıcı Dönüşüm:</strong> Program sonunda kısa süreli diyetlerin aksine, yaşam boyu sürecek sağlıklı alışkanlıklar kazanmış olursunuz. Duygusal yeme tetikleyicilerinizi tanır ve onlarla baş etme becerileri geliştirirsiniz.</p>

        <h2>Bilimsel Araştırmalar Ne Diyor?</h2>

        <p>Yapılan araştırmalar, psikolojik destek ve beslenme danışmanlığının birlikte uygulandığı programların, tek başına diyet veya terapi programlarına göre çok daha başarılı olduğunu gösteriyor. Özellikle duygusal yeme ve kilo yönetimi konularında entegre yaklaşımın başarı oranı %70'e kadar yükseliyor.</p>

        <p>Bir araştırmada, psiko-beslenme programına katılan bireylerin sadece diyet yapan gruba göre 6 ay sonunda kilolarını koruma oranının 2 kat daha fazla olduğu bulunmuştur.</p>

        <h2>İzmir'de Psiko-Beslenme Desteği</h2>

        <p>D&P Psikoloji ve Beslenme Merkezi olarak <strong>İzmir Alsancak'ta</strong> psiko-beslenme hizmeti veriyoruz. Uzman psikologlarımız ve diyetisyenlerimiz, sizin için en uygun programı belirlemek üzere birlikte çalışır. Ayrıca <strong>online seans</strong> seçeneklerimizle Türkiye'nin her yerinden hizmetimize erişebilirsiniz.</p>

        <h2>Sıkça Sorulan Sorular</h2>

        <h3>Psiko-beslenme ne kadar sürer?</h3>
        <p>Temel program 8-12 hafta olarak planlanır, ardından idame takibi ile devam eder. Süre kişisel hedeflerinize göre değişiklik gösterebilir.</p>

        <h3>Psiko-beslenme programına online katılabilir miyim?</h3>
        <p>Evet, online seans seçeneklerimizle Türkiye'nin her yerinden programa katılabilirsiniz. Tüm görüşmeler güvenli ve gizli altyapı ile gerçekleştirilir.</p>

        <h3>Psikolog ve diyetisyen aynı anda mı görüşüyor?</h3>
        <p>Seanslar ayrı ayrı gerçekleşir ancak psikolog ve diyetisyeniniz süreci birlikte yönetir ve düzenli koordinasyon sağlar. Yol haritanız ortaktır.</p>

        <p className="font-semibold text-indigo-700 mt-6">Siz de psiko-beslenme ile tanışmak ve bütüncül bir dönüşüm yolculuğuna başlamak için <Link to="/iletisim" className="underline">iletişim sayfamızdan</Link> bize ulaşabilirsiniz.</p>
      </>
    )
  },
  {
    slug: 'duygusal-yeme-dongusu',
    title: 'Duygusal Yeme Döngüsünden Kurtulma Rehberi: 7 Adım',
    excerpt: 'Stresliyken buzdolabının önünde mi buluyorsun kendini? Duygusal yeme döngüsünü kırmak için bilimsel 7 adımlı rehber.',
    date: '2025-01-10',
    readTime: 9,
    category: 'duygusal-yeme',
    image: '/blog/duygusal-yeme.svg',
    tags: ['duygusal yeme', 'stres yönetimi', 'yeme bozukluğu', 'terapi'],
    content: (
      <>
        <p>Kendinizi hiç stresli bir günün sonunda farkında olmadan bir paket bisküviyi bitirirken buldunuz mu? Ya da canınız sıkkınken canınızın en sağlıksız şeyleri çektiğini fark ettiniz mi?</p>

        <p>Eğer yanıtınız evetse, <strong>duygusal yeme</strong> ile tanışmışsınız demektir. Duygusal yeme, açlık dışındaki duygusal tetikleyicilere yanıt olarak yemek yeme davranışıdır ve dünya genelinde milyonlarca insanı etkileyen yaygın bir sorundur.</p>

        <p>Bu rehberde, duygusal yeme döngüsünü anlayacak ve ondan kurtulmak için bilimsel 7 adımı öğreneceksiniz.</p>

        <h2>Duygusal Yeme Döngüsü Nedir?</h2>

        <p>Duygusal yeme bir döngü halinde işler:</p>

        <p><strong>Tetikleyici → Duygusal Rahatsızlık → Yeme İsteği → Tüketim → Suçluluk → Daha Fazla Rahatsızlık</strong></p>

        <p>Bu döngü kırılmadığında, kilo alımı, özgüven düşüklüğü ve artan duygusal sıkıntı gibi sonuçlarla karşılaşabilirsiniz.</p>

        <h2>Duygusal Yeme ile Fiziksel Açlık Arasındaki Fark</h2>

        <p>Duygusal yeme ile fiziksel açlığı ayırt etmek, döngüyü kırmanın ilk adımıdır:</p>

        <ul>
          <li><strong>Fiziksel açlık</strong> yavaş yavaş gelişir, herhangi bir yiyecekle doyurulabilir, doyduğunuzda kaybolur, yemek sonrası tatmin hissi verir.</li>
          <li><strong>Duygusal yeme</strong> aniden ortaya çıkar, belirli yiyeceklere (genelde sağlıksız) yöneltir, fiziksel doyumdan sonra bile devam eder, yemek sonrası suçluluk hissettirir.</li>
        </ul>

        <h2>Duygusal Yeme Döngüsünden Kurtulmak İçin 7 Adım</h2>

        <h3>Adım 1: Tetikleyicilerinizi Keşfedin</h3>
        <p>Bir yeme günlüğü tutun. Her yeme atağınızda şu soruları cevaplayın: O an hangi duyguyu hissediyordum? Ne oldu da yemek yemek istedim? Gerçekten acıkmış mıydım? Bu tetikleyicileri tanımak, döngüyü kırmanın ilk adımıdır.</p>

        <h3>Adım 2: Alternatif Başa Çıkma Mekanizmaları Geliştirin</h3>
        <p>Yemek dışında sizi rahatlatan aktiviteler belirleyin. 5 dakikalık nefes egzersizi, kısa bir yürüyüş, bir arkadaşınıza mesaj atmak, bir bardak su içmek gibi basit alternatifler duygusal yeme atağını durdurabilir.</p>

        <h3>Adım 3: Duygusal Farkındalık Pratiği Yapın</h3>
        <p>Duygularınızı etiketlemeyi öğrenin. "Stresliyim", "Üzgünüm", "Yalnız hissediyorum" gibi duyguları tanımak, otomatik pilotta yemek yemenizi engeller. Meditasyon ve mindfulness egzersizleri bu konuda çok etkilidir.</p>

        <h3>Adım 4: Çevrenizi Düzenleyin</h3>
        <p>Mutfakta abur cubur bulundurmayın. Sağlıklı atıştırmalıklar hazır bulunsun. Yemekleri küçük tabaklarda servis edin. Televizyon veya telefon karşısında değil, masa başında yemek yiyin.</p>

        <h3>Adım 5: Düzenli Beslenme Rutini Oluşturun</h3>
        <p>Düzensiz öğünler, kan şekerinizde dalgalanmalara neden olur ve bu da duygusal yeme ataklarını tetikler. Düzenli, protein ve lif açısından zengin öğünler kan şekerinizi dengeler ve yeme ataklarını azaltır.</p>

        <h3>Adım 6: Profesyonel Destek Alın</h3>
        <p>Duygusal yeme döngüsü genellikle profesyonel destek gerektirir. Bir psikolog, duygusal tetikleyicilerinizle baş etme stratejileri geliştirmenize yardımcı olurken, bir diyetisyen sürdürülebilir beslenme alışkanlıkları kazandırır. D&P Merkezi olarak psiko-beslenme programımızda bu iki desteği bir arada sunuyoruz.</p>

        <h3>Adım 7: Kendinize Şefkat Gösterin</h3>
        <p>Duygusal yeme atağı yaşadığınızda kendinizi suçlamayın. Bu sadece bir öğrenme sürecidir. Her "başarısızlık" bir veridir. "Neden yine yaptım?" yerine "Bu atağı ne tetikledi?" sorusunu sorun.</p>

        <div className="bg-emerald-50 rounded-xl p-6 my-6 border border-emerald-100">
          <p className="font-bold text-emerald-900 mb-2">Önemli:</p>
          <p className="text-emerald-800">Duygusal yeme bir irade sorunu değil, bir başa çıkma mekanizmasıdır. Profesyonel destek almak bir zayıflık değil, kendinize yaptığınız en büyük yatırımdır.</p>
        </div>

        <h2>Duygusal Yeme ve Psiko-Beslenme</h2>

        <p>Duygusal yeme döngüsünden kurtulmanın en etkili yolu <Link to="/psiko-beslenme" className="text-indigo-600 underline">psiko-beslenme</Link> programıdır. Bu programda psikolog ve diyetisyen birlikte çalışarak hem duygusal tetikleyicilerinizi keşfeder hem de sağlıklı beslenme alışkanlıkları kazanmanızı sağlar.</p>

        <p className="font-semibold text-indigo-700 mt-6">Duygusal yeme döngüsünden kurtulmak ve özgürleşmek için <Link to="/iletisim" className="underline">bize ulaşın</Link>, uzman ekibimiz size en uygun programı belirlesin.</p>
      </>
    )
  },
  {
    slug: 'online-terapi-verimli-mi',
    title: 'Online Terapi Verimli mi? Araştırmalar Ne Diyor?',
    excerpt: 'Online psikolog seansları yüz yüze kadar etkili mi? 2025 araştırmaları ve danışan deneyimleri ışığında kapsamlı analiz.',
    date: '2025-01-05',
    readTime: 6,
    category: 'online-terapi',
    image: '/blog/online-terapi.svg',
    tags: ['online terapi', 'psikolog', 'uzaktan terapi', 'D&P'],
    content: (
      <>
        <p>Online terapi, özellikle pandemi sonrası dönemde psikolojik destek almanın en yaygın yollarından biri haline geldi. Peki online psikolog seansları gerçekten yüz yüze terapi kadar etkili mi?</p>

        <p>Bu yazıda, bilimsel araştırmalar ve danışan deneyimleri ışığında online terapinin etkinliğini kapsamlı bir şekilde analiz ediyoruz.</p>

        <h2>Araştırmalar Ne Diyor?</h2>

        <p>Son 5 yılda yapılan çok sayıda meta-analiz, online terapinin birçok durumda yüz yüze terapi kadar etkili olduğunu gösteriyor. Özellikle kaygı bozuklukları, depresyon ve stres yönetimi konularında online terapi, yüz yüze terapiyle benzer başarı oranlarına sahip.</p>

        <p>2024 yılında yayınlanan bir araştırmada, online terapinin danışan memnuniyeti açısından yüz yüze terapiyle eşit düzeyde olduğu, hatta bazı durumlarda daha yüksek memnuniyet oranlarına ulaştığı bulunmuştur.</p>

        <h2>Online Terapinin Avantajları</h2>

        <ul>
          <li><strong>Zaman ve mekân bağımsızlığı:</strong> İşten, okuldan veya evinizden çıkmadan terapi alabilirsiniz</li>
          <li><strong>Daha geniş uzman seçeneği:</strong> Şehrinizdeki uzmanlarla sınırlı kalmazsınız</li>
          <li><strong>Esnek saatler:</strong> Akşam saatleri veya hafta sonu seans seçenekleri</li>
          <li><strong>Daha rahat bir ortam:</strong> Kendi evinizin konforunda seans yapmak kaygıyı azaltabilir</li>
          <li><strong>Ulaşım derdi yok:</strong> Trafik, park yeri, yol süresi gibi engeller ortadan kalkar</li>
          <li><strong>Gizlilik:</strong> Terapi aldığınızı kimse görmez</li>
        </ul>

        <h2>Online Terapinin Sınırları</h2>

        <ul>
          <li>Bazı kronik ve ağır ruhsal hastalıklarda yüz yüze terapi daha etkili olabilir</li>
          <li>İnternet bağlantısı sorunları seans akışını bozabilir</li>
          <li>Beden dili ve sözel olmayan ipuçları sınırlı olabilir</li>
          <li>Küçük çocuklar veya grup terapileri için uygun olmayabilir</li>
        </ul>

        <h2>Online Terapi Kimler İçin Uygun?</h2>

        <p>Online terapi özellikle şu durumlarda idealdir: Yoğun çalışan profesyoneller, evden çıkmakta zorlananlar, İzmir dışında yaşayıp psiko-beslenme desteği almak isteyenler, seyahat edenler, sosyal kaygı nedeniyle yüz yüze görüşmekte zorlananlar.</p>

        <h2>D&P Merkezi'nde Online Terapi</h2>

        <p>D&P Psikoloji ve Beslenme Merkezi olarak, tüm psikolojik danışmanlık ve beslenme danışmanlığı hizmetlerimizi online olarak da sunuyoruz. Online seanslarımız yüz yüze seanslarla aynı etik standartlarda, güvenli ve gizli altyapı ile gerçekleştirilir.</p>

        <p className="font-semibold text-indigo-700 mt-6">Online terapi hakkında daha fazla bilgi almak ve randevu oluşturmak için <Link to="/iletisim" className="underline">iletişim sayfamızı</Link> ziyaret edin.</p>
      </>
    )
  },
  {
    slug: 'izmir-psikolog-rehberi',
    title: '2025 İzmir Psikolog Rehberi: Doğru Terapisti Seçme Kılavuzu',
    excerpt: 'İzmir\'de psikolog arayışında nelere dikkat etmelisin? Alsancak, Karşıyaka, Bornova bölgelerinde uzman seçimi için ipuçları.',
    date: '2025-01-01',
    readTime: 7,
    category: 'rehber',
    image: '/blog/izmir-psikolog.svg',
    tags: ['izmir psikolog', 'terapi rehberi', 'alsancak', 'uzman seçimi'],
    content: (
      <>
        <p>İzmir'de psikolog arayışında mısınız? Doğru terapisti bulmak, terapi sürecinin başarısı için en kritik adımlardan biridir. Bu rehberde, İzmir'de psikolog seçerken dikkat etmeniz gereken tüm noktaları detaylıca ele alıyoruz.</p>

        <h2>İzmir'de Psikolog Seçerken Nelere Dikkat Etmeli?</h2>

        <h3>1. Uzmanlık Alanı</h3>
        <p>Her psikolog her konuda uzman değildir. Kaygı bozukluğu, depresyon, ilişki sorunları, travma, duygusal yeme gibi farklı alanlarda uzmanlaşmış terapistler vardır. İhtiyacınıza en uygun uzmanı seçmek, terapi sürecinin etkinliğini doğrudan etkiler.</p>

        <h3>2. Terapi Yaklaşımı</h3>
        <p>Bilişsel Davranışçı Terapi (BDT), EMDR, Psikodinamik Terapi, Şema Terapi gibi farklı ekoller vardır. Araştırmalar, terapist- danışan uyumunun başarıda kullanılan ekol kadar önemli olduğunu gösteriyor.</p>

        <h3>3. Lokasyon</h3>
        <p>İzmir'de Alsancak, Karşıyaka, Bornova, Balçova gibi bölgelerde birçok psikolog bulunuyor. D&P Psikoloji ve Beslenme Merkezi olarak Alsancak'ta hizmet veriyoruz. Ayrıca online seans seçeneğimizle İzmir dışından da terapi alabilirsiniz.</p>

        <h2>İzmir'de Psiko-Beslenme Desteği</h2>

        <p>Eğer sadece psikolojik destek değil, aynı zamanda beslenme danışmanlığı da almak istiyorsanız, D&P Psikoloji ve Beslenme Merkezi İzmir Alsancak'ta psiko-beslenme programı ile hizmet vermektedir. Psikolog ve diyetisyenin birlikte çalıştığı bu program, özellikle duygusal yeme, kilo yönetimi ve kaygı sorunları yaşayanlar için idealdir.</p>

        <h2>İzmir'de Psikolog Seçerken Sık Yapılan Hatalar</h2>

        <ul>
          <li>Sadece fiyata göre karar vermek</li>
          <li>Tanıdık tavsiyesiyle sorgusuz gitmek</li>
          <li>İlk seansta hemen sonuç beklemek</li>
          <li>Terapistin uzmanlık alanını kontrol etmemek</li>
          <li>Online terapiyi yüz yüze terapiye göre daha az etkili sanmak</li>
        </ul>

        <div className="bg-indigo-50 rounded-xl p-6 my-6 border border-indigo-100">
          <p className="font-bold text-indigo-900 mb-2">D&P Merkezi İletişim:</p>
          <p className="text-indigo-800">📍 Alsancak, İzmir<br />📞 +90 555 208 3092<br />✉️ iletisim@diyetizmir.fit</p>
        </div>

        <p className="font-semibold text-indigo-700 mt-6">Doğru psikologu bulmak bir yolculuktur. Bu yolculukta size rehberlik etmekten mutluluk duyarız. <Link to="/iletisim" className="underline">Bize ulaşın</Link>, ihtiyacınıza en uygun uzmanı birlikte belirleyelim.</p>
      </>
    )
  },
  {
    slug: 'stres-ve-beslenme',
    title: 'Stres ve Beslenme İlişkisi: Kortizolü Dengeleyen Besinler',
    excerpt: 'Stres vücudunuzu nasıl etkiliyor? Kortizol seviyesini düşüren besinler, stres yönetiminde beslenmenin rolü ve D&P psiko-beslenme yaklaşımı.',
    date: '2025-06-01',
    readTime: 8,
    category: 'psiko-beslenme',
    image: '/blog/stres-ve-beslenme.svg',
    tags: ['stres yönetimi', 'kortizol', 'beslenme', 'psiko-beslenme', 'stres'],
    content: (
      <>
        <p>Günümüzün en büyük sağlık sorunlarından biri olan kronik stres, yalnızca ruh halimizi değil, beden sağlığımızı da derinden etkiliyor. Stresle baş etmekte kullandığımız en yaygın yöntemlerden biri ise yemek yemek. Peki stres ve beslenme arasındaki ilişki tam olarak nedir ve bu döngüyü nasıl kırabiliriz?</p>

        <p>Bu yazıda, stres hormonu kortizolü dengeleyen besinleri, stresin yeme alışkanlıklarına etkisini ve <Link to="/psiko-beslenme" className="text-indigo-600 underline">psiko-beslenme</Link> yaklaşımıyla stres yönetimini ele alıyoruz.</p>

        <h2>Stres Vücudu Nasıl Etkiler?</h2>

        <p>Stres altındayken vücudumuz kortizol ve adrenalin hormonları salgılar. Kısa vadede bu hormonlar bizi hayatta tutar, ancak kronikleştiğinde yıkıcı etkiler oluşur:</p>

        <ul>
          <li><strong>Kan şekeri dalgalanmaları:</strong> Kortizol kan şekerini yükseltir, bu da ani açlık krizlerine yol açar</li>
          <li><strong>Yağ depolama:</strong> Vücut enerji depolamaya geçer, özellikle karın çevresi yağlanır</li>
          <li><strong>Bağırsak sorunları:</strong> Stres bağırsak florasını bozar, sindirim problemlerine yol açar</li>
          <li><strong>Besin emilimi:</strong> Stres sırasında vücut bazı besinleri yeterince ememez</li>
          <li><strong>Uyku bozukluğu:</strong> Yüksek kortizol uyku kalitesini düşürür, bu da strese davetiye çıkarır</li>
        </ul>

        <div className="bg-amber-50 rounded-xl p-6 my-6 border border-amber-100">
          <p className="font-bold text-amber-900 mb-2">Kısır Döngü:</p>
          <p className="text-amber-800">Stres - Sagliksiz Beslenme - Artan Stres - Daha Fazla Sagliksiz Beslenme. Bu donguyu kirmanin yolu bilincli beslenme ve psikolojik destektir.</p>
        </div>

        <h2>Kortizolü Dengeleyen Besinler</h2>

        <h3>1. Magnezyum Kaynaklari</h3>
        <p>Magnezyum, kortizol seviyesini düsürmede en etkili minerallerden biridir. Ispanak, badem, kabak çekirdegi, avokado ve muz magnezyum açisindan zengindir. Günlük magnezyum ihtiyacinizi karsilamak stres yönetiminde önemli bir adimdir.</p>

        <h3>2. Omega-3 Yag Asitleri</h3>
        <p>Somon, sardalya, ceviz ve keten tohumu gibi omega-3 kaynaklari, iltihabi azaltir ve kortizol seviyesini dengelemeye yardimci olur. Haftada en az 2 kez yagli balik tüketmek stresle mücadelede etkilidir.</p>

        <h3>3. C Vitamini</h3>
        <p>Portakal, kivi, çilek, biber gibi C vitamini kaynaklari, kortizol seviyesini düsürür ve bagisiklik sistemini güçlendirir. Stresli dönemlerde C vitamini tüketimini artirmak faydalidir.</p>

        <h3>4. Kompleks Karbonhidratlar</h3>
        <p>Tam tahilli ekmek, yulaf, kinoa, karabugday gibi kompleks karbonhidratlar, serotonin üretimini destekleyerek ruh halini iyilestirir. Kan sekerini dengede tutarak ani açlik krizlerini önler.</p>

        <h3>5. Probiyotik Besinler</h3>
        <p>Bagirsak sagligi ruh sagligini dogrudan etkiler. Kefir, yogurt, ev yapimi turşu gibi probiyotik besinler bagirsak florasini güçlendirir ve stresle bas etme kapasitesini artirir.</p>

        <h2>Stresliyken Yemek Yeme Atagini Nasil Önlersiniz?</h2>

        <p>Stresli anlarda yemek yeme istegiyle basa çikmak için su stratejileri uygulayabilirsiniz:</p>

        <ul>
          <li><strong>Duraklayin:</strong> Yemek yemeye uzandiginizda 10 saniye bekleyin. Gerçekten aç misiniz yoksa stresli mi?</li>
          <li><strong>Nefes alin:</strong> 4-7-8 nefes teknigi (4 saniye nefes al, 7 saniye tut, 8 saniye ver) kortizolu aninda düsürür</li>
          <li><strong>Suyunuzu için:</strong> Bir bardak su içmek hem fiziksel hem psikolojik bir mola saglar</li>
          <li><strong>Saglikli alternatifler:</strong> Atistirmalik olarak sebze çubuklari, ceviz veya meyve bulundurun</li>
        </ul>

        <h2>Psiko-Beslenme ile Stres Yönetimi</h2>

        <p>D&P Psikoloji ve Beslenme Merkezi'nde uyguladigimiz psiko-beslenme programi, stres yönetiminde psikolog ve diyetisyenin birlikte çalistigi bütüncül bir yaklasim sunar. Psikologunuz stres kaynaklarinizi ve duygusal tetikleyicilerinizi kesfederken, diyetisyeniniz kortizolü dengeleyen bir beslenme programi hazirlar.</p>

        <p>Stres yönetimi ve saglikli beslenme konusunda profesyonel destek almak için <Link to="/iletisim" className="text-indigo-600 underline">iletisim sayfamizdan</Link> bize ulasabilirsiniz.</p>
      </>
    )
  },
  {
    slug: 'izmir-diyetisyen-rehberi',
    title: 'Izmir Diyetisyen Rehberi: Dogru Uzmani Bulma Kilavuzu',
    excerpt: 'Izmir\'de diyetisyen ararken nelere dikkat etmeli? Alsancak, Karsiyaka, Bornova\'da uzman diyetisyen seçimi ve psiko-beslenme yaklasimi.',
    date: '2025-06-05',
    readTime: 7,
    category: 'rehber',
    image: '/blog/izmir-diyetisyen.svg',
    tags: ['izmir diyetisyen', 'diyetisyen rehberi', 'alsancak', 'kilo yönetimi', 'beslenme'],
    content: (
      <>
        <p>Izmir\'de diyetisyen arayisi içinde misiniz? Saglikli beslenme yolculugunuzda size rehberlik edecek dogru uzmani bulmak, basarinin anahtaridir. Bu kapsamli rehberde, Izmir\'de diyetisyen seçerken dikkat etmeniz gereken tüm noktalari ele aliyoruz.</p>

        <p>Ayrica, D&P Psikoloji ve Beslenme Merkezi\'nin sundugu psiko-beslenme programi ile diyetisyen ve psikolog destegini bir arada almanin avantajlarini kesfedeceksiniz.</p>

        <h2>Izmir\'de Diyetisyen Seçerken Nelere Dikkat Etmeli?</h2>

        <h3>1. Uzmanlik Alani ve Deneyim</h3>
        <p>Her diyetisyen her konuda ayni uzmanliga sahip degildir. Kilo yönetimi, klinik beslenme, sporcu beslenmesi, hormonal bozukluklar veya duygusal yeme gibi farkli alanlarda uzlas-mis diyetisyenler bulunur. Ihtiyaciniza en uygun uzmani seçmek, hedeflerinize ulasma sürecini hizlandirir.</p>

        <h3>2. Psiko-Beslenme Yaklasimi</h3>
        <p>Geleneksel diyet listelerinin basari orani düsüktür. Bunun nedeni, yeme davranisinin sadece fizyolojik degil, psikolojik faktörlerden de etkilenmesidir. D&P Merkezi\'nde uygulanan psiko-beslenme programinda diyetisyen ve psikolog birlikte çalisarak hem beslenme aliskanliklarinizi hem de duygusal tetikleyicilerinizi ele alir.</p>

        <h3>3. Lokasyon ve Ulasim</h3>
        <p>Izmir\'de Alsancak, Karsiyaka, Bornova, Balçova, Buca gibi birçok ilçede diyetisyen bulabilirsiniz. D&P Psikoloji ve Beslenme Merkezi, Alsancak\'ta merkezi konumuyla Izmir\'in her yerinden kolay ulasim saglar. Online seans seçenegiyle de Izmir disindan danisan kabul ediyoruz.</p>

        <h2>Izmir\'de Diyetisyen Muayenesi Ücretleri 2025</h2>

        <p>Diyetisyen muayene ücretleri, uzmanin deneyimi, klinigin konumu ve sundugu hizmetin kapsamina göre degisir. Ortalama olarak ilk muayene ücreti 500-1500 TL arasinda degismektedir. D&P Merkezi olarak uygun fiyatli paket programlar sunuyor, düzenli takip ve beslenme egitimi hizmeti veriyoruz.</p>

        <h2>Diyetisyene Gitmeden Önce Bilmeniz Gerekenler</h2>

        <ul>
          <li><strong>Hedef belirleyin:</strong> Kisa ve uzun vadeli hedeflerinizi netlestirin. Sadece kilo vermek mi istiyorsunuz, yoksa saglikli beslenme aliskanligi mi kazanmak?</li>
          <li><strong>Saglik geçmisi:</strong> Daha önceki diyet deneyimlerinizi, kronik hastaliklarinizi ve kullandiginiz ilaçlari not alin.</li>
          <li><strong>Kan tahlilleri:</strong> Ilk görüsmede güncel kan tahlillerinizi yaninizda bulundurun. Bu, uzmanin size özel bir program hazirlamasina yardimci olur.</li>
          <li><strong>Bütçenizi belirleyin:</strong> Takip programlari genelde paket seklinde satilir, toplam maliyeti önceden ögrenin.</li>
          <li><strong>Online seçenek:</strong> Yogun bir programiniz varsa online diyetisyen destegi de alabileceginizi unutmayin.</li>
        </ul>

        <h2>Psiko-Beslenme: Diyetisyen ve Psikolog Birlikte Çalisir</h2>

        <p>D&P Psikoloji ve Beslenme Merkezi\'nin en büyük farki, diyetisyen ve psikologun birlikte çalismasidir. Özellikle <Link to="/duygusal-yeme" className="text-indigo-600 underline">duygusal yeme</Link> sorunu yasayan, motivasyon problemi olan veya geçmiste basarisiz diyet deneyimleri bulunan danisanlar için bu entegre yaklasim çok daha etkilidir.</p>

        <p>Psikologunuz duygusal tetikleyicilerinizi kesfeder ve stres yönetimi becerileri gelistirmenize yardimci olurken, diyetisyeniniz bu dogrultuda size özel bir beslenme programi hazirlar. Haftalik takiplerle ilerlemeniz ölçülür ve gerektiginde plan güncellenir.</p>

        <p>Izmir\'de dogru diyetisyeni bulmak ve bütüncül bir yaklasimla saglikli yasama adim atmak için <Link to="/iletisim" className="text-indigo-600 underline">bize ulasin</Link>.</p>
      </>
    )
  },
  {
    slug: 'pcos-ve-beslenme',
    title: 'PCOS (Polikistik Over) ve Beslenme: Hormon Dostu Diyet Rehberi',
    excerpt: 'Polikistik over sendromunda beslenme nasil olmali? Insülin direnci, kilo yönetimi ve hormonal denge için bilimsel beslenme stratejileri.',
    date: '2025-06-10',
    readTime: 9,
    category: 'beslenme',
    image: '/blog/pcos-beslenme.svg',
    tags: ['PCOS', 'polikistik over', 'hormon beslenme', 'insülin direnci', 'kadin sagligi'],
    content: (
      <>
        <p>Polikistik Over Sendromu (PCOS), dogurganlik çagindaki kadinlarin yaklasik %10-15\'ini etkileyen hormonal bir bozukluktur. PCOS\'un en önemli belirtileri arasinda düzensiz adet kanamasi, insülin direnci, kilo alimi ve tüpü problemleri yer alir. Peki PCOS yönetiminde beslenmenin rolü nedir?</p>

        <p>Bu kapsamli rehberde, PCOS\'a özel beslenme stratejilerini, insülin direncini dengeleyen besinleri ve D&P psiko-beslenme programinin PCOS yönetimindeki yerini ele aliyoruz.</p>

        <h2>PCOS ve Insülin Direnci Iliskisi</h2>

        <p>PCOS\'lu kadinlarda sikça görülen insülin direnci, hücrelerin insülin hormonuna karsi duyarsizlasmasi durumudur. Bu durum, vücudun daha fazla insülin üretmesine yol açar ve bu da yumurtaliklarda androgen (erkeklik hormoni) üretimini tetikler.</p>

        <p>Insülin direnci ayni zamanda kilo vermeyi zorlastirir, özellikle karin çevresi yaglanmaya neden olur ve tip 2 diyabet riskini artirir. Neyse ki, dogru beslenme stratejileriyle insülin direncini yönetmek ve PCOS belirtilerini hafifletmek mümkündür.</p>

        <h2>PCOS Için Beslenme Stratejileri</h2>

        <h3>1. Düsük Glisemik Indeksli Besinler</h3>
        <p>Kan sekerini yavas yükselten düsük GI\'li besinler, insülin seviyesini kontrol altinda tutar. Tam tahilli ekmek, yulaf, kinoa, baklagiller, yesil yaprakli sebzeler ve meyveler (elma, armut, çilek) düsük GI\'lidir. Beyaz ekmek, pirinç, patates ve sekerli gidalardan uzak durmak insülin direnci yönetiminde kritiktir.</p>

        <h3>2. Protein Agirlikli Beslenme</h3>
        <p>Ögünlerde yeterli protein tüketimi, kan sekerini dengeler ve tokluk süresini uzatir. Yumurta, tavuk, hindi, balik, yogurt ve baklagiller kaliteli protein kaynaklaridir. Kahvaltida protein tüketimine özellikle önem verilmelidir.</p>

        <h3>3. Saglikli Yaglar</h3>
        <p>Avokado, zeytinyagi, ceviz, badem ve yagli baliklar (somon, sardalya) iltihabi azaltarak PCOS belirtilerini hafifletir. Özellikle omega-3 yag asitleri, androgen seviyesini düsürmeye yardimci olur.</p>

        <h3>4. Antioksidan Zengini Besinler</h3>
        <p>PCOS\'ta oksidatif stres yüksektir. Yaban mersini, nar, ispanak, brokoli, zerdeçal ve yesil çay gibi antioksidan zengini besinler, hücre hasarini önler ve hormonal dengeyi destekler.</p>

        <h3>5. Krom ve Magnezyum</h3>
        <p>Krom minerali insülin hassasiyetini artirir (brokoli, arpa, domates). Magnezyum ise insülin direncini azaltir ve PCOS\'lu kadinlarda sikça eksik görülür (ispanak, badem, muz).</p>

        <h2>PCOS ve Duygusal Beslenme</h2>

        <p>PCOS\'lu kadinlar, hormonal dalgalanmalar nedeniyle duygusal yeme ataklarina daha yatkindir. <Link to="/duygusal-yeme" className="text-indigo-600 underline">Duygusal yeme</Link> döngüsü, insülin direncini daha da kötülestirir ve kilo yönetimini zorlastirir. Bu noktada psikolojik destek, PCOS yönetiminin ayrilmaz bir parçasidir.</p>

        <h2>PCOS ve Psiko-Beslenme Programi</h2>

        <p>D&P Merkezi\'nde PCOS\'lu danisanlar için özel olarak tasarlanan psiko-beslenme programi, diyetisyen ve psikolog esliginde yürütülür. Diyetisyeniniz insülin direncini dengeleyen bir beslenme programi hazirlarken, psikologunuz hormonal dalgalanmalarin ruh halinize etkisiyle bas etme stratejileri gelistirmenize yardimci olur.</p>

        <p>PCOS (insülin direnci, kilo kontrolü, duygusal denge) ile ilgili detayli bilgi ve randevu için <Link to="/iletisim" className="text-indigo-600 underline">iletisim sayfamizdan</Link> bize ulasabilirsiniz.</p>
      </>
    )
  },
  {
    slug: 'bilincli-yeme-mindful-eating',
    title: 'Bilinçli Yeme (Mindful Eating) Nedir? 5 Temel Ilke',
    excerpt: 'Mindful eating (bilinçli yeme) nedir, nasil yapilir? Otomatik pilotta yemek yeme aliskanligindan kurtulmak için 5 temel ilke ve uygulama rehberi.',
    date: '2025-06-15',
    readTime: 7,
    category: 'beslenme',
    image: '/blog/mindful-eating.svg',
    tags: ['mindful eating', 'bilinçli yeme', 'farkindalik', 'yeme bozuklugu', 'saglikli beslenme'],
    content: (
      <>
        <p>Televizyon karsisinda, telefon ekranina bakarken ya da bilgisayar basinda çalisirken yemek yiyor musunuz? Eger öyleyse, büyük olasilikla ne yediginizin, ne kadar yediginizin ve hatta yemegin tadinin farkinda bile degilsinizdir. Bu otomatik pilotta yeme hali, kilo alimindan sindirim problemlerine kadar birçok soruna yol açar.</p>

        <p>Iste tam bu noktada <strong>bilinçli yeme (mindful eating)</strong> devreye girer. Bu yazida mindful eating\'in ne oldugunu, 5 temel ilkesini ve pratik uygulama yöntemlerini ele aliyoruz.</p>

        <h2>Bilinçli Yeme (Mindful Eating) Nedir?</h2>

        <p>Mindful eating, yemek yerken tamamen o ana odaklanma, yeme deneyimini tüm duyularinizla fark etme ve içsel açlik-tokluk sinyallerinize kulak verme uygulamasidir. Bir diyet degil, bir yeme biçimidir. Amaci, neyi, ne zaman ve neden yediginizin farkina varmaktir.</p>

        <p>Bilinçli yeme, Budist mindfulness pratiklerinden beslenir ve 1970\'lerde Jon Kabat-Zinn tarafindan bilimsel alana kazandirilmistir. Günümüzde birçok terapist ve diyetisyen tarafindan duygusal yeme ve yeme bozukluklari tedavisinde kullanilmaktadir.</p>

        <h2>Mindful Eating\'in 5 Temel Ilkesi</h2>

        <h3>1. Yargilamadan Gözlemleyin</h3>
        <p>Yemekle ilgili düsüncelerinizi ve hislerinizi yargilamadan fark edin. "Kötü yemek yedim" yerine "Su an canim çikolata çekiyor ve bunun farkindayim" deyin. Yargilamak yerine fark etmek, degisimin ilk adimidir.</p>

        <h3>2. Açlik Sinyallerinizi Tanima</h3>
        <p>Yemek yemeden önce 1-10 arasi bir ölçekte ne kadar aç oldugunuzu sorgulayin. Gerçek fiziksel açlik ile duygusal yeme istegini ayirt etmeyi ögrenmek, mindful eating\'in temelidir. Fiziksel açlik yavas gelisir, herhangi bir yiyecekle doyurulabilir ve doydugunuzda kaybolur.</p>

        <h3>3. Tüm Duyularinizi Kullanma</h3>
        <p>Yemegin rengine, kokusuna, dokusuna ve tadina dikkat edin. Her lokmada çatali birakin, yemegi agzinizda tam olarak hissedin. Bu, beyninize doyum sinyali gönderilmesi için gereken süreyi (<Link to="/psiko-beslenme" className="text-indigo-600 underline">yaklasik 20 dakika</Link>) saglar.</p>

        <h3>4. Duygusal Tetikleyicileri Fark Etme</h3>
        <p>Hangi duygular yemek yeme isteginizi tetikliyor? Stres, üzüntü, can sikintisi, yalnizlik veya mutluluk... Her duygunun yeme davranisi üzerinde farkli bir etkisi vardir. Bu tetikleyicileri tanimak, otomatik pilotta yemek yemeyi engeller.</p>

        <h3>5. Yeterli Oldugunda Durma</h3>
        <p>Tabaginizdaki her seyi bitirmek zorunda degilsiniz. Vücudunuzun tokluk sinyalini hissettiginizde durun. Bu, özellikle duygusal yeme ataklarinda zor olabilir, ancak pratikle gelisen bir beceridir.</p>

        <h2>Mindful Eating Pratikleri</h2>

        <ul>
          <li><strong>Kuru üzüm egzersizi:</strong> Bir kuru üzümü 5 dakika boyunca tüm duyularinizla inceleyin, agzinizda yavasça hissedin. Günlük yeme hizinizi fark edeceksiniz.</li>
          <li><strong>Telefonsuz ögün:</strong> Günde en az bir ögünü televizyon, telefon ve bilgisayar olmadan yiyin.</li>
          <li><strong>Bes lokma kurali:</strong> Ilk 5 lokmada yemegin tadina odaklanin, sonra vücudunuzun sinyallerini dinleyin.</li>
          <li><strong>Yemek günlügü:</strong> Ne degil, nasil yediginizi yazin. Hangi duyguda, hangi hizda, nerede yemek yediniz?</li>
        </ul>

        <h2>Bilinçli Yeme ve Psiko-Beslenme</h2>

        <p>D&P Merkezi\'nin psiko-beslenme programinda, mindful eating çalismalari düzenli olarak uygulanir. Psikologunuz farkindalik pratikleriyle duygusal yeme tetikleyicilerinizi tanimaniza yardimci olurken, diyetisyeniniz bu farkindaligi beslenme aliskanliklariniza yansitmanizi saglar.</p>

        <p>Bilinçli yeme pratikleriyle tanismak ve bütüncül bir saglik yolculuguna baslamak için <Link to="/iletisim" className="text-indigo-600 underline">bize ulasin</Link>.</p>
      </>
    )
  },
  {
    slug: 'sosyal-kaygi-ve-terapi',
    title: 'Sosyal Kaygi Bozuklugu: Belirtiler, Nedenler ve Terapi Yöntemleri',
    excerpt: 'Sosyal kaygi nedir, nasil tedavi edilir? Sosyal ortamlarda yasanan yogun kayginin nedenleri, BDT ile tedavi yöntemleri ve online terapi seçenekleri.',
    date: '2025-06-20',
    readTime: 8,
    category: 'psikoloji',
    image: '/blog/sosyal-kaygi.svg',
    tags: ['sosyal kaygi', 'kaygi bozuklugu', 'terapi', 'online terapi', 'BDT'],
    content: (
      <>
        <p>Kalabalik bir ortamda konusurken ellerinizin terledigini, kalbinizin hizli atmasini ya da insanlarin sizi yargiladigini hissettiginiz oluyor mu? Sosyal kaygi bozuklugu (sosyal fobi), bireyin sosyal ortamlarda yargilanma, kötü duruma düsme veya rezil olma korkusu yasamasina neden olan yaygin bir psikolojik rahatsizliktir.</p>

        <p>Bu yazida sosyal kaygi bozuklugunun belirtilerini, nedenlerini ve en etkili terapi yöntemlerini ele aliyoruz. Ayrica, <Link to="/online-terapi" className="text-indigo-600 underline">online terapi</Link> seçeneginin sosyal kaygi yasayan bireyler için neden özellikle uygun oldugunu açikliyoruz.</p>

        <h2>Sosyal Kaygi Bozuklugu Belirtileri</h2>

        <p>Sosyal kaygi belirtileri fiziksel, bilissel ve davranissal olmak üzere üç gruba ayrilir:</p>

        <h3>Fiziksel Belirtiler</h3>
        <ul>
          <li>Hizli kalp atisi ve çarpinti</li>
          <li>Asiri terleme, özellikle eller ve yüzde</li>
          <li>Titreme, ses titremesi</li>
          <li>Mide bulantisi ve sindirim sorunlari</li>
          <li>Yüzde kizariklik</li>
          <li>Nefes almakta zorlanma</li>
        </ul>

        <h3>Bilissel Belirtiler</h3>
        <ul>
          <li>Insanlarin beni yargiladigi düsüncesi</li>
          <li>"Rezil olacagim" veya "Aptal görünecegim" gibi olumsuz düsünceler</li>
          <li>Kendini sürekli baskalariyla karsilastirma</li>
          <li>Sosyal ortamlar hakkinda felaket senaryolari kurma</li>
        </ul>

        <h3>Davranissal Belirtiler</h3>
        <ul>
          <li>Sosyal ortamlardan kaçinma veya erken terk etme</li>
          <li>Göz temasi kurmaktan kaçinma</li>
          <li>Az konusma veya hiç konusmama</li>
          <li>Alkol gibi maddeler yardimiyla kaygiyi azaltma</li>
          <li>Is, okul ve sosyal hayatta kisitlanma</li>
        </ul>

        <h2>Sosyal Kayginin Nedenleri</h2>

        <p>Sosyal kaygi bozuklugunun kesin nedeni bilinmemekle birlikte, birkaç faktörün bir araya gelmesiyle ortaya çiktigi düsünülmektedir:</p>

        <ul>
          <li><strong>Genetik faktörler:</strong> Ailede kaygi bozuklugu öyküsü olanlarda risk daha yüksektir</li>
          <li><strong>Beyin yapisi:</strong> Amigdalanin asiri aktif olmasi korku ve kaygi tepkilerini artirir</li>
          <li><strong>Yetistirilme biçimi:</strong> Asiri koruyucu veya elestirel ebeveyn tutumlari</li>
          <li><strong>Olumsuz sosyal deneyimler:</strong> Zorbalik, asagilanma, reddedilme gibi travmatik deneyimler</li>
          <li><strong>Mükemmeliyetçilik:</strong> Her zaman en iyisini yapma baskisi</li>
        </ul>

        <h2>Sosyal Kaygida En Etkili Terapi Yöntemleri</h2>

        <h3>Bilissel Davranisçi Terapi (BDT)</h3>
        <p>BDT, sosyal kaygi tedavisinde altin standart olarak kabul edilir. Olumsuz düsünce kaliplarini tanima ve degistirme, kaçinma davranislarini kirma ve kaygiyla basa çikma becerileri gelistirme üzerine odaklanir. Arastirmalar, BDT\'nin sosyal kaygili bireylerin %70\'inden fazlasinda anlamli iyilesme sagladigini gösteriyor.</p>

        <h3>Maruz Birakma Terapisi</h3>
        <p>Korkulan sosyal durumlarla kontrollü bir sekilde yüzlesme, kayginin zamanla azalmasini saglar. BDT\'nin bir bileseni olan maruz birakma, adim adim uygulandiginda oldukça etkilidir.</p>

        <h3>Online Terapi</h3>
        <p>Sosyal kaygisi olan birçok kisi için terapistin karsisina oturmak bile kaygi verici olabilir. <Link to="/online-terapi" className="text-indigo-600 underline">Online terapi</Link>, kendi evinizin konforunda, yüz yüze görüsmenin yarattigi kaygi olmadan terapi almanizi saglar. Bu, sosyal kaygi tedavisine baslamak için bir köprü görevi görebilir.</p>

        <h2>Sosyal Kaygi ile Basa Çikma Stratejileri</h2>

        <ul>
          <li><strong>Derin nefes:</strong> Kaygi aninda 4-7-8 nefes teknigini uygulayin</li>
          <li><strong>Gerçekçi düsünce:</strong> "Herkes beni izliyor" yerine "Insanlar genelde kendileriyle mesgul" deyin</li>
          <li><strong>Küçük adimlar:</strong> Bir günlük hedef belirleyin: bir kisiyle göz temasi kurmak, bir toplantida tek cümle söylemek gibi</li>
          <li><strong>Kendinize sefkat:</strong> Iyi yaptiginiz seyleri fark edin, mükemmel olmak zorunda degilsiniz</li>
        </ul>

        <p>Sosyal kaygi tedavisi ve psikolojik destek için <Link to="/iletisim" className="text-indigo-600 underline">iletisim sayfamizdan</Link> bize ulasabilir, online veya yüz yüze terapi seçeneklerimizi ögrenebilirsiniz.</p>
      </>
    )
  },
  {
    slug: 'depresyon-ve-beslenme',
    title: 'Depresyon ve Beslenme Iliskisi: Beyni Iyilestiren Besinler',
    excerpt: 'Depresyon beslenmeyi nasil etkiler? Omega-3\'ten D vitaminine, bagirsak-beyin ekseninde depresyonla mücadelede beslenmenin bilimsel rolü.',
    date: '2025-06-25',
    readTime: 9,
    category: 'psiko-beslenme',
    image: '/blog/depresyon-beslenme.svg',
    tags: ['depresyon', 'beslenme', 'omega-3', 'bagirsak-beyin ekseni', 'ruh sagligi'],
    content: (
      <>
        <p>Depresyon, dünya genelinde 280 milyondan fazla insani etkileyen ciddi bir ruh sagligi sorunudur. Antidepresan ilaçlar ve psikoterapi depresyon tedavisinin temelini olustururken, beslenmenin depresyon üzerindeki etkisi giderek daha fazla arastirilmaktadir.</p>

        <p>Bu yazida, depresyon ve beslenme arasindaki çift yönlü iliskiyi, depresyon belirtilerini hafifleten besinleri ve psiko-beslenme yaklasiminin depresyon tedavisindeki rolünü ele aliyoruz.</p>

        <h2>Depresyon ve Beslenme: Çift Yönlü Iliski</h2>

        <p>Depresyon ve beslenme arasinda karmasik bir iliski vardir. Depresyon ihtahsizlik veya asiri yeme, sagliksiz besin tercihleri ve yemek hazirlama motivasyonunda azalmaya neden olur. Öte yandan, sagliksiz beslenme de depresyon riskini artirir. Bu kisir döngüyü kirmak için bütüncül bir yaklasim gereklidir.</p>

        <h2>Depresyona Iyi Gelen Besinler</h2>

        <h3>1. Omega-3 Yag Asitleri</h3>
        <p>Omega-3 yag asitleri, beyin sagligi için en kritik besinlerden biridir. EPA ve DHA adli iki temel omega-3, nörotransmitter fonksiyonlarini düzenler ve iltihabi azaltir. Somon, uskumru, sardalya, ceviz, chia tohumu ve keten tohumu zengin kaynaklardir. Arastirmalar, düzenli omega-3 tüketiminin depresyon belirtilerini %30-50 oraninda azaltabildigini gösteriyor.</p>

        <h3>2. B12 ve Folat (B9)</h3>
        <p>B12 ve folat eksikligi, depresyon riskini artiran en önemli beslenme faktörlerindendir. Bu vitaminler, serotonin ve dopamin gibi mutluluk hormonlarinin üretiminde rol oynar. Yumurta, süt ürünleri, kirmizi et (B12), yesil yaprakli sebzeler ve baklagiller (folat) temel kaynaklardir.</p>

        <h3>3. D Vitamini</h3>
        <p>D vitamini eksikligi ile depresyon arasinda güçlü bir iliski oldugu birçok arastirmada gösterilmistir. Güneydeki sehirlerde yasayanlar (Izmir gibi) daha avantajli olsa da, özellikle kis aylarinda D vitamini takviyesi gerekebilir. Balik, yumurta sarisi ve D vitaminiyle zenginlestirilmis besinler iyi kaynaklardir.</p>

        <h3>4. Magnezyum</h3>
        <p>Magnezyum, stres hormonu kortizolü baskilar ve sinir sistemini yatistirir. Ispanak, badem, kabak çekirdegi ve muz gibi besinler magnezyum açisindan zengindir. Günlük magnezyum ihtiyacinizi karsilamak, depresif belirtileri hafifletebilir.</p>

        <h3>5. Probiyotikler ve Prebiyotikler</h3>
        <p>Bagirsak florasinin depresyon üzerinde dogrudan etkisi vardir. Bagirsak-beyin ekseni, bagirsaktaki mikrobiyotanin beyin fonksiyonlarini nasil etkiledigini açiklayan önemli bir bilimsel alandir. Kefir, yogurt, ev yapimi turşu (probiyotik) ve enginar, kuskonmaz, muz, yulaf (prebiyotik) düzenli olarak tüketilmelidir.</p>

        <h2>Depresyonda Kaçinilmasi Gereken Besinler</h2>

        <ul>
          <li><strong>Islenmis gidalar:</strong> Paketli atistirmaliklar, hazir yemekler</li>
          <li><strong>Asitli içecekler:</strong> Yüksek seker içerikleri kan sekerini dalgalandirir</li>
          <li><strong>Trans yaglar:</strong> Kizartmalar, hazir pasta ve bisküviler</li>
          <li><strong>Asiri kafein:</strong> Kaygi ve uykusuzluga yol açabilir, depresyonu tetikler</li>
          <li><strong>Alkol:</strong> Depresan etkisi vardir ve depresyonu derinlestirebilir</li>
        </ul>

        <div className="bg-indigo-50 rounded-xl p-6 my-6 border border-indigo-100">
          <p className="font-bold text-indigo-900 mb-2">Hatirlatma:</p>
          <p className="text-indigo-800">Beslenme depresyon tedavisinde destekleyici bir unsurdur, ancak tek basina bir tedavi yöntemi degildir. Profesyonel psikolojik destek ve gerektiginde ilaç tedavisi ile birlikte uygulanmalidir.</p>
        </div>

        <h2>Depresyon ve Psiko-Beslenme Programi</h2>

        <p>D&P Psikoloji ve Beslenme Merkezi\'nde depresyon yasayan danisanlar için psikolog ve diyetisyen birlikte çalisir. <Link to="/psiko-beslenme" className="text-indigo-600 underline">Psiko-beslenme programimiz</Link> kapsaminda, psikologunuz depresyonun duygusal ve bilissel boyutlariyla çalisirken, diyetisyeniniz beyni iyilestiren bir beslenme plani hazirlar.</p>

        <p>Depresyonla bas etmek ve bütüncül bir iyilesme sürecine baslamak için <Link to="/iletisim" className="text-indigo-600 underline">bize ulasin</Link>.</p>
      </>
    )
  },
  {
    slug: 'cocuklarda-saglikli-beslenme',
    title: 'Cocuklarda Saglikli Beslenme Aliskanliklari: Ebeveynler Için Rehber',
    excerpt: 'Cocuklara saglikli beslenme aliskanligi nasil kazandirilir? Yemek seçme davranisi, ögün düzeni ve ebeveyn stratejileri.',
    date: '2025-06-30',
    readTime: 7,
    category: 'beslenme',
    image: '/blog/cocuk-beslenmesi.svg',
    tags: ['cocuk beslenmesi', 'yemek seçme', 'ebeveyn rehberi', 'saglikli beslenme', 'aile'],
    content: (
      <>
        <p>Cocukluk döneminde kazanilan beslenme aliskanliklari, yasam boyu sagligin temelini olusturur. Ancak birçok ebeveyn, çocuklarina saglikli yemek yedirme konusunda zorlanir. Yemek seçme, sekerli gidalara yönelme ve ögün saatlerinde çatisma ailelerin en sik karsilastigi sorunlardandir.</p>

        <p>Bu rehberde, çocuklara saglikli beslenme aliskanligi kazandirmak için bilimsel stratejileri ve psikolojik yaklasimlari ele aliyoruz.</p>

        <h2>Cocuklarda Yemek Seçme Davranisi Neden Olur?</h2>

        <p>Yemek seçme (selektif yeme), 2-6 yas arasindaki çocuklarda normal bir gelisimsel dönemdir. Ancak bu dönem bazi çocuklarda uzayabilir ve beslenme yetersizliklerine yol açabilir. Yemek seçmenin nedenleri arasinda:</p>

        <ul>
          <li><strong>Gelisimsel faktörler:</strong> Bagimsizlik kazanma çabasi, kontrol ihtiyaci</li>
          <li><strong>Duyusal hassasiyet:</strong> Bazi dokulara, tatlara veya kokulara karsi asiri duyarlilik</li>
          <li><strong>Daha önceki olumsuz deneyimler:</strong> Yemek sirasinda zorlanma, isirma veya bosulma</li>
          <li><strong>Ebeveyn tutumlari:</strong> Asiri israrci veya tamamen serbest birakan ebeveyn davranislari</li>
          <li><strong>Model alma:</strong> Ebeveynlerin kendi yemek seçme davranislari</li>
        </ul>

        <h2>Cocuklara Saglikli Beslenme Aliskanligi Kazandirma Stratejileri</h2>

        <h3>1. Rol Model Olun</h3>
        <p>Cocuklar ebeveynlerini taklit eder. Siz saglikli beslenirseniz, onlar da saglikli beslenmeye egilimli olur. Ailece ayni yemegi yemek, çocugun yeni tatlara açilmasini kolaylastirir. Ayri bir çocuk yemegi hazirlamak yerine, ayni yemegin çocuga uygun versiyonunu sunun.</p>

        <h3>2. Baski Yapmadan Maruz Birakin</h3>
        <p>Arastirmalar, bir besinin çocuk tarafindan kabul edilmesi için 10-15 kez denenmesi gerektigini gösteriyor. Baski yapmadan, israr etmeden, sadece tabakta bulundurarak maruz birakin. "Bir lokma dene" yerine "Sadece tabaginda dursun, istersen yersin" yaklasimi daha etkilidir.</p>

        <h3>3. Ögün Ortamini Pozitif Hale Getirin</h3>
        <p>Yemek saatlerinde televizyon, tablet ve telefon olmamalidir. Ailece sohbet ederek, güzel bir ortamda yemek yemek, çocugun yemekle olumlu bir iliski kurmasini saglar. Yemegi bir ceza veya ödül araci olarak kullanmaktan kaçinin.</p>

        <h3>4. Cocugu Karar Sürecine Dahil Edin</h3>
        <p>Manavda meyve sebze seçmesine izin verin, mutfakta basit islerde yardim etmesini saglayin, tabagindaki sebzeyi kendisinin seçmesine firsat verin. Kontrol duygusu, yemek seçme davranisini azaltir.</p>

        <h3>5. Seker Tüketimini Denetleyin</h3>
        <p>Sekerli gidalari tamamen yasaklamak, onlari daha çekici hale getirir. Bunun yerine, sekerli gidalari sinirli miktarda ve belirli günlerde sunmak daha saglikli bir yaklasimdir. Alternatif olarak kuru meyve ve taze meyve gibi dogal tatli seçenekleri sunun.</p>

        <h2>Ebeveynlerin Sik Yaptigi Hatalar</h2>

        <ul>
          <li>Yemegi ödül veya ceza olarak kullanmak</li>
          <li>Cocugun sevmedigi yemekler için ayri yemek pisirmek</li>
          <li>Her ögünde çatisma yasamak ve yemek saatini gerilimli hale getirmek</li>
          <li>Cocugu tabagindaki her seyi bitirmeye zorlamak</li>
          <li>Saglikli beslenmeyi bir "görev" olarak sunmak</li>
        </ul>

        <div className="bg-emerald-50 rounded-xl p-6 my-6 border border-emerald-100">
          <p className="font-bold text-emerald-900 mb-2">Unutmayin:</p>
          <p className="text-emerald-800">Saglikli beslenme aliskanliklari bir gecede olusmaz. Sabirli olun, küçük basarilari kutlayin ve çocugunuzla saglikli bir yemek iliskisi kurmanin bir yaris olmadigini hatirlayin.</p>
        </div>

        <p>Cocuk beslenmesi konusunda profesyonel destek almak ve ailece saglikli beslenme aliskanliklari kazanmak için <Link to="/iletisim" className="text-indigo-600 underline">bize ulasin</Link>.</p>
      </>
    )
  }
];

const slugify = (str) => str
  .toLowerCase()
  .replace(/ç/g, 'c').replace(/ş/g, 's').replace(/ğ/g, 'g')
  .replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ı/g, 'i')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const allTags = [...new Set(blogPosts.flatMap(p => p.tags))];
const tagSlugMap = Object.fromEntries(allTags.map(t => [slugify(t), t]));

// --- COMPONENTS ---

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Ana Sayfa' },
    { path: '/hizmetler', label: 'Hizmetlerimiz' },
    { path: '/psiko-beslenme', label: 'Psiko-Beslenme' },
    { path: '/blog', label: 'Blog' },
    { path: '/hakkimizda', label: 'Hakkımızda' },
    { path: '/iletisim', label: 'İletişim' }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center cursor-pointer group" onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <span className="text-4xl font-extrabold tracking-tighter text-slate-900 lowercase group-hover:text-indigo-950 transition-colors">
              d&p
            </span>
            <span className="text-5xl text-emerald-500 leading-none">.</span>
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                  isActive(item.path) ? 'text-indigo-600 font-bold' : 'text-slate-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path) ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="text-3xl font-extrabold tracking-tighter text-white lowercase hover:text-indigo-300 transition-colors"
            >
              d&p<span className="text-emerald-500">.</span>
            </button>
            <p className="text-sm mt-2 text-slate-400">Ruhsal denge ve sürdürülebilir beslenmeyi aynı çatı altında buluşturuyoruz.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Hızlı Bağlantılar</h4>
            <div className="space-y-2 text-sm">
              <Link to="/hizmetler" className="block hover:text-white transition-colors">Hizmetler</Link>
              <Link to="/psiko-beslenme" className="block hover:text-white transition-colors">Psiko-Beslenme</Link>
              <Link to="/blog" className="block hover:text-white transition-colors">Blog</Link>
              <Link to="/iletisim" className="block hover:text-white transition-colors">İletişim</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">İletişim</h4>
            <div className="space-y-2 text-sm">
              <p>Alsancak, İzmir</p>
              <p>+90 555 208 3092</p>
              <p>iletisim@diyetizmir.fit</p>
            </div>
          </div>
        </div>
        <div className="text-sm text-center pt-8 border-t border-slate-800">&copy; {new Date().getFullYear()} D&P Psikoloji ve Beslenme Merkezi. Tüm Hakları Saklıdır.</div>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

// --- PAGE TITLE ---
function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | D&P Psikoloji ve Beslenme` : 'D&P Psikoloji ve Beslenme Merkezi | Psiko-Beslenme | İzmir Psikolog & Diyetisyen';
  }, [title]);
}

// --- PAGES ---

function HomePage() {
  const [expandedBox, setExpandedBox] = useState(null);
  const navigate = useNavigate();
  usePageTitle('');

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="text-center max-w-4xl mx-auto pt-10 pb-8">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-6 border border-indigo-100">
          <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
          Bilimsel Yaklaşımla Bütüncül İyi Oluş
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
          Psikolog ve Diyetisyen Desteğiyle<br className="hidden md:block" />{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">Dengeli Bir Zihin ve Sağlıklı Bir Yaşam</span> İnşa Ediyoruz.
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto">
          D&P Psikoloji ve Beslenme Merkezi ile duygusal iyi oluşunuzu güçlendirin, size özel beslenme planlarıyla sürdürülebilir sağlıklı yaşam rutinleri oluşturun.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/iletisim')}
            className="inline-flex w-full sm:w-auto items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white transition-all bg-slate-900 rounded-xl hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
          >
            İlk Görüşmeyi Planlayın
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
          <button
            onClick={() => navigate('/psiko-beslenme')}
            className="inline-flex w-full sm:w-auto items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-indigo-600 transition-all bg-indigo-50 rounded-xl hover:bg-indigo-100 hover:shadow-lg hover:shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 border border-indigo-200"
          >
            Psiko-Beslenme Nedir?
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-200">
        {homeBoxesData.map((box) => (
          <div
            key={box.id}
            onClick={() => setExpandedBox(expandedBox === box.id ? null : box.id)}
            className={`bg-white rounded-3xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border ${expandedBox === box.id ? 'border-indigo-300 ring-2 ring-indigo-50' : 'border-slate-100 hover:border-indigo-100 hover:-translate-y-1'} transition-all duration-300 cursor-pointer flex flex-col`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 ${box.bg} rounded-2xl flex items-center justify-center`}>{box.icon}</div>
              <button className="text-slate-400 hover:text-indigo-600 transition-colors p-2 bg-slate-50 rounded-full">
                {expandedBox === box.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{box.title}</h3>
            <p className="text-slate-600 leading-relaxed font-medium">{box.desc}</p>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedBox === box.id ? 'max-h-[500px] opacity-100 mt-4 pt-4 border-t border-slate-100' : 'max-h-0 opacity-0'}`}>
              <p className="text-sm text-slate-500 leading-relaxed">{box.fullDesc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-indigo-50 to-fuchsia-50 rounded-3xl p-8 md:p-12 border border-indigo-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">Psiko-Beslenme İle Tanışın</h2>
          <p className="text-lg text-slate-600 mb-6">Psikolog ve diyetisyenin birlikte çalıştığı bu program, duygusal yeme alışkanlıklarınızı dönüştürerek kalıcı sağlıklı yaşam değişiklikleri yapmanıza yardımcı olur.</p>
          <button
            onClick={() => navigate('/psiko-beslenme')}
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Detaylı Bilgi <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ServicesPage() {
  const [expandedService, setExpandedService] = useState(null);
  const navigate = useNavigate();
  usePageTitle('Hizmetlerimiz');

  return (
    <div className="animate-in fade-in duration-500">
      <div className="max-w-3xl mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Hizmetlerimiz</h2>
        <p className="text-xl text-slate-600">
          Psikolojik danışmanlık ve diyetisyen desteğini birlikte sunan, yaşam tarzınıza uyarlanmış profesyonel hizmet programlarımız.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {servicesData.map((service, idx) => (
          <div
            key={idx}
            onClick={() => setExpandedService(expandedService === idx ? null : idx)}
            className={`bg-white p-6 rounded-2xl shadow-sm border ${expandedService === idx ? 'border-indigo-400 shadow-md ring-4 ring-indigo-50/50' : 'border-slate-200 hover:shadow-md hover:border-indigo-200'} transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden`}
          >
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-3 bg-slate-50 rounded-xl inline-block group-hover:bg-indigo-50 transition-colors">{service.icon}</div>
              <div className={`p-1.5 rounded-full transition-colors ${expandedService === idx ? 'bg-indigo-100 text-indigo-700' : 'text-slate-300 group-hover:text-indigo-500 group-hover:bg-slate-50'}`}>
                {expandedService === idx ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight relative z-10">{service.title}</h3>
            <p className={`text-sm flex-grow leading-relaxed relative z-10 transition-colors duration-300 ${expandedService === idx ? 'text-slate-900 font-semibold' : 'text-slate-600'}`}>
              {service.desc}
            </p>
            <div className={`relative z-10 transition-all duration-500 ease-in-out overflow-hidden ${expandedService === idx ? 'max-h-[500px] opacity-100 mt-4 pt-4 border-t border-slate-100' : 'max-h-0 opacity-0'}`}>
              <p className="text-sm text-slate-600 leading-relaxed">{service.fullDesc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-50 rounded-3xl p-8 md:p-12 text-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Size Uygun Programı Birlikte Belirleyelim</h3>
        <p className="text-lg text-slate-600 mb-6">İhtiyacınıza göre psikolog, diyetisyen veya psiko-beslenme programını birlikte seçelim.</p>
        <button
          onClick={() => navigate('/iletisim')}
          className="inline-flex items-center px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-indigo-600 transition-colors"
        >
          Randevu Oluşturun <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
}

function PsikoBeslenmePage() {
  const navigate = useNavigate();
  usePageTitle('Psiko-Beslenme Programı');

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-sm font-semibold mb-4 border border-rose-100">
          <Star className="w-4 h-4 mr-2" /> En Popüler Program
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Psiko-Beslenme Entegre Programı</h1>
        <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
          Psikolog ve diyetisyenin birlikte çalıştığı bu program, duygusal yeme, kilo yönetimi ve motivasyon sorunlarına karşı bilimsel, bütüncül ve kalıcı bir çözüm sunar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center">
          <Brain className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">Psikolojik Destek</h3>
          <p className="text-slate-600 text-sm">Duygusal tetikleyicileri keşfedin, stres yönetimi ve başa çıkma becerileri geliştirin.</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center">
          <Apple className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">Beslenme Danışmanlığı</h3>
          <p className="text-slate-600 text-sm">Size özel sürdürülebilir beslenme planı ile sağlıklı alışkanlıklar kazanın.</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center">
          <Heart className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">Bütüncül Takip</h3>
          <p className="text-slate-600 text-sm">Haftalık ölçüm, geri bildirim ve plan güncellemesi ile kalıcı dönüşüm.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Psiko-Beslenme Programı Nasıl İşler?</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-indigo-700">1</div>
            <div>
              <h3 className="font-bold text-slate-900">Bütüncül Değerlendirme</h3>
              <p className="text-slate-600 text-sm">İlk görüşmede psikolojik durumunuz, beslenme alışkanlıklarınız, stres seviyeniz ve hedefleriniz detaylı analiz edilir.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-emerald-700">2</div>
            <div>
              <h3 className="font-bold text-slate-900">Kişiselleştirilmiş Program</h3>
              <p className="text-slate-600 text-sm">Psikolog ve diyetisyen birlikte size özel bir yol haritası oluşturur. Duygusal yeme tetikleyicileriniz belirlenir.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-fuchsia-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-fuchsia-700">3</div>
            <div>
              <h3 className="font-bold text-slate-900">Haftalık Takip ve Güncelleme</h3>
              <p className="text-slate-600 text-sm">Her hafta düzenli görüşmelerle ilerleme ölçülür, program ihtiyaca göre güncellenir.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white">4</div>
            <div>
              <h3 className="font-bold text-slate-900">Kalıcı Dönüşüm</h3>
              <p className="text-slate-600 text-sm">Kısa süreli diyetler yerine yaşam boyu sürecek sağlıklı alışkanlıklar kazanın.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-600 to-fuchsia-700 rounded-3xl p-8 md:p-12 text-center text-white mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Dönüşüm İçin İlk Adımı Atın</h2>
        <p className="text-lg text-indigo-100 mb-8">Psikolog ve diyetisyen desteğiyle hayatınızı değiştirin.</p>
        <button
          onClick={() => navigate('/iletisim')}
          className="inline-flex items-center px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-indigo-50 transition-colors"
        >
          Randevu Al <Calendar className="w-5 h-5 ml-2" />
        </button>
      </div>

      <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Sıkça Sorulan Sorular</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Psiko-beslenme ne kadar sürer?</h3>
            <p className="text-slate-600 text-sm">Program süresi kişisel hedeflerinize göre değişir. Genellikle 8-12 haftalık temel program ile başlar, ardından idame takibi ile devam eder.</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Online katılabilir miyim?</h3>
            <p className="text-slate-600 text-sm">Evet, Türkiye'nin her yerinden online seanslarla programa katılabilirsiniz. Görüşmeler güvenli altyapı ile gerçekleştirilir.</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Psikolog ve diyetisyen ayrı ayrı mı görüşüyor?</h3>
            <p className="text-slate-600 text-sm">Entegre programda psikolog ve diyetisyeniniz süreci birlikte yönetir, düzenli olarak birbiriyle koordinasyon sağlar. Seanslarınız ayrı ayrı gerçekleşir ancak yol haritanız ortaktır.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DuygusalYemePage() {
  const navigate = useNavigate();
  usePageTitle('Duygusal Yeme Terapisi');

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Duygusal Yeme Terapisi</h1>
        <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
          Stres, can sıkıntısı veya üzüntüyle başa çıkmak için yemeye mi yöneliyorsunuz? Duygusal yeme döngüsünü bilimsel yöntemlerle kırın.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Duygusal Yeme Nedir?</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Duygusal yeme, açlık dışındaki duygusal tetikleyicilere (stres, üzüntü, öfke, yalnızlık) yanıt olarak yemek yeme davranışıdır. Anlık rahatlama sağlasa da uzun vadede kilo alımı, suçluluk ve artan duygusal sıkıntıya yol açar.
        </p>
        <p className="text-slate-600 leading-relaxed">
          D&P Merkezi olarak, psikolog ve diyetisyen işbirliğiyle duygusal yeme döngüsünü kırmanız için bilimsel, kişiselleştirilmiş bir yol haritası sunuyoruz.
        </p>
      </div>

      <button
        onClick={() => navigate('/iletisim')}
        className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-indigo-600 transition-colors text-lg"
      >
        Duygusal Yeme Danışmanlığı İçin Bize Ulaşın
      </button>
    </div>
  );
}

function OnlineTerapiPage() {
  const navigate = useNavigate();
  usePageTitle('Online Psikolog ve Diyetisyen');

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Online Seans ve Gizli Takip</h1>
        <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
          Türkiye'nin her yerinden güvenli altyapı ile online psikolog ve diyetisyen desteği.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 mb-8 text-center">
        <Globe className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
        <p className="text-slate-600 text-lg leading-relaxed">
          Online seanslarımız, yüz yüze görüşmelerle aynı etik standartlarda ve güvenlik düzeyinde gerçekleştirilir. Tüm görüşmeler gizlilik ilkesiyle korunur.
        </p>
      </div>

      <button
        onClick={() => navigate('/iletisim')}
        className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-indigo-600 transition-colors text-lg"
      >
        Online Randevu İçin Tıklayın
      </button>
    </div>
  );
}

function ExpertisePage() {
  usePageTitle('Uzmanlık Alanlarımız');

  return (
    <div className="animate-in fade-in duration-500">
      <div className="max-w-3xl mb-12 text-center mx-auto">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Uzmanlık Alanlarımız</h2>
        <p className="text-xl text-slate-600">
          Klinik deneyimimizi bilimsel yöntemlerle birleştirerek farklı yaş grupları ve ihtiyaçlar için hedef odaklı takip programları sunuyoruz.
        </p>
      </div>

      <div className="space-y-8 max-w-5xl mx-auto">
        {expertiseData.map((item, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-8 items-start hover:shadow-lg transition-shadow">
            <div className="flex-shrink-0 p-5 bg-slate-50 rounded-2xl border border-slate-100">{item.icon}</div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
              <p className="text-lg text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutPage() {
  usePageTitle('Hakkımızda');

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
        <div className="h-32 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 w-full relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        </div>
        <div className="p-10 md:p-14 relative">
          <div className="absolute -top-12 left-10 w-24 h-24 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center">
            <span className="text-2xl font-extrabold text-slate-900 lowercase">
              d&p<span className="text-emerald-500">.</span>
            </span>
          </div>
          <div className="mt-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Psikoloji ve Beslenme, Tek Bir İyileşme Yolculuğu.</h1>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                <strong className="text-slate-900">D&P Psikoloji ve Beslenme Merkezi</strong> olarak ruh sağlığı ve beslenmenin birbirinden ayrılmaz olduğuna inanıyoruz. Klinik psikologlarımız ve uzman diyetisyenlerimiz, danışanlarımızın hem zihinsel hem fiziksel iyi oluşunu aynı anda destekleyen bütüncül bir yaklaşımla çalışır.
              </p>
              <p>
                Bizim için süreç sadece seans veya liste vermek değildir. Duygusal yeme döngüsü, stres yönetimi, metabolik ihtiyaçlar, yaşam temposu ve motivasyon alanlarını birlikte değerlendirerek kalıcı davranış değişikliği odaklı programlar tasarlıyoruz.
              </p>
            </div>
            <div className="mt-12 p-8 bg-indigo-50 rounded-2xl border border-indigo-100 flex flex-col md:flex-row gap-6 items-center">
              <Globe className="w-16 h-16 text-indigo-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Kişiye Özel, Ölçülebilir Takip</h3>
                <p className="text-slate-700">
                  Her danışan için başlangıç analizi, hedef planı ve haftalık takip kurguluyoruz. Seans notları, beslenme günlükleri ve gelişim değerlendirmeleriyle süreci şeffaf, sürdürülebilir ve motive edici hale getiriyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [formStatus, setFormStatus] = useState('idle');
  const [formMessage, setFormMessage] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    age_job: '',
    email: '',
    phone: '',
    service_preference: '',
    message: ''
  });
  usePageTitle('İletişim');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage('');
    setFormStatus('sending');
    const { error } = await supabase.insert('contact_messages', {
      ...formData,
      created_at: new Date().toISOString()
    });
    if (error) {
      setFormStatus('idle');
      setFormMessage('Mesaj gönderilemedi. Lütfen tekrar deneyin.');
      return;
    }
    setFormStatus('success');
    setFormMessage('Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.');
    setFormData({ full_name: '', age_job: '', email: '', phone: '', service_preference: '', message: '' });
    setTimeout(() => {
      setFormStatus('idle');
      setFormMessage('');
    }, 3000);
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">İyi Oluş Yolculuğunuza Birlikte Başlayalım.</h1>
        <p className="text-xl text-slate-600">Size en uygun psikolog ve diyetisyen programını birlikte planlayalım.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
        <div className="lg:col-span-3 bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Ad Soyad</label>
                <input required type="text" value={formData.full_name} onChange={(e) => setFormData((p) => ({ ...p, full_name: e.target.value }))} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors" placeholder="Ayşe Yılmaz" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Yaş / Meslek</label>
                <input required type="text" value={formData.age_job} onChange={(e) => setFormData((p) => ({ ...p, age_job: e.target.value }))} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors" placeholder="Örn. 32 / Öğretmen" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">E-Posta</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors" placeholder="ornek@sirket.com (opsiyonel)" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Cep Telefonu</label>
              <input required type="tel" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors" placeholder="05xx xxx xx xx" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Hizmet Tercihi</label>
              <select value={formData.service_preference} onChange={(e) => setFormData((p) => ({ ...p, service_preference: e.target.value }))} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors text-slate-700">
                <option>Seçiniz...</option>
                <option>Bireysel Psikolojik Danışmanlık</option>
                <option>Kişiye Özel Diyet Programı</option>
                <option>Birlikte Psikolog + Diyetisyen Paketi</option>
                <option>Ergen / Aile Danışmanlığı</option>
                <option>Duygusal Yeme ve Kilo Yönetimi Programı</option>
                <option>Kurumsal Wellbeing Eğitimleri</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Kısaca İhtiyacınız</label>
              <textarea required rows="4" value={formData.message} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors resize-none" placeholder="Hedefinizi, yaşadığınız zorlukları ve beklentinizi paylaşın..."></textarea>
            </div>
            <button
              type="submit"
              disabled={formStatus !== 'idle'}
              className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-indigo-600 transition-colors flex items-center justify-center disabled:opacity-70"
            >
              {formStatus === 'idle' && 'Mesajı Gönder'}
              {formStatus === 'sending' && 'Gönderiliyor...'}
              {formStatus === 'success' && (
                <span className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" /> Başarıyla İletildi
                </span>
              )}
            </button>
            {formMessage && (
              <p className={`text-sm font-medium ${formStatus === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {formMessage}
              </p>
            )}
          </form>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-lg h-full flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-8">İletişim Bilgileri</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-indigo-400 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-200">Merkez</p>
                    <p className="text-slate-400 mt-1 leading-relaxed">Alsancak, İzmir, Türkiye<br />(Yüz yüze ve online seans)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-indigo-400 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-200">E-Posta</p>
                    <p className="text-slate-400 mt-1">iletisim@diyetizmir.fit</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-indigo-400 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-200">Telefon</p>
                    <p className="text-slate-400 mt-1">+90 555 208 3092</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-indigo-400 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-200">Çalışma Saatleri</p>
                    <p className="text-slate-400 mt-1">Pazartesi - Cuma<br />09:00 - 18:00 (GMT+3)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-slate-800">
              <span className="text-3xl font-extrabold tracking-tighter text-white lowercase">
                d&p<span className="text-emerald-500">.</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogPage() {
  usePageTitle('Blog');

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Psiko-Beslenme Blog</h1>
        <p className="text-xl text-slate-600">Psikoloji, beslenme ve bütüncül sağlık üzerine bilimsel rehberler ve güncel içerikler.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group"
          >
            <div className="h-48 bg-slate-900 overflow-hidden relative">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                <span className="font-medium uppercase tracking-wider text-indigo-600">{post.category}</span>
                <span>•</span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime} dk okuma</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">#{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function BlogPostPage() {
  const { slug } = useParams();

  const post = blogPosts.find((p) => p.slug === slug);
  usePageTitle(post ? post.title : 'Blog');

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-slate-900">Yazı bulunamadı</h1>
        <Link to="/blog" className="text-indigo-600 hover:underline mt-4 inline-block">Blog'a dön</Link>
      </div>
    );
  }

  const articleSchema = post ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'D&P Psikoloji ve Beslenme Merkezi' },
    publisher: { '@type': 'Organization', name: 'D&P Psikoloji ve Beslenme Merkezi', logo: { '@type': 'ImageObject', url: 'https://diyetizmir.fit/favicon.svg' } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://diyetizmir.fit/blog/${post.slug}` }
  } : null;

  return (
    <div className="animate-in fade-in duration-500 max-w-3xl mx-auto">
      {articleSchema && (
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      )}
      <Link to="/blog" className="text-sm text-indigo-600 hover:underline mb-8 inline-flex items-center">
        <ChevronRight className="w-4 h-4 rotate-180 mr-1" /> Blog'a Dön
      </Link>
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200">
        <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
          <span className="font-medium uppercase tracking-wider text-indigo-600">{post.category}</span>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime} dk okuma</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">{post.title}</h1>
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">#{tag}</span>
          ))}
        </div>
        <div className="max-w-none space-y-4 text-base text-slate-700 leading-relaxed">
          {post.content || <p className="text-lg text-slate-600 leading-relaxed">{post.excerpt}</p>}
        </div>
      </div>
    </div>
  );
}

function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [contactRows, setContactRows] = useState([]);
  const [chatRows, setChatRows] = useState([]);
  const [adminError, setAdminError] = useState('');

  const login = (e) => {
    e.preventDefault();
    const hasAdminCredentials = Boolean(supabaseConfig.adminUser && supabaseConfig.adminPass);
    if (!hasAdminCredentials) {
      setAdminError('Admin girişi için VITE_ADMIN ve VITE_PASS ortam değişkenlerini tanımlayın.');
      return;
    }
    if (username === supabaseConfig.adminUser && password === supabaseConfig.adminPass) {
      setIsAuthed(true);
      setAdminError('');
      return;
    }
    setAdminError('Kullanıcı adı veya şifre hatalı.');
  };

  useEffect(() => {
    const loadData = async () => {
      if (!isAuthed || !supabase) return;
      setAdminError('');
      const [contacts, chats] = await Promise.all([
        supabase.list('contact_messages', { limit: 20 }),
        supabase.list('chat_messages', { limit: 30 })
      ]);
      if (contacts.error || chats.error) {
        setAdminError('Kayıtlar yüklenemedi. Supabase RLS policy ayarlarını kontrol edin.');
      }
      setContactRows(contacts.data ?? []);
      setChatRows(chats.data ?? []);
    };
    loadData();
  }, [isAuthed]);

  if (!isAuthed) {
    return (
      <div className="max-w-lg mx-auto bg-white border border-slate-200 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4">Admin Girişi</h2>
        <form onSubmit={login} className="space-y-4">
          {adminError && <p className="text-sm font-medium text-rose-600">{adminError}</p>}
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Admin" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" className="w-full border rounded-lg px-3 py-2" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="w-full py-2 bg-slate-900 text-white rounded-lg">Giriş Yap</button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {adminError && <p className="text-sm font-medium text-rose-600">{adminError}</p>}
      <ContactTable rows={contactRows} />
      <ChatTable rows={chatRows} />
    </div>
  );
}

function ContactTable({ rows }) {
  const [search, setSearch] = useState('');
  const [onlyToday, setOnlyToday] = useState(false);
  const filteredRows = rows.filter((row) => {
    const emailMatch = (row.email ?? '').toLowerCase().includes(search.toLowerCase());
    const todayMatch = !onlyToday || new Date(row.created_at).toDateString() === new Date().toDateString();
    return emailMatch && todayMatch;
  });

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 overflow-auto">
      <h3 className="text-xl font-bold mb-4">İletişim Formu</h3>
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="E-postaya göre ara..."
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
        />
        <label className="inline-flex items-center text-sm text-slate-700 gap-2">
          <input type="checkbox" checked={onlyToday} onChange={(e) => setOnlyToday(e.target.checked)} />
          Sadece bugün gelenler
        </label>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-slate-200">
            <th className="py-2 pr-3">Tarih</th>
            <th className="py-2 pr-3">Ad Soyad</th>
            <th className="py-2 pr-3">Yaş / Meslek</th>
            <th className="py-2 pr-3">E-Posta</th>
            <th className="py-2 pr-3">Cep Telefonu</th>
            <th className="py-2 pr-3">Hizmet</th>
            <th className="py-2 pr-3">Mesaj</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row) => (
            <tr key={row.id} className="border-b border-slate-100 align-top">
              <td className="py-2 pr-3 text-slate-500">{new Date(row.created_at).toLocaleString('tr-TR')}</td>
              <td className="py-2 pr-3 font-medium">{row.full_name}</td>
              <td className="py-2 pr-3">{row.age_job}</td>
              <td className="py-2 pr-3">{row.email}</td>
              <td className="py-2 pr-3">{row.phone}</td>
              <td className="py-2 pr-3">{row.service_preference}</td>
              <td className="py-2 pr-3 whitespace-pre-wrap">{row.message}</td>
            </tr>
          ))}
          {!filteredRows.length && (
            <tr>
              <td colSpan="7" className="py-3 text-slate-500">Filtreye uygun kayıt bulunamadı.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function ChatTable({ rows }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 overflow-auto">
      <h3 className="text-xl font-bold mb-4">Chat Mesajları</h3>
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.id} className="rounded-xl border border-slate-200 p-3 bg-slate-50">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-semibold uppercase tracking-wide">{row.sender}</span>
              <span>{new Date(row.created_at).toLocaleString('tr-TR')}</span>
            </div>
            <p className="text-sm text-slate-800 whitespace-pre-wrap">{row.message}</p>
          </div>
        ))}
        {!rows.length && <p className="text-sm text-slate-500">Henüz chat mesajı yok.</p>}
      </div>
    </div>
  );
}

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Merhaba! D&P Psikoloji ve Beslenme Merkezi'ne hoş geldiniz. Size en uygun psikolog ve diyetisyen desteği için nasıl yardımcı olabilirim?", sender: 'bot', time: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newMsg = { text: inputValue, sender: 'user', time: new Date() };
    setMessages((prev) => [...prev, newMsg]);
    await supabase.insert('chat_messages', {
      message: inputValue,
      sender: 'user',
      created_at: new Date().toISOString()
    });
    setInputValue('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: 'Mesajınız bize ulaştı 💚 Lütfen telefon numaranızı veya e-posta adresinizi de bırakın; uzman ekibimiz size en kısa sürede dönüş sağlasın.',
          sender: 'bot',
          time: new Date()
        }
      ]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 sm:bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-[350px] max-w-[calc(100vw-2rem)] h-[70vh] sm:h-[450px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center font-bold mr-3">D</div>
              <div>
                <h4 className="font-bold text-sm">D&P Danışan Destek</h4>
                <p className="text-xs text-emerald-400 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mr-1 animate-pulse"></span> Çevrimiçi
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            <div className="text-xs text-center text-slate-400 mb-4">Canlı Destek Hattı</div>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 bg-white border-t border-slate-200">
            <form onSubmit={handleSend} className="flex relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Mesajınızı yazın..."
                className="flex-1 py-2 pl-4 pr-10 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="absolute right-1 top-1 bottom-1 w-8 flex items-center justify-center text-indigo-600 disabled:text-slate-400 bg-white rounded-full shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg shadow-slate-400/50 hover:scale-105 hover:bg-indigo-600 transition-all duration-300 relative group"
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}
        {!isOpen && <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>}
        {!isOpen && (
          <span className="absolute right-full mr-4 bg-slate-800 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Bize Yazın
          </span>
        )}
      </button>
    </div>
  );
}

function BlogTagPage() {
  const { tag } = useParams();
  const displayTag = tagSlugMap[tag] || tag;
  usePageTitle(`#${displayTag} Yazıları | D&P Psikoloji ve Beslenme Blogu`);
  const filteredPosts = blogPosts.filter(p => p.tags.some(t => slugify(t) === tag));

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="mb-8">
        <Link to="/blog" className="text-sm text-indigo-600 hover:underline inline-flex items-center mb-4">
          <ChevronRight className="w-4 h-4 rotate-180 mr-1" /> Blog'a Dön
        </Link>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">#{displayTag}</h1>
        <p className="text-slate-600">{filteredPosts.length} yazı bulundu</p>
      </div>
      {filteredPosts.length === 0 ? (
        <p className="text-slate-500">Bu etiketle henüz yazı bulunmuyor.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group"
            >
              <div className="h-48 bg-slate-900 overflow-hidden relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <span className="font-medium uppercase tracking-wider text-indigo-600">{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">{post.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function BlogCategoryPage() {
  const { kategori } = useParams();
  const catNames = { 'psiko-beslenme': 'Psiko-Beslenme', 'duygusal-yeme': 'Duygusal Yeme', 'online-terapi': 'Online Terapi', 'rehber': 'Rehber', 'beslenme': 'Beslenme', 'psikoloji': 'Psikoloji' };
  const displayName = catNames[kategori] || kategori;
  usePageTitle(`${displayName} Kategorisi | D&P Psikoloji ve Beslenme Blogu`);
  const filteredPosts = blogPosts.filter(p => p.category === kategori);

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="mb-8">
        <Link to="/blog" className="text-sm text-indigo-600 hover:underline inline-flex items-center mb-4">
          <ChevronRight className="w-4 h-4 rotate-180 mr-1" /> Blog'a Dön
        </Link>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{displayName}</h1>
        <p className="text-slate-600">{filteredPosts.length} yazı bulundu</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map(post => (
          <Link key={post.slug} to={`/blog/${post.slug}`}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group"
          >
            <div className="h-48 bg-slate-900 overflow-hidden relative">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">{post.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function SitemapPage() {
  usePageTitle('Site Haritası | D&P Psikoloji ve Beslenme');
  const domain = 'https://diyetizmir.fit';
  const sitePages = [
    { path: '/', label: 'Ana Sayfa', desc: 'Psiko-beslenme merkezi ana sayfa' },
    { path: '/hizmetler', label: 'Hizmetlerimiz', desc: 'Psikolojik danışmanlık ve beslenme hizmetleri' },
    { path: '/psiko-beslenme', label: 'Psiko-Beslenme Programı', desc: 'Psikolog ve diyetisyen entegre program' },
    { path: '/duygusal-yeme', label: 'Duygusal Yeme Terapisi', desc: 'Duygusal yeme bozukluğu terapisi' },
    { path: '/online-terapi', label: 'Online Terapi', desc: 'Online psikolog ve diyetisyen seansları' },
    { path: '/uzmanlik-alanlari', label: 'Uzmanlık Alanları', desc: 'Klinik psikoloji ve beslenme uzmanlıkları' },
    { path: '/hakkimizda', label: 'Hakkımızda', desc: 'D&P ekibi ve bütüncül yaklaşım' },
    { path: '/iletisim', label: 'İletişim', desc: 'Randevu ve iletişim bilgileri' },
    { path: '/blog', label: 'Blog Ana Sayfası', desc: 'Psiko-beslenme blog yazıları' },
    { path: '/site-haritasi', label: 'Site Haritası', desc: 'Tüm sayfaların listesi' }
  ];

  const tagPages = allTags.map(t => ({
    slug: slugify(t),
    label: `#${t}`,
    desc: `"${t}" etiketli blog yazıları`
  }));

  const categoryPages = [
    { slug: 'psiko-beslenme', label: 'Psiko-Beslenme', desc: 'Psiko-beslenme kategorisi yazıları' },
    { slug: 'duygusal-yeme', label: 'Duygusal Yeme', desc: 'Duygusal yeme kategorisi yazıları' },
    { slug: 'online-terapi', label: 'Online Terapi', desc: 'Online terapi kategorisi yazıları' },
    { slug: 'rehber', label: 'Rehber', desc: 'Rehber kategorisi yazıları' },
    { slug: 'beslenme', label: 'Beslenme', desc: 'Beslenme kategorisi yazıları' },
    { slug: 'psikoloji', label: 'Psikoloji', desc: 'Psikoloji kategorisi yazıları' }
  ];

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Site Haritası</h1>
      <p className="text-lg text-slate-600 mb-10">Tüm sayfaların listesi — aradığınızı kolayca bulun.</p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">📄 Ana Sayfalar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sitePages.map(p => (
            <Link key={p.path} to={p.path}
              className="block bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <h3 className="font-bold text-indigo-700 mb-1">{p.label}</h3>
              <p className="text-sm text-slate-500">{p.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">🏷️ Etiket Sayfaları</h2>
        <div className="flex flex-wrap gap-3">
          {tagPages.map(p => (
            <Link key={p.slug} to={`/blog/etiket/${p.slug}`}
              className="bg-white rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-all"
            >{p.label}</Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">📂 Kategori Sayfaları</h2>
        <div className="flex flex-wrap gap-3">
          {categoryPages.map(p => (
            <Link key={p.slug} to={`/blog/kategori/${p.slug}`}
              className="bg-white rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-all"
            >{p.label}</Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">📝 Blog Yazıları</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blogPosts.map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`}
              className="block bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <h3 className="font-bold text-slate-900 mb-1">{post.title}</h3>
              <p className="text-xs text-slate-500">{post.date} · {post.readTime} dk okuma</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

// --- MAIN APP ---

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hizmetler" element={<ServicesPage />} />
      <Route path="/psiko-beslenme" element={<PsikoBeslenmePage />} />
      <Route path="/duygusal-yeme" element={<DuygusalYemePage />} />
      <Route path="/online-terapi" element={<OnlineTerapiPage />} />
      <Route path="/uzmanlik-alanlari" element={<ExpertisePage />} />
      <Route path="/hakkimizda" element={<AboutPage />} />
      <Route path="/iletisim" element={<ContactPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/blog/etiket/:tag" element={<BlogTagPage />} />
      <Route path="/blog/kategori/:kategori" element={<BlogCategoryPage />} />
      <Route path="/site-haritasi" element={<SitemapPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">404</h1>
          <p className="text-slate-600">Sayfa bulunamadı.</p>
        </div>
      } />
    </Routes>
  );
}

export function AppContent() {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <AppRoutes />
        </main>
        <Footer />
        <ChatWidget />
        <Analytics />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
