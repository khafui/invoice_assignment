'use client';
import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { StateContextProvider } from '@/context/stateContext';

type Props = {
  children: React.ReactNode;
};

const RootLayoutComp = ({ children }: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <Toaster />
      <StateContextProvider>
        <div>{children}</div>
      </StateContextProvider>
    </div>
  );
};

export default RootLayoutComp;
