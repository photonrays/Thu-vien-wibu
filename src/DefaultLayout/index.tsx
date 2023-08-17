import React from 'react'
import Header from './Header';
import Sidebar from './Sidebar'
import Footer from './Footer';

type Props = {
  children: React.ReactNode;
  activePage: string;
}


export default function DefaultLayout({ children, activePage }: Props) {
  return (
    <div className='grid grid-cols-12 overflow-hidden'>
      <Sidebar activePage={activePage} />
      <div className='col-span-11 overflow-y-auto h-screen'>
        <Header />
        <div className='p-5'>{children}</div>
        <Footer />
      </div>
    </div>
  );
}
