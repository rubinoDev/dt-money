import { Container } from "./styles";
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useContext } from "react";
import { useTransactions } from "../../hooks/useTransactions";

export function Summary(){
  const {transactions} = useTransactions(); //toda vez que o valor do contexto muda, o componente recebe esse valor executa o que precisa executar

  const summary = transactions.reduce((acc,transaction) => {
    if(transaction.type === 'deposit'){
      acc.deposits += transaction.amount;
      acc.total += transaction.amount;

    }else{
      acc.withdraws += transaction.amount
      acc.total -= transaction.amount;
    }

    return acc
  },{
    deposits : 0,
    withdraws: 0,
    total: 0,
  })


  return(
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-br',{
                    style: 'currency',
                    currency: 'BRL'
                  }).format(summary.deposits)}
          </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>- 
        {new Intl.NumberFormat('pt-br',{
                    style: 'currency',
                    currency: 'BRL'
                  }).format(summary.withdraws)}
          </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-br',{
                    style: 'currency',
                    currency: 'BRL'
                  }).format(summary.total)}
          </strong>
      </div>
    </Container>
  )
}
