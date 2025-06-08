import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <main className=' max-w-[1600px] mx-auto'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
