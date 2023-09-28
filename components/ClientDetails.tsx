'use client';

import React from 'react';
import { useStateContext } from '@/context/stateContext';

const ClientDetails = () => {
  const { invoiceTo, clientAddress, clientContact, invoiceDate }: any =
    useStateContext();
  const dateString = invoiceDate;
  // const dateString = '2023-09-25';
  const parts = dateString.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  return (
    <div className='flex w-full items-center justify-between gap-4 mt-4'>
      <div className='flex-1'>
        <div className='flex border-t border-x border-[#0048a7] h-8'>
          <div className='bg-[#0048a7] w-[100px] px-3 text-white font-bold uppercase text-[9px]'>
            <p className='text-white'>Invoice To</p>
          </div>
          <div className='px-2'>
            <p>{invoiceTo !== '' && invoiceTo}</p>
          </div>
        </div>
        <div className='flex border-t border-x border-[#0048a7] h-8'>
          <div className='bg-[#0048a7] w-[100px] px-3 text-white font-bold uppercase text-[9px]'>
            <p className='text-white'>Tel</p>
          </div>
          <div className='px-2'>
            <p>{clientContact !== '' && clientContact}</p>
          </div>
        </div>
        <div className='flex border border-[#0048a7] h-8'>
          <div className='bg-[#0048a7] w-[100px] px-3 text-white font-bold uppercase text-[9px]'>
            <p className='text-white'>Address</p>
          </div>
          <div className='px-2'>
            <p>{clientAddress !== '' && clientAddress}</p>
          </div>
        </div>
      </div>
      <article className='flex items-center gap-2 text-center text-sm'>
        <div className='border border-[#0048a7]'>
          <h4 className='bg-[#0048a7] p-1 text-white font-bold text-[9px]'>
            Day
          </h4>
          <p className='p-1'>{day}</p>
        </div>
        <div className='border border-[#0048a7]'>
          <h4 className='bg-[#0048a7] p-1 text-white font-bold text-[9px]'>
            Month
          </h4>
          <p className='p-1'>{month}</p>
        </div>
        <div className='border border-[#0048a7]'>
          <h4 className='bg-[#0048a7] p-1 text-white font-bold text-[9px]'>
            Year
          </h4>
          <p className='p-1'>{year}</p>
        </div>
      </article>
    </div>
  );
};

export default ClientDetails;
