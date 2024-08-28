import Header from '@/components/Header/Header';
import SideNavBar from '../components/shared/SideNavBar';

export default function Home() {
  return (
    <>
      <Header />
      <main className='flex'>
        <SideNavBar />
      </main>
    </>
  );
}
