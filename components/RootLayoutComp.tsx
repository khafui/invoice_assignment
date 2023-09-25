'use client';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { StateContextProvider } from '@/context/stateContext';

type Props = {
  children: React.ReactNode;
};

const RootLayoutComp = ({ children }: Props) => {
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
