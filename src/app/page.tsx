'use client'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-slate-50 text-center px-4">
      <h1 className="text-2xl font-semibold mb-8">
        Selamat datang di sistem reservasi hotel
      </h1>

      <div className="flex gap-6">
        <button
          onClick={() => router.push('/user/login')}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Masuk sebagai Pelanggan
        </button>
        <button
          onClick={() => router.push('/admin/login')}
          className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
        >
          Masuk sebagai Admin
        </button>
      </div>
    </main>
  )
}