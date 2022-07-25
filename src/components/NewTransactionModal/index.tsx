import { FormEvent, useState, useContext } from 'react';
import Modal from 'react-modal'

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { useTransactions } from '../../hooks/useTransactions';

import { Container, RadioBox, TransactionTypeContainer } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean,
  onRequestClose: ()=>void;
}

export function NewTransactionModal({isOpen,onRequestClose}:NewTransactionModalProps){
  const {createTransaction} = useTransactions();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit')
  
  async function handleCreateNewTransaction(event:FormEvent){
    event.preventDefault() //prevenir o funcionamento padrao do submit=> recarrear a pagina

    await createTransaction({
      title,
      amount:amount,
      category,
      type,
    })

    setTitle(''); //mesmo o modal fechando, o modal nao deixa de existir no react
    setAmount(0); //entao resetamos os valores dos estados
    setCategory('');
    setType('deposit')

    onRequestClose();
  }

  return(
    <Modal
      isOpen = {isOpen} 
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay" //pra criar style do 0
      className="react-modal-content"
      >
        <button type="button">
          <img src={closeImg} alt="Fechar modal" 
          onClick={onRequestClose}
          className="react-modal-close"
          />
        </button>
        <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input 
        placeholder='Título' 
        value={title}
        onChange={event => setTitle(event.target.value)} //onChange => toda vez que o value foi alterado
        />

        <input 
        type="number" 
        placeholder='Valor' 
        value={amount}
        onChange={event => setAmount(Number(event.target.value))}
        />
  
        <TransactionTypeContainer>

          <RadioBox 
            type='button'
            onClick={()=> {setType('deposit')}}
            isActive={type === 'deposit'}
            activeColor = "green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox 
          type='button'
          onClick={()=> {setType('withdraw')}}
          isActive = {type === 'withdraw'}
          activeColor = "red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>

        </TransactionTypeContainer>

        <input 
        placeholder='Categoria' 
        value={category}
        onChange={event => setCategory(event.target.value)}
        />

        <button 
        type="submit"
        >Cadastrar</button>
        </Container>

      </Modal>
  )
}