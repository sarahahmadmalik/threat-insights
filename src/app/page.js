'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    const role = localStorage.getItem('role');

    if (!isLoggedIn) {
      router.push('/login'); 
    } else if (role) {
      router.push(`/role?${role}/home`); 
    } else {
      router.push('/login');
    }
  }, [router]);

  return null; 
}
