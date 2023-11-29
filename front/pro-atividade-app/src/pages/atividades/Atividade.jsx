import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap'

import api from '../../api/atividade'
import AtividadeForm from './AtividadeForm';
import AtividadeLista from './AtividadeLista';
import TitlePage from '../../components/TitlePage';

export default function Atividade() {

  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [atividades, setAtividades] = useState([])
  const [atividade, setAtividade] = useState({ id: 0 })
  
  const handleAtividadeModal = () => {
    setShowAtividadeModal(!showAtividadeModal);
  }

  const handleConfirmModal = (id) => {
    if(id !== 0 && id !== undefined){
      const atividade = atividades.filter(atv => atv.id === id)
      setAtividade(atividade[0])
    }else{
      setAtividade({id:0})
    }
    setShowConfirmModal(!showConfirmModal);
  }
  
  const pegarTodasAtividades = async () => {
    const response = await api.get('atividade')
    console.log(response.data)
    return response.data
  }

  useEffect(() => {
    const getAtividades = async () => {
      const todasAtividades = await pegarTodasAtividades();
      if(todasAtividades) setAtividades(todasAtividades)
    }
    getAtividades();
  }, [])
  
  const addAtividade = async (ativ) =>{
    const response = await api.post('atividade', ativ)
    setAtividades([...atividades, response.data])
    handleAtividadeModal()
  }

  const pegarAtividade = (id) => {
    const atividade = atividades.filter(atv => atv.id === id)
    setAtividade(atividade[0])
    handleAtividadeModal()
  }

  const deletarAtividade = async (id) => {
    handleConfirmModal(0)
    if(await api.delete(`atividade/${id}`)){
      const atividadesFiltradas = atividades.filter(atv => atv.id !== id)
      setAtividades([...atividadesFiltradas])
    }
  }

  const atualizarAtividade = async (ativ) => {
    const response = await api.put(`atividade/${ativ.id}`, ativ)
    //abaixo estou extraindo apenas o id do data, "forma elegante", mas poderia ser res.data.id ou ativ.id
    const {id} = response.data
    setAtividades(atividades.map(
      item => item.id === id ? response.data : item
    ))
    setAtividade({id:0})
    handleAtividadeModal()
  }

  const cancelarAtividade = () => {
    setAtividade({id:0})
    handleAtividadeModal()
  }

  const adicionarAtividade = () => {
    setAtividade({id:0})
    handleAtividadeModal()
  }

  return (
    <>
      <TitlePage title={'Atividade ' + (atividade.id !== 0 ? atividade.id : '')}>
        <Button variant="outline-secondary" onClick={adicionarAtividade}>
          <i className='fas fa-plus'/>
        </Button>
      </TitlePage>
      
      <AtividadeLista
        atividades={atividades}
        pegarAtividade={pegarAtividade}
        handleConfirmModal={handleConfirmModal}
      />

      <Modal show={showAtividadeModal} onHide={handleAtividadeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Atividade {atividade.id !== 0 ? atividade.id : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AtividadeForm
            addAtividade = {addAtividade}
            atualizarAtividade = {atualizarAtividade}
            cancelarAtividade = {cancelarAtividade}
            ativSelecionada={atividade}
            atividades = {atividades}
          />
        </Modal.Body>
      </Modal>
      
      
      <Modal size='sm' show={showConfirmModal} onHide={handleConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Excluindo Atividade {atividade.id !== 0 ? atividade.id : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir a Atividade {atividade.id}?
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
          <button className='btn btn-outline-success me-2' onClick={() => deletarAtividade(atividade.id)}>
            <i className='fas fa-check me-2'/>
            Sim
          </button>
          <button className='btn btn-danger me-2' onClick={() => handleConfirmModal(0)}>
            <i className='fas fa-times me-2'/>
            Não
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
