import { IconButton, Stack, Typography, Box, CardContent, Card, Divider,  } from '@mui/material';
import { DeleteOutline, LocalPrintshopOutlined, ShareOutlined, FmdGoodOutlined, CalendarMonthOutlined, AddCircle, 
AttachFile, RemoveCircle, Hotel, Restaurant, DirectionsBus, DirectionsCar, Pending, Payments } from '@mui/icons-material';


import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { NavBar } from '../layouts/Navbar';
import { ViagensService, IListagemViagem } from "../../../services/api/viagens/ViagensService";
import { DespesasService, IListagemDespesas } from "../../../services/api/despesas/DespesasService"

const DetalhesMobile = () => {
  const navigate = useNavigate();
  const { id = 'nova' } = useParams<'id'>();
  const [rows, setRows] = useState<IListagemDespesas[]>([]);
  const [card, setCard] = useState<IListagemViagem>();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [diferenca, setDiferenca] = useState(0);
  
  
  useEffect(() => {
      ViagensService.getById(Number(id))
        .then((result) => {
  
          if (result instanceof Error) {
            alert(result.message);
            navigate('/viagens');
          } else {
            console.log(result);
            setCard(result);
          }
        });
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
  
  useEffect(() => {
  
    DespesasService.getById(Number(id))
    .then((result) => {
  
      if (result instanceof Error) {
    
        alert(result.message);
     
      } else {
        
      const valorHotel = card ? card.valorHotel : 0;
      const valorTrans = card ? card.valorTrans : 0;
      const dataIda = card ? card.dataIda : new Date();
      const idViagem = card ? card.id : 0;
  
      const despesasDaViagem: IListagemDespesas[] = [
      {
        id: 100,
        descricao: 'Hotel',
        valor: valorHotel,
        data: dataIda,
        viagemId: idViagem,
        categoriaId: 4
      },
      {
        id: 101,
        descricao: 'Transporte',
        valor: valorTrans,
        data: dataIda,
        viagemId: idViagem,
        categoriaId: 5
      },
      ];
       
      const totalAmountFromDespesas = despesasDaViagem.reduce(
        (acc, despesa) => acc + despesa.valor,
        0
      );
        
      const totalAmountFromRows = result.data.reduce(
        (acc, row) => acc + row.valor,
        0
      );
  
      const totalAmount = totalAmountFromRows + totalAmountFromDespesas || 0;
      const diferencaCalculada = totalAmount - (card?.adiantamento || 0);
        
      setRows([...result.data, ...despesasDaViagem]);
        
      setTotalAmount(totalAmount);
      setDiferenca(diferencaCalculada);
      }
      });
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, card]);
  
    
    const getCategoryIcon = (category : number) => {
    switch (category) {
     case 2:
     return <Box sx={{  display:'flex', flexDirection: 'row', gap: 1, alignItems: 'center', color: '#8D8D99'}}> 
     <Restaurant fontSize="small"/>
     Alimentação 
     </Box>;
              
     case 5:
     return <Box sx={{  display:'flex', flexDirection: 'row', gap: 1, alignItems: 'center', color: '#8D8D99'}}>
     <DirectionsBus/>
     Transporte
     </Box>;
          
     case 4:
     return <Box sx={{  display:'flex', flexDirection: 'row', gap: 1, alignItems: 'center', color: '#8D8D99'}}> 
     <Hotel/>
     Hotel
     </Box>;
           
     case 1:
     return <Box sx={{  display:'flex', flexDirection: 'row', gap: 1, alignItems: 'center', color: '#8D8D99'}} >
     <DirectionsCar/>
     Locomoção
     </Box>;
          
     case 3:
     return <Box sx={{  display:'flex', flexDirection: 'row', gap: 1, alignItems: 'center', color: '#8D8D99'}}>
     <Pending/>
     Outros
     </Box>;
     }
    };

    const formatCurrency = (value: number) => {
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      });
    };
    
    const formatDate = (date: string | number | Date) => {
      return new Date(date).toLocaleDateString('pt-BR');
    };

  return (
    <div>
    <NavBar/>

    {/* BOTÕES COMPARTILHAR, DELETAR... */}
    <Stack direction="row" spacing={2} sx={{ marginTop: 7, justifyContent: 'center' }}>
 
      <IconButton onClick={() => navigate('')} size="small" sx={{ backgroundColor: '#CADCF8', color: '#5497FD', padding: 1.5}}>
        <ShareOutlined/>
      </IconButton>
  
      <IconButton onClick={() => navigate('')} size="small" sx={{ backgroundColor: '#CADCF8', color: '#5497FD', padding: 1.5}}>
        <LocalPrintshopOutlined/>
      </IconButton>
  
      <IconButton
      onClick={() => navigate('')} size="small" sx={{backgroundColor: '#CADCF8', color: '#5497FD', padding: 1.5}}>
        <DeleteOutline />
      </IconButton>
      
    </Stack>
    
    <Typography variant="subtitle1" sx={{ marginLeft: 3, marginTop: 5, fontWeight: 'bold', color: '#3C3C3C'}}>Detalhes da Viagem #{id}</Typography>
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: 5}}>

    {/* DETALHES FORNECIDOS PELO FORMULÁRIO */}
    <Card sx={{ width: '460px', backgroundColor: '#F5F5F6', boxShadow: 'none'}}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 3}}>

      {/* DESTINO */}
    <Box sx={{ display:'flex', flexDirection:'column'}}>
        <Box sx={{  display:'flex', flexDirection: 'row', gap:0.25, alignItems: 'center'}}>
          <FmdGoodOutlined fontSize="small" sx={{color:'#7C7C8A'}}/>
          <Typography variant="subtitle1" color="text.secondary">Destino</Typography>
        </Box>
        {card && (
          <Typography sx={{ fontWeight: 500}}>{card.cidade}</Typography>
        )}
    </Box>


      {/* DATA DE IDA */}
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5}}>
    
      <Box sx={{ display:'flex', flexDirection:'column'}}>
        <Box sx={{  display:'flex', flexDirection: 'row', gap:0.25, alignItems: 'center'}}>
          <CalendarMonthOutlined fontSize="small" sx={{color:'#7C7C8A'}}/>
          <Typography variant="subtitle1" color="text.secondary">Data de Ida</Typography>
        </Box>
        {card && (
          <Typography sx={{ fontWeight: 500}}>{formatDate(card.dataIda)}</Typography> 
        )}
      </Box>

    {/* DATA DE VOLTA */}
    <Box sx={{ display:'flex', flexDirection:'column'}}>
      <Box sx={{  display:'flex', flexDirection: 'row', gap:0.25, alignItems: 'center'}}>
        <CalendarMonthOutlined fontSize="small" sx={{color:'#7C7C8A'}}/>
        <Typography variant="subtitle1" color="text.secondary">Data de Volta</Typography>
      </Box>
      { card && (
        <Typography sx={{ fontWeight: 500}}>{formatDate(card.dataVolta)}</Typography>
      )}
      </Box>

    </Box>

    <Divider/>

    {/* RESUMO FINANCEIRO */}
    <Typography variant="body2">Resumo Financeiro</Typography>
      
    {/* ADIANTAMENTO */}
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5}}>

      <Box sx={{ display:'flex', flexDirection:'column'}}>
      <Box sx={{  display:'flex', flexDirection: 'row', gap:0.75, alignItems: 'center'}}>
        <Payments fontSize="small" sx={{color:'#7C7C8A'}}/>
        <Typography variant="subtitle1" color="text.secondary">Adiatamento</Typography>
        </Box>
        {card && (
          <Typography sx={{ fontWeight: 500}}>{formatCurrency(card.adiantamento)}</Typography>
        )}
      </Box>

      {/* CUSTOS */}
      <Box sx={{ display:'flex', flexDirection:'column'}}>
        <Box sx={{  display:'flex', flexDirection: 'row', gap:0.25, alignItems: 'center'}}>
          <RemoveCircle fontSize="small" sx={{color:'#7C7C8A'}}/>
          <Typography variant="subtitle1" color="text.secondary">Total dos Custos</Typography>
        </Box>
        <Typography sx={{ fontWeight: 500}}>{formatCurrency(totalAmount)}</Typography>
      </Box>
    
    </Box>
    
    {/* A RECEBER OU A PAGAR */}
    <Box sx={{ display:'flex', flexDirection:'column'}}>
      <Box sx={{  display:'flex', flexDirection: 'row', gap:0.75, alignItems: 'center'}}>
        <Payments fontSize="small" sx={{color:'#7C7C8A'}}/>
        <Typography variant="subtitle1" color="text.secondary">A Receber</Typography>
      </Box>
        <Typography sx={{ fontWeight: 500, color: diferenca >= 0 ? 'green' : 'red' }}>
          {formatCurrency(Math.abs(diferenca))}
        </Typography>
        <Typography sx={{ color: '#7C7C8A' }}>{diferenca >= 0 ? 'A Receber' : 'A Pagar'}</Typography>
    </Box>

      </CardContent>
      </Card>
  </Box>
 
  
  {/* CUSTOS */}
  <Box sx={{display:'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 3, paddingBottom: 2}}>
  <Typography variant="subtitle1"   sx={{ fontWeight: 'bold',  color: '#3C3C3C'}}>Custos</Typography>
    <IconButton onClick={() => navigate('/novadespesa')} size="small" sx={{backgroundColor: '#CADCF8', color: '#5497FD'}}>
      <AddCircle /> 
    </IconButton>
  </Box>

  {rows.map((row => (
  <Stack>
    <Card sx={{ height: '87px', backgroundColor: '#FFFFFF', margin: 2, display:'flex', flexDirection: 'row', padding: 2, justifyContent: 'space-evenly'}}>
    
      <IconButton aria-label="expand row" size="large" color="error">
        <RemoveCircle/>
      </IconButton>
    
      
      <Box key={row.id} sx={{ display: 'flex', flexDirection: 'row', gap: 2}}>
        <Box>
          <Typography variant="subtitle1">{row.descricao}</Typography>
          <Typography variant="subtitle1">{formatDate(row.data)}</Typography>
          <Typography>{getCategoryIcon(row.categoriaId) }</Typography>
        </Box>
      
        <Box sx={{ alignSelf: 'center'}}>
          <Typography>{formatCurrency(row.valor)}</Typography>
        </Box>
      
        <IconButton aria-label="expand row" size="small" sx={{ color: '#0065FF'}}> <AttachFile/> </IconButton> 
      
      </Box>

    </Card> 
  </Stack>
  )))}

</div>
)}

export default DetalhesMobile