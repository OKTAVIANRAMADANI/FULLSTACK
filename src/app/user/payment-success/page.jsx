'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/user/Navbar2/Navbar';
import Footer from '@/components/user/Footer/Footer';
import './payment-success.css';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState({});

  useEffect(() => {
    const kamar = searchParams.get('kamar');
    const checkin = searchParams.get('checkin');
    const checkout = searchParams.get('checkout');
    const nama = searchParams.get('nama');
    const total = searchParams.get('total');
    const metode = searchParams.get('metode');

    setData({ kamar, checkin, checkout, nama, total, metode });
  }, [searchParams]);

  const handleBackHome = () => {
    router.push('/user'); // Sesuaikan dengan rute beranda kamu
  };

  return (
    <div className="success-page">
      <Navbar />

      <div className="success-container">
        <h2 className="success-title">✅ Pembayaran Berhasil!</h2>
        <p className="success-desc">
          Terima kasih, <strong>{data.nama || '-'}</strong>. Pembayaran Anda telah kami terima.
          Berikut adalah detail pemesanan Anda:
        </p>

        <div className="success-box">
          <table>
            <tbody>
              <tr>
                <td>Kamar</td>
                <td><strong>{data.kamar || '-'}</strong></td>
              </tr>
              <tr>
                <td>Check-in</td>
                <td>{data.checkin ? new Date(data.checkin).toLocaleDateString('id-ID') : '-'}</td>
              </tr>
              <tr>
                <td>Check-out</td>
                <td>{data.checkout ? new Date(data.checkout).toLocaleDateString('id-ID') : '-'}</td>
              </tr>
              <tr>
                <td>Nama Pemesan</td>
                <td>{data.nama || '-'}</td>
              </tr>
              <tr>
                <td>Total Dibayar</td>
                <td><strong>Rp {parseInt(data.total || 0).toLocaleString('id-ID')}</strong></td>
              </tr>
              <tr>
                <td>Metode Pembayaran</td>
                <td>{data.metode || '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="thanks">Kami menantikan kedatangan Anda di Hotel Sejuk! 🏨</p>

        <button className="btn-home" onClick={handleBackHome}>
          ⬅️ Kembali ke Beranda
        </button>
      </div>

      <Footer />
    </div>
  );
}
