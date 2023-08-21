import Card1 from '@/assets/Cards/1.png'
import Iconify from '@/components/Iconify'
import { Link } from 'react-router-dom'
import Chapter from '@/components/Chapter'
import { useEffect, useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import Tag from '@/components/Tag'


function StatisticButton() {
  return <Link to={"/"} className='text-sm font-bold bg-slate-200 px-2 py-1 rounded-sm'>Ken</Link>
}

export default function Book() {
  const { setIsScrolled } = useTheme();

  const handleScroll = () => {
    console.log(window.scrollY)
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <div className='relative pt-8'>
      {/* Background image */}
      <div
        className={`fixed h-[640px] w-full bg-[url('https://mangadex.org/covers/1cec4f31-88a7-48c0-987e-9697afc27f67/5784b5bf-d04e-4f9d-b8e0-6251fa27a768.png.512.jpg')] bg-no-repeat bg-cover -top-[69px] -left-4 z-[-2] blur-sm`}
      >
      </div>

      {/* Gradient background container */}
      <div className='absolute h-[640px] w-full bg-gradient-to-l from-transparent to-[#000000] -top-[69px] -left-4 z-[-1]'></div>

      {/* Book details */}
      <div className='flex z-10'>
        {/* Book cover */}
        <div className='absolute flex-shrink-0 bg-white rounded-lg left-10'><img src={Card1} className='w-52 h-auto rounded-lg object-contain' /></div>

        {/* Details */}
        <div className='h-full'>
          {/* book's title, alt title and author */}
          <div className='pl-72 pb-4'>
            <div>
              <h1 className='text-5xl font-bold text-white'>That Time I Got Reincarnated With Talent ~I'll Work Hard Even if I Go to Another World~</h1>
              <p className='text-xl text-white pb-14'>転生したら才能があった件～異世界行っても努力する～</p>
            </div>
            <p className='text-md text-white'>Takehana Note, パクパク, Ken</p>
          </div>

          {/* utility buttons */}
          <div className='bg-white pl-72 pt-2'>
            <div className='mt-4 flex gap-2 '>
              <button className='bg-primary text-white px-10 py-3 rounded-md'>Add to Library</button>
              <button className='bg-slate-200 text-white px-3 py-3 rounded-md'><Iconify icon="iconamoon:star-light" width={20} color='#000000' /></button>
              <button className='bg-slate-200 text-black px-6 py-3 rounded-md'>Add to list</button>
              <button className='bg-slate-200 text-black px-6 py-3 rounded-md'>Start reading</button>
            </div>

            {/* book's tags */}
            <div className='mt-4 flex gap-2 items-center'>
              <Tag />
              <Tag />
              <Tag />
              <Tag />
              <Tag />
              <span className='text-xs font-bold px-1 uppercase flex items-center'><Iconify icon="icon-park-outline:dot" width={20} className='inline' color='#04d000' />PUBLICATION: 2023, ONGOING</span>
            </div>

            {/* books statistic */}
            <div className='pt-4 flex gap-2 items-center'>
              <span className='px-1 flex items-center text-primary'><Iconify icon="iconamoon:star-light" width={20} className='text-primary inline pr-1' />7.53</span>
              <span className='px-1 flex items-center text-black'><Iconify icon="material-symbols:bookmark-outline" width={20} className='text-black inline pr-1' />5,902</span>
              <span className='px-1 flex items-center text-black'><Iconify icon="majesticons:comment-line" width={20} className='text-black inline pr-1' />3</span>
              <span className='px-1 flex items-center text-black'><Iconify icon="ph:eye" width={20} className='text-black inline pr-1' />N/A</span>
            </div>
          </div>
        </div>
      </div>
      <p className='pt-4 px-8 bg-white'>
        A ronin (NEET) student, despite his efforts yielding no rewards, suddenly found himself in a different world when he tried to stop a robber, along with a female convenience store clerk. He sought a talent that would be granted only through earnest efforts from a deity and was gifted the skills of 【Innate Talent】, enabling him to outgrow others consistently, and 【Clairvoyance】, which lets him appraise people and items. However, he needs three times the usual experience points for leveling up. Reborn as Mars, the second son of a viscount family, he diligently improves his stats. But near the town, signs of a monster stampede are emerging... Thus begins an otherworldly reincarnation effort fantasy!
      </p>
      <div className='grid grid-cols-3 gap-4 p-8 bg-white'>
        {/* statistic */}
        <div className=''>
          <span className='font-bold text-lg'>Author</span>
          <div className='flex gap-2 items-center mt-2 mb-4'>
            <StatisticButton />
            <StatisticButton />
            <StatisticButton />
          </div>
          <span className='font-bold text-lg'>Author</span>
          <div className='flex gap-2 items-center mt-2 mb-4'>
            <StatisticButton />
            <StatisticButton />
            <StatisticButton />
          </div>
          <span className='font-bold text-lg'>Author</span>
          <div className='flex gap-2 items-center mt-2 mb-4'>
            <StatisticButton />
            <StatisticButton />
            <StatisticButton />
          </div>
          <span className='font-bold text-lg'>Author</span>
          <div className='flex gap-2 items-center mt-2 mb-4'>
            <StatisticButton />
            <StatisticButton />
            <StatisticButton />
          </div>
          <span className='font-bold text-lg'>Alternative Title</span>
          <div className='flex gap-2 items-center mt-2 mb-4'>
            <StatisticButton />
            <StatisticButton />
            <StatisticButton />
          </div>
        </div>

        {/*chapter list */}
        <div className='col-span-2'>
          <div className='flex justify-between'>
            <button className='bg-slate-200 py-1 px-3 rounded-md'>Descending</button>
            <div>
              <button className='bg-slate-200 py-1 px-3 rounded-md mr-2'>Descending</button>
              <button className='bg-slate-200 py-1 px-3 rounded-md'>Descending</button>
            </div>
          </div>
          <div>
            <Chapter />
            <Chapter />
            <Chapter />
            <Chapter />
          </div>
        </div>
      </div>
    </div>
  )
}
