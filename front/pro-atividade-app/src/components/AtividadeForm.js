import { useEffect, useState } from 'react'

const atividadeInicial = {
  id: 0,
  titulo: '',
  prioridade: 0,
  descricao: ''
}

export default function AtividadeForm(props) {

  const [atividade, setAtividade] = useState(atividadeAtual())

  useEffect(() => {
    if(props.ativSelecionada.id !== 0){
      setAtividade(props.ativSelecionada)
    }
  }, [props.ativSelecionada])

  //essa func captura o que estou digitando no meu input
  const inputTextHandler = (e) => {
    const {name, value} = e.target
    //copia o obj atividade e adiciona/sobrescrever o campo "id" (que foi definido ali na prop dp input "name='id'") e o valor que foi digitado nesse campo lá
    setAtividade({...atividade, [name]: value})
  }

  function atividadeAtual () {
    if(props.ativSelecionada.id !== 0 && props.ativSelecionada.id !== undefined){
      return props.ativSelecionada
    }
    else{
      return atividadeInicial
    }
  }

  const handleCancelar = (e) => {
    e.preventDefault()

    props.cancelarAtividade()

    setAtividade(atividadeInicial)
  }

  //quando eu clicar no botão "Adicionar" ou "Salvar, ele tem q entender o que é que está sendo feito:
  const handleSubmit = (e) => {
    e.preventDefault()

    if(props.ativSelecionada.id !== undefined && props.ativSelecionada.id !== 0){
      props.atualizarAtividade(atividade)
    }
    else{
      props.addAtividade(atividade)
    }
    setAtividade(atividadeInicial)
  }

  return (
    <>
      <h1>Atividade {atividade.id !== 0 ? atividade.id : ''}</h1>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Título</label>
          <input 
            name='titulo'
            id="titulo" 
            type="text" 
            className="form-control" 
            onChange={inputTextHandler}
            value={atividade.titulo}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Prioridade</label>
          <select 
            name='prioridade'
            id="prioridade" 
            className="form-select"
            value={atividade.prioridade}
            onChange={inputTextHandler}
          > 
            <option defaultValue="0">Selecione...</option>
            <option value="1">Baixa</option>
            <option value="2">Normal</option>
            <option value="3">Alta</option>
          </select>
        </div>
        <div className="col-md-12">
          <label className="form-label">Descrição</label>
          <textarea 
            name='descricao'
            id="descricao" 
            type="text" 
            className="form-control"
            onChange={inputTextHandler}
            value={atividade.descricao}
          /> 
        <hr/>
        </div>
          {/* por padrão, o primeiro botão dentro da tag form é o botão de submit, então tenho que me previnir desse evento de reload dentro da function. Além disso, devo remover os parenteses da chamada da função para evitar que ela execute antes do tempo e quebre          */}
        <div className='col-12 mt-0'>
          {
            atividade.id === 0 ?(
            <button 
              className='btn btn-outline-secondary' 
              type='submit'
            >
              <i className='fas fa-plus me-2'></i>
              Atividade
            </button>
            ):(
            <>
              <button 
                className='btn btn-outline-success me-2' 
                type='submit'
              >
                <i className='fas fa-plus me-2'></i>
                Salvar
              </button>
              <button 
                className='btn btn-outline-warning' 
                onClick={handleCancelar}
              >
                <i className='fas fa-plus me-2'></i>
                Cancelar
              </button>
              </>
            )
          }
        </div>
      </form>
    </>
  )
}
