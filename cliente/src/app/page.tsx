'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NextPage } from 'next';

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/pages/home');
  }, []);

  return (
    <>
    
    </>
  );
};

export default Home;