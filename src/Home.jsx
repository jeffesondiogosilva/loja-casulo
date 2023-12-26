import Adm from './Adm.jsx';
import logo from './storage/img/WhatsApp_Image_2023-12-24_at_15.19.50-removebg-preview.png'
import produto from './storage/img/vestido.jpg';

function Home() {
    return (
        <div className="App">    
    
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            Learn React
          </a> */}
        </header>
  
        <div className="catalog">
  
          <div className="produto">
            <img className="img-produto" src={produto} alt="" />
            <p className='descricao'>Produto Tal</p>
            <p className='valor_produto'>R$ 100,00</p>
          </div>
  
  
        </div>
        
      </div>
    );
  }
  
  export default Home;
  