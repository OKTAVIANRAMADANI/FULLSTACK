'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/user/Navbar2/Navbar';
import Footer from '@/components/user/Footer/Footer';
import './payment.css';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState({});
  const [metode, setMetode] = useState('');

  useEffect(() => {
    const kamar = searchParams.get('kamar');
    const checkin = searchParams.get('checkin');
    const checkout = searchParams.get('checkout');
    const nama = searchParams.get('nama');
    const total = searchParams.get('total');

    setData({ kamar, checkin, checkout, nama, total });
  }, [searchParams]);

  const handleConfirm = () => {
    if (!metode) {
      alert('Silakan pilih metode pembayaran terlebih dahulu.');
      return;
    }

    const query = new URLSearchParams({
      kamar: data.kamar,
      checkin: data.checkin,
      checkout: data.checkout,
      nama: data.nama,
      total: data.total,
      metode, // kirim metode pembayaran juga
    }).toString();

    router.push(`/user/payment-success?${query}`);
  };

  return (
    <div className="payment-page">
      <Navbar />

      <div className="payment-wrapper">
        <div className="payment-left">
          <h3 className="section-title">🏦 Pilih Metode Pembayaran</h3>

          <div className="payment-option">
            <label>
              <input
                type="radio"
                name="metode"
                value="BRI"
                checked={metode === 'BRI'}
                onChange={(e) => setMetode(e.target.value)}
              />
              BRI - 1234567890 (a.n. Hotel Sejuk)
            </label>
          </div>

          <div className="payment-option">
            <label>
              <input
                type="radio"
                name="metode"
                value="BCA"
                checked={metode === 'BCA'}
                onChange={(e) => setMetode(e.target.value)}
              />
              BCA - 9876543210 (a.n. Hotel Sejuk)
            </label>
          </div>

          <div className="payment-option">
            <label>
              <input
                type="radio"
                name="metode"
                value="Mandiri"
                checked={metode === 'Mandiri'}
                onChange={(e) => setMetode(e.target.value)}
              />
              Mandiri - 1122334455 (a.n. Hotel Sejuk)
            </label>
          </div>
        </div>

        <div className="payment-right">
          <h3 className="section-title">🧾 Ringkasan Pemesanan</h3>
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
                <td>Total Tagihan</td>
                <td><strong>Rp {parseInt(data.total || 0).toLocaleString('id-ID')}</strong></td>
              </tr>
            </tbody>
          </table>

          <button className="confirm-button" onClick={handleConfirm}>
            Konfirmasi Pembayaran
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
