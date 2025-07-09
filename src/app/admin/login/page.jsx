'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import './adminlogin.css'

export default function AdminLogin() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminAuth', 'true')
      router.push('/admin/dashboard')
    } else {
      alert('Login gagal. Coba cek username dan password.')
    }
  }

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleLogin}>
        <h2 className="admin-login-title">Login Admin</h2>

        <input
          type="text"
          placeholder="Username"
          className="admin-login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="admin-login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="admin-login-button">
          Masuk
        </button>
      </form>
    </div>
  )
}