import React from 'react';
import ReactDOM from 'react-dom/client';
import {createServer, Model} from 'miragejs';
import {App} from './App';

createServer({

  models :{ //banco de dados interno
    transaction: Model, //nome do modelo e tipo

  },

  seeds(server) {
    server.db.loadData({
      transactions:[
        {
          id:1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt : new Date('2022-02-12 09:00:15'),
        },
        {
          id:2,
          title: 'Alguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt : new Date('2022-02-14 09:00:15'),
        },
      ],
    })
  },

  routes(){
    this.namespace = 'api'; // /api da rota

    this.get('/transactions', ()=>{ //essa rota retorna todas as transactions
      return this.schema.all('transaction')
    }) //quando houver uma requisição do tipo get pra rota transactions

    this.post('/transactions', (schema, request)=>{ //essa rota cria transaction, schema é o banco de dados e request é pra puxar os dados
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data) // qual o model que estou inerindo, e os dados que estou inserindo
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


