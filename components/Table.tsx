'use client';
import React from 'react';
import { useStateContext } from '@/context/stateContext';

const Table = () => {
  const { list, amountPaid, total, vat, sumTotal, balance } = useStateContext();
  return (
    <div className='mt-4'>
      <table width='100%' className='mb-10 text-center'>
        <thead>
          <tr className='bg-gray-100 p-1'>
            <td className='font-bold border border-[#0048a7]'>Description</td>
            <td className='font-bold border border-[#0048a7]'>Quantity</td>
            <td className='font-bold border border-[#0048a7]'>Unit Price</td>
            <td className='font-bold border border-[#0048a7]'>Value</td>
          </tr>
        </thead>
        {list.map(({ id, description, quantity, price, amount }: any) => (
          <React.Fragment key={id}>
            <tbody>
              <tr className='h-10 border border-[#0048a7]'>
                <td className='border border-[#0048a7]'>{description}</td>
                <td className='border border-[#0048a7]'>{quantity}</td>
                <td className='border border-[#0048a7]'>{price}</td>
                <td className='border border-[#0048a7]'>{amount}</td>
              </tr>
            </tbody>
          </React.Fragment>
        ))}
        <tbody className=''>
          <tr className='h-10'>
            <td className=''>
              <div className='flex border border-[#0048a7] h-8 mt-3'>
                <div className='bg-[#0048a7] w-[100px] px-3 text-white font-semi-bold uppercase text-[9px] font-semibold'>
                  <p className='text-[10px]'>Amt Paid GHs</p>
                </div>
                <div className='px-2'>
                  <p>{amountPaid}</p>
                </div>
              </div>
              <div className='flex border border-[#0048a7] h-8 mt-3'>
                <div className='bg-[#0048a7] w-[100px] px-3 text-white font-semi-bold uppercase text-[9px] font-semibold'>
                  <p className='text-[10px]'>Balance GHs</p>
                </div>
                <div className='px-2'>
                  <p>{balance}</p>
                </div>
              </div>
            </td>
            <td className=''></td>
            <td className='text-xs md:text-md text-end pr-2 text-blue-900 font-semibold'>
              <div className='w-full h-8 py-2'>
                <p>Sub Total</p>
              </div>
              <div className='w-full h-8 py-2'>
                <p>Add 3% VAT/NHIL</p>
              </div>
              <div className='w-full h-8 py-2'>
                <p>Grand Total GHs</p>
              </div>
            </td>
            <td className='border border-[#0048a7]'>
              <div className='w-full h-8   px-4'>
                <p>{total}</p>
              </div>
              <div className='w-full h-8 border-t border-[#0048a7]  px-4'>
                <p>{vat}</p>
              </div>
              <div className='w-full h-8 border-t border-[#0048a7]  px-4'>
                <p>{sumTotal}</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* <div>
        <h2 className='flex items-end justify-end text-gray-800 text-4xl font-bold'>
          Ghs. */}
      {/* {total.toLocaleString()} */}
      {/* 1200
        </h2>
      </div> */}
    </div>
  );
};

export default Table;
