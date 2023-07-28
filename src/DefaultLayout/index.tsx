import React from 'react'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar'

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
      </div>
    </div>
  );
}
