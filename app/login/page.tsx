"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, configureAuthPersistence } from "@/lib/firebase-client";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Header from "@/components/Header";

export default function LoginPage() {
  const [email, setEmail] = useState("demo@clase.dev");
  const [password, setPassword] = useState("12345678");
  const [remember, setRemember] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const router = useRouter();
  const sp = useSearchParams();
  const redirectTo = sp.get("redirectTo") ?? "/dashboard";

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

  async function onEmailPass(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await configureAuthPersistence(remember);
      await signInWithEmailAndPassword(auth, email, password);
      await sessionLogin();
      router.push(redirectTo);
      router.refresh();
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErr(e?.message ?? "Error al iniciar sesión");
      }else{
        setErr("Error al iniciar sesión desconocido");
      }
    } finally {
      setLoading(false);
    }
  }

  async function onGoogle() {
    setErr(null);
    setLoading(true);
    try {
      await configureAuthPersistence(remember);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      await sessionLogin();
      router.push(redirectTo);
      router.refresh();
    } catch (e: any) {
      setErr(e?.message ?? "Error con Google");
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
                Entra a tu <span className="text-emerald-400">panel</span>
              </h1>
              <p className="mt-5 text-slate-300 text-lg">
                Autenticación con Firebase y cookies httpOnly para SSR.
              </p>
            </div>

            {/* Lado derecho: tarjeta de login */}
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
                <h2 className="text-2xl font-semibold">Iniciar sesión</h2>
              </header>

              <form onSubmit={onEmailPass} className="space-y-4">
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
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="********"
                      autoComplete="current-password"
                      required
                      minLength={8}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 pr-16 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
                    >
                      {showPass ? "Ocultar" : "Mostrar"}
                    </button>
                  </div>
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

                {/* Botón principal */}
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold px-4 py-2 disabled:opacity-60 transition"
                >
                  {loading ? "Entrando..." : "Entrar"}
                </button>
              </form>

              {/* Separador */}
              <div className="my-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-800" />
                <span className="text-xs text-slate-400">o</span>
                <div className="h-px flex-1 bg-slate-800" />
              </div>

              {/* Google */}
              <button
                onClick={onGoogle}
                disabled={loading}
                className="w-full rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900 font-medium text-slate-100 disabled:opacity-60 inline-flex items-center justify-center gap-2 px-4 py-2 transition"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="currentColor"
                >
                  <path d="M21.35 11.1h-9.18v2.98h5.27a4.52 4.52 0 0 1-1.95 2.96 6.06 6.06 0 0 1-3.32.9A6.25 6.25 0 0 1 5.9 11.82a6.25 6.25 0 0 1 6.27-6.25c1.46 0 2.78.5 3.81 1.49l2.09-2.09A9.3 9.3 0 0 0 12.17 2 9.1 9.1 0 0 0 5.7 4.7 9.25 9.25 0 0 0 3 11.82a9.25 9.25 0 0 0 2.7 7.12A9.1 9.1 0 0 0 12.17 22a8.9 8.9 0 0 0 6.08-2.37 6.25 6.25 0 0 0 2.1-4.81c0-.68-.05-1.28-.31-1.72Z" />
                </svg>
                {loading ? "Abriendo Google..." : "Continuar con Google"}
              </button>

              <p className="mt-6 text-center text-sm text-slate-400">
                ¿No tienes cuenta?{" "}
                <Link
                  href="/sign-up"
                  className="text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  Regístrate
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
