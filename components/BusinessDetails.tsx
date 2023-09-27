'use client';
import React from 'react';
import { useStateContext } from '@/context/stateContext';
const BusinessDetails = () => {
  const { businessAddress, businessContact, businessEmail }: any =
    useStateContext();

  return (
    <div className='flex w-full items-center justify-between gap-4 mt-2'>
      <h2 className='font-bold text-2xl uppercase text-[#0048a7]'>Invoice</h2>
      {/* Address & contact */}
      <div className='flex flex-col text-sm items-end flex-wrap'>
        <h2 className="text-[#0048a7]">
          {businessAddress !== '' ? businessAddress : 'Your business address'}
          {/* Shop Location <span>Haatso-atomic road GE-296-0647</span> */}
        </h2>
        <ul className='flex'>
          <li className="text-[#0048a7]">
            {businessContact !== '' ? businessContact : 'Your business contact'}
          </li>
        </ul>
        <h2>
          Email:{' '}
          <span className="text-[#0048a7]">
            {businessEmail !== '' ? businessEmail : 'yourbusiness@mail.com'}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default BusinessDetails;
