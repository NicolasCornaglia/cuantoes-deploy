
import './App.css';
import Users from "./components/Users"
import logo from '../src/logo.png'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <div className='titleBackground'>
            <h2 className="appTitle"><img src={logo} className='logo' alt="logo" /></h2>
          </div>
          <p className='explainingParagraph'><span className='paragraph'>¿Quiere dividir los gastos de su reunion equitativamente? Siga los pasos y averigue como saldar las deudas.</span></p>
        </div>

        <Users />

      </header>

    </div>
  );
}

export default App;
