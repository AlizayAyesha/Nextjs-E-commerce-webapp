'use client';

import { useRouter } from 'next/navigation';
import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const router = useRouter();

  const onContinueShopping = () => {
    router.push('/');
  };

  return (
    <>
      <Navbar />
      <Header onContinueShopping={onContinueShopping} />
      {children}
      <Footer />
    </>
  );
}
