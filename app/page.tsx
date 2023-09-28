import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { getBaseUrl } from '@/utils/baseUrl';
import Removebtn from '@/components/Removebtn';

const getInvoices = async () => {
  const baseUrl = getBaseUrl();
  if (!baseUrl) {
    console.log('Error connecting to base url ');
  }
  try {
    const response = await fetch(`${baseUrl}/api/invoices`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch invoices');
    }

    return response.json();
  } catch (error) {
    console.log('Error loading invoices: ', error);
  }
};

const Home = async () => {
  const { invoices } = await getInvoices();

  return (
    <main>
      <Sidebar />
      <section className="main__container">
        <div className="invoice__header">
          <div className="invoice__header-logo">
            <h3>Invoices</h3>
            <p>
              There {invoices?.length > 1 ? 'are' : 'is a'} total{' '}
              {invoices?.length} invoice{invoices?.length > 1 && 's'}
            </p>
          </div>

          <Link
            href="/add-new"
            className="bg-[#0048a7]  text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400t"
            // onClick={() => {}}
          >
            Add New
          </Link>
        </div>
        {/* <InvoiceRow /> */}
        <div className="invoice__container">
          {/* ======= invoice item =========== */}
          {invoices?.map((invoice: any) => (
            <Link href={`/invoices/${invoice._id}`} passHref key={invoice._id}>
              <div className="invoice__item">
                <div>
                  <h5 className="invoice__id">
                    {invoice?._id.substr(0, 6).toUpperCase()}
                  </h5>
                </div>

                <div>
                  <h6 className="invoice__client">{invoice?.invoiceTo}</h6>
                </div>

                <div>
                  <p className="invoice__created">
                    {new Date(invoice?.invoiceDate).toDateString()}
                  </p>
                </div>

                <div>
                  <h3 className="invoice__total">GHS {invoice?.sumTotal}</h3>
                </div>
                <div className="flex gap-x-2">
                  <div className="ml-2">
                    <Removebtn id={invoice?._id} />
                  </div>
                  <div>
                    <Link
                      href={`/view-invoice/${invoice?._id}`}
                      className="paid__status "
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

// const data = [
//   {
//     id: '1',
//     clientName: 'invoice.clientName',
//     createdAt: '2023-09-21',
//     total: 100,
//     status: 'pending',
//   },
//   {
//     id: '2',
//     clientName: 'invoice.clientName',
//     createdAt: '2023-09-19',
//     total: 100,
//     status: 'paid',
//   },
// ];

export default Home;
