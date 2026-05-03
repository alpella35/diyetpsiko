import React, { useState, useEffect, useRef } from 'react';
import {
  Rocket, Shield, CreditCard, LayoutTemplate,
  Smartphone, Database, Cpu, Building2, UserCog,
  LineChart, Network, BarChart3, Store, Search,
  Truck, Microscope, Leaf, Globe, ChevronRight,
  MapPin, Mail, Phone, Clock, MessageSquare,
  Send, X, Menu, ChevronDown, ChevronUp
} from 'lucide-react';

// --- DATA ---

const servicesData = [
  {
    icon: <Smartphone className="w-6 h-6 text-indigo-500" />,
    title: 'Mobil ve Web Uygulamaları',
    desc: 'Hem telefonlarda hem de bilgisayarlarda kusursuz çalışan kullanıcı dostu arayüzler.',
    fullDesc: 'İşletmenizin dijital dünyadaki yüzünü baştan tasarlıyoruz. Uygulamalarınızın hem bilgisayar tarayıcılarında (Web) hem de mobil cihazlarda (iOS ve Android) tek bir modern altyapı üzerinden sorunsuz çalışmasını sağlıyoruz. Kullanıcı dostu arayüzler (UI), akıcı deneyim (UX) ve yüksek performans odaklı kodlama standartlarımız ile markanızın dijital etkileşim oranlarını artırıyoruz. Her ekran boyutuna tam uyumlu (responsive) ve arama motoru dostu platformlar teslim ediyoruz.'
  },
  {
    icon: <CreditCard className="w-6 h-6 text-emerald-500" />,
    title: 'Ödeme ve Tahsilat Sistemleri',
    desc: 'İnternetten güvenle ödeme almanızı sağlayan dijital cüzdan ve abonelik altyapıları.',
    fullDesc: 'Nakit akışınızı ve tahsilat süreçlerinizi tamamen dijitalleştirip otomatikleştiriyoruz. E-ticaret siteniz veya uygulamanız için sanal POS (Stripe, Iyzico vb.), kredi kartı entegrasyonları, tekrarlayan abonelik (aylık ödeme) modelleri ve dijital cüzdan sistemleri kuruyoruz. Kullanıcılarınızın saniyeler içinde, üst düzey güvenlik standartlarında (PCI-DSS uyumlu) ödeme yapabilmesini sağlayarak sepet terk etme oranlarınızı düşürüyoruz.'
  },
  {
    icon: <Activity className="w-6 h-6 text-rose-500" />,
    title: 'Canlı Takip ve Yönetim Panelleri',
    desc: 'Siparişleri, personeli ve işleyişi anlık olarak izleyebileceğiniz yönetici ekranları.',
    fullDesc: 'İşletmenizin kalbini canlı olarak izleyin. Siparişlerin durumu, sahadaki kurye veya personellerinizin konumu, anlık satış verileri gibi kritik operasyonları milisaniye gecikmeyle (Realtime) yansıtan özel yönetim (admin) panelleri geliştiriyoruz. Karmaşık Excel dosyaları yerine; verilerin kendi kendine aktığı, görsel grafiklerle desteklenmiş, internet olan her cihazdan erişebileceğiniz canlı performans ekranları kuruyoruz.'
  },
  {
    icon: <Shield className="w-6 h-6 text-slate-700" />,
    title: 'Üst Düzey Veri Güvenliği',
    desc: 'Müşteri verilerinizi ve ticari sırlarınızı siber saldırılara karşı koruyan bulut sistemleri.',
    fullDesc: 'Dijital dünyada en değerli varlığınız verilerinizdir. Biz verilerinizi sadece arayüz şifreleriyle değil, doğrudan bulut veritabanının merkezinde (Row Level Security) koruma altına alıyoruz. Kullanıcıların yalnızca kendi görmesi gereken verilere erişebildiği, izinsiz sızmaların veritabanı mimarisi seviyesinde engellendiği kırılmaz kurallar yazıyoruz. KVKK ve GDPR gibi uluslararası gizlilik yasalarına tam uyumlu sistemler teslim ediyoruz.'
  },
  {
    icon: <Cpu className="w-6 h-6 text-amber-500" />,
    title: 'Akıllı Cihaz ve Sensör Entegrasyonu',
    desc: 'Fiziksel dünyadaki cihazları ve sensörleri internete bağlayan teknolojik sistemler.',
    fullDesc: 'Fiziksel makinelerinizi ve sensörlerinizi dijital sistemlerinizle konuşturuyoruz (Nesnelerin İnterneti - IoT). Üretim bandındaki cihazlardan, sıcaklık ölçen sensörlere kadar donanımlardan (ESP32, Arduino) gelen anlık verileri bulut veritabanlarına aktarıyoruz. Bu sayede sahadaki fiziksel cihazlarınızı uzaktan kontrol edebilir, arıza durumlarında otomatik uyarılar alabilir ve cihaz verilerinizi web panelinizden canlı izleyebilirsiniz.'
  },
  {
    icon: <Building2 className="w-6 h-6 text-blue-500" />,
    title: 'Eski Yazılımları Yenileme',
    desc: 'Sadece tek bilgisayarda çalışan yavaş ve eski yazılımlarınızı modern buluta taşıyoruz.',
    fullDesc: 'Şirketinizin yıllardır kullandığı, artık ihtiyaçlara cevap vermeyen, yavaşlamış ve sadece masaüstü bilgisayarlara bağımlı eski nesil yazılımlarını emekliye ayırıyoruz. Mevcut verilerinizi kaybetmeden, sisteminizi şimşek hızında çalışan, her cihazdan (cep telefonu, tablet, PC) erişilebilen, modern ve güvenli bulut tabanlı bir web uygulamasına dönüştürüyoruz. Şirket içi operasyonel hızı anında artırıyoruz.'
  },
  {
    icon: <UserCog className="w-6 h-6 text-indigo-600" />,
    title: 'Dışarıdan Teknoloji Yöneticiliği',
    desc: 'Şirketinize teknoloji kararlarında yol gösteren uzman yazılım danışmanlığı.',
    fullDesc: "Kendi yazılım ekibinizi kurmak maliyetli olabilir veya başka yazılım ajanslarıyla çalışırken doğru kararları veremeyebilirsiniz. Bu noktada 'Dışarıdan CTO (Teknoloji Yöneticisi)' olarak devreye giriyoruz. Şirketinizin sunucu altyapısı, hangi teknolojilerin kullanılacağı, güvenlik standartları ve bütçe optimizasyonu gibi kritik kararları sizin adınıza yönetiyor; dış ajansların kod kalitesini sizin için denetliyoruz."
  },
  {
    icon: <LayoutTemplate className="w-6 h-6 text-teal-500" />,
    title: 'Şirkete Özel Yönetim Yazılımları',
    desc: 'Piyasadaki hazır paketler yerine, tamamen işinize özel tasarlanmış otomasyonlar.',
    fullDesc: "Hazır ERP (Kurumsal Kaynak Planlama) veya CRM (Müşteri İlişkileri Yönetimi) yazılımları her şirketin özel işleyişine tam uymaz. Biz, tamamen sizin şirketinizin 'iş yapış şekline' (Business Logic) göre uyarlanmış paneller üretiyoruz. Personel izinlerinden müşteri tekliflerine, depo sayımından finansal raporlara kadar tüm departmanlarınızı tek bir dijital çatı altında, size özel kurallarla birleştiriyoruz."
  },
  {
    icon: <Network className="w-6 h-6 text-purple-500" />,
    title: 'Farklı Yazılımları Birbirine Bağlama',
    desc: 'Muhasebe, e-ticaret ve kargo programlarınızı tam otomatik çalışacak şekilde birleştirme.',
    fullDesc: 'Şirketler genellikle muhasebe için ayrı, e-ticaret için ayrı, kargo takibi için ayrı programlar kullanır ve bunlar arasında sürekli manuel veri girmek zorunda kalır. Biz, güvenli dijital köprüler (API) kurarak bu farklı yazılımların birbiriyle anlık konuşmasını sağlıyoruz. E-ticaret sitenizde bir satış olduğunda faturası otomatik kesiliyor, stok düşüyor ve kargo barkodu otomatik oluşturuluyor. İnsan hatasını ve zaman kaybını sıfırlıyoruz.'
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-cyan-500" />,
    title: 'Veri Analizi ve Akıllı Raporlama',
    desc: 'Şirketinizin karmaşık verilerini anlaşılır, yönetici sunumlarına hazır grafiklere çevirme.',
    fullDesc: 'Günümüzde en büyük güç, veriyi anlamlandırmaktır. Şirketinizin farklı kaynaklarda biriken devasa ham verilerini (Big Data) topluyor, istatistiksel algoritmalarla analiz ediyor ve saniyeler içinde anlaşılabilir görsel grafiklere döküyoruz. Hangi ürün hangi saatte satılıyor, müşteri kayıp oranınız nedir gibi kritik soruların cevabını canlı iş zekası (BI) panellerimizde anında görerek doğru ticari kararlar almanızı sağlıyoruz.'
  },
  {
    icon: <Store className="w-6 h-6 text-orange-500" />,
    title: 'Pazaryeri ve Platform Kurulumu',
    desc: 'Trendyol veya Sahibinden gibi çok satıcılı ve alıcılı pazar yeri sistemleri geliştirme.',
    fullDesc: 'Alıcılar ile satıcıları (veya hizmet verenlerle alanları) dijital ortamda buluşturan, devasa pazaryeri (Marketplace) platformlarını sıfırdan kodluyoruz. Sistemin içindeki satıcı mağazaları, bakiye/cüzdan yönetimleri, satıcılar arası güvenli izolasyon ve sizin site sahibi olarak alacağınız komisyon kesintilerinin otomatik dağıtımını üstlenen kusursuz bir platform mimarisi kuruyoruz.'
  },
  {
    icon: <Database className="w-6 h-6 text-indigo-400" />,
    title: 'Abonelik Sistemli Yazılımlar (SaaS)',
    desc: 'Kendi yazılım fikrinizi insanlara aylık üyelikle satabileceğiniz altyapılar.',
    fullDesc: 'Hizmet Olarak Yazılım (SaaS) modelleri kuruyoruz. Aklınızdaki dijital bir hizmet fikrini, kullanıcıların internet üzerinden kayıt olup aylık/yıllık üyelik ücreti ödeyerek kullanabileceği dev platformlara dönüştürüyoruz. Çok kiracılı (multi-tenant) veritabanı yapısıyla binlerce farklı firmanın aynı uygulamayı birbirinin verisini görmeden, tamamen izole ve güvenli bir şekilde kullanabileceği gelişmiş mimariler inşa ediyoruz.'
  },
  {
    icon: <Search className="w-6 h-6 text-green-600" />,
    title: 'Arama Motoru ve Google Optimizasyonu',
    desc: 'Web sitenizi arama motorlarında üst sıralara taşıyacak kod ve mimari iyileştirmeleri.',
    fullDesc: 'Güzel bir web sitesi, kimse onu ziyaret etmiyorsa değersizdir. Yıllara dayanan arama motoru değerlendirme (Search Engine Evaluation) uzmanlığımızla, sitenizin kod altyapısını tamamen Google ve diğer arama motorlarının seveceği formata (SEO) uygun kodluyoruz. Sayfa yüklenme hızlarınızı optimize ediyor, site haritanızı yapılandırıyor ve arama algoritmalarına uygun etiketlemelerle sitenize organik müşteri akışını maksimize ediyoruz.'
  },
  {
    icon: <Truck className="w-6 h-6 text-slate-600" />,
    title: 'Lojistik ve Filo Yönetim Yazılımları',
    desc: 'Kargo, uluslararası taşımacılık ve araç filoları için özel takip ve operasyon sistemleri.',
    fullDesc: 'Özellikle Avrupa-Türkiye hattında çalışan veya ülke içinde geniş araç ağına sahip lojistik firmaları için sektörel yazılımlar üretiyoruz. Euro 5/6 emisyon standartlarına uyum, uluslararası gümrük belge entegrasyonları, tır/kamyon güzergah planlamaları ve canlı GPS araç takibi gibi hayati fonksiyonları tek bir ekranda birleştiren, operasyonel maliyetleri ciddi oranda düşüren filo yönetim (Fleet Management) sistemleri kuruyoruz.'
  },
  {
    icon: <Microscope className="w-6 h-6 text-fuchsia-500" />,
    title: 'Bilimsel ve Akademik Arşiv Sistemleri',
    desc: 'Araştırma verilerini, arkeolojik kazıları veya biyolojik numuneleri dijitalleştirme.',
    fullDesc: 'Fen bilimleri, tarih veya arkeoloji gibi yüksek disiplin gerektiren bilimsel projelerin devasa envanterlerini dijitale taşıyoruz. Kazı alanlarından çıkan tarihi eserlerin, laboratuvardaki numunelerin veya binlerce sayfalık akademik evrakların kaybolmadan, yüksek güvenlikli bulut arşivlerinde saklanmasını, filtrelenmesini ve diğer araştırmacılarla yetki sınırları dahilinde paylaşılmasını sağlayan akademik veritabanları geliştiriyoruz.'
  },
  {
    icon: <Leaf className="w-6 h-6 text-lime-500" />,
    title: 'Akıllı Tarım ve Çevre Takip Sistemleri',
    desc: 'Tarım arazilerinden ve seralardan anlık veri alarak otomatik sulama/havalandırma yapma.',
    fullDesc: 'Modern tarımı dijital kodlarla buluşturuyoruz. Seralara veya geniş ekim arazilerine kurduğumuz akıllı sensörler sayesinde toprak nemini, havadaki gaz oranlarını, sıcaklık ve ışık seviyelerini anlık olarak bulut sistemimize aktarıyoruz. Bu verileri analiz ederek cep telefonunuza uyarılar gönderiyor, hatta belirlediğiniz kurallara göre su motorlarını veya havalandırma kapaklarını kilometrelerce uzaktan otomatik çalıştıran sistemler tasarlıyoruz.'
  },
  {
    icon: <Globe className="w-6 h-6 text-blue-400" />,
    title: 'Çok Dilli ve Uluslararası Altyapı',
    desc: 'Uygulamalarınızı sadece çevirmekle kalmaz, yurt dışı standartlarına (Avrupa) uygun hazırlarız.',
    fullDesc: 'İşletmenizi Avrupa ve dünya pazarına hazırlıyoruz. Bir sistemi uluslararası yapmak sadece dillerini çevirmek (İngilizce, Felemenkçe vb.) demek değildir. Biz uygulamanızı hedef pazarın ödeme alışkanlıklarına, Avrupa Birliği KVKK/GDPR veri gizlilik standartlarına, saat dilimlerine ve kültürel kullanım alışkanlıklarına (Lokalizasyon) tam uyumlu şekilde kodluyor, global müşterilerinize güven veren kusursuz bir deneyim sunuyoruz.'
  }
];

