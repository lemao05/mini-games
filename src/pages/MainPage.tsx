import Header from '../components/layout/Header.tsx';
import Footer from '../components/layout/Footer.tsx';
import { Outlet } from 'react-router-dom';
import Alert from '../components/Alert.tsx';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';

export default function MainPage() {
  useEffect(() => {
    getAuth();
  }, []);

  return (
    <>
      <Header />
      <Alert />
      <main className='container mx-auto py-5 flex flex-col items-center grow'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
