"use client";

import { useState } from "react";
import Header from "../../components/Header";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase-client";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario creado:", cred.user);
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    } finally {
    }
  }

  const sigupWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log("Usuario Google:", user);
        console.log("Token de acceso:", token);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error en inicio de sesión con Google:", errorCode, errorMessage);
      });
  };

  return (
    <>
      <Header showLoginButton={true} showSignUpButton={false} />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-sky-500/5 to-fuchsia-500/10" />
        <div className="max-w-7xl mx-auto px-4 py-20 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Crea tu cuenta y comienza a construir
              </h1>
              <p className="mt-5 text-slate-300 text-lg">
                Registrate para acceder a todas las funcionalidades y llevar tus
                proyectos al siguiente nivel.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/#features"
                  className="inline-flex items-center rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold px-5 py-3"
                >
                  Ver características
                </a>
                <a
                  href="/#pricing"
                  className="inline-flex items-center rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold px-5 py-3"
                >
                  Planes
                </a>
              </div>
              <div className="mt-6 text-xs text-slate-400">
                Registrate gratis. No se requiere tarjeta de crédito.
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <header className="mb-6 text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-500/20 mb-3">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-emerald-400"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-5.33 0-8 2.67-8 6v1h16v-1c0-3.33-2.67-6-8-6Z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold">Crear cuenta</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Completa los campos para registrarte.
                </p>
              </header>

              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium text-slate-200"
                  >
                    Nombre
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      e.preventDefault();
                      setName(e.target.value);
                    }}
                    placeholder="Tu nombre"
                    required
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-slate-200"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tucorreo@dominio.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      e.preventDefault();
                      setEmail(e.target.value);
                    }}
                    required
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-1 block text-sm font-medium text-slate-200"
                  >
                    Contraseña
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => {
                      e.preventDefault();
                      setPassword(e.target.value);
                    }}
                    required
                    minLength={8}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm"
                    className="mb-1 block text-sm font-medium text-slate-200"
                  >
                    Confirmar contraseña
                  </label>
                  <input
                    id="confirm"
                    name="confirm"
                    type="password"
                    placeholder="********"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => {
                      e.preventDefault();
                      setConfirmPassword(e.target.value);
                    }}
                    required
                    minLength={8}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="inline-flex items-center gap-2 text-slate-300">
                    <input
                      type="checkbox"
                      className="rounded border-slate-700 bg-slate-900"
                      checked={termsAccepted}
                      onChange={(e) => {
                        e.preventDefault();
                        setTermsAccepted(e.target.checked);
                      }}
                    />
                    Acepto términos y privacidad
                  </label>
                  <a href="/login" className="text-slate-300 hover:text-white">
                    ¿Ya tienes cuenta?
                  </a>
                </div>

                <p className="hidden rounded-xl bg-red-500/10 border border-red-500/30 p-2 text-sm text-red-300">
                  Aquí aparecería el mensaje de error.
                </p>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold px-4 py-2"
                >
                  Crear cuenta
                </button>
              </form>

              <div className="my-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-800" />
                <span className="text-xs text-slate-400">o</span>
                <div className="h-px flex-1 bg-slate-800" />
              </div>

              <button
                className="w-full rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/60 px-4 py-2 font-medium text-slate-100 inline-flex items-center justify-center gap-2"
                aria-label="Continuar con Google"
                type="button"
                onClick={() => {
                  sigupWithGoogle();
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M21.35 11.1h-9.18v2.98h5.27a4.52 4.52 0 0 1-1.95 2.96 6.06 6.06 0 0 1-3.32.96 6.06 6.06 0 0 1-4.28-1.78 6.26 6.26 0 0 1-1.76-4.4 6.25 6.25 0 0 1 1.76-4.4 6.06 6.06 0 0 1 4.28-1.78c1.46 0 2.78.5 3.82 1.33l2.1-2.1A9.3 9.3 0 0 0 12.17 2 9.1 9.1 0 0 0 5.7 4.7 9.25 9.25 0 0 0 3 11.82a9.25 9.25 0 0 0 2.7 7.12A9.1 9.1 0 0 0 12.17 22c2.49 0 4.57-.82 6.08-2.37 1.56-1.56 2.41-3.77 2.41-6.42 0-.68-.05-1.28-.31-2.11Z" />
                </svg>
                Continuar con Google
              </button>

              <p className="mt-6 text-center text-sm text-slate-400">
                ¿Necesitas ayuda?{" "}
                <a
                  href="/#faq"
                  className="text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  FAQ
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-400">
        Hecho con Tailwind · © 2025
      </footer>
    </>
  );
}
