"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, configureAuthPersistence } from "@/lib/firebase-client";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Header from "@/components/Header";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("demo@clase.dev");
  const [password, setPassword] = useState("12345678");
  const [confirm, setConfirm] = useState("12345678");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const router = useRouter();

  async function sessionLogin() {
    const user = auth.currentUser;
    const idToken = await user?.getIdToken(true);
    if (!idToken) throw new Error("No idToken");

    const res = await fetch("/api/sessionLogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken, remember }),
    });

    if (!res.ok) {
      let msg = "No se pudo crear la sesión";
      try {
        const j = await res.json();
        if (j?.error) msg = j.error;
      } catch {
        // ignore
      }
      throw new Error(msg);
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);

    if (password !== confirm) {
      setErr("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      await configureAuthPersistence(remember);
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }
      await sessionLogin();
      router.push("/dashboard");
      router.refresh();
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErr(e?.message ?? "Error al registrar");
      }else{
        setErr("Error al registrar desconocido");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />

      <section className="relative overflow-hidden min-h-[calc(100vh-4rem)]">
        {/* Fondo con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-sky-500/5 to-fuchsia-500/10 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Lado izquierdo: texto */}
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Crea tu cuenta
              </h1>
              <p className="mt-5 text-slate-300 text-lg">
                Mismo look &amp; feel que tu landing, listo para producción.
              </p>
            </div>

            {/* Lado derecho: tarjeta de registro */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <header className="mb-6 text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-400/40 mb-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-emerald-400"
                    fill="currentColor"
                  >
                    <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-5.33 0-8 2.67-8 6v1h16v-1c0-3.33-2.67-6-8-6Z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold">Registro</h2>
              </header>

              <form onSubmit={onSubmit} className="space-y-4">
                {/* Nombre */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-200">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    required
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-200">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@dominio.com"
                    autoComplete="email"
                    required
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Contraseña */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-200">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Confirmar contraseña */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-200">
                    Confirmar contraseña
                  </label>
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="********"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Recordarme */}
                <label className="inline-flex items-center gap-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-900"
                  />
                  Recordarme
                </label>

                {/* Error */}
                {err && (
                  <p className="rounded-xl bg-red-500/10 border border-red-500/30 p-2 text-sm text-red-200">
                    {err}
                  </p>
                )}

                {/* Botón registrar */}
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold px-4 py-2 disabled:opacity-60 transition"
                >
                  {loading ? "Creando..." : "Crear cuenta"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-400">
                ¿Ya tienes cuenta?{" "}
                <Link
                  href="/login"
                  className="text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </div>

        <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-400">
          Hecho con ❤️ para la clase de Programación Web
        </footer>
      </section>
    </>
  );
}
