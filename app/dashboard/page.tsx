import { getServerUser } from "@/lib/auth-server";
import Header from "@/components/Header";

// Este puede ir antes o después del componente, pero SIEMPRE después de los imports
export const runtime = "nodejs";

export default async function DashboardPage() {
  const user = await getServerUser();

  return (
    <>
      <Header variant="dashboard" />

      <main className="mx-auto max-w-2xl p-6">
        <h1 className="mb-2 text-2xl font-semibold">Dashboard</h1>

        {user ? (
          <>
            <p className="text-gray-300">Bienvenido {user.email ?? user.uid}</p>

            <form
              action="/api/sessionLogout"
              method="POST"
              className="mt-6 inline-block"
            >
              <button className="rounded-xl bg-gray-900 px-4 py-2 text-white hover:bg-black">
                Cerrar sesión
              </button>
            </form>
          </>
        ) : (
          <p className="mt-4 text-red-300">No hay sesión válida.</p>
        )}
      </main>
    </>
  );
}
