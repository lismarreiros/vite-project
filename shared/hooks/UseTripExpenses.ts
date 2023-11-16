import { useEffect, useState } from "react";
import {
  DespesasService,
  IListagemDespesas,
} from "../../services/api/despesas/DespesasService";
import { ViagensService } from "../../services/api/viagens/ViagensService";

const tripExpenseFactory = (
  id: number = 0,
  descricao: string,
  valor: number,
  data: Date,
  viagemId: number,
  categoriaId: number
) => {
  return {
    id,
    descricao,
    valor,
    data,
    viagemId,
    categoriaId,
  };
};

const UseTripExpenses = (tripId: string) => {
  const [expenses, setExpenses] = useState<IListagemDespesas[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loadingExpenses, setLoadingExpenses] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getExpenses(tripId);
  }, [tripId]);

  const getExpenses = async (tripId: string) => {
    setLoadingExpenses(true);
    try {
      const response = await DespesasService.getAll(Number(tripId));

      if (response instanceof Error) {
        throw response;
      }

      // depesas iniciais da viagem
      const trip = await ViagensService.getById(Number(tripId));
      if (trip instanceof Error) {
        throw trip;
      }
      const initialExpenses = [
        tripExpenseFactory(
          0,
          "Hotel",
          trip.valorHotel,
          trip.dataIda,
          Number(tripId),
          4
        ),
        tripExpenseFactory(
          0,
          "Transporte",
          trip.valorTrans,
          trip.dataIda,
          Number(tripId),
          5
        ),
      ];

      setExpenses([...initialExpenses, ...response.data]);

      // total
      const totalExpenses = expenses.reduce(
        (total, expense) => total + expense.valor,
        0
      );

      setTotal(totalExpenses);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoadingExpenses(false);
    }
  };

  return { expenses, total, loadingExpenses, error };
};

export default UseTripExpenses;
