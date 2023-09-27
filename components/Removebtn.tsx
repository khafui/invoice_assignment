'use client';
// import { useStateContext } from '@/context/stateContext';
import React, { useState } from 'react';

import { AiOutlineDelete } from 'react-icons/ai';
import { HiOutlineTrash } from 'react-icons/hi';
import { getBaseUrl } from '@/utils/baseUrl';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type Props = {
  id: string;
};

const Removebtn = ({ id }: Props) => {
  // const [showDModal, setShowDModal] = useState(false);
  const router = useRouter();
  const baseUrl = getBaseUrl();

  const deleteRecord = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`${baseUrl}/api/invoices?id=${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      toast.success('Invoice deleted successfully');
      // setShowDModal(false);
      router.refresh();
    }
  };

  // if (showDModal) {
  //   return (
  //     <div className="inline-block  transition-all duration-200 bg-black bg-opacity-50 fixed left-0 right-0 bottom-0 top-0 z-24">
  //       <div className="w-9/12 max-w-2xl bg-white p-8 rounded shadow fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
  //         <h2 className="text-3xl mb-4">Danger Zone!</h2>
  //         <p className="text-slate-600 mb-10">
  //           Are you sure you want to delete this item? Take note that this
  //           action is irreversible. Therefore, proceed with caution...
  //         </p>

  //         <ul className="flex flex-wrap gap-6 items-start md:items-start justify-between">
  //           <li>
  //             <button
  //               onClick={() => setShowDModal(false)}
  //               className="flex items-center justify-center gap-2 bg-emerald-500 py-2 px-4 rounded text-white hover:ring-4 hover:ring-emerald-300 hover:bg-emerald-600 transition-all duration-150"
  //             >
  //               No, go back
  //             </button>
  //           </li>
  //           <li>
  //             <button
  //               onClick={deleteRecord}
  //               className="flex items-center justify-start md:justify-center gap-2 bg-red-500 py-2 px-4 rounded text-white hover:ring-4 hover:ring-red-300 hover:bg-red-600 transition-all duration-150"
  //             >
  //               Yes, delete
  //               <AiOutlineDelete className="text-white font-bold text-xl" />
  //             </button>
  //           </li>
  //         </ul>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    // <div>
    <button onClick={deleteRecord} className="delete__status mx-2">
      Delete
    </button>
    // </div>
  );
};

export default Removebtn;
