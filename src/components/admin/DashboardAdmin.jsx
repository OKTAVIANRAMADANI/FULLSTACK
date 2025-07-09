'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import './DashboardAdmin.css' // gunakan CSS biasa, bukan module

export default function DashboardAdmin() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminAuth') === 'true'
    if (!isLoggedIn) router.push('/admin/login')
  }, [router])

  return (
    <div className="container">
      <aside className="sidebar">
        <h2 className="logo">Admin Hotel</h2>
        <nav className="nav">
          <Link href="/admin/dashboard" className="navItem">Dashboard</Link>
          <Link href="/admin/rooms" className="navItem">Kelola Kamar</Link>
          <Link href="/admin/bookings" className="navItem">Lihat Booking</Link>
          <Link href="/admin/payments" className="navItem">Pembayaran</Link>
        </nav>
      </aside>

      <main className="main">
        <h1 className="title">Dashboard Admin</h1>
        <div className="cardGrid">
          <div className="card">
            <h2>20</h2>
            <p>Kamar Tersedia</p>
          </div>
          <div className="card">
            <h2>6</h2>
            <p>Kamar Terpakai</p>
          </div>
          <div className="card">
            <h2>4</h2>
            <p>Kamar Kotor</p>
          </div>
        </div>

        <section className="infoSection">
          <h3>Informasi Hotel</h3>
          <p>Berita / pengumuman internal akan muncul di sini.</p>
        </section>
      </main>
    </div>
  )
}