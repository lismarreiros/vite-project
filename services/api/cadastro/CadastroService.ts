import { Api } from '../axios-config';

interface INovoUsuario {
    id: number,
    nome: string;
    email: string;
    senha: string;
}


const create = async (dados: Omit<INovoUsuario, 'id'>): Promise<number | Error> => {
    try {
        const { data } = await Api().post<INovoUsuario>('/signup', dados);
        
        if (data) {
          return data.id;
        }

        return new Error('Erro ao criar os registros.')
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao criar os registros.')
    }
}

export const CadastroService = {
    create,
}