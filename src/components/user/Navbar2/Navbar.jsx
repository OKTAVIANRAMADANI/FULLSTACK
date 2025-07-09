'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <button onClick={() => router.back()} className={styles.backBtn}>
        ←
      </button>
      <ul className={styles.menu}>
        <li><Link href="/user/rooms">List Room’s</Link></li>
        <li><Link href="/user/bookings-from">Bookings</Link></li>
        <li><Link href="/user/booking-detail">Rincian Pemesanan</Link></li>
        <li><Link href="/user/payment">Payments</Link></li>
      </ul>
    </nav>
  );
}