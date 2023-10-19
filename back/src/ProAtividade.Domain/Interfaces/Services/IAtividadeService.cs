using ProAtividade.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProAtividade.Domain.Interfaces.Services
{
    public interface IAtividadeService
    {
        Task<Atividade> AdicionarAtividadeAsync(Atividade model);
        Task<Atividade> AtualizarAtividadeAsync(Atividade model);
        Task<bool> DeletarAtividadeAsync(int atividadeId);
        Task<bool> ConcluirAtividadeAsync(Atividade model);
        Task<IEnumerable<Atividade>> PegarTodasAtividadesAsync();
        Task<Atividade> PegarAtividadePorIdAsync(int atividadeId);
    }
}
