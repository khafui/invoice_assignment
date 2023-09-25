'use client';
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import DeleteModal from './DeleteModal';
import { useStateContext } from '../context/stateContext';

export default function TableForm() {
  const {
    description,
    setDescription,
    quantity,
    setQuantity,
    amountPaid,
    setAmountPaid,
    cashOrChequeNo,
    setCashOrChequeNo,
    price,
    setPrice,
    amount,
    list,
    total,
    isEditing,
    showModal,
    setShowModal,
    handleSubmit,
    editRow,
  } = useStateContext();

  return (
    <>
      <div className='flex flex-col justify-center mt-8'>
        <article className='md:grid grid-cols-2 gap-10'>
          <div className='flex flex-col'>
            <label htmlFor='amountPaid'>Amount Paid</label>
            <input
              type='text'
              name='text'
              id='name'
              placeholder='Amount Paid'
              autoComplete='off'
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='address'>Cash / Cheque Number</label>
            <input
              type='text'
              name='logo'
              id='logo'
              placeholder='Cash / Cheque Number'
              autoComplete='off'
              accept='image/*'
              value={cashOrChequeNo}
              onChange={(e) => setCashOrChequeNo(e.target.value)}
            />
          </div>
        </article>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col '>
          <label htmlFor='description'>Item description</label>
          <input
            type='text'
            name='description'
            id='description'
            placeholder='Item description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className='md:grid grid-cols-3 gap-10'>
          <div className='flex flex-col'>
            <label htmlFor='quantity'>Quantity</label>
            <input
              type='text'
              name='quantity'
              id='quantity'
              placeholder='Quantity'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='price'>Unit Price</label>
            <input
              type='text'
              name='price'
              id='price'
              placeholder='Unit Price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='amount'>Value</label>
            <p>{amount}</p>
          </div>
        </div>
        <button
          type='submit'
          className='bg-[#0048a7] mb-5 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400'
        >
          {isEditing ? 'Finish Editing' : 'Add Table Item'}
        </button>
      </form>

      {/* Table items */}

      <table width='100%' className='mb-10 overflow-auto'>
        <thead>
          <tr className='bg-gray-100 p-1'>
            <td className='font-bold'>Description</td>
            <td className='font-bold'>Quantity</td>
            <td className='font-bold'>Price</td>
            <td className='font-bold'>Value</td>
          </tr>
        </thead>
        {list.map(({ id, description, quantity, price, amount }: any) => (
          <React.Fragment key={id}>
            <tbody>
              <tr className='h-10'>
                <td>{description}</td>
                <td>{quantity}</td>
                <td>{price}</td>
                <td className='amount'>{amount}</td>
                <td>
                  <button onClick={() => editRow(id)}>
                    <AiOutlineEdit className='text-green-500 font-bold text-xl' />
                  </button>
                </td>
                <td>
                  <button onClick={() => setShowModal(true)}>
                    <AiOutlineDelete className='text-red-500 font-bold text-xl' />
                  </button>
                </td>
              </tr>
            </tbody>
            {showModal && <DeleteModal id={id} />}
          </React.Fragment>
        ))}
      </table>

      <div>
        <h2 className='flex items-end justify-end text-gray-800 text-4xl font-bold'>
          {/* Kshs. {total.toLocaleString()} */}
        </h2>
      </div>
    </>
  );
}
