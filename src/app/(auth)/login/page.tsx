"use client"

import dynamic from "next/dynamic"

const LoginForm = dynamic(() => import("./LoginForm"), {
  ssr: false,
  loading: () => (
    <main className="min-h-screen bg-amber-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-stone-100 bg-white rounded-xl shadow-sm p-8 flex flex-col gap-6 items-center justify-center min-h-[350px]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-800">
            Crumb <span className="text-amber-500">&</span> Co.
          </h1>
          <p className="text-stone-500 text-sm mt-2">Loading...</p>
        </div>
      </div>
    </main>
  ),
})

export default function LoginPage() {
  return <LoginForm />
}
