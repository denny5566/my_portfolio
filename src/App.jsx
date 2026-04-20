import { useEffect, useRef, useState } from 'react';
import {
  Mail,
  Linkedin,
  Github,
  Download,
  Menu,
  X,
  ArrowUpRight,
  User,
} from 'lucide-react';

const assetUrl = (filename) => `${import.meta.env.BASE_URL}${filename}`;

const FadeInSection = ({ children, delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisible(true), delay);
          }
        });
      },
      { threshold: 0.1 },
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [delay]);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  );
};

const Typewriter = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timer = setTimeout(() => setReverse(true), 1500);
      return () => clearTimeout(timer);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout);
  }, [blink]);

  return (
    <span className="text-white">
      <span className="font-black italic">{words[index].substring(0, subIndex)}</span>
      <span
        className={`${blink ? 'opacity-100' : 'opacity-0'} ml-1 border-r-4 border-white`}
      ></span>
    </span>
  );
};

const navLinks = [
  { name: '關於', href: '#about' },
  { name: '經歷', href: '#experience' },
  { name: '專案', href: '#projects' },
];

const skills = [
  'AI Implementation',
  'Digital Finance',
  'Project Management',
  'Python',
  'SQL',
  'Tableau',
  'SAP Emarsys',
  'Adobe Experience Manager',
  'Marketing Automation',
  'Fintech Strategy',
];

const certs = [
  'TOEIC 815',
  'Google Ads Certification',
  'TIMS Basic Planner',
  'Futures Specialist',
  'Financial Ethics',
  'Life Insurance Solicitor',
  'Excellent Graduate Scholarship',
  'GPA 4.15',
];

const experiences = [
  {
    company: '國泰人壽',
    role: '數位平台實習生 — 數位商務發展科',
    period: 'FEB 2026 – PRESENT',
    desc: [
      '操作 Adobe Experience Manager (AEM) 系統維護官方網站資訊，確保訊息準確性。',
      '負責網路投保平台網頁資訊彙整與功能驗測，優化數位投保體驗。',
    ],
  },
  {
    company: '群益期貨',
    role: '數位增長部實習生 — 行銷科',
    period: 'JUL 2025 – AUG 2025',
    desc: [
      '操作 SAP Emarsys 行銷自動化工具規劃用戶旅程，成功吸引 22 位新用戶加入。',
      '優化數位內容與文案撰寫，提升品牌在社交媒體與專業平台的曝光度。',
    ],
  },
  {
    company: '佳格食品',
    role: '公關組實習生 — 永續發展處',
    period: 'MAR 2025 – JUN 2025',
    desc: [
      '撰寫品牌記者會新聞稿，於超過 20 個主流網路媒體獲得露出。',
      '宣傳文案總點擊數超過 10,000 次，並協助執行 16 場品牌活動與記者會。',
    ],
  },
];

const projects = [
  {
    tag: '入圍決賽',
    tagClass: 'bg-red-600',
    hoverClass: 'hover:border-red-500 group-hover:text-red-600',
    title: '永豐金控商業競賽',
    subtitle: '豐念時光「心福傳承信託」',
    body: '結合混合型信託架構與 Gen-AI 影音技術，將傳統習俗轉化為具溫度的數位財富傳承方案。',
    caseName: 'Case Study 01',
    caseHover: 'group-hover:text-red-600',
    image: '',
    imageAlt: '永豐金控商業競賽照片',
  },
  {
    tag: '冠軍',
    tagClass: 'bg-emerald-500',
    hoverClass: 'hover:border-emerald-500 group-hover:text-emerald-600',
    title: '玉山銀行商業競賽',
    subtitle: '永續畜牧友善貸款專案',
    body: '針對食安改善缺口設計綠色金融產品，協助中小型供應商達成畜牧設備更新與環境永續轉型。',
    caseName: 'Case Study 02',
    caseHover: 'group-hover:text-emerald-600',
    image: 'project-esun.jpg',
    imageAlt: '玉山銀行商業競賽照片',
  },
  {
    tag: '專案',
    tagClass: 'bg-slate-900',
    hoverClass: 'hover:border-slate-900 group-hover:text-slate-400',
    title: 'TMBA x 中信銀行合作',
    subtitle: '生成式 AI 導入生態圈應用',
    body: '分析信用卡消費大數據並整合 LLM 技術，為金融與零售生態圈打造精準且具溫度的個人化推廣策略。',
    caseName: 'Case Study 03',
    caseHover: 'group-hover:text-black',
    image: 'project-ctbc.jpg',
    imageAlt: '中信合作專案照片',
  },
];

