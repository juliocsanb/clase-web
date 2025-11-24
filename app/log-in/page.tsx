'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';
import { useRouter } from 'next/navigation';

type ToastState = 'error' | 'ok';

function showToast(msg: string, state: ToastState) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('hidden');
  el.classList.toggle('bg-error', state === 'error');
  el.classList.toggle('bg-ok', state === 'ok');
  window.setTimeout(() => el.classList.add('hidden'), 5200);
}

function mapAuthError(code?: string): string {
  switch (code) {
    case 'auth/invalid-email':         return 'Correo inválido.';
    case 'auth/user-disabled':         return 'Usuario deshabilitado.';
    case 'auth/user-not-found':        return 'Usuario no encontrado.';
    case 'auth/wrong-password':        return 'Contraseña incorrecta.';
    case 'auth/too-many-requests':     return 'Demasiados intentos. Intenta más tarde.';
    case 'auth/network-request-failed':return 'Error de red. Revisa tu conexión.';
    case 'auth/internal-error':        return 'Error interno. Intenta de nuevo.';
    default:                           return 'No se pudo iniciar sesión.';
  }
}

export default function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const email = (form.elements.namedItem('email') as HTMLInputElement | null)?.value.trim() ?? '';
    const password = (form.elements.namedItem('password') as HTMLInputElement | null)?.value ?? '';

    if (!email || !password) {
      showToast('Completa correo y contraseña.', 'error');
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      showToast('Sesión iniciada.', 'ok');
      // Ejemplo de redirección (si la quisieras activar):
      // setTimeout(() => router.push('/dashboard'), 600);
    } catch (err) {
      const code = (err as { code?: string })?.code;
      showToast(mapAuthError(code), 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-4">
      <header className="sticky top-0 z-50 border-b border-border backdrop-blur bg-[rgba(15,15,25,0.6)]">
        <div className="max-w-5xl mx-auto py-3 px-4">Examen Programación Web</div>
      </header>

      <section className="max-w-sm mx-auto mt-10 bg-card rounded-xl shadow-card p-6">
        <h1 data-testid="title" className="text-xl font-semibold mb-4">Iniciar sesión</h1>

        <form data-testid="login-form" onSubmit={onSubmit}>
          <label htmlFor="email" className="block text-sm text-muted mb-1">Correo</label>
          <input
            id="email"
            name="email"
            data-testid="email"
            type="email"
            className="w-full rounded-xl bg-[#0b1223] border border-border px-3 py-2 mb-3 outline-none focus:ring-2 focus:ring-primary/40"
          />

          <label htmlFor="password" className="block text-sm text-muted mb-1">Contraseña</label>
          <input
            id="password"
            name="password"
            data-testid="password"
            type="password"
            className="w-full rounded-xl bg-[#0b1223] border border-border px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-primary/40"
          />

          <button
            data-testid="btn-login"
            disabled={loading}
            className="w-full rounded-xl bg-primary text-white py-2 font-medium hover:opacity-90 active:translate-y-px transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <a
          href="/forgot-password"
          data-testid="link-forgot"
          className="inline-block mt-3 text-sm text-primary hover:underline"
        >
          Olvidé mi contraseña
        </a>
      </section>

      <div
        id="toast"
        data-testid="toast"
        aria-live="polite"
        className="fixed left-1/2 -translate-x-1/2 bottom-4 px-4 py-2 rounded-xl text-white hidden"
      />
    </main>
  );
}
