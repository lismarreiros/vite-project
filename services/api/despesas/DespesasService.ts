import { Enviroment } from '../../../shared/enviroment';
import { Api } from '../axios-config';

export interface IListagemDespesas {
    id: number;
    descricao: string;
    valor: number;
    data: Date;
    viagemId: number;
    categoriaId: number;
}


type TDespesasComTotalCount = {
    data: IListagemDespesas[];
    totalCount: number;
}

const getAll = async (page = 1, filter= ''): Promise<TDespesasComTotalCount| Error> => {
    try {
        const urlRelativa = `:id/despesas?page=${page}&limit=${Enviroment.LIMITE_DE_LINHAS}&filter=${filter}`;
        
        const { data, headers } = await Api.get(urlRelativa);

        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Enviroment.LIMITE_DE_LINHAS),
            }
        }

        return new Error('Erro ao listrar os registros')
    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'Erro ao listar os registros.');
    }
}

const getById = async (id: number): Promise<TDespesasComTotalCount | Error> => {
    try {
        const { data } = await Api.get(`:id/despesas/${id}`)
        
        if (data) {
            return data;
        }

        return new Error('Erro ao consultar o registros.')
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao consultar o registros.')
    }
}

const create = async (dados: Omit<IListagemDespesas, 'id'>): Promise<number | Error> => {
    try {
        const { data } = await Api.post<IListagemDespesas>(`:id/despesas/`, dados);
        
        if (data) {
          return data.id;
        }

        return new Error('Erro ao criar os registros.')
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao criar os registros.')
    }
}

const updateById = async (id: number, dados: IListagemDespesas): Promise<void | Error> => {
    try {
        await Api.put(`:id/despesas/${id}`, dados)
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao atualizar os registros.')
    }
}

const deletebyId = async (id: number): Promise<void | Error> => {
    try {
        await Api.delete(`:id/despesas/${id}`)
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao deletar os registros.')
    }
}
export const DespesasService = {
    getAll,
    getById,
    create,
    updateById,
    deletebyId
}