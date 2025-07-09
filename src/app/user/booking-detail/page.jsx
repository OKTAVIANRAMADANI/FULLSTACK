'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/user/Navbar2/Navbar';
import Footer from '@/components/user/Footer/Footer';
import './BookingDetail.css';

export default function BookingDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const kamar = searchParams.get('kamar') || 'Tidak diketahui';
    const img = searchParams.get('img') || '/images/default.jpg';
    const checkin = searchParams.get('checkin');
    const checkout = searchParams.get('checkout');
    const orang = searchParams.get('orang') || '1';
    const namaKontak = searchParams.get('namaKontak') || '-';
    const noHp = searchParams.get('noHp') || '-';
    const email = searchParams.get('email') || '-';
    const namaTamu = searchParams.get('namaTamu') || '-';
    const permintaan = searchParams.get('permintaan') || '-';

    setData({
      kamar,
      img,
      checkin,
      checkout,
      orang,
      namaKontak,
      noHp,
      email,
      namaTamu,
      permintaan,
    });
  }, [searchParams]);

  if (!data) return <div>Loading...</div>;

  const checkInDate = new Date(data.checkin);
  const checkOutDate = new Date(data.checkout);
  const validDate = !isNaN(checkInDate.getTime()) && !isNaN(checkOutDate.getTime());

  const nights = validDate
    ? Math.max(1, Math.floor((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)))
    : 0;

  const hargaPerMalam = 150000 + Math.floor((nights * 150000) * 0.05);
  const totalHarga = hargaPerMalam * nights;

  const handleBayar = () => {
    const query = new URLSearchParams({
      kamar: data.kamar,
      checkin: data.checkin || '',
      checkout: data.checkout || '',
      nama: data.namaKontak,
      total: totalHarga.toString(),
    }).toString();

    router.push(`/user/payment?${query}`);
  };

  return (
    <div className="booking-page">
      <Navbar />
      <div className="card-booking">
        <div className="left">
          <img src={data.img} alt="kamar" className="room-img" />
          <p className="room-name"><strong>{data.kamar}</strong></p>
          <p className="room-info">Fan, TV, Kamar Mandi, Coffee Morning</p>

          <hr />
          <table>
            <tbody>
              <tr>
                <td>Check-in</td>
                <td><strong>{validDate ? checkInDate.toLocaleDateString('id-ID') : '-'}</strong></td>
              </tr>
              <tr>
                <td>Check-out</td>
                <td><strong>{validDate ? checkOutDate.toLocaleDateString('id-ID') : '-'}</strong></td>
              </tr>
              <tr><td>Jumlah Malam</td><td><strong>{nights}</strong></td></tr>
              <tr><td>Jumlah Orang</td><td><strong>{data.orang}</strong></td></tr>
            </tbody>
          </table>

          <hr />
          <table>
            <tbody>
              <tr><td>Nama Pemesan</td><td>{data.namaKontak}</td></tr>
              <tr><td>No HP</td><td>{data.noHp}</td></tr>
              <tr><td>Email</td><td>{data.email}</td></tr>
              <tr><td>Nama Tamu</td><td>{data.namaTamu}</td></tr>
              <tr><td>Pesan Tambahan</td><td>{data.permintaan}</td></tr>
            </tbody>
          </table>
        </div>

        <div className="right">
          <h3 className="price-title">Rincian Harga</h3>
          <hr />
          {validDate && nights > 0 ? (
            [...Array(nights)].map((_, i) => {
              const tanggal = new Date(checkInDate.getTime() + i * 86400000);
              return (
                <p key={i}>
                  {tanggal.toLocaleDateString('id-ID')} (1 Kamar): Rp {hargaPerMalam.toLocaleString('id-ID')}
                </p>
              );
            })
          ) : (
            <p>Tanggal tidak valid</p>
          )}
          <hr />
          <p><strong>Total Tagihan: Rp {totalHarga.toLocaleString('id-ID')}</strong></p>
          <button onClick={handleBayar} className="btn-bayar">
            Lanjut ke Pembayaran
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
