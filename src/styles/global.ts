import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  
  :root{
    --background: #f0f2f5;

    --red: #E52E4D;
    --blue: #5429CC;
    --green: #33cc95;
    --blue-light: #6933FF;

    --text-title: #363f5f;
    --text-body: #969cb3;

    --shape: #FFFFFF;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
  }

  //font-size : 16px (desktop)
  html{
    @media (max-width : 1080px){
      font-size: 93.57%; //font-size : 15px
    }

    @media (max-width:720px){
      font-size : 87.5%; //14px
    }

    // em dispositivos menores faz sentido as fontes serem menores
    // percentual para aumentar a fonte caso o usuário dê zoom
  }

  body{
    background: var(--background);
    -webkit-font-smoothing: antialiased; 
  }

  body, input, textarea, button{
    font-family: 'Poppins', sans-serif;  
    font-weight: 400;
  }

  h1,h2, h3, h4, h5, h6, strong{
    font-weight: 600;
  } 

  button{
    cursor: pointer;
  }

  [disabled]{ //tudo que estiver desabilitado
    opacity: .6;
    cursor: not-allowed;
  }

.react-modal-overlay{
  background: rgba(0,0,0,0.5);

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display:flex;
  justify-content: center;
  align-items: center;
}
.react-modal-content{
  width: 100%;
  max-width: 566px;
  background: var(--background);
  padding: 3rem;
  position: relative;
  border-radius: 0.25rem;

}
.react-modal-close{
   position: absolute;
   right: 1.5rem;
   top: 1.5rem;
   border: 0;
   background: transparent;
   transition: filter 200ms;

   &:hover{
    filter: brightness(0.8);
   }
}
`