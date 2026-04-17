import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { useState } from "react";
import { motion } from "framer-motion";

function IronModel() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      {/* Corps principal */}
      <mesh>
        <boxGeometry args={[1.5, 0.6, 0.8]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Poignée */}
      <mesh position={[0.4, 0.5, 0]}>
        <boxGeometry args={[0.6, 0.2, 0.4]} />
        <meshStandardMaterial color="#111827" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Semelle */}
      <mesh position={[0, -0.38, 0]}>
        <boxGeometry args={[1.55, 0.08, 0.82]} />
        <meshStandardMaterial color="#93c5fd" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Bouton vapeur */}
      <mesh position={[-0.3, 0.35, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
        <meshStandardMaterial color="#60a5fa" metalness={0.5} roughness={0.3} />
      </mesh>
    </Float>
  );
}

const features = [
  {
    title: "Ultra compact",
    desc: "Se glisse facilement dans un sac ou une valise.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
    ),
  },
  {
    title: "Chauffe rapide",
    desc: "Prêt en moins de 30 secondes.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
    ),
  },
  {
    title: "Design premium",
    desc: "Finitions modernes et matériaux robustes.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    ),
  },
];

const specs = [
  { label: "Poids", value: "380 g" },
  { label: "Puissance", value: "1000 W" },
  { label: "Chauffe", value: "< 30 s" },
  { label: "Garantie", value: "2 ans" },
];

export default function App() {
  const [activeFeature, setActiveFeature] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden">

      {/* ── NAVBAR ── */}
      <nav className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <span className="text-xl font-bold tracking-wide">SteamGo</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="#features" className="hover:text-white transition-colors duration-200 cursor-pointer">Fonctionnalités</a>
          <a href="#specs" className="hover:text-white transition-colors duration-200 cursor-pointer">Specs</a>
          <a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">Avis</a>
        </div>
        <button className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-blue-100 transition-colors duration-200 cursor-pointer">
          Acheter — 89 €
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="grid md:grid-cols-2 gap-10 px-8 md:px-12 pt-8 pb-16 items-center min-h-[85vh]">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border border-blue-400/30 bg-blue-500/10 text-blue-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Nouveau — Édition 2025
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
            Le fer à repasser portable
            <br />
            <span className="text-blue-400">nouvelle génération</span>
          </h1>
          <p className="mt-5 text-lg text-gray-300 leading-relaxed max-w-md">
            Compact, puissant et design. Emmenez-le partout et restez impeccable
            en toutes circonstances.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors duration-200 font-semibold cursor-pointer">
              Découvrir
            </button>
            <button className="px-6 py-3 rounded-xl border border-white/30 hover:bg-white/10 transition-colors duration-200 cursor-pointer">
              En savoir plus
            </button>
          </div>

          {/* Specs rapides */}
          <div id="specs" className="mt-10 grid grid-cols-4 gap-4">
            {specs.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl font-bold text-blue-400">{s.value}</p>
                <p className="text-xs text-white/50 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3D MODEL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="h-[500px] w-full rounded-2xl overflow-hidden relative"
          style={{ background: "rgba(0,0,0,0.2)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Glow */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: "#3b82f6" }} />
          </div>
          <Canvas camera={{ position: [2, 2, 4] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 3, 3]} intensity={1.4} color="#ffffff" />
            <directionalLight position={[-2, -1, -2]} intensity={0.6} color="#60a5fa" />
            <pointLight position={[0, 3, 0]} intensity={0.8} color="#3b82f6" />
            <pointLight position={[2, -2, 2]} intensity={0.5} color="#f97316" />
            <IronModel />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
          </Canvas>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/30">
            Glisser pour pivoter
          </p>
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="grid md:grid-cols-3 gap-6 px-8 md:px-12 py-16 border-t border-white/5">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            onHoverStart={() => setActiveFeature(i)}
            onHoverEnd={() => setActiveFeature(null)}
            className="p-6 rounded-2xl border transition-all duration-200 cursor-pointer"
            style={{
              background: activeFeature === i ? "rgba(59,130,246,0.12)" : "rgba(255,255,255,0.04)",
              borderColor: activeFeature === i ? "rgba(59,130,246,0.4)" : "rgba(255,255,255,0.08)",
            }}
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-blue-400" style={{ background: "rgba(59,130,246,0.15)" }}>
              {f.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* ── CTA FOOTER ── */}
      <section className="text-center py-20 px-8 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à voyager impeccable ?</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">Livraison gratuite en 48h. Retours sous 30 jours.</p>
          <button className="px-8 py-4 rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors duration-200 font-bold text-lg cursor-pointer">
            Commander — 89 €
          </button>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-8 py-6 border-t border-white/5 flex items-center justify-between text-xs text-white/30">
        <span>© 2025 SteamGo. Tous droits réservés.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white/60 transition-colors duration-200 cursor-pointer">Confidentialité</a>
          <a href="#" className="hover:text-white/60 transition-colors duration-200 cursor-pointer">CGU</a>
        </div>
      </footer>
    </div>
  );
}