const homeBoxesData = [
  {
    id: 1,
    icon: <Rocket className="w-7 h-7 text-indigo-600" />,
    bg: 'bg-indigo-50',
    title: 'Uçtan Uca Geliştirme',
    desc: 'Sadece kod yazmıyoruz; web, mobil ve bulut ekosisteminde birbirine tam entegre, yüksek performanslı dijital ürünler tasarlıyoruz.',
    fullDesc: 'Modern web teknolojileri (React, Next.js) ve güvenilir arka uç sistemleri (Node.js, Supabase) kullanarak fikrinizi sıfırdan canlıya taşıyoruz. Projenizin mimari tasarımından veritabanı modellemesine, kullanıcı arayüzü (UI) tasarımından sunucu kurulumuna kadar tüm aşamaları üstleniyoruz. Bu sayede uygulamanız hem hızlı yükleniyor hem de binlerce kullanıcıya aynı anda sorunsuz hizmet verebiliyor.'
  },
  {
    id: 2,
    icon: <Shield className="w-7 h-7 text-slate-800" />,
    bg: 'bg-slate-50',
    title: 'Satır Bazlı Veri Güvenliği',
    desc: 'Verilerinizi doğrudan veritabanı seviyesinde, kırılmaz RLS (Row Level Security) kuralları ve izole yapılar ile koruma altına alıyoruz.',
    fullDesc: 'Sistemdeki sıradan yazılım açıklarını (Bug) geçtik, doğrudan bulut çekirdeğinde verilerinizi şifreliyoruz. RLS (Satır Bazlı Güvenlik) teknolojisi sayesinde, uygulamanız hacklense bile saldırganlar veritabanından veri çekemez. Her kullanıcının, her personelin sadece kendi yetkisindeki veriyi görebileceği, kişisel verilerin korunması kanunlarına (KVKK/GDPR) %100 uyumlu aşılmaz kaleler inşa ediyoruz.'
  },
  {
    id: 3,
    icon: <CreditCard className="w-7 h-7 text-emerald-600" />,
    bg: 'bg-emerald-50',
    title: 'Kesintisiz Ödeme',
    desc: 'Global ödeme sistemleri (Stripe vb.), cüzdan altyapıları ve komisyon dağıtım modelleri ile nakit akışınızı otomatikleştiriyoruz.',
    fullDesc: 'Müşterilerinizden para tahsil etme sürecini sıfır hatayla çalışacak şekilde dijitale aktarıyoruz. Türkiye\'deki Iyzico, PayTR veya global pazardaki Stripe altyapılarını entegre ederek anında kredi kartı ile ödeme almanızı sağlıyoruz. Ayrıca abonelik gerektiren yazılımlarınız için kartlardan her ay otomatik para çekilmesi, platform içi sanal jeton/kredi sistemi oluşturulması gibi gelişmiş ödeme ağları tasarlıyoruz.'
  }
];

