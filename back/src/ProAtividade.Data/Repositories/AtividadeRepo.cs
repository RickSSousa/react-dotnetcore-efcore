using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProAtividade.Data.Context;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;

namespace ProAtividade.Data.Repositories
{
    public class AtividadeRepo : GeralRepo, IAtividadeRepo
    {
        //eu tenho q passar pro GeralRepo o contexto q ele receber, ou a classe reclamará um erro. Isso será feito da maneira abaixo:
        private readonly DataContext _context;

        public AtividadeRepo(DataContext context) : base(context) // o base é o construtor do meu GeralRepo
        {
            _context = context;
        }

        public async Task<Atividade> PegaAtividadePorIdAsync(int atividadeId)
        {
            //aqui estou "segurando" a tabela que preciso para realizar as operações
            IQueryable<Atividade> query = _context.Atividades;

            query = query.AsNoTracking().OrderBy(ativ => ativ.Id).Where(ativ => ativ.Id == atividadeId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Atividade> PegaAtividadePorTituloAsync(string atividadeTitulo)
        {
            IQueryable<Atividade> query = _context.Atividades;

            query = query.AsNoTracking().OrderBy(ativ => ativ.Id);

            return await query.FirstOrDefaultAsync(ativ => ativ.Titulo == atividadeTitulo);
        }

        public async Task<IEnumerable<Atividade>> PegaTodasAtividadeAsync()
        {
            IQueryable<Atividade> query = _context.Atividades;

            query = query.AsNoTracking().OrderBy(ativ => ativ.Id);

            return await query.ToArrayAsync();
        }
    }
}
