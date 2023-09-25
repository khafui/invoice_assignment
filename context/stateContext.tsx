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
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  businessName: string;
  setBusinessName: React.Dispatch<React.SetStateAction<string>>;
  businessSlogan: string;
  setBusinessSlogan: React.Dispatch<React.SetStateAction<string>>;
  businessAddress: string;
  setBusinessAddress: React.Dispatch<React.SetStateAction<string>>;
  businessContact: string;
  setBusinessContact: React.Dispatch<React.SetStateAction<string>>;
  businessEmail: string;
  setBusinessEmail: React.Dispatch<React.SetStateAction<string>>;
  clientContact: string;
  setClientContact: React.Dispatch<React.SetStateAction<string>>;
  clientName: string;
  setClientName: React.Dispatch<React.SetStateAction<string>>;
  clientAddress: string;
  setClientAddress: React.Dispatch<React.SetStateAction<string>>;
  additionalInfo: string;
  setAdditionalInfo: React.Dispatch<React.SetStateAction<string>>;
  invoiceTo: string;
  setInvoiceTo: React.Dispatch<React.SetStateAction<string>>;
  signature: string;
  setSignature: React.Dispatch<React.SetStateAction<string>>;
  invoiceDate: string;
  setInvoiceDate: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  quantity: any;
  setQuantity: React.Dispatch<React.SetStateAction<any>>;
  price: any;
  setPrice: React.Dispatch<React.SetStateAction<any>>;
  amount: any;
  setAmount: React.Dispatch<React.SetStateAction<any>>;
  amountPaid: string;
  setAmountPaid: React.Dispatch<React.SetStateAction<string>>;
  cashOrChequeNo: string;
  setCashOrChequeNo: React.Dispatch<React.SetStateAction<string>>;
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
  componentRef: HTMLDivElement;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
  calculateAmount: () => void;
  editRow: () => void;
  deleteRow: () => void;
};
// React.Dispatch<React.SetStateAction<boolean>>
// React.Dispatch<React.SetStateAction<never[]>>

const StateContext = createContext<StateContextType | null>(null);

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
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [cashOrChequeNo, setCashOrChequeNo] = useState('');
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [vat, setVat] = useState(0);
  const [sumTotal, setSumTotal] = useState(0);
  const [balance, setBalance] = useState(0);
  const [width] = useState(641);
  const [selectedImage, setSelectedImage] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const componentRef = useRef();

  // const handlePrint = () => {
  //   window.print();
  // };

  useEffect(() => {
    if (window.innerWidth < width) {
      toast.error('Place your phone in landscape mode for the best experience');
    }
  }, [width]);

  // Submit form function
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!description || !quantity || !price) {
      toast.error('Please fill in all inputs');
    } else {
      const newItems = {
        id: uuidv4(),
        description,
        quantity,
        price,
        amount,
      };
      setDescription('');
      setQuantity('');
      setPrice('');
      setAmount('');
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
    const calculateAmount = (amount: any) => {
      setAmount(quantity * price);
    };

    calculateAmount(amount);
  }, [amount, price, quantity, setAmount]);

  // Use collect.js to calculate the total amount of items in the table. This is a much better function than the commented one above.
  const calculateTotal = () => {
    const allItems = list.map((item: any) => item.price);

    setTotal(collect(allItems).sum());
    setVat(((3 / 100) * total).toFixed(2));
    setSumTotal(total + vat);
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
        componentRef,
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
