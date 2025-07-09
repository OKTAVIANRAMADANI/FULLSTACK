'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/user/Navbar2/Navbar';
import Footer from '@/components/user/Footer/Footer';
import './BookingForm.css';

export default function BookingForm() {
  const [form, setForm] = useState({
    namaKontak: '',
    noHp: '',
    email: '',
    namaTamu: '',
    permintaan: '',
    setuju: false,
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  // Ambil parameter dari halaman sebelumnya
  const kamar = searchParams.get('kamar') || 'Tidak Diketahui';
  const img = searchParams.get('img') || '/images/default.jpg';
  const checkin = searchParams.get('checkin') || '';
  const checkout = searchParams.get('checkout') || '';
  const orang = searchParams.get('orang') || '1';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.setuju) {
      alert('Silakan setujui syarat dan ketentuan.');
      return;
    }

    const queryString = new URLSearchParams({
      kamar,
      img,
      checkin,
      checkout,
      orang,
      namaKontak: form.namaKontak,
      noHp: form.noHp,
      email: form.email,
      namaTamu: form.namaTamu,
      permintaan: form.permintaan || '',
    }).toString();

    router.push(`/user/booking-detail?${queryString}`);
  };

  return (
    <>
      <Navbar />
      <div className="page">
        <form className="form" onSubmit={handleSubmit}>
          <p className="info">
            Silakan masukkan pemesanan anda melalui formulir pemesanan di bawah ini.
            Pastikan terisi dengan benar supaya memudahkan proses pemesanan kamar
          </p>

          <label>Nama Pemesanan</label>
          <input
            type="text"
            placeholder="Masukan Nama Anda"
            name="namaKontak"
            value={form.namaKontak}
            onChange={handleChange}
            required
          />

          <label>Nomor Handphone</label>
          <input
            type="text"
            placeholder="082***"
            name="noHp"
            value={form.noHp}
            onChange={handleChange}
            required
          />

          <label>Email Kontak</label>
          <input
            type="email"
            placeholder="Masukan Email Anda"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Nama Tamu</label>
          <input
            type="text"
            placeholder="Masukan Nama Tamu Anda"
            name="namaTamu"
            value={form.namaTamu}
            onChange={handleChange}
            required
          />

          <label>Permintaan Khusus (Optional)</label>
          <textarea
            name="permintaan"
            placeholder="Masukan Permintaan Khusus"
            rows={3}
            value={form.permintaan}
            onChange={handleChange}
          />

          <div className="checkbox">
            <input
              type="checkbox"
              name="setuju"
              checked={form.setuju}
              onChange={handleChange}
              id="setuju"
            />
            <label htmlFor="setuju">
              Saya telah membaca dan menyetujui Syarat dan Ketentuan yang berlaku.
            </label>
          </div>

          <button type="submit" className="button">
            Lanjutkan Pemesanan
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
