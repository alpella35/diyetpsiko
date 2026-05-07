import React, { useState, useEffect, useRef } from 'react';
import {
  Rocket, Shield, CreditCard, LayoutTemplate,
  Smartphone, Database, Cpu, Building2, UserCog,
  LineChart, Network, BarChart3, Store, Search,
  Truck, Microscope, Leaf, Globe, ChevronRight,
  MapPin, Mail, Phone, Clock, MessageSquare,
  Send, X, Menu, ChevronDown, ChevronUp
} from 'lucide-react';
import { supabase, supabaseConfig } from './lib/supabase';

// --- DATA ---

const servicesData = [
  {
    icon: <Smartphone className="w-6 h-6 text-indigo-500" />,
    title: 'Bireysel Psikolojik Danışmanlık',
    desc: 'Kaygı, stres, tükenmişlik ve ilişki sorunlarında uzman psikolog desteği.',
    fullDesc: 'Bireysel seanslarımızda duygularınızı güvenli bir alanda ele alır, stres kaynaklarını birlikte analiz eder ve günlük yaşamda uygulayabileceğiniz güçlü başa çıkma becerileri geliştiririz.'
  },
  {
    icon: <CreditCard className="w-6 h-6 text-emerald-500" />,
    title: 'Kişiye Özel Beslenme Danışmanlığı',
    desc: 'Yaşam tarzınıza, sağlık geçmişinize ve hedeflerinize uygun sürdürülebilir planlar.',
    fullDesc: 'Diyetisyenlerimiz standart listeler yerine kan değerleri, uyku düzeni, iş temposu ve damak tadınızı dikkate alan kişiye özel beslenme programları oluşturur; haftalık takiplerle planı size göre günceller.'
  },
  {
    icon: <Activity className="w-6 h-6 text-rose-500" />,
    title: 'Psiko-Beslenme Entegre Programı',
    desc: 'Duygusal yeme, kilo yönetimi ve motivasyon için ortak uzman takibi.',
    fullDesc: 'Psikolog ve diyetisyenlerimizin birlikte yürüttüğü bu programda yeme davranışlarınızı etkileyen duygusal tetikleyiciler keşfedilir, sağlıklı alışkanlıklar adım adım kalıcı hale getirilir.'
  },
  {
    icon: <Shield className="w-6 h-6 text-slate-700" />,
    title: 'Online Seans ve Gizli Takip',
    desc: 'Türkiye’nin her yerinden güvenli altyapı ile online görüşme imkânı.',
    fullDesc: 'Yoğun temponuzda destekten uzak kalmamanız için online seans seçenekleri sunuyoruz. Gizlilik ilkesiyle tüm süreçler etik kurallar çerçevesinde korunur ve danışan bilgileriniz titizlikle saklanır.'
  },
  {
    icon: <Leaf className="w-6 h-6 text-lime-500" />,
    title: 'Kadın Sağlığı ve Hormon Dostu Beslenme',
    desc: 'PCOS, tiroid, menopoz ve adet döngüsüne özel beslenme desteği.',
    fullDesc: 'Hormon dengesini destekleyen, semptomları hafifletmeye yardımcı ve günlük yaşama uygulanabilir planlar hazırlarız. Gerekli durumlarda doktor takibiyle koordineli ilerleriz.'
  },
  {
    icon: <Globe className="w-6 h-6 text-blue-400" />,
    title: 'Kurumsal İyi Oluş Programları',
    desc: 'Çalışanlar için stres yönetimi, sağlıklı beslenme ve sürdürülebilir performans.',
    fullDesc: 'Kurumlara özel atölye, seminer ve bireysel danışmanlık paketleri ile ekiplerin zihinsel dayanıklılığını ve sağlıklı yaşam alışkanlıklarını güçlendiren kapsamlı wellbeing çözümleri sunuyoruz.'
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
              <span className="text-4xl font-extrabold tracking-tighter text-slate-900 lowercase group-hover:text-indigo-950 transition-colors">
                d&p
              </span>
              <span className="text-5xl text-emerald-500 leading-none">.</span>
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
                  {tab === 'expertise' && 'Uzmanlık Alanlarımız'}
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
                  {tab === 'expertise' && 'Uzmanlık Alanlarımız'}
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
        {activeTab === 'admin' && <AdminView />}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <button
              type="button"
              onClick={() => nav('admin')}
              className="text-3xl font-extrabold tracking-tighter text-white lowercase hover:text-indigo-300 transition-colors"
            >
              d&p<span className="text-emerald-500">.</span>
            </button>
            <p className="text-sm mt-2">Ruhsal denge ve sürdürülebilir beslenmeyi aynı çatı altında buluşturuyoruz.</p>
          </div>
          <div className="text-sm">&copy; {new Date().getFullYear()} D&P Psikoloji ve Beslenme Merkezi. Tüm Hakları Saklıdır.</div>
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
          Bilimsel Yaklaşımla Bütüncül İyi Oluş
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
          Psikolog ve Diyetisyen Desteğiyle<br className="hidden md:block" /> {' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">Dengeli Bir Zihin ve Sağlıklı Bir Yaşam</span> İnşa Ediyoruz.
        </h1>
        <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto">
          D&P Psikoloji ve Beslenme Merkezi ile duygusal iyi oluşunuzu güçlendirin, size özel beslenme planlarıyla sürdürülebilir sağlıklı yaşam rutinleri oluşturun.
        </p>
        <button
          onClick={() => nav('contact')}
          className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all bg-slate-900 rounded-xl hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        >
          İlk Görüşmeyi Planlayın
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
          Psikolojik danışmanlık ve diyetisyen desteğini birlikte sunan, yaşam tarzınıza uyarlanmış profesyonel hizmet programlarımız.
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
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Psikoloji ve Beslenme, Tek Bir İyileşme Yolculuğu.</h2>

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

function ContactView() {
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
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">İyi Oluş Yolculuğunuza Birlikte Başlayalım.</h2>
        <p className="text-xl text-slate-600">Size en uygun psikolog ve diyetisyen programını birlikte planlayalım.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
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
                    <p className="text-slate-400 mt-1">iletisim@dppsikobeslenme.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-indigo-400 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-200">Telefon</p>
                    <p className="text-slate-400 mt-1">+90 (232) 000 00 00</p>
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
    { text: "Merhaba! D&P Psikoloji ve Beslenme Merkezi’ne hoş geldiniz. Size en uygun psikolog ve diyetisyen desteği için nasıl yardımcı olabilirim?", sender: 'bot', time: new Date() }
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
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] max-w-[calc(100vw-3rem)] h-[450px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
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

function AdminView() {
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