const expertiseData = [
  { icon: <Truck className="w-10 h-10 text-indigo-600" />, title: 'Otomotiv ve Lojistik Bilişimi', desc: 'Uluslararası araç standartları (Euro 5/6 motor mekaniği normları) ve filo yönetim ihtiyaçlarına hakim yapımızla, uluslararası lojistik ve araç takip sistemleri için teknik danışmanlık ve yazılım üretiyoruz.' },
  { icon: <Microscope className="w-10 h-10 text-emerald-500" />, title: 'Bilimsel ve Akademik Bilişim', desc: 'Biyolojik veri takibi, arkeolojik alan (stratigrafi/epigrafi) dijitalleştirme süreçleri ve karmaşık envanter yönetimleri için multidisipliner analitik çözümler geliştiriyoruz.' },
  { icon: <Rocket className="w-10 h-10 text-fuchsia-600" />, title: 'E-Ticaret ve SaaS Modelleri', desc: 'Kendi yazılımını (Hizmet Olarak Yazılım) müşterilerine abonelikle satmak isteyen girişimler için anahtar teslim, çok kiracılı (multi-tenant) altyapılar hazırlıyoruz.' }
];

function Activity(props) {
  return <LineChart {...props} />;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const nav = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center cursor-pointer group" onClick={() => nav('home')}>
              <span className="text-3xl font-extrabold tracking-tighter text-slate-900 lowercase group-hover:text-indigo-950 transition-colors">
                dzy
              </span>
              <span className="text-4xl text-emerald-500 leading-none">.</span>
            </div>

            <div className="hidden md:flex space-x-8">
              {['home', 'services', 'expertise', 'about', 'contact'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => nav(tab)}
                  className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                    activeTab === tab ? 'text-indigo-600 font-bold' : 'text-slate-600'
                  }`}
                >
                  {tab === 'home' && 'Ana Sayfa'}
                  {tab === 'services' && 'Hizmetlerimiz'}
                  {tab === 'expertise' && 'Sektörel Çözümler'}
                  {tab === 'about' && 'Hakkımızda'}
                  {tab === 'contact' && 'İletişim'}
                </button>
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
              {['home', 'services', 'expertise', 'about', 'contact'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => nav(tab)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    activeTab === tab ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {tab === 'home' && 'Ana Sayfa'}
                  {tab === 'services' && 'Hizmetlerimiz'}
                  {tab === 'expertise' && 'Sektörel Çözümler'}
                  {tab === 'about' && 'Hakkımızda'}
                  {tab === 'contact' && 'İletişim'}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'home' && <HomeView nav={nav} />}
        {activeTab === 'services' && <ServicesView />}
        {activeTab === 'expertise' && <ExpertiseView />}
        {activeTab === 'about' && <AboutView />}
        {activeTab === 'contact' && <ContactView />}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-2xl font-extrabold tracking-tighter text-white lowercase">
              dzy<span className="text-emerald-500">.</span>
            </span>
            <p className="text-sm mt-2">Yazılımdan Fazlası. Yeni Nesil Teknoloji Danışmanlığı.</p>
          </div>
          <div className="text-sm">&copy; {new Date().getFullYear()} DZY Yazılım Danışma. Tüm Hakları Saklıdır.</div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}

function HomeView({ nav }) {
  const [expandedBox, setExpandedBox] = useState(null);

  const toggleBox = (id) => {
    if (expandedBox === id) setExpandedBox(null);
    else setExpandedBox(id);
  };

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="text-center max-w-4xl mx-auto pt-10 pb-8">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-6 border border-indigo-100">
          <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
          Sistemleriniz İçin Yeni Nesil Mimari
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
          Yazılımdan Fazlası:<br className="hidden md:block" /> İşletmeniz İçin{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">Akıllı, Güvenli ve Ölçeklenebilir</span> Sistemler İnşa Ediyoruz.
        </h1>
        <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto">
          DZY Yazılım Danışma ile fikirlerinizi yüksek performanslı mobil uygulamalara, gerçek zamanlı takip panellerine ve güvenli bulut mimarilerine dönüştürün.
        </p>
        <button
          onClick={() => nav('contact')}
          className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all bg-slate-900 rounded-xl hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        >
          Projenizi Anlatın
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-200">
        {homeBoxesData.map((box) => (
          <div
            key={box.id}
            onClick={() => toggleBox(box.id)}
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
    </div>
  );
}

function ServicesView() {
  const [expandedService, setExpandedService] = useState(null);

  const toggleService = (idx) => {
    if (expandedService === idx) setExpandedService(null);
    else setExpandedService(idx);
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="max-w-3xl mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Hizmetlerimiz</h2>
        <p className="text-xl text-slate-600">
          İşletmenizi dijitalleştirecek, herkesin anlayabileceği sadelikte tasarlanmış ama arka planda üstün teknoloji barındıran profesyonel hizmetlerimiz.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((service, idx) => (
          <div
            key={idx}
            onClick={() => toggleService(idx)}
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
    </div>
  );
}

function ExpertiseView() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="max-w-3xl mb-12 text-center mx-auto">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Sektörel Çözümler</h2>
        <p className="text-xl text-slate-600">
          Geniş vizyonumuz ve niş (niche) alanlardaki derin bilgi birikimimizle, standart yazılımların ötesine geçen sektörel mimariler kuruyoruz.
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

function AboutView() {
  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
        <div className="h-32 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 w-full relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        </div>

        <div className="p-10 md:p-14 relative">
          <div className="absolute -top-12 left-10 w-24 h-24 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center">
            <span className="text-2xl font-extrabold text-slate-900 lowercase">
              dzy<span className="text-emerald-500">.</span>
            </span>
          </div>

          <div className="mt-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Farklı Disiplinler, Tek Bir Analitik Yaklaşım.</h2>

            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                <strong className="text-slate-900">DZY Yazılım Danışma</strong> olarak teknolojiyi sadece bir araç değil, işletmelerin kronik sorunlarını çözen bir köprü olarak görüyoruz. Fen bilimlerinden antik tarihe, otomotiv lojistiğinden donanım mühendisliğine kadar uzanan geniş ve multidisipliner bir perspektifle çalışıyoruz.
              </p>
              <p>
                Bizim için yazılım, sadece ekranda güzel görünen butonlardan ibaret değildir. Bir işletmenin arka plandaki karmaşık veri akışını, kırılmaz güvenlik standartlarını ve en önemlisi ticari mantığını (Business Logic) uçtan uca tasarlayan mühendislik eserleri üretiyoruz.
              </p>
            </div>

            <div className="mt-12 p-8 bg-indigo-50 rounded-2xl border border-indigo-100 flex flex-col md:flex-row gap-6 items-center">
              <Globe className="w-16 h-16 text-indigo-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Küresel Vizyon ve Lokalizasyon</h3>
                <p className="text-slate-700">
                  Türkçe, İngilizce ve Felemenkçe dillerindeki tam iletişim kapasitemizle projelerinizi yerel sınırların ötesine, uluslararası standartlara (özellikle Avrupa veri ve ticaret standartlarına) uygun olarak taşıyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactView() {
  const [formStatus, setFormStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Operasyonunuzu Bir Üst Seviyeye Taşıyalım.</h2>
        <p className="text-xl text-slate-600">Mimari vizyonumuzun projenize nasıl değer katabileceğini konuşalım.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Ad Soyad</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Şirket Adı</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors" placeholder="Şirket A.Ş." />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">E-Posta</label>
              <input required type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors" placeholder="ornek@sirket.com" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Proje Bütçe Aralığı</label>
              <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors text-slate-700">
                <option>Seçiniz...</option>
                <option>1.000$ - 5.000$ (Başlangıç Projeleri)</option>
                <option>5.000$ - 10.000$ (Orta Ölçekli Sistemler)</option>
                <option>10.000$ - 50.000$ (Kapsamlı Platformlar)</option>
                <option>50.000$ - 150.000$ (Kurumsal Dönüşüm)</option>
                <option>150.000$+ (Büyük Ölçekli Yatırımlar)</option>
                <option>Sadece Danışmanlık / Retainer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Proje Özeti</label>
              <textarea required rows="4" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors resize-none" placeholder="Vizyonunuzu kısaca anlatın..."></textarea>
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
                    <p className="font-semibold text-slate-200">Merkez Ofis</p>
                    <p className="text-slate-400 mt-1 leading-relaxed">Buca, İzmir, Türkiye<br />(AR-GE ve Operasyon Merkezi)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-indigo-400 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-200">E-Posta</p>
                    <p className="text-slate-400 mt-1">hello@dzyyazilim.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-indigo-400 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-200">Telefon</p>
                    <p className="text-slate-400 mt-1">+90 (5XX) XXX XX XX</p>
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
                dzy<span className="text-emerald-500">.</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Merhaba! DZY Yazılım Danışma'ya hoş geldiniz. Projenizle ilgili nasıl yardımcı olabilirim?", sender: 'bot', time: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMsg = { text: inputValue, sender: 'user', time: new Date() };
    setMessages((prev) => [...prev, newMsg]);
    setInputValue('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: 'Harika! Bu mesaj gerçek zamanlı altyapımız (Supabase Realtime simülasyonu) sayesinde anında admin panelimize düştü. İletişim sayfasından projenizin detaylarını bırakırsanız hemen toplantı ayarlayabiliriz.',
          sender: 'bot',
          time: new Date()
        }
      ]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] max-w-[calc(100vw-3rem)] h-[450px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center font-bold mr-3">D</div>
              <div>
                <h4 className="font-bold text-sm">DZY Canlı Destek</h4>
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
            <div className="text-xs text-center text-slate-400 mb-4">Realtime Demo Altyapısı</div>
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
            Bize Canlı Ulaşın
          </span>
        )}
      </button>
    </div>
  );
}