const ProjectMedia = ({ src, alt }) => {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div className="mb-8 h-44 rounded-2xl border border-slate-200 bg-slate-50 text-slate-400 flex items-center justify-center text-sm font-semibold tracking-wide">
        照片待補
      </div>
    );
  }

  return (
    <div className="mb-8 h-44 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
      <img
        src={assetUrl(src)}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={() => setFailed(true)}
      />
    </div>
  );
};

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);
  const traitWords = ['Fintech', 'AI-driven', 'Strategic', 'Analytical', 'Creative'];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 scroll-smooth">
      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md py-4 border-b border-slate-100'
            : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-6xl mx-auto px-8 flex justify-between items-center">
          <a href="#" onClick={(e) => scrollToSection(e, '#about')} className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:bg-blue-700 transition-all">
              D
            </div>
            <span
              className={`font-black tracking-tighter text-xl transition-all duration-500 ${
                isScrolled || isMenuOpen ? 'text-slate-900' : 'text-white'
              }`}
            >
              DENNY.
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            <div
              className={`flex gap-8 text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 ${
                isScrolled ? 'text-slate-400' : 'text-white/70'
              }`}
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="hover:text-blue-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <a
              href={assetUrl('resume.pdf')}
              className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-xs font-black transition-all hover:shadow-xl active:scale-95"
            >
              <Download size={14} /> DOWNLOAD CV
            </a>
          </div>

          <button
            className={`md:hidden p-2 transition-colors duration-500 ${
              isScrolled || isMenuOpen ? 'text-slate-900' : 'text-white'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div
          className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 p-10 flex flex-col gap-8 shadow-2xl transition-all duration-300 ${
            isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xl font-black uppercase tracking-widest text-slate-900"
              onClick={(e) => scrollToSection(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <a
            href={assetUrl('resume.pdf')}
            className="flex items-center justify-center gap-3 bg-blue-600 text-white py-5 rounded-2xl text-base font-black"
          >
            <Download size={20} /> DOWNLOAD CV
          </a>
        </div>
      </nav>

      <main>
        <section id="about" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden scroll-mt-0">
          <div className="absolute inset-0 bg-slate-900">
            <img
              src={assetUrl('background.jpg')}
              alt="背景圖片"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-white"></div>
          </div>

          <div className="relative z-10 text-center px-6 mt-16">
            <FadeInSection>
              <p className="text-white text-3xl md:text-5xl font-light mb-6 tracking-tight">Hi there, I'm Denny,</p>
              <h1 className="text-white text-5xl md:text-8xl font-black mb-12 tracking-tighter leading-tight">
                a <Typewriter words={traitWords} /> person.
              </h1>

              <div className="relative mt-32 max-w-lg mx-auto text-left group">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 md:left-16 md:translate-x-0 w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden z-20 bg-white">
                  {!profileImageError ? (
                    <img
                      src={assetUrl('profile.jpg')}
                      alt="Denny profile"
                      className="w-full h-full object-cover"
                      onError={() => setProfileImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50">
                      <User size={64} />
                    </div>
                  )}
                </div>

                <div className="bg-[#1E253A]/95 backdrop-blur-xl rounded-[2.5rem] p-10 pt-24 md:pt-32 text-white shadow-2xl border border-white/10 transition-all duration-500 hover:-translate-y-2">
                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h2 className="text-4xl font-bold mb-6">陳庭宇 Denny Chen</h2>
                    <div className="flex gap-4 mb-8">
                      <a
                        href="mailto:dennychen0605@gmail.com"
                        className="p-2 border border-white/20 rounded-lg hover:bg-blue-600 transition-all"
                      >
                        <Mail size={20} />
                      </a>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 border border-white/20 rounded-lg hover:bg-blue-600 transition-all"
                      >
                        <Linkedin size={20} />
                      </a>
                      <a
                        href="https://github.com/denny5566"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 border border-white/20 rounded-lg hover:bg-blue-600 transition-all"
                      >
                        <Github size={20} />
                      </a>
                    </div>
                    <div className="space-y-1 mb-8 text-white/60 text-sm">
                      <p className="underline decoration-blue-500/50 underline-offset-4">Graduate Student</p>
                      <p>Taipei, Taiwan</p>
                    </div>
                    <p className="text-lg leading-relaxed text-white/90 font-light">
                      我想要踏入 <span className="font-bold text-blue-400">數位金融</span> 的領域，致力於學習{' '}
                      <span className="font-bold">AI 實作</span> 與 <span className="font-bold">專案管理</span>
                      ，熱衷於開發具備創意與技術深度的解決方案。
                    </p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-8">
          <FadeInSection>
            <section className="py-32 border-b border-slate-100 text-center md:text-left">
              <div className="grid md:grid-cols-12 gap-16 items-center">
                <div className="md:col-span-6">
                  <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight tracking-tighter">
                    透過 AI 驅動 <br />
                    成長為<span className="text-blue-600">跨域人才</span>
                  </h2>
                </div>
                <div className="md:col-span-6">
                  <p className="text-2xl md:text-3xl text-slate-400 leading-relaxed font-light">
                    在快速變動的數位金融時代，我追求的不僅是單一領域的專業。我透過研發{' '}
                    <span className="text-slate-900 font-bold">AI 應用</span> 與深耕{' '}
                    <span className="text-slate-900 font-bold">專案管理邏輯</span>
                    ，旨在成為能跨界溝通並解決複雜問題的產品經理。
                  </p>
                </div>
              </div>
            </section>
          </FadeInSection>

          <FadeInSection>
            <section id="experience" className="py-32 border-b border-slate-100 scroll-mt-24">
              <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-300 mb-20">Work Experience</h2>
              <div className="space-y-32">
                {experiences.map((exp) => (
                  <div key={exp.company} className="group grid md:grid-cols-12 gap-8 items-start">
                    <div className="md:col-span-4">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4 block">
                        {exp.period}
                      </span>
                      <h3 className="text-4xl font-black group-hover:text-blue-600 transition-colors mb-4">{exp.company}</h3>
                      <p className="text-slate-800 font-bold text-lg md:text-xl tracking-tight leading-snug">{exp.role}</p>
                    </div>
                    <div className="md:col-span-8 md:pl-12 border-l border-slate-100">
                      <ul className="space-y-8">
                        {exp.desc.map((item) => (
                          <li key={item} className="flex gap-6 text-2xl md:text-3xl text-slate-500 leading-relaxed font-light">
                            <span className="text-blue-600 font-black">/</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </FadeInSection>

          <FadeInSection>
            <section id="projects" className="py-32 scroll-mt-24">
              <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-300 mb-20">Selected Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {projects.map((project) => (
                  <div
                    key={project.title}
                    className={`flex flex-col border-2 border-slate-100 rounded-[2.5rem] p-12 transition-all duration-500 group shadow-sm hover:shadow-2xl h-full ${project.hoverClass}`}
                  >
                    <ProjectMedia src={project.image} alt={project.imageAlt} />
                    <div className="mb-10 h-14 flex items-start">
                      <span
                        className={`px-8 py-2.5 ${project.tagClass} text-white text-[13px] font-black uppercase tracking-widest rounded-full shadow-md`}
                      >
                        {project.tag}
                      </span>
                    </div>
                    <h3 className="text-3xl font-black leading-tight transition-colors mb-8">
                      {project.title}
                      <br />
                      <span className="text-slate-400 text-xl font-bold">{project.subtitle}</span>
                    </h3>
                    <div className="h-px bg-slate-100 w-full mb-10"></div>
                    <p className="text-2xl text-slate-500 font-light leading-relaxed mb-12 flex-grow">{project.body}</p>
                    <div
                      className={`text-[12px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2 mt-auto ${project.caseHover}`}
                    >
                      {project.caseName} <ArrowUpRight size={16} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </FadeInSection>
        </div>

        <section className="bg-[#0F1115] py-40 overflow-hidden">
          <div className="max-w-6xl mx-auto px-8 text-center">
            <FadeInSection>
              <h2 className="text-blue-500 text-xl md:text-3xl font-medium mb-16 tracking-tight">
                Skills & Professional Certifications
              </h2>
            </FadeInSection>

            <div className="flex flex-wrap justify-center gap-x-12 gap-y-12 mb-20 max-w-4xl mx-auto">
              {skills.map((skill, idx) => (
                <FadeInSection key={skill} delay={idx * 150}>
                  <span className="text-blue-500 text-3xl md:text-5xl font-light hover:text-white transition-colors duration-500 cursor-default">
                    {skill}
                  </span>
                </FadeInSection>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-x-10 gap-y-10 max-w-4xl mx-auto opacity-80">
              {certs.map((cert, idx) => (
                <FadeInSection key={cert} delay={(skills.length + idx) * 150}>
                  <span className="text-blue-400/60 text-xl md:text-3xl font-light italic hover:text-white transition-colors duration-500 cursor-default">
                    {cert}
                  </span>
                </FadeInSection>
              ))}
              <FadeInSection delay={(skills.length + certs.length) * 150}>
                <span className="text-slate-600 text-xl md:text-3xl font-light">and more...</span>
              </FadeInSection>
            </div>
          </div>
        </section>

        <footer className="pt-32 pb-16 bg-[#0F1115] flex flex-col md:flex-row justify-between items-center gap-12 max-w-6xl mx-auto px-8">
          <div className="text-center md:text-left flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-xl">D</div>
            <div>
              <h4 className="text-2xl font-black text-white">DENNY CHEN.</h4>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Digital Finance Excellence</p>
            </div>
          </div>
          <div className="flex gap-12 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
            <a
              href="https://github.com/denny5566"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={assetUrl('resume.pdf')}
              className="hover:text-blue-600 transition-colors underline decoration-blue-100 underline-offset-8"
            >
              Resume.pdf
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
