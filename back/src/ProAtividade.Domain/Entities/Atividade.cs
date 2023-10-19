using System;

namespace ProAtividade.Domain.Entities
{
    public class Atividade
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public DateTime DataCriacao { get; set; }
        public DateTime? DataConclusao { get; set; }
        public Prioridade Prioridade { get; set; }


        //os construtores abaixo darão a opção de criar a atividade, mas sempre vai com a data de criação
        public Atividade()
        {
            DataCriacao = DateTime.Now;
            DataConclusao = null;
        }
        public Atividade(int id, string titulo, string descricao) : this() //isso chama o construtor d cima
        {
            Id = id;
            Titulo = titulo;
            Descricao = descricao;
        }

        //método para o controle de conclusão da atividade
        public void Concluir()
        {
            if(DataConclusao == null)
            {
                DataConclusao = DateTime.Now;
            }
            else{
                throw new Exception($"Atividade já concluída em: {DataConclusao?.ToString("dd/MM/yyyy hh:mm")}");
            }
        }
    }
}
