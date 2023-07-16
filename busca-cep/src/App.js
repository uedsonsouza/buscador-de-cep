import { FiSearch } from 'react-icons/fi';
import './styles.css';
import { useState } from 'react';

import api from './services/api'

function App() {

  const [ input, setInput] = useState('')
  const [ cep, setCep] = useState('')

  async function handleSearch(){

    if (input === ""){
      alert("Insira um cep válido!")
      return;
    }
    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")
    }
    catch{
      alert("Erro ao buscar CEP!");
      setInput('')
    }

  }
  return(
    <div className="conteiner">
      <h2 className='title'>CEP fácil</h2>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Insira o cep..."
        value={input}
        onChange={(e) => setInput(e.target.value) }
        onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSearch();
            }
          }}
        />

        <button className="buttonsearch" onClick={handleSearch}>
          <FiSearch size = {25} color = "#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">

          <h3>CEP:{cep.cep}</h3>
          <span>Logradouro: {cep.logradouro}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade}</span>
          <span>Estado: {cep.uf}</span>
          <span>DDD: {cep.ddd}</span>

        </main>
      )}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Uedson Gaiek. Todos os direitos reservados.</p>
      </footer>
    </div>
    
  );
}

export default App;