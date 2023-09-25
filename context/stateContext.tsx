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

const StateContext = createContext<Context>();

interface Props {
  children: React.ReactNode;
}

export const StateContextProvider = ({ children }: Props) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  const [name, setName] = useState<any>('');
  const [businessName, setBusinessName] = useState<any>('');
  const [businessSlogan, setBusinessSlogan] = useState<any>('');
  const [businessAddress, setBusinessAddress] = useState<any>('');
  const [businessContact, setBusinessContact] = useState<any>('');
  const [businessEmail, setBusinessEmail] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [clientContact, setClientContact] = useState<any>('');
  const [bankName, setBankName] = useState<any>('');
  const [bankAccount, setBankAccount] = useState<any>('');
  const [website, setWebsite] = useState<any>('');
  const [clientName, setClientName] = useState<any>('');
  const [clientAddress, setClientAddress] = useState<any>('');
  const [additionalInfo, setAdditionalInfo] = useState<any>('');
  const [invoiceTo, setInvoiceTo] = useState<any>('');
  const [signature, setSignature] = useState<any>('');
  const [invoiceDate, setInvoiceDate] = useState<any>(formattedDate);
  const [dueDate, setDueDate] = useState<any>('');
  const [notes, setNotes] = useState<any>('');
  const [description, setDescription] = useState<any>('');
  const [quantity, setQuantity] = useState<any>('');
  const [price, setPrice] = useState<any>('');
  const [amount, setAmount] = useState<any>('');
  const [amountPaid, setAmountPaid] = useState<any>('');
  const [cashOrChequeNo, setCashOrChequeNo] = useState<any>('');
  const [list, setList] = useState<any>([]);
  const [total, setTotal] = useState<any>(0);
  const [vat, setVat] = useState<any>(0);
  const [sumTotal, setSumTotal] = useState<any>(0);
  const [balance, setBalance] = useState<any>(0);
  const [width] = useState<any>(641);
  const [selectedImage, setSelectedImage] = useState<any>();
  const [selectedImageLink, setSelectedImageLink] = useState<any>();
  // const [invoices, setInvoices] = useState([]);
  const [isEditing, setIsEditing] = useState<any>(false);
  const [showModal, setShowModal] = useState<any>(false);
  const [showLogoutModal, setShowLogoutModal] = useState<any>(false);

  const componentRef = useRef();

  const handlePrint = () => {
    window.print();
  };

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
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

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
        email,
        setEmail,
        clientContact,
        setClientContact,
        bankName,
        setBankName,
        bankAccount,
        setBankAccount,
        website,
        setWebsite,
        clientName,
        setClientName,
        clientAddress,
        setClientAddress,
        invoiceTo,
        setInvoiceTo,
        invoiceDate,
        setInvoiceDate,
        dueDate,
        setDueDate,
        notes,
        setNotes,
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
        handlePrint,
        isEditing,
        setIsEditing,
        showModal,
        setShowModal,
        handleSubmit,
        editRow,
        deleteRow,
        showLogoutModal,
        setShowLogoutModal,
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
        imageChange,
        setBusinessEmail,
        setSelectedImage,
        selectedImage,
        selectedImageLink,
        setSelectedImageLink,
        additionalInfo, setAdditionalInfo,
        signature, setSignature,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => {
  return useContext(StateContext);
};

export default { useStateContext, StateContextProvider };
