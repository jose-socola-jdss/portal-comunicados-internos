import { AlertTriangle, BellRing, ChevronRight, Megaphone, Search, ShieldAlert, Sparkles, Send, User, Mail, Tag, Clock, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const announcements = [
  {
    id: 'rs-201',
    title: 'Nuevo protocolo para maniobras nocturnas en patio intermodal de Apodaca',
    category: 'Seguridad operativa',
    tags: ['Patios', 'Turno nocturno', 'Cumplimiento'],
    date: '2026-05-28',
    priority: 'Alta',
    featured: true,
    body: 'A partir del lunes se implementa una secuencia obligatoria de chequeo visual, validación de sellos y confirmación radial previa a cada movimiento en patio. El objetivo es reducir cruces no autorizados y fortalecer trazabilidad en ventanas de carga.',
  },
  {
    id: 'rs-202',
    title: 'Ajuste de horarios para liberación documental en aduana industrial Bajío',
    category: 'Operaciones',
    tags: ['Documentación', 'Aduana', 'Despachos'],
    date: '2026-05-25',
    priority: 'Media',
    featured: false,
    body: 'El equipo de torre documental centraliza revisiones de manifiestos entre 06:00 y 20:00. Las solicitudes posteriores se canalizarán a guardia con tiempo adicional de respuesta estimado de 35 minutos.',
  },
  {
    id: 'rs-203',
    title: 'Campaña interna de reporte preventivo de desviaciones en rutas críticas',
    category: 'Calidad y mejora',
    tags: ['Rutas', 'Mejora continua', 'Alertas'],
    date: '2026-05-23',
    priority: 'Alta',
    featured: true,
    body: 'Se habilita una ventana de reporte para documentar cuellos de botella, retrasos repetitivos y puntos de transferencia con variaciones superiores al objetivo. Las observaciones alimentarán el rediseño semanal de capacidad.',
  },
  {
    id: 'rs-204',
    title: 'Actualización de lineamientos de acceso para proveedores de mantenimiento',
    category: 'Recursos y soporte',
    tags: ['Proveedores', 'Accesos', 'Seguridad patrimonial'],
    date: '2026-05-20',
    priority: 'Baja',
    featured: false,
    body: 'Toda cuadrilla externa deberá registrar lista nominal completa y orden de servicio vigente antes de ingresar a nodos con equipos de elevación. Se eliminan accesos provisionales sin autorización del coordinador de sitio.',
  },
];

function App() {


  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  const [priority, setPriority] = useState('Todas');
  const [selectedId, setSelectedId] = useState(announcements[0].id);
  const [subscription, setSubscription] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSelectAnnouncement = (id, cat) => {
    setSelectedId(id);
    if (cat && category !== 'Todas' && category !== cat) {
      setCategory('Todas');
    }
  };

  const categories = ['Todas', ...new Set(announcements.map((item) => item.category))];
  const priorities = ['Todas', ...new Set(announcements.map((item) => item.priority))];

  const filtered = useMemo(() => announcements.filter((item) => {
    const matchesQuery = `${item.title} ${item.body} ${item.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === 'Todas' || item.category === category;
    const matchesPriority = priority === 'Todas' || item.priority === priority;
    return matchesQuery && matchesCategory && matchesPriority;
  }), [query, category, priority]);

  useEffect(() => {
    const isStillPresent = filtered.some((item) => item.id === selectedId);
    if (!isStillPresent && filtered[0]) {
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId]);

  const selected = filtered.find((item) => item.id === selectedId) || announcements[0];
  const featured = announcements.filter((item) => item.featured);

  const submitSubscription = () => {
    if (!subscription.name.trim() || !/^\S+@\S+\.\S+$/.test(subscription.email)) {
      setMessage('Ingresa un nombre y correo institucional válido.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('rutasigma-alertas', JSON.stringify(subscription));
      setMessage(`Suscripción verificada para: ${subscription.name}`);
      setSubscription({ name: '', email: '' });
      setLoading(false);
    }, 800);
  };



  return (
    <div className="min-h-screen pb-12 text-slate-800 selection:bg-blue-500/20 selection:text-blue-900">
      
      {/* ═══════════ URGENT TICKER ═══════════ */}
      <div className="ticker-wrap shadow-sm">
        <div className="ticker-content font-editorial">
          <span className="ticker-item cursor-pointer hover:underline hover:text-slate-200 transition-colors" onClick={() => handleSelectAnnouncement('rs-201', 'Seguridad operativa')}>
            ⚠️ DIRECTIVA CRÍTICA: MANIOBRAS NOCTURNAS EN APODACA Y BAJÍO REQUIEREN CHECK-LIST Y VALIDACIÓN RADIAL DOBLE.
          </span>
          <span className="ticker-item cursor-pointer hover:underline hover:text-slate-200 transition-colors" onClick={() => handleSelectAnnouncement('rs-201', 'Seguridad operativa')}>
            📢 NUEVO PROTOCOLO LOGÍSTICO VIGENTE DESDE EL LUNES DE ESTA SEMANA.
          </span>
          <span className="ticker-item cursor-pointer hover:underline hover:text-slate-200 transition-colors" onClick={() => handleSelectAnnouncement('rs-202', 'Operaciones')}>
            ⚡ ATENCIÓN: AJUSTE DE HORARIOS PARA LIBERACIÓN DOCUMENTAL EN ADUANA INDUSTRIAL BAJÍO.
          </span>
          {/* Duplicate to create endless loop */}
          <span className="ticker-item cursor-pointer hover:underline hover:text-slate-200 transition-colors" onClick={() => handleSelectAnnouncement('rs-201', 'Seguridad operativa')}>
            ⚠️ DIRECTIVA CRÍTICA: MANIOBRAS NOCTURNAS EN APODACA Y BAJÍO REQUIEREN CHECK-LIST Y VALIDACIÓN RADIAL DOBLE.
          </span>
          <span className="ticker-item cursor-pointer hover:underline hover:text-slate-200 transition-colors" onClick={() => handleSelectAnnouncement('rs-201', 'Seguridad operativa')}>
            📢 NUEVO PROTOCOLO LOGÍSTICO VIGENTE DESDE EL LUNES DE ESTA SEMANA.
          </span>
          <span className="ticker-item cursor-pointer hover:underline hover:text-slate-200 transition-colors" onClick={() => handleSelectAnnouncement('rs-202', 'Operaciones')}>
            ⚡ ATENCIÓN: AJUSTE DE HORARIOS PARA LIBERACIÓN DOCUMENTAL EN ADUANA INDUSTRIAL BAJÍO.
          </span>
        </div>
      </div>

      {/* Royal blue band */}
      <div className="news-header-band"></div>

      {/* ═══════════ NEWSPAPER BRAND HEADER ═══════════ */}
      <header className="bg-white border-b border-gray-300 py-6">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left select-none">
            <svg viewBox="0 0 24 24" style={{ width: 36, height: 36 }} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-800">
              {/* Dynamic road / infinity loop / sigma path */}
              <path d="M3 3h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3" />
              <path d="M12 3v18" strokeDasharray="3 3" strokeWidth="1.5" />
            </svg>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-2xl font-editorial font-black text-gray-900 uppercase tracking-tight" style={{ lineHeight: 1 }}>
                  RUTASIGMA
                </span>
                <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.12em', fontFamily: "monospace", background: '#1e40af', color: '#fff', padding: '2px 6px', borderRadius: 2 }}>
                  LOGÍSTICA
                </span>
              </div>
              <p className="text-[10px] text-gray-500 font-sans mt-1" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 650 }}>
                Sistemas de Transporte Terrestre y Distribución
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-gray-100 px-3 py-1.5 border border-gray-300 rounded-sm">
            <Clock size={12} className="text-blue-800" />
            <span>Última Actualización: Hoy, 09:45 AM</span>
          </div>
        </div>
      </header>

      {/* ═══════════ CATEGORY TABS NAVIGATION ═══════════ */}
      <nav className="bg-white border-b border-gray-300 shadow-sm sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex overflow-x-auto py-1 scrollbar-none items-center gap-1">
            {categories.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                    active
                      ? 'border-blue-800 text-blue-800'
                      : 'border-transparent text-gray-500 hover:text-gray-950'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ═══════════ MAIN FEATURED HERO ═══════════ */}
      <div className="mx-auto max-w-7xl px-6 mt-6">
        <div className="bg-white border border-gray-300 p-6 flex flex-col lg:flex-row gap-6 items-center shadow-sm rounded-sm">
          
          <div className="lg:w-2/3 space-y-4">
            <span className="px-2 py-0.5 bg-rose-100 text-rose-800 border border-rose-300 text-[9px] font-bold uppercase tracking-wider font-mono">
              ALERTA OPERACIONAL ALTA
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-black text-gray-900 hover:text-blue-800 transition cursor-pointer" onClick={() => handleSelectAnnouncement('rs-201', 'Seguridad operativa')}>
              Nuevo protocolo para maniobras nocturnas en patio intermodal de Apodaca
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-sans">
              A partir del lunes se implementa una secuencia obligatoria de chequeo visual, validación de sellos y confirmación radial previa a cada movimiento en patio. El objetivo es reducir cruces no autorizados y fortalecer trazabilidad en ventanas de carga.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-mono">
              <span>Publicado: 2026-05-28</span>
              <span>•</span>
              <span>Sede: Apodaca</span>
            </div>
          </div>
          
          <div className="lg:w-1/3 w-full bg-blue-50 border-l-4 border-blue-800 p-5 rounded-r-md self-stretch flex flex-col justify-between">
            <div>
              <h4 className="text-xs uppercase font-editorial font-bold text-blue-800">
                Resumen Ejecutivo
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed mt-2">
                Este boletín técnico dicta el plan de mitigación en patio, de cumplimiento estricto para despachadores, guardias y transportistas autorizados.
              </p>
            </div>
            <button
              onClick={() => handleSelectAnnouncement('rs-201', 'Seguridad operativa')}
              className="btn-news btn-news-outline text-xs py-1.5 mt-4"
            >
              Leer Directiva Completa
            </button>
          </div>

        </div>
      </div>

      {/* ═══════════ CORE CONTENT NEWS GRID ═══════════ */}
      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-6 lg:grid-cols-[1.1fr_1.1fr_0.8fr]">
        
        {/* COLUMN 1: BULLETIN LISTINGS */}
        <section className="space-y-4">
          
          {/* SEARCH & PRIORITY FILTER */}
          <div className="bg-white border border-gray-300 p-4 space-y-3 rounded-sm shadow-sm">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input
                className="input-news pl-8 text-xs"
                placeholder="Buscar por titular, palabra clave..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <select
                className="input-news py-1.5 text-xs w-full"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Todas">Todas las Prioridades</option>
                <option value="Alta">Prioridad Alta</option>
                <option value="Media">Prioridad Media</option>
                <option value="Baja">Prioridad Baja</option>
              </select>
            </div>
          </div>

          {/* LIST OF POSTS */}
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="bg-white border border-gray-300 p-8 text-center text-xs text-gray-500 font-mono">
                No hay comunicados con los criterios indicados.
              </div>
            ) : (
              filtered.map((item) => {
                const active = selectedId === item.id;
                return (
                  <article
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`news-card p-4 text-left cursor-pointer transition-all ${
                      active ? 'ring-2 ring-blue-800' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2 text-[10px] font-mono">
                      <span className="text-blue-800 font-bold uppercase">{item.category}</span>
                      <span className={`font-bold ${
                        item.priority === 'Alta' ? 'text-red-600' : 'text-gray-500'
                      }`}>
                        {item.priority}
                      </span>
                    </div>
                    
                    <h3 className="font-editorial font-bold text-gray-900 text-sm hover:text-blue-800 transition line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-xs text-gray-600 leading-relaxed mt-2 line-clamp-2 font-sans">
                      {item.body}
                    </p>
                    
                    <div className="mt-3 flex items-center justify-between text-[10px] text-gray-500 font-mono border-t border-gray-150 pt-2">
                      <span>{item.date}</span>
                      <span className="text-blue-800 font-bold flex items-center gap-0.5">
                        Leer Artículo <ChevronRight size={10} />
                      </span>
                    </div>
                  </article>
                );
              })
            )}
          </div>

        </section>

        {/* COLUMN 2: NEWSPAPER READING PANE */}
        <section className="bg-white border border-gray-300 p-6 shadow-sm rounded-sm self-start flex flex-col gap-6">
          {selected ? (
            <div
              key={selected.id}
              className="space-y-4"
            >
              
              {/* Article Header */}
              <div className="border-b border-gray-300 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-blue-800 font-mono">
                    DOCUMENTO EN DETALLE // {selected.id}
                  </span>
                  <span className="text-xs text-gray-500 font-mono">{selected.date}</span>
                </div>
                <h2 className="mt-2 text-2xl font-editorial font-black text-gray-900 leading-snug">
                  {selected.title}
                </h2>
              </div>

              {/* Tags array */}
              <div className="flex flex-wrap gap-1">
                <span className="rounded bg-gray-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gray-700 border border-gray-300">
                  {selected.category}
                </span>
                {selected.tags.map((tag) => (
                  <span key={tag} className="rounded bg-blue-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-800 border border-blue-200">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Newspaper body text */}
              <div className="font-editorial text-sm leading-relaxed text-gray-800 space-y-4 pt-2">
                <p className="first-letter:text-3xl first-letter:font-black first-letter:text-blue-800 first-letter:float-left first-letter:mr-2">
                  {selected.body}
                </p>
              </div>

              <div className="paper-divider"></div>

              {/* Warning note */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 text-xs text-yellow-800 rounded-sm">
                <p className="font-bold flex items-center gap-1.5 font-editorial">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  Instrucción Técnica Obligatoria:
                </p>
                <p className="mt-1 leading-relaxed">
                  Las directivas con prioridad alta deben ser difundidas en las próximas juntas operativas operacionales de cada patio o planta logística.
                </p>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 text-gray-400 text-xs font-mono">
              Por favor, selecciona un comunicado para visualizar la nota editorial correspondiente.
            </div>
          )}
        </section>

        {/* COLUMN 3: SIDEBAR WIDGETS & SUBSCRIBE */}
        <aside className="space-y-4">
          
          {/* CRITICAL ALERTS BANNER */}
          <div className="bg-white border border-gray-300 p-4 space-y-3 rounded-sm shadow-sm">
            <div className="flex items-center gap-2 text-rose-800 font-bold border-b border-gray-200 pb-2">
              <ShieldAlert className="h-4 w-4" />
              <h4 className="text-xs uppercase font-editorial">Foco del Día</h4>
            </div>
            
            <div className="space-y-2">
              {featured.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectAnnouncement(item.id, item.category)}
                  className="w-full text-left p-3 border border-gray-200 hover:bg-gray-50 bg-white transition flex flex-col justify-between cursor-pointer"
                >
                  <p className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug">
                    {item.title}
                  </p>
                  <span className="text-[9px] font-mono text-gray-500 mt-2 block">{item.date}</span>
                </button>
              ))}
            </div>
          </div>

          {/* NEWSLETTER FORM */}
          <div className="bg-white border border-gray-300 p-4 space-y-4 rounded-sm shadow-sm">
            <div className="border-b border-gray-200 pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 font-editorial">
                Suscripción Editorial
              </h4>
              <p className="text-[10px] text-gray-500">Recibe boletines de incidentes por correo.</p>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-600 uppercase tracking-wider px-1">
                  Nombre Completo
                </label>
                <input
                  className="input-news text-xs"
                  placeholder="Ej. Cástulo Obregón"
                  value={subscription.name}
                  onChange={(e) => setSubscription((current) => ({ ...current, name: e.target.value }))}
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-600 uppercase tracking-wider px-1">
                  Email Corporativo
                </label>
                <input
                  type="email"
                  className="input-news text-xs"
                  placeholder="castulo@rutasigma.com"
                  value={subscription.email}
                  onChange={(e) => setSubscription((current) => ({ ...current, email: e.target.value }))}
                />
              </div>

              {message && (
                <p className="text-[10px] font-mono text-blue-800 font-bold border-t border-gray-150 pt-2">
                  {message}
                </p>
              )}

              <button
                type="button"
                onClick={submitSubscription}
                className="w-full btn-news text-xs py-2"
              >
                {loading ? 'Procesando...' : (
                  <>
                    <Send size={12} />
                    <span>Suscribirse al Boletín</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </aside>

      </main>

      <footer className="py-8 text-center text-sm border-t" style={{ borderColor: 'rgba(0,0,0,0.06)', backgroundColor: '#fff', marginTop: 40 }}>
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p style={{ color: 'var(--hl-muted)' }}>&copy; {new Date().getFullYear()} RutaSigma Logística. Todos los derechos reservados.</p>
          <div className="footer-dev">
            <span>Desarrollado por</span>
            <a href="https://jose-socola-jdss.github.io/blyp/" className="footer-logo-link" aria-label="Ir a Blyp">
              <img src="./blyp_logotipo.svg" alt="Blyp Logo" className="footer-logo" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
