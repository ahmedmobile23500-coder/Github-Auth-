"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <p className="text-gray-600 mb-6">
          Email:{" "}
          <span className="font-semibold">
            {session?.user?.email}
          </span>
        </p>

        <button
          onClick={handleLogout}
          className="w-full rounded-lg bg-red-600 py-2.5 font-semibold text-white transition hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}