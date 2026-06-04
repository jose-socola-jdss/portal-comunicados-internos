import { AlertTriangle, BellRing, ChevronRight, Megaphone, Search, ShieldAlert, Sparkles, Send, User, Mail, Star, Tag, Clock } from 'lucide-react';
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

  const categories = ['Todas', ...new Set(announcements.map((item) => item.category))];
  const priorities = ['Todas', ...new Set(announcements.map((item) => item.priority))];

  const filtered = useMemo(() => announcements.filter((item) => {
    const matchesQuery = `${item.title} ${item.body} ${item.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === 'Todas' || item.category === category;
    const matchesPriority = priority === 'Todas' || item.priority === priority;
    return matchesQuery && matchesCategory && matchesPriority;
  }), [query, category, priority]);

  useEffect(() => {
    if (filtered[0]) setSelectedId(filtered[0].id);
  }, [filtered]);

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
    <div className="min-h-screen text-slate-200 selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Ambient command lights */}
      <div className="absolute top-0 right-10 -z-10 h-[500px] w-[500px] rounded-full bg-cyan-600/5 blur-[120px]" />
      <div className="absolute bottom-10 left-10 -z-10 h-[400px] w-[400px] rounded-full bg-blue-600/5 blur-[100px]" />

      {/* COMMAND HEADER */}
      <div className="border-b border-white/5 bg-slate-950/70 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 p-2.5 flex items-center justify-center shadow-lg group">
                <Megaphone className="h-6 w-6 text-slate-950 group-hover:rotate-12 transition-transform" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">RUTASIGMA LOGÍSTICA</p>
                  <span className="text-[9px] tracking-widest font-mono font-bold bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/20 animate-pulse">
                    LIVE FEED
                  </span>
                </div>
                <h1 className="text-2xl font-black text-white">Novedades & Alertas Operacionales</h1>
              </div>
            </div>
            {/* Active Alert Widget */}
            <div className="rounded-2xl border border-rose-500/10 bg-rose-500/5 p-4 shrink-0 flex items-start gap-3 max-w-md">
              <ShieldAlert className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold text-rose-300 uppercase tracking-wide">Directiva Crítica</span>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  Maniobras nocturnas en Apodaca y Bajío requieren check-list y validación radial doble.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CORE WORKSPACE */}
      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[0.95fr_1.1fr_0.75fr]">
        
        {/* COLUMN 1: SEARCH & FILTERS + LIST */}
        <section className="space-y-4">
          <div className="glass rounded-2xl p-4 space-y-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 px-1">
              <Search className="h-3.5 w-3.5 text-cyan-400" /> Buscar Boletines
            </label>
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none focus:border-cyan-400 transition"
              placeholder="Buscar por título, tag o texto..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="grid gap-2 sm:grid-cols-2">
              <select
                className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-xs text-slate-350 outline-none focus:border-cyan-400"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((item) => (
                  <option key={item} value={item} className="bg-slate-950">{item === 'Todas' ? 'Todas las Categorías' : item}</option>
                ))}
              </select>
              <select
                className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-xs text-slate-350 outline-none focus:border-cyan-400"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {priorities.map((item) => (
                  <option key={item} value={item} className="bg-slate-950">{item === 'Todas' ? 'Prioridades' : `Prioridad ${item}`}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="glass rounded-2xl p-10 text-center border-white/5 text-xs font-mono text-slate-500">
                Sin boletines coincidentes para esta búsqueda.
              </div>
            ) : (
              filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition-all duration-300 relative overflow-hidden group ${
                    selectedId === item.id
                      ? 'border-cyan-400/40 bg-slate-900 shadow-md shadow-cyan-950/20'
                      : 'border-white/5 bg-slate-900/40 hover:border-white/10 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <span className="rounded bg-cyan-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cyan-300 border border-cyan-500/10">
                      {item.category}
                    </span>
                    <span className={`text-[9px] font-bold uppercase tracking-wider ${
                      item.priority === 'Alta' ? 'text-rose-400' : item.priority === 'Media' ? 'text-amber-400' : 'text-slate-500'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {item.body}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-[10px] text-slate-500 font-mono border-t border-white/5 pt-2">
                    <span>{item.date}</span>
                    <span className="text-cyan-300 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Ver detalle <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </section>

        {/* COLUMN 2: FULL CONTENT READER */}
        <section className="glass rounded-3xl p-6 border-white/5 shadow-2xl flex flex-col justify-between self-start">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">
                      BOLETÍN // {selected.id}
                    </span>
                    <h2 className="mt-1 text-2xl font-black text-white leading-snug">{selected.title}</h2>
                  </div>
                  <div className="rounded-lg bg-cyan-500/10 p-2.5 text-cyan-400 shrink-0">
                    <Megaphone className="h-6 w-6" />
                  </div>
                </div>

                {/* Meta tags */}
                <div className="flex flex-wrap gap-1.5 text-[9px] font-bold uppercase tracking-wider">
                  <span className="rounded bg-white/5 px-2.5 py-1 text-slate-300 border border-white/5">{selected.category}</span>
                  <span className="rounded bg-white/5 px-2.5 py-1 text-slate-300 border border-white/5">{selected.date}</span>
                  <span className="rounded bg-white/5 px-2.5 py-1 text-slate-300 border border-white/5">Prioridad {selected.priority}</span>
                  {selected.tags.map((tag) => (
                    <span key={tag} className="rounded bg-cyan-500/10 px-2.5 py-1 text-cyan-300 border border-cyan-500/10">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Article body */}
                <article className="rounded-2xl border border-white/5 bg-slate-950 p-5 text-sm leading-relaxed text-slate-300 font-sans shadow-inner">
                  {selected.body}
                </article>

                {/* Safety Reminder Block */}
                <div className="rounded-2xl border border-amber-500/10 bg-amber-500/5 p-4 text-xs text-amber-200">
                  <p className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="h-4.5 w-4.5 text-amber-500" />
                    Recordatorio Operacional:
                  </p>
                  <p className="mt-1.5 leading-relaxed text-slate-400">
                    Los comunicados con prioridad alta deben ser comentados verbalmente en la próxima reunión de arranque de turno de tu nodo logístico.
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs font-mono">
                Selecciona un comunicado para desplegar el contenido completo de las bitácoras.
              </div>
            )}
          </AnimatePresence>
        </section>

        {/* COLUMN 3: FEATURED NEWS & SUBSCRIPTION */}
        <aside className="space-y-4">
          
          {/* FEATURED FEED CARDS */}
          <div className="glass rounded-2xl p-4 flex flex-col gap-4 border-white/5">
            <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-white/5 pb-2">
              <BellRing className="h-4 w-4" />
              <span className="text-[10px] uppercase tracking-wider">Notas Críticas</span>
            </div>
            <div className="space-y-2">
              {featured.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className="w-full rounded-xl bg-slate-950 hover:bg-slate-900 border border-white/5 p-3.5 text-left transition-colors flex flex-col justify-between group"
                >
                  <p className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </p>
                  <span className="text-[9px] font-mono text-slate-500 mt-2 block">{item.date}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SUBSCRIPTION SYSTEM */}
          <div className="glass rounded-2xl p-4 space-y-4 border-white/5">
            <div className="border-b border-white/5 pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Suscripción de Alertas</h4>
              <p className="text-[10px] text-slate-500">Recibe boletines urgentes en tu correo.</p>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-1">Nombre</span>
                <input
                  className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs text-white outline-none focus:border-cyan-400"
                  placeholder="Ej. Cástulo Obregón"
                  value={subscription.name}
                  onChange={(e) => setSubscription((current) => ({ ...current, name: e.target.value }))}
                />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-1">Correo Institucional</span>
                <input
                  type="email"
                  className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs text-white outline-none focus:border-cyan-400"
                  placeholder="castulo@rutasigma.com"
                  value={subscription.email}
                  onChange={(e) => setSubscription((current) => ({ ...current, email: e.target.value }))}
                />
              </div>

              {message && (
                <p className="text-[10px] font-mono text-cyan-300 font-semibold border-t border-white/5 pt-2">
                  {message}
                </p>
              )}

              <button
                type="button"
                onClick={submitSubscription}
                className="w-full rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold py-2 text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                {loading ? 'Suscribiendo...' : (
                  <>
                    <Send className="h-3 w-3" />
                    <span>Guardar Suscripción</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
