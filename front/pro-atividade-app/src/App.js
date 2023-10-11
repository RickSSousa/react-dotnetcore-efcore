import { useState, useEffect } from 'react';
import './App.css';

import AtividadeForm from './components/AtividadeForm'
import AtividadeLista from './components/AtividadeLista'

function App() {

  const [atividades, setAtividades] = useState([])
  const [atividade, setAtividade] = useState({ id: 0 })
  const [index, setIndex] = useState(0)
  
  useEffect(() => {
    atividades.length <= 0 ? setIndex(1) : setIndex(Math.max.apply(
      Math,
      atividades.map((atv) => atv.id)
    ) + 1)
  }, [atividades])
  
  function addAtividade(ativ){

    //atividades.pusg(atividade);
    //posso também, ao invés de usar push, adicionar esse obj lá naquele array novo criado no state, pelo spread operator

    // colocando o array atualizado de atividades no setState, ele não atualiza de fato o estado (acredito que o estado muda antes de acontecer o push), então para que isso aconteça deve-se usar o spread operator, onde ele vai copiar o array de atividades dentro de um outro array, do zero
    setAtividades([...atividades, {...ativ, id: index}])
  }

  function pegarAtividade(id){
    const atividade = atividades.filter(atv => atv.id === id)
    setAtividade(atividade[0])
  }

  function deletarAtividade(id){
    //Do array d atividades, para cada atividade, se o id for diferente do q to passando, adiciono ela no novo array d atividades, deixando de fora a q quero deletar
    const atividadesFiltradas = atividades.filter(atv => atv.id !== id)
    setAtividades([...atividadesFiltradas])
  }

  function atualizarAtividade (ativ){
    //aqui eu passo por cada uma das atividades e verifico se o id é o mesmo do que a ativ que estou atualizando. Se for o mesmo, eu substituo a atividade já contida no array de atividades, se não, eu mantenho ela mesma.
    setAtividades(atividades.map(
      item => item.id === ativ.id ? ativ : item
    ))
    setAtividade({id:0})
  }

  function cancelarAtividade(){
    setAtividade({id:0})
  }

  return (
    <>
      <AtividadeForm
        addAtividade = {addAtividade}
        atualizarAtividade = {atualizarAtividade}
        cancelarAtividade = {cancelarAtividade}
        ativSelecionada={atividade}
        atividades = {atividades}
      />
      <AtividadeLista
        atividades={atividades}
        pegarAtividade={pegarAtividade}
        deletarAtividade={deletarAtividade}
      />
    </>
  );
}

export default App;
