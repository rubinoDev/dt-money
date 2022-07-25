import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { api } from "../services/api";

interface Transaction {
  id:number;
  title:string;
  amount:number;
  type:string;
  category:string;
  createdAt:string;
}



type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>


interface TransactionProviderProps{
  children: ReactNode; //aceita qualquer tipo de conteúdo válido para o React
}

interface TransactionsContextData{
  transactions : Transaction[];
  createTransaction : (transaction: TransactionInput) => Promise<void>; //pois toda função assíncrona do js retorna uma promise
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData //força a tipagem
  );

export function TransactionsProvider ({children}:TransactionProviderProps){
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api.get('transactions')
    .then(response => setTransactions(response.data.transactions))
  }, []);

  async function createTransaction(transactionInput:TransactionInput){

    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    }) //funcao vai aguardar o api post finalizar
    const {transaction} = response.data;

    setTransactions([...transactions, transaction,])
  }

  return(
    <TransactionsContext.Provider value={{transactions , createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions () {
  const context = useContext(TransactionsContext);
  return context
}