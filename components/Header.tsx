'use client';
import { useStateContext } from '@/context/stateContext';
import Image from 'next/image';
import React from 'react';

const Header = () => {
  const { selectedImage, businessName, businessSlogan }: any =
    useStateContext();
  return (
    <div>
      <div className='flex w-full items-center justify-between gap-x-4 mb-0.5'>
        {/* Logo */}
        <div>
          <Image
            src={
              selectedImage !== undefined || null
                ? URL.createObjectURL(selectedImage[0])
                : 'next.svg'
            }
            alt='logo'
            width='70'
            height='70'
           
          />
        </div>
        {/* Brand Name */}
        <div className='flex-end'>
          <h2 className='text-4xl font-bold tracking-widest uppercase text-[#0048a7]'>
            {businessName !== '' ? businessName : 'Your Business Name'}
          </h2>
          {/* <h2 className='text-2xl font-bold tracking-widest uppercase'>
            Spares <span>plus</span>
          </h2> */}
        </div>
      </div>
      <hr className='border-2 border-gray-700' />
      {/* Tagline */}
      <p className='text-[#0048a7]'>
        {businessSlogan !== '' ? businessSlogan : 'Your BusinessSlogan'}
        {/* <span className='text-sm'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab.
        </span> */}
      </p>
    </div>
  );
};

export default Header;
