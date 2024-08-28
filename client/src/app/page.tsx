import Header from './components/Header';
import SideNavBar from './components/SideNavBar';

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
