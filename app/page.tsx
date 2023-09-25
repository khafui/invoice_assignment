'use client';

import BusinessDetails from '@/components/BusinessDetails';
import ClientDetails from '@/components/ClientDetails';
import Header from '@/components/Header';
import Table from '@/components/Table';
import ReactToPrint from 'react-to-print';
import Image from 'next/image';
import TableForm from '@/components/TableForm';
import { useStateContext } from '@/context/stateContext';
import { useRef } from 'react';

export default function Home() {
  const {
    // componentRef,
    businessName,
    setBusinessName,
    businessSlogan,
    setBusinessSlogan,
    businessAddress,
    setBusinessAddress,
    businessContact,
    setBusinessContact,
    businessEmail,
    setBusinessEmail,
    invoiceTo,
    setInvoiceTo,
    invoiceDate,
    setInvoiceDate,
    clientContact,
    setClientContact,
    clientAddress,
    setClientAddress,
    selectedImage,
    setSelectedImage,
    cashOrChequeNo,
    additionalInfo,
    name,
    setName,
    setAdditionalInfo,
    signature,
    setSignature,
  } = useStateContext();

  const componentRef = useRef<any>();

  return (
    <main
      className='m-5 p-5 xl:grid grid-cols-2 gap-10 xl:items-start text-sm'
      style={{
        maxWidth: '1920px',
        margin: 'auto',
      }}
    >
      <section>
        <div className='bg-white p-5 rounded shadow mb-4'>
          <div className='flex flex-col justify-center'>
            <article className='md:grid grid-cols-2 gap-10'>
              <div className='flex flex-col'>
                <label htmlFor='name'>Your Business name</label>
                <input
                  type='text'
                  name='text'
                  id='name'
                  placeholder='Enter business name'
                  autoComplete='off'
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='address'>Upload your business logo</label>
                <input
                  type='file'
                  name='logo'
                  id='logo'
                  placeholder='Upload your logo'
                  autoComplete='off'
                  accept='image/*'
                  onChange={(e) => setSelectedImage(e.target.files)}
                />
              </div>
            </article>
            <article className='md:grid grid-cols-2 gap-10'>
              <div className='flex flex-col'>
                <label htmlFor='name'>Your Business Slogan</label>
                <input
                  type='text'
                  name='text'
                  id='name'
                  placeholder='Enter business slogan'
                  autoComplete='off'
                  value={businessSlogan}
                  onChange={(e) => setBusinessSlogan(e.target.value)}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='address'>Enter your address</label>
                <input
                  type='text'
                  name='address'
                  id='address'
                  placeholder='Enter your address'
                  autoComplete='off'
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                />
              </div>
            </article>
            <article className='md:grid grid-cols-2 gap-10'>
              <div className='flex flex-col'>
                <label htmlFor='name'>Your Business Contact</label>
                <input
                  type='text'
                  name='text'
                  id='name'
                  placeholder='Enter business contact'
                  autoComplete='off'
                  value={businessContact}
                  onChange={(e) => setBusinessContact(e.target.value)}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='address'>Enter your business Email</label>
                <input
                  type='text'
                  name='address'
                  id='address'
                  placeholder='Enter your business email address'
                  autoComplete='off'
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                />
              </div>
            </article>
          </div>
        </div>
        <div className='bg-white p-5 rounded shadow mb-4'>
          <div className='flex flex-col justify-center'>
            <article className='md:grid grid-cols-2 gap-10'>
              <div className='flex flex-col'>
                <label htmlFor='name'>Invoice To</label>
                <input
                  type='text'
                  name='text'
                  id='name'
                  placeholder='Enter Client Name'
                  autoComplete='off'
                  value={invoiceTo}
                  onChange={(e) => setInvoiceTo(e.target.value)}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='address'>Invoice Date</label>
                <input
                  type='date'
                  name='logo'
                  id='logo'
                  placeholder='Enter Invoice Date'
                  autoComplete='off'
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                />
              </div>
            </article>
            <article className='md:grid grid-cols-2 gap-10'>
              <div className='flex flex-col'>
                <label htmlFor='name'>Enter Client Tel Number</label>
                <input
                  type='text'
                  name='text'
                  id='name'
                  placeholder="Enter client's tel number"
                  autoComplete='off'
                  value={clientContact}
                  onChange={(e) => setClientContact(e.target.value)}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='address'>Enter client address</label>
                <input
                  type='text'
                  name='address'
                  id='address'
                  placeholder='Enter client address'
                  autoComplete='off'
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                />
              </div>
            </article>
          </div>
        </div>
        <div className='bg-white p-5 rounded shadow mb-4'>
          <TableForm />
        </div>
        <div className='bg-white p-5 rounded shadow mb-4'>
          <div className='flex flex-col justify-center'>
            <article className='md:grid grid-cols-2 gap-10'>
              <div className='flex flex-col'>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  name='text'
                  id='name'
                  placeholder='Enter Staff Name'
                  autoComplete='off'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='address'>Signature</label>
                <input
                  type='text'
                  name='signature'
                  id='signature'
                  placeholder='Enter your initial as signature'
                  autoComplete='off'
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                />
              </div>
            </article>
            <article className='md:grid grid-cols-1 gap-10'>
              <div className='flex flex-col'>
                <label htmlFor='name'>Additional Notes</label>
                <textarea
                  name='notes'
                  id='notes'
                  cols={30}
                  rows={10}
                  placeholder='Additional notes to the client'
                  autoComplete='off'
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                ></textarea>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Invoice part */}
      <div
        className='p-5 lg:max-w-4xl mx-auto top-0 sticky'
        // className='invoice__preview bg-white p-5 rounded-2xl border-4 border-blue-200'
      >
        <div>
          <ReactToPrint
            trigger={() => (
              <button className='bg-[#0048a7]  text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400t'>
                Print / Download
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
        <div ref={componentRef} className='p-5'>
          <Header />
          <BusinessDetails />
          <ClientDetails />
          <Table />
          {/* Additional info */}
          <div className='flex items-start justify-between w-full text-xs'>
            <div className='flex-1 flex-col'>
              <div>
                <p className='uppercase'>
                  Cash / Cheque No.{' '}
                  <span>{cashOrChequeNo !== '' && cashOrChequeNo}</span>
                </p>
              </div>
            </div>
            <div className=' max-w-[200px] text-xs'>
              <div className='justify-end'>
                <p>
                  {additionalInfo !== ''
                    ? additionalInfo
                    : 'NB: Payment made are NOT refundable all cheques or money orders should be made payable to Your business name'}
                </p>
              </div>
            </div>
          </div>
          <div className='flex items-start justify-between w-full text-xs mt-5'>
            <div className='justify-start items-center'>
              <p>{name !== '' ? name : 'Tim Doe'}</p>
              <p>Name</p>
            </div>
            <div>
              {signature !== '' ? signature : 'T.D'}
              <p>Signature</p>
            </div>
          </div>
          <div className='flex items-center justify-center w-full text-xs font-bold mt-4'>
            <p>Thanks For Doing Business With Us.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
