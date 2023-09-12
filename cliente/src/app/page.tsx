'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const Home= () => {
  const { push } = useRouter();

  useEffect(() => {
     push('/pages/home');
  }, []);
  return <p></p>;
};