import React, { useState } from "react";
import TitlePage from "../../components/TitlePage";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const clientes = [
  {
    id: 1,
    nome: "Rockstar Games",
    responsavel: "Obbe",
    contato: 32323232,
    situacao: "Ativo",
  },
  {
    id: 2,
    nome: "X",
    responsavel: "Elon",
    contato: "85326589",
    situacao: "Ativo",
  },
  {
    id: 3,
    nome: "Amazon",
    responsavel: "Obbe",
    contato: "54542525",
    situacao: "Desativado",
  },
  {
    id: 4,
    nome: "Google",
    responsavel: "Jack",
    contato: "98989898",
    situacao: "Desativado",
  },
  {
    id: 5,
    nome: "Microsoft",
    responsavel: "Jhon",
    contato: "85858585",
    situacao: "Ativo",
  },
];

export default function ClienteLista() {
  const history = useHistory();
  const [termoBusca, setTermoBusca] = useState("");

  const handleInputChange = (e) => {
    setTermoBusca(e.target.value);
  };

  const clientesFiltrados = clientes.filter((cliente) => {
    //transforma os valores do obj que está verificando em string, separando por espaço e verificando qual deles possui o termo de busca
    return Object.values(cliente)
      .join(" ")
      .toLocaleLowerCase()
      .includes(termoBusca.toLocaleLowerCase());
  });

  const novoCliente = () => {
    history.push("/cliente/detalhe");
  };

  return (
    <>
      <TitlePage title="Cliente Lista">
        <Button variant="outline-secondary" onClick={novoCliente}>
          <i className="fa fa-plus me-2" />
          Novo Cliente
        </Button>
      </TitlePage>
      <InputGroup className="mt-3 mb-3">
        <InputGroup.Text>Buscar</InputGroup.Text>
        <Form.Control onChange={handleInputChange} placeholder="Buscar" />
      </InputGroup>
      <table className="table table-striped table-hover">
        <thead className="table-dark mt-3">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Responsável</th>
            <th scope="col">Contato</th>
            <th scope="col">Situação</th>
            <th scope="col">Opções</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.responsavel}</td>
              <td>{cliente.contato}</td>
              <td>{cliente.situacao}</td>
              <td>
                <div>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() =>
                      history.push(`/cliente/detalhe/${cliente.id}`)
                    }
                  >
                    <i className="fas fa-user-edit me-2" />
                    Editar
                  </button>
                  <button className="btn btn-sm btn-outline-danger me-2">
                    <i className="fas fa-user-times me-2" />
                    Desativar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
