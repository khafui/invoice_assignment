import Image from 'next/image';
import React from 'react';
import { getBaseUrl } from '@/utils/baseUrl';
import Link from 'next/link';

const getInvoiceData = async (id: any) => {
  const baseUrl = getBaseUrl();

  if (!baseUrl) {
    console.log('Error connecting to base url ');
  }

  try {
    const response = await fetch(`${baseUrl}/api/invoices/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch invoice');
    }
    return response.json();
  } catch (error) {
    console.log('Error loading invoice: ', error);
  }
};

const ViewPage = async ({ params }: any) => {
  const { id } = params;
  const { invoice } = await getInvoiceData(id);

  const dateString = new Date(invoice?.invoiceDate).toLocaleDateString();
  const parts = dateString.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  return (
    <div className="p-5 lg:max-w-4xl mx-auto top-0 sticky">
      <Link
        className="ml-4 p-2 bg-gray-400 rounded-md text-gray-700 hover:text-green-800"
        href={'/'}
      >
        Home
      </Link>
      <div className="p-5">
        {/* Header */}
        <div>
          <div className="flex w-full items-center justify-between gap-x-4 mb-0.5">
            {/* Logo */}
            <div>
              <Image src={invoice?.img} alt="logo" width="70" height="70" />
            </div>
            {/* Brand Name */}
            <div className="flex-end">
              <h2 className="text-4xl font-bold tracking-widest uppercase text-[#0048a7]">
                {invoice?.businessName}
              </h2>
            </div>
          </div>
          <hr className="border-2 border-gray-700" />
          {/* Tagline */}
          <p className="text-[#0048a7]">{invoice?.businessSlogan}</p>
        </div>
        {/* End Header */}
        {/* Business details */}
        <div className="flex w-full items-center justify-between gap-4 mt-2">
          <h2 className="font-bold text-2xl uppercase text-[#0048a7]">
            Invoice
          </h2>
          {/* Address & contact */}
          <div className="flex flex-col text-sm items-end flex-wrap">
            <h2 className="text-[#0048a7]">
              {invoice?.businessAddress}
              {/* Shop Location <span>Haatso-atomic road GE-296-0647</span> */}
            </h2>
            <ul className="flex">
              <li className="text-[#0048a7]">{invoice?.businessContact}</li>
            </ul>
            <h2>
              Email:{' '}
              <span className="text-[#0048a7]">{invoice?.businessEmail}</span>
            </h2>
          </div>
        </div>
        {/* End Business details */}
        {/* Client Details */}
        <div className="flex w-full items-center justify-between gap-4 mt-4">
          <div className="flex-1">
            <div className="flex border-t border-x border-[#0048a7] h-8">
              <div className="bg-[#0048a7] w-[100px] px-3 text-white font-bold uppercase text-[9px]">
                <p className="text-white">Invoice To</p>
              </div>
              <div className="px-2">
                <p>{invoice?.invoiceTo}</p>
              </div>
            </div>
            <div className="flex border-t border-x border-[#0048a7] h-8">
              <div className="bg-[#0048a7] w-[100px] px-3 text-white font-bold uppercase text-[9px]">
                <p className="text-white">Tel</p>
              </div>
              <div className="px-2">
                <p>{invoice?.clientContact}</p>
              </div>
            </div>
            <div className="flex border border-[#0048a7] h-8">
              <div className="bg-[#0048a7] w-[100px] px-3 text-white font-bold uppercase text-[9px]">
                <p className="text-white">Address</p>
              </div>
              <div className="px-2">
                <p>{invoice?.clientAddress}</p>
              </div>
            </div>
          </div>
          <article className="flex items-center gap-2 text-center text-sm">
            <div className="border border-[#0048a7]">
              <h4 className="bg-[#0048a7] p-1 text-white font-bold text-[9px]">
                Day
              </h4>
              <p className="p-1">{day}</p>
            </div>
            <div className="border border-[#0048a7]">
              <h4 className="bg-[#0048a7] p-1 text-white font-bold text-[9px]">
                Month
              </h4>
              <p className="p-1">{month}</p>
            </div>
            <div className="border border-[#0048a7]">
              <h4 className="bg-[#0048a7] p-1 text-white font-bold text-[9px]">
                Year
              </h4>
              <p className="p-1">{year}</p>
            </div>
          </article>
        </div>
        {/* End Client Details */}
        {/* Table */}
        <div className="mt-4">
          <table width="100%" className="mb-10 text-center">
            <thead>
              <tr className="bg-gray-100 p-1">
                <td className="font-bold border border-[#0048a7]">
                  Description
                </td>
                <td className="font-bold border border-[#0048a7]">Quantity</td>
                <td className="font-bold border border-[#0048a7]">
                  Unit Price
                </td>
                <td className="font-bold border border-[#0048a7]">Value</td>
              </tr>
            </thead>
            {invoice?.list.map(
              ({ id, description, quantity, price, amount }: any) => (
                <React.Fragment key={id}>
                  <tbody>
                    <tr className="h-10 border border-[#0048a7]">
                      <td className="border border-[#0048a7]">{description}</td>
                      <td className="border border-[#0048a7]">{quantity}</td>
                      <td className="border border-[#0048a7]">{price}</td>
                      <td className="border border-[#0048a7]">{amount}</td>
                    </tr>
                  </tbody>
                </React.Fragment>
              )
            )}
            <tbody className="">
              <tr className="h-10">
                <td className="">
                  <div className="flex border border-[#0048a7] h-8 mt-3">
                    <div className="bg-[#0048a7] w-[100px] px-3 text-white font-semi-bold uppercase text-[9px] font-semibold">
                      <p className="text-[10px] text-white">Amt Paid GHs</p>
                    </div>
                    <div className="px-2">
                      <p>{invoice?.amountPaid}</p>
                    </div>
                  </div>
                  <div className="flex border border-[#0048a7] h-8 mt-3">
                    <div className="bg-[#0048a7] w-[100px] px-3 text-white font-semi-bold uppercase text-[9px] font-semibold">
                      <p className="text-[10px] text-white">Balance GHs</p>
                    </div>
                    <div className="px-2">
                      <p>{invoice?.balance}</p>
                    </div>
                  </div>
                </td>
                <td className=""></td>
                <td className="text-xs md:text-md text-end pr-2 text-blue-900 font-semibold">
                  <div className="w-full h-8 py-2">
                    <p>Sub Total</p>
                  </div>
                  <div className="w-full h-8 py-2">
                    <p>Add 3% VAT/NHIL</p>
                  </div>
                  <div className="w-full h-8 py-2">
                    <p>Grand Total GHs</p>
                  </div>
                </td>
                <td className="border border-[#0048a7]">
                  <div className="w-full h-8   px-4">
                    <p>{invoice?.total}</p>
                  </div>
                  <div className="w-full h-8 border-t border-[#0048a7]  px-4">
                    <p>{invoice?.vat}</p>
                  </div>
                  <div className="w-full h-8 border-t border-[#0048a7]  px-4">
                    <p>{invoice?.sumTotal}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* End Table */}
      </div>
      {/* Additional info */}
      <div className="flex items-start justify-between w-full text-xs">
        <div className="flex-1 flex-col">
          <div>
            <p className="uppercase">
              Cash / Cheque No. <span>{invoice?.cashOrChequeNo}</span>
            </p>
          </div>
        </div>
        <div className=" max-w-[200px] text-xs">
          <div className="justify-end">
            <p>{invoice?.additionalInfo}</p>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-between w-full text-xs mt-5">
        <div className="justify-start items-center">
          <p>{invoice?.name}</p>
          <p>Name</p>
        </div>
        <div>
          {invoice?.signature}
          <p>Signature</p>
        </div>
      </div>
      <div className="flex items-center justify-center w-full text-xs font-bold mt-4">
        <p>Thanks For Doing Business With Us.</p>
      </div>
    </div>
  );
};

export default ViewPage;
