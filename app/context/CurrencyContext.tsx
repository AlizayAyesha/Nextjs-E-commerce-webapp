'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  convertPrice: (price: number) => number;
  rates: { [key: string]: number };
  loading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const currencies = ['USD', 'EUR', 'PKR'];

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<string>('USD');
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedCurrency = localStorage.getItem('selectedCurrency');
    if (storedCurrency && currencies.includes(storedCurrency)) {
      setCurrencyState(storedCurrency);
    }
  }, []);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/USD`);
        setRates(response.data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const setCurrency = (newCurrency: string) => {
    if (currencies.includes(newCurrency)) {
      setCurrencyState(newCurrency);
      localStorage.setItem('selectedCurrency', newCurrency);
    }
  };

  const convertPrice = (price: number): number => {
    if (currency === 'USD') return price;
    const rate = rates[currency];
    return rate ? price * rate : price;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, rates, loading }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
