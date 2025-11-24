import Header from "../components/Header";

export default function Home() {
  
  return (
    <>
      <Header showLoginButton={true} />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-sky-500/5 to-fuchsia-500/10"></div>
        <div className="max-w-7xl mx-auto px-4 py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                Lanza experiencias web{" "}
                <span className="text-emerald-400">rápidas</span> y{" "}
                <span className="text-emerald-400">pulidas</span>.
              </h1>
              <p className="mt-5 text-slate-300 text-lg">
                Secciones con cards, carrusel de imágenes, y un FAQ accesible.
                Todo listo para personalizar.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  id="cta"
                  href="#features"
                  className="inline-flex items-center rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold px-5 py-3"
                >
                  Ver características
                </a>
                <a
                  href="#carousel"
                  className="inline-flex items-center rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold px-5 py-3"
                >
                  Ver carrusel
                </a>
              </div>
              <div className="mt-6 text-xs text-slate-400">
                Sin frameworks JS, solo Tailwind + un toque de JS vanilla.
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/60">
                  <div className="text-emerald-400 font-semibold">
                    Performance
                  </div>
                  <p className="text-slate-300 text-sm mt-1">
                    Carga veloz y responsive.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/60">
                  <div className="text-emerald-400 font-semibold">
                    Accesibilidad
                  </div>
                  <p className="text-slate-300 text-sm mt-1">
                    FAQ con <code>&lt;details&gt;</code>.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/60">
                  <div className="text-emerald-400 font-semibold">SEO</div>
                  <p className="text-slate-300 text-sm mt-1">
                    Estructura semántica clara.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/60">
                  <div className="text-emerald-400 font-semibold">UI</div>
                  <p className="text-slate-300 text-sm mt-1">
                    Diseño sobrio y moderno.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Características</h2>
          <p className="text-slate-300 mt-2">
            Bloques reutilizables listos para tu producto.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-slate-700 transition">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-emerald-400"
                fill="currentColor"
              >
                <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 14.93V20h-2v-3.07A8.015 8.015 0 0 1 4.07 13H1v-2h3.07A8.015 8.015 0 0 1 11 4.07V1h2v3.07A8.015 8.015 0 0 1 19.93 11H23v2h-3.07A8.015 8.015 0 0 1 13 16.93Z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg">Componentes limpios</h3>
            <p className="text-slate-300 mt-2 text-sm">
              Grids, cards, botones y FAQ semánticos.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-slate-700 transition">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-emerald-400"
                fill="currentColor"
              >
                <path d="M19 3H5a2 2 0 0 0-2 2v10a4 4 0 0 0 4 4h4l3 3 3-3h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg">Carrusel suave</h3>
            <p className="text-slate-300 mt-2 text-sm">
              Desliza con animación y accesible por teclado.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-slate-700 transition">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-emerald-400"
                fill="currentColor"
              >
                <path d="M4 4h16v2H4zm0 7h16v2H4zm0 7h16v2H4z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg">FAQ accesible</h3>
            <p className="text-slate-300 mt-2 text-sm">
              Sin JS, con <code>&lt;summary&gt;</code> y estilos listos.
            </p>
          </article>
        </div>
      </section>

      <section id="carousel" className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Galería</h2>
          <div className="text-slate-400 text-sm">Soporta teclado (←/→)</div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-slate-800">
          <div
            id="slides"
            className="flex transition-transform duration-500 will-change-transform"
          >
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
              alt="Slide 1"
              className="w-full aspect-[16/9] object-cover flex-shrink-0"
            />
            <img
              src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop"
              alt="Slide 2"
              className="w-full aspect-[16/9] object-cover flex-shrink-0"
            />
            <img
              src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop"
              alt="Slide 3"
              className="w-full aspect-[16/9] object-cover flex-shrink-0"
            />
          </div>

          <button
            id="prev"
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-slate-900/70 hover:bg-slate-900 text-white px-3 py-2 rounded-lg"
          >
            ‹
          </button>
          <button
            id="next"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900/70 hover:bg-slate-900 text-white px-3 py-2 rounded-lg"
          >
            ›
          </button>

          <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-2">
            <button
              className="dot h-2 w-2 rounded-full bg-white/40"
              aria-label="Ir al 1"
            ></button>
            <button
              className="dot h-2 w-2 rounded-full bg-white/40"
              aria-label="Ir al 2"
            ></button>
            <button
              className="dot h-2 w-2 rounded-full bg-white/40"
              aria-label="Ir al 3"
            ></button>
          </div>
        </div>
      </section>

      <section id="pricing" className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-center text-3xl md:text-4xl font-bold">Planes</h2>
        <p className="text-center text-slate-300 mt-2 mb-10">
          Escala según tu proyecto.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <h3 className="font-semibold text-lg">Starter</h3>
            <p className="text-3xl font-extrabold mt-2">$0</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>✓ Landing básica</li>
              <li>✓ FAQ</li>
              <li>— Carrusel limitado</li>
            </ul>
            <a
              href="#"
              className="mt-6 inline-flex w-full justify-center rounded-xl bg-slate-800 hover:bg-slate-700 py-2.5"
            >
              Elegir
            </a>
          </div>
          <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/60 p-6 ring-1 ring-emerald-500/20">
            <h3 className="font-semibold text-lg">Pro</h3>
            <p className="text-3xl font-extrabold mt-2">$12</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>✓ Todo Starter</li>
              <li>✓ Carrusel avanzado</li>
              <li>✓ Componentes extras</li>
            </ul>
            <a
              href="#"
              className="mt-6 inline-flex w-full justify-center rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 py-2.5 font-semibold"
            >
              Elegir
            </a>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <h3 className="font-semibold text-lg">Enterprise</h3>
            <p className="text-3xl font-extrabold mt-2">Custom</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>✓ SLA y soporte</li>
              <li>✓ Auditoría</li>
              <li>✓ Integraciones</li>
            </ul>
            <a
              href="#"
              className="mt-6 inline-flex w-full justify-center rounded-xl bg-slate-800 hover:bg-slate-700 py-2.5"
            >
              Contactar
            </a>
          </div>
        </div>
      </section>

      <section id="faq" className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center">Preguntas frecuentes</h2>
        <div className="mt-8 space-y-4">
          <details className="group rounded-xl border border-slate-800 bg-slate-900/50 p-4">
            <summary className="marker:content-none cursor-pointer list-none flex items-center justify-between">
              <span className="font-semibold">
                ¿Puedo cambiar colores y tipografías?
              </span>
              <span className="transition group-open:rotate-180">⌄</span>
            </summary>
            <p className="mt-3 text-slate-300 text-sm">
              Sí, Tailwind facilita tokens y utilidades para ajustar todo
              rápido.
            </p>
          </details>
          <details className="group rounded-xl border border-slate-800 bg-slate-900/50 p-4">
            <summary className="marker:content-none cursor-pointer list-none flex items-center justify-between">
              <span className="font-semibold">¿El carrusel es accesible?</span>
              <span className="transition group-open:rotate-180">⌄</span>
            </summary>
            <p className="mt-3 text-slate-300 text-sm">
              Soporta teclado (←/→) y botones con <code>aria-label</code>.
            </p>
          </details>
          <details className="group rounded-xl border border-slate-800 bg-slate-900/50 p-4">
            <summary className="marker:content-none cursor-pointer list-none flex items-center justify-between">
              <span className="font-semibold">
                ¿Puedo usarlo en producción?
              </span>
              <span className="transition group-open:rotate-180">⌄</span>
            </summary>
            <p className="mt-3 text-slate-300 text-sm">
              Sí, es una base; ajusta SEO, analítica y accesibilidad según tu
              caso.
            </p>
          </details>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-400">
        Hecho con Tailwind · © 2025
      </footer>
    </>
  );
}
