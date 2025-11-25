"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  // "public" = landing / login / sign-up
  // "dashboard" = panel interno
  variant?: "public" | "dashboard";
};

export default function Header({ variant = "public" }: Props) {
  const router = useRouter();
  const isDashboard = variant === "dashboard";
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/sessionLogout", {
        method: "POST",
      });
      // después de cerrar sesión, mandar al landing
      router.push("/");
      router.refresh();
    } catch (e) {
      console.error("Error al cerrar sesión", e);
      // si quisieras podrías mostrar un toast o algo aquí
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-slate-950/70 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6">
        {/* Logo / nombre */}
        <button
          type="button"
          onClick={() => router.push(isDashboard ? "/dashboard" : "/")}
          className="font-bold text-lg tracking-tight text-white hover:text-emerald-400 transition"
        >
          Panel<span className="text-emerald-400">.dev</span>
        </button>

        {/* NAV izquierda (cambia según variante) */}
        {isDashboard ? (
          <nav className="ml-8 hidden md:flex gap-4 text-sm text-slate-300">
            <Link href="/dashboard" className="hover:text-white">
              Inicio
            </Link>
            <Link href="/dashboard/users" className="hover:text-white">
              Usuarios
            </Link>
            <Link href="/dashboard/categories" className="hover:text-white">
              Categorías
            </Link>
          </nav>
        ) : (
          <nav className="ml-8 hidden md:flex gap-6 text-sm text-slate-300">
            <a href="#features" className="hover:text-white">
              Características
            </a>
            <a href="#pricing" className="hover:text-white">
              Precios
            </a>
            <a href="#faq" className="hover:text-white">
              FAQ
            </a>
          </nav>
        )}

        {/* Zona derecha: auth buttons / logout */}
        <div className="ml-auto flex items-center gap-2">
          {isDashboard ? (
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center rounded-xl bg-slate-900 border border-slate-700 px-4 py-2 text-sm text-slate-100 hover:bg-black hover:border-slate-500 disabled:opacity-60 transition"
            >
              {loggingOut ? "Cerrando..." : "Cerrar sesión"}
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex items-center rounded-xl hover:bg-emerald-400 hover:text-slate-900 text-white font-semibold px-4 py-2 text-sm"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex items-center rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold px-4 py-2 text-sm"
              >
                Regístrate
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
