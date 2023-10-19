using ProAtividade.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProAtividade.Domain.Interfaces.Repositories
{
    public interface IAtividadeRepo : IGeralRepo
    {
        Task<IEnumerable<Atividade>> PegaTodasAtividadeAsync();
        Task<Atividade> PegaAtividadePorIdAsync(int atividadeId);
        Task<Atividade> PegaAtividadePorTituloAsync(string atividadeTitulo);
    }
}
