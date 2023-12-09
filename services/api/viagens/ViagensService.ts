import { Enviroment } from '../../../shared/enviroment';
import { Api } from '../axios-config';

export interface IListagemViagem {
    id: number;
    cidade: string;
    dataIda: Date;
    dataVolta: Date;
    categoriaT: number;
    valorTrans: number;
    nomeHotel: string;
    valorHotel: number;
    adiantamento: number;
    adiantData: Date;
    imagemTrans: string;
    imagemHotel: string;
}

export interface IDetalheViagem {
    id: number;
    cidade: string;
    dataIda: Date;
    dataVolta: Date;
    categoriaT: number;
    valorTrans: number;
    nomeHotel: string;
    valorHotel: number;
    adiantamento: number;
    adiantData: Date;
}
type TViagensComTotalCount = {
    data: IListagemViagem[];
    totalCount: number;
}

const getAll = async (page = 1, filter= ''): Promise<TViagensComTotalCount | Error> => {
    try {
        const urlRelativa = `/viagens?page=${page}&limit=${Enviroment.LIMITE_DE_LINHAS}&filter=${filter}`;
        
        const { data, headers } = await Api().get(urlRelativa);

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

const getById = async (id: number): Promise<IListagemViagem | Error> => {
    try {
        const { data } = await Api().get(`/viagens/${id}`)
        
        if (data) {
            return data;
        }

        return new Error('Erro ao consultar o registros.')
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao consultar o registros.')
    }
}

const create = async (
    dados: Omit<IDetalheViagem, 'id'>, 
    imagemTrans: File, 
    imagemHotel: File, 
    adiantImagem: File,
    userId: string
    ): Promise<number | Error> => {

    try {
        const formData = new FormData();
        formData.append('cidade', dados.cidade);
        formData.append('userId', String(userId)); 
        formData.append('dataIda', dados.dataIda.toISOString());
        formData.append('dataVolta', dados.dataVolta.toISOString());
        formData.append('categoriaT', String(dados.categoriaT));
        formData.append('valorTrans', String(dados.valorTrans));
        formData.append('imagemTrans', imagemTrans);
        formData.append('nomeHotel', dados.nomeHotel);
        formData.append('valorHotel', String(dados.valorHotel));
        formData.append('imagemHotel', imagemHotel);
        formData.append('adiantamento', String(dados.adiantamento));
        formData.append('adiantData', dados.adiantData.toISOString());
        formData.append('adiantImagem', adiantImagem);

        const { data } = await Api().post<IDetalheViagem>('/viagens', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        if (data) {
          return data.id;
        }

        return new Error('Erro ao criar os registros.')
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao criar os registros.')
    }
}

const updateById = async (id: number, dados: IDetalheViagem): Promise<void | Error> => {
    try {
        await Api().put(`/viagens/${id}`, dados)
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao atualizar os registros.')
    }
}

const deletebyId = async (id: number): Promise<void | Error> => {
    try {
        await Api().delete(`/viagens/${id}/`)
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao deletar os registros.')
    }
}
export const ViagensService = {
    getAll,
    getById,
    create,
    updateById,
    deletebyId
}