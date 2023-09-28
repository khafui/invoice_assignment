// 'use client';
import { getBaseUrl } from "@/utils/baseUrl";
import Link from "next/link"
import React from 'react'

const getInvoices = async () => {
  const baseUrl = getBaseUrl();

  if (!baseUrl) {
    console.log('Error connecting to base url ');
  }

  try {    
    const response = await fetch(`http://localhost:3000/api/invoices`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch invoices');
    }

    return response.json();

   
  } catch (error) {
    console.log('Error loading topics: ', error);
    
  }
}

const InvoiceRow = async () => {
  const { invoices } = await getInvoices();

  return (
    <div className='invoice__container'>
          {/* ======= invoice item =========== */}
          {invoices?.map((invoice: any) => (
            <Link href={`/invoices/${invoice._id}`} passHref key={invoice._id}>
              <div className='invoice__item'>
                <div>
                  <h5 className='invoice__id'>
                    {invoice._id.substr(0, 6).toUpperCase()}
                  </h5>
                </div>

                <div>
                  <h6 className='invoice__client'>{invoice.invoiceTo}</h6>
                </div>

                <div>
                  <p className='invoice__created'>{invoice.invoiceDate}</p>
                </div>

                <div>
                  <h3 className='invoice__total'>GHS {invoice.sumTotal}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
  )
}

export default InvoiceRow