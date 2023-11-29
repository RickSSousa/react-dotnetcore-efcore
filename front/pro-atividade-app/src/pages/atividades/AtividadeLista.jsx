import React from 'react'
import AtividadeItem from './AtividadeItem';

export default function AtividadeLista(props) {
  return (
    <div className="mt-3">
            {/* o map é tipo o foreach */}
            {props.atividades.map(ativ => (
              // é nescessário ter uma key pois, nesses casos, está repetindo o mesmo elemento mais de uma vez, portanto a key os diferenciam
              <AtividadeItem 
                ativ = {ativ}
                key={ativ.id}
                pegarAtividade={props.pegarAtividade}
                handleConfirmModal={props.handleConfirmModal}
              />
            ))}
      </div>
  )
}
