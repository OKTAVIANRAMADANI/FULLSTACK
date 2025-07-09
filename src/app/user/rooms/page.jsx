'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInDays } from 'date-fns';
import { useRouter } from 'next/navigation';

import Navbar from '@/components/user/Navbar2/Navbar';
import Footer from '@/components/user/Footer/Footer';
import styles from './rooms.module.css';

const roomsData = [
  {
    name: 'Single Room',
    image: '/images/kamar 1.jpg',
    facilities: ['1 Bed', '1 Bathroom', '1-2 People'],
    features: ['Breakfast', 'Cable TV', 'Streaming device'],
    price: 500000,
  },
  {
    name: 'Double Room',
    image: '/images/kamar 2.jpg',
    facilities: ['2 Beds', '1 Bathroom', '2-4 People'],
    features: ['Breakfast', 'Cable TV', 'Streaming device'],
    price: 500000,
  },
  {
    name: 'Premium Room',
    image: '/images/kamar 1.jpg',
    facilities: ['2 Beds', '1 Bathroom', '2-3 People'],
    features: ['Breakfast', 'Cable TV', 'Streaming device'],
    price: 500000,
  },
  {
    name: 'Single Room Class Elite',
    image: '/images/kamar 3.jpg',
    facilities: ['1 Bed', '1 Bathroom', '1-2 People'],
    features: ['Breakfast', 'Cable TV', 'Streaming device'],
    price: 500000,
  },
  {
    name: 'Private Room',
    image: '/images/kamar 1.jpg',
    facilities: ['1 Bed', '1 Bathroom', '1-2 People'],
    features: ['Breakfast', 'Cable TV', 'Streaming device'],
    price: 500000,
  },
];

export default function RoomsPage() {
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const router = useRouter();

  const dayCount = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;

  const calculateTotal = (basePrice) => {
    const subtotal = basePrice * dayCount * guests;
    const tax = subtotal * 0.05;
    return subtotal + tax;
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className="page">
        <header className={styles.header}>
          <h2>Detail kamar dengan opsi booking</h2>
        </header>

        {/* Filter bar */}
        <div className={styles.filterBar}>
          <div className={styles.filterItem}>
            <span>📅</span>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              placeholderText="Check-in"
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              className={styles.datePicker}
            />
            <span>→</span>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              placeholderText="Check-out"
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={checkIn}
              className={styles.datePicker}
            />
          </div>

          <div className={styles.filterItem}>
            <span>👥</span>
            <span>Orang</span>
            <button onClick={() => setGuests((g) => Math.max(1, g - 1))}>−</button>
            <span>{guests}</span>
            <button onClick={() => setGuests((g) => g + 1)}>+</button>
          </div>
        </div>

        {/* Room cards */}
        <main className={styles.roomList}>
          {roomsData.map((room, index) => (
            <div key={index} className={styles.card}>
              <img src={room.image} alt={room.name} className={styles.image} />
              <div className={styles.info}>
                <h3>{room.name}</h3>
                <p className={styles.facilities}>
                  {room.facilities.join(' | ')}
                </p>
                <ul className={styles.features}>
                  {room.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.priceBox}>
                <p className={styles.price}>
                  Harga per malam: Rp {room.price.toLocaleString('id-ID')}
                </p>
                <p className={styles.total}>
                  Total: Rp {dayCount > 0 ? calculateTotal(room.price).toLocaleString('id-ID') : '0'}
                </p>
                <button
                  className={styles.bookBtn}
                  disabled={!checkIn || !checkOut}
                  onClick={() => {
                    const query = new URLSearchParams({
                      kamar: room.name,
                      img: room.image,
                      checkin: checkIn?.toISOString() || '',
                      checkout: checkOut?.toISOString() || '',
                      orang: guests.toString(),
                    }).toString();

                    router.push(`/user/bookings-form?${query}`);
                  }}
                >
                  Tersedia Lengkap
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>

      <Footer />
    </div>
  );
}
