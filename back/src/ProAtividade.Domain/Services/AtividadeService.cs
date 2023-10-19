using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;
using ProAtividade.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProAtividade.Domain.Services
{
    public class AtividadeService : IAtividadeService
    {
        private readonly IAtividadeRepo _atividadeRepo;

        public AtividadeService(IAtividadeRepo atividadeRepo)
        {
            _atividadeRepo = atividadeRepo;
        }

        public async Task<Atividade> AdicionarAtividadeAsync(Atividade model)
        {
            if (await _atividadeRepo.PegaAtividadePorTituloAsync(model.Titulo) != null)
                throw new Exception("Já existe uma atividade com esse título");

            if(await _atividadeRepo.PegaAtividadePorIdAsync(model.Id) == null)
            {
                _atividadeRepo.Adicionar(model);
                if (await _atividadeRepo.SalvarMudancasAsync())
                    return model;
            }

            return null;
        }

        public async Task<Atividade> AtualizarAtividadeAsync(Atividade model)
        {
            if (model.DataConclusao != null)
                throw new Exception("não se pode alterar uma atividade já concluída");

            if(await _atividadeRepo.PegaAtividadePorIdAsync(model.Id) != null)
            {
                _atividadeRepo.Atualizar(model);
                if (await _atividadeRepo.SalvarMudancasAsync())
                    return model;
            }

            return null;
        }

        public async Task<bool> ConcluirAtividadeAsync(Atividade model)
        {
            if(model != null)
            {
                model.Concluir();
                _atividadeRepo.Atualizar(model);
                return await _atividadeRepo.SalvarMudancasAsync();
            }

            return false;
        }

        public async Task<bool> DeletarAtividadeAsync(int atividadeId)
        {
            var atividade = await _atividadeRepo.PegaAtividadePorIdAsync(atividadeId);

            if (atividade == null)
                throw new Exception("A atividade que você tentou deletar não existe");

            _atividadeRepo.Deletar(atividade);

            return await _atividadeRepo.SalvarMudancasAsync();
        }

        public async Task<Atividade> PegarAtividadePorIdAsync(int atividadeId)
        {
            try
            {
                var atividade = await _atividadeRepo.PegaAtividadePorIdAsync(atividadeId);
                
                if(atividade == null) return null;

                return atividade;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<Atividade>> PegarTodasAtividadesAsync()
        {
            try
            {
                var atividades = await _atividadeRepo.PegaTodasAtividadeAsync();

                if (atividades == null) return null;

                return atividades;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
    }
}
