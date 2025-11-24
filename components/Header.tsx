"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
//? significa que es opcional, tenemos que asignal un default
type Props = {
  showLoginButton: boolean;
  showSignUpButton?: boolean;
};

//aquí asignamos el default para showSignUpButton que es true
export default function Header({
  showLoginButton = true,
  showSignUpButton = true,
}: Props) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-slate-950/70 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6">
        <div className="font-bold text-lg tracking-tight">
          Acme<span className="text-emerald-400">.io</span>
        </div>
        <nav className="ml-auto hidden md:flex gap-6 text-sm text-slate-300">
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
        <div className="ml-6">
          {showLoginButton && (
            <Link
              href="/log-in"
              className="inline-flex items-center rounded-xl  hover:bg-emerald-400 hover:text-slate-900 text-white font-semibold px-4 py-2 text-sm"
            >
              Iniciar sesión
            </Link>
          )}
          {showSignUpButton && (
            <Link
              href="/sign-up"
              className="ml-1 inline-flex items-center rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold px-4 py-2 text-sm"
            >
              Registrate
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
