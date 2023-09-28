'use client';

import React, {
  createContext,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import collect from 'collect.js';
import { useRouter } from 'next/navigation';
import { getBaseUrl } from '@/utils/baseUrl';

// interface MyContextType {
//   // Define your context type here
//   name: any;
//   businessName: any;
//   businessSlogan: any;
//   businessAddress: any;
// }

// const StateContext = createContext<MyContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

type StateContextType = {
  name: any;
  setName: React.Dispatch<React.SetStateAction<any>>;
  businessName: any;
  setBusinessName: React.Dispatch<React.SetStateAction<any>>;
  businessSlogan: any;
  setBusinessSlogan: React.Dispatch<React.SetStateAction<any>>;
  businessAddress: any;
  setBusinessAddress: React.Dispatch<React.SetStateAction<any>>;
  businessContact: any;
  setBusinessContact: React.Dispatch<React.SetStateAction<any>>;
  businessEmail: any;
  setBusinessEmail: React.Dispatch<React.SetStateAction<any>>;
  clientContact: any;
  setClientContact: React.Dispatch<React.SetStateAction<any>>;
  clientName: any;
  setClientName: React.Dispatch<React.SetStateAction<any>>;
  clientAddress: any;
  setClientAddress: React.Dispatch<React.SetStateAction<any>>;
  additionalInfo: any;
  setAdditionalInfo: React.Dispatch<React.SetStateAction<any>>;
  invoiceTo: any;
  setInvoiceTo: React.Dispatch<React.SetStateAction<any>>;
  signature: any;
  setSignature: React.Dispatch<React.SetStateAction<any>>;
  invoiceDate: any;
  setInvoiceDate: React.Dispatch<React.SetStateAction<any>>;
  description: any;
  setDescription: React.Dispatch<React.SetStateAction<any>>;
  quantity: any;
  setQuantity: React.Dispatch<React.SetStateAction<any>>;
  price: any;
  setPrice: React.Dispatch<React.SetStateAction<any>>;
  amount: any;
  setAmount: React.Dispatch<React.SetStateAction<any>>;
  amountPaid: any;
  setAmountPaid: React.Dispatch<React.SetStateAction<any>>;
  cashOrChequeNo: any;
  setCashOrChequeNo: React.Dispatch<React.SetStateAction<any>>;
  list: any;
  setList: any;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  vat: number;
  setVat: React.Dispatch<React.SetStateAction<number>>;
  sumTotal: number;
  setSumTotal: React.Dispatch<React.SetStateAction<number>>;
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  width: number;
  selectedImage: any;
  setSelectedImage: any;
  // componentRef: any;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (e: any) => void;
  calculateAmount: (amount: any) => void;
  editRow: (id: any) => void;
  deleteRow: (id: any) => void;
  addNewInvoice: () => void;
};
// React.Dispatch<React.SetStateAction<boolean>>
// React.Dispatch<React.SetStateAction<never[]>>

const StateContext = createContext<StateContextType | undefined>(undefined);

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

export const StateContextProvider = ({ children }: Props) => {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessSlogan, setBusinessSlogan] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessContact, setBusinessContact] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [invoiceTo, setInvoiceTo] = useState('');
  const [signature, setSignature] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(formattedDate);
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState<any>(0);
  const [price, setPrice] = useState<any>(0);
  const [amount, setAmount] = useState<any>(0);
  const [amountPaid, setAmountPaid] = useState<any>(0);
  const [cashOrChequeNo, setCashOrChequeNo] = useState('');
  const [list, setList] = useState<any>([]);
  const [total, setTotal] = useState<any>(0);
  const [vat, setVat] = useState<any>(0);
  const [sumTotal, setSumTotal] = useState<any>(0);
  const [balance, setBalance] = useState<any>(0);
  const [width] = useState(641);
  const [selectedImage, setSelectedImage] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // const componentRef = useRef();

  // const handlePrint = () => {
  //   window.print();
  // };

  useEffect(() => {
    if (window.innerWidth < width) {
      toast.error('Place your phone in landscape mode for the best experience');
    }
  }, [width]);

  const calculateAmount = (amount: any) => {
    setAmount(quantity * price);
  };

  // Submit form function
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!description || !quantity || !price) {
      toast.error('Please fill in all inputs');
    } else {
      const newItems: any = {
        id: uuidv4(),
        description,
        quantity,
        price,
        amount,
        // amount: calculateAmount(quantity, price),
      };
      setDescription('');
      setQuantity(0);
      setPrice(0);
      setAmount(0);
      setList([...list, newItems]);
      setIsEditing(false);
      // console.log(list);
    }
  };

  // This function will be triggered when the file field change
  // const imageChange = (e: any) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setSelectedImage(e.target.files[0]);
  //   }
  // };

  // Calculate items amount function
  useEffect(() => {
    // const calculateAmount = (amount: any) => {
    //   setAmount(quantity * price);
    // };

    calculateAmount(amount);
  }, [amount, price, quantity, setAmount]);

  // Use collect.js to calculate the total amount of items in the table. This is a much better function than the commented one above.
  const calculateTotal = () => {
    const allItems = list.map((item: any) => item.amount);

    setTotal(collect(allItems).sum());
    setVat(((3 / 100) * total).toFixed(2));
    setSumTotal(parseFloat(total) + parseFloat(vat));
    setBalance((sumTotal - amountPaid).toFixed(2));
  };

  useEffect(() => {
    calculateTotal();
  });

  // Edit function
  const editRow = (id: any) => {
    const editingRow = list.find((row: any) => row.id === id);
    setList(list.filter((row: any) => row.id !== id));
    setIsEditing(true);
    setDescription(editingRow.description);
    setQuantity(editingRow.quantity);
    setPrice(editingRow.price);
  };

  // Delete function
  const deleteRow = (id: any) => {
    setList(list.filter((row: any) => row.id !== id));
    // CalcSum();
    setShowModal(false);
    toast.success('Item deleted successfully');
  };

  const upload = async () => {
    if (selectedImage) {
      const data = new FormData();
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'multipart/form-data');
      data.append('upload_preset', 'restaurant');
      data.append('file', selectedImage[0]);

      const res = await fetch(
        'https://api.cloudinary.com/v1_1/khafui/image/upload',
        {
          method: 'POST',
          // headers: myHeaders,
          body: data,
        }
      );

      const resData = await res.json();
      // console.log('url', resData.url);

      return resData.url;
    } else return '';
  };

  const addNewInvoice = async () => {
    const url = await upload();

    // console.log(
    //   'invoice data',
    //   JSON.stringify({
    //     businessName,
    //     businessSlogan,
    //     businessAddress,
    //     businessContact,
    //     businessEmail,
    //     invoiceTo,
    //     invoiceDate,
    //     clientContact,
    //     clientAddress,
    //     cashOrChequeNo,
    //     additionalInfo,
    //     name,
    //     signature,
    //     list,
    //     total,
    //     vat,
    //     sumTotal,
    //     balance,
    //     img: url,
    //   })
    // );

    // const baseUrl = process.env.APP_URI
    const baseUrl = getBaseUrl();

    if (!baseUrl) {
      console.error('Failed to connect base url');
      console.log(`${baseUrl}/api/invoices`);

      return;
    }

    // console.log('image', selectedImage ? selectedImage[0]: 'no image');

    if (!invoiceTo || !businessName || !businessContact) {
      toast.error('All fields are required');
      return;
    }

    //   const baseUrl = process.env.APP_URI!

    // if(!baseUrl){
    //      toast.error('Failed to fetch invoices from base url');
    //     return;
    //   }

    try {
      const res = await fetch(`${baseUrl}/api/invoices`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          businessName,
          businessSlogan,
          businessAddress,
          businessContact,
          businessEmail,
          invoiceTo,
          invoiceDate,
          clientContact,
          clientAddress,
          cashOrChequeNo,
          additionalInfo,
          name,
          signature,
          list,
          total,
          vat,
          sumTotal,
          balance,
          img: url,
          // title: topicDetails.title,
          // description: topicDetails.description,
        }),
      });

      //   console.log(
      //   'invoice data',
      //   JSON.stringify({
      //     businessName,
      //     businessSlogan,
      //     businessAddress,
      //     businessContact,
      //     businessEmail,
      //     invoiceTo,
      //     invoiceDate,
      //     clientContact,
      //     clientAddress,
      //     cashOrChequeNo,
      //     additionalInfo,
      //     name,
      //     signature,
      //     list,
      //     total,
      //     vat,
      //     sumTotal,
      //     balance,
      //     img:url,
      //   })
      // );

      if (res.ok) {
        router.refresh();
        router.push('/');
        toast.success('Invoice created successfully');
      } else {
        toast.error('Failed to create an invoice');
        throw new Error('Failed to create an invoice');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        name,
        setName,
        businessAddress,
        setBusinessAddress,
        clientContact,
        setClientContact,
        clientName,
        setClientName,
        clientAddress,
        setClientAddress,
        invoiceTo,
        setInvoiceTo,
        invoiceDate,
        setInvoiceDate,
        description,
        setDescription,
        quantity,
        setQuantity,
        price,
        setPrice,
        amount,
        setAmount,
        list,
        setList,
        total,
        setTotal,
        vat,
        setVat,
        sumTotal,
        setSumTotal,
        balance,
        setBalance,
        width,
        // componentRef,
        calculateAmount,
        isEditing,
        setIsEditing,
        showModal,
        setShowModal,
        handleSubmit,
        editRow,
        deleteRow,
        amountPaid,
        setAmountPaid,
        cashOrChequeNo,
        setCashOrChequeNo,
        businessName,
        setBusinessName,
        businessSlogan,
        setBusinessSlogan,
        businessContact,
        setBusinessContact,
        businessEmail,
        setBusinessEmail,
        setSelectedImage,
        selectedImage,
        additionalInfo,
        setAdditionalInfo,
        signature,
        setSignature,
        addNewInvoice,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useStateContext must be used within a Provider');
  }
  return useContext(StateContext);
};

export default { useStateContext, StateContextProvider };
