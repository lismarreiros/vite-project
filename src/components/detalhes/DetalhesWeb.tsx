import { Stack, Typography, Card, Button, Box, Table, TableBody, TableCell, TableContainer, TableRow, TableHead,
CardContent, IconButton, Modal, Divider, TableFooter, LinearProgress } from "@mui/material";
import { DeleteOutline, LocalPrintshopOutlined, ShareOutlined, FmdGoodOutlined, CalendarMonthOutlined, AddCircle, 
AttachFile, RemoveCircle, Hotel, Restaurant, DirectionsBus, DirectionsCar, Pending, Payments } from '@mui/icons-material';

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { useDebounce } from "../../../shared/hooks/UseDebounce";
import UseTripExpenses from "../../../shared/hooks/UseTripExpenses";
import { ViagensService, IListagemViagem } from "../../../services/api/viagens/ViagensService";
import NovaDespesaForm from './NovaDespesa';  
import { NavBar } from "../layouts/Navbar";
import { DespesasService } from "../../../services/api/despesas/DespesasService";


{/* style do Modal */}
const style = {
position: 'absolute' as const,
top: '50%',
left: '50%',
transform: 'translate(-50%, -50%)',
width: 592,
height: 599,
bgcolor: '#F5F5F6',
borderRadius: '5px',
boxShadow: 24,
p: 4,
};


export default function DetalhesWeb () {
  const navigate = useNavigate();
  const { debounce } = useDebounce();
  const { id } = useParams<'id'>();
  const [card, setCard] = useState<IListagemViagem>();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [diferenca, setDiferenca] = useState(0);

// called use trip expenses hook
  const { expenses, loadingExpenses } = UseTripExpenses(id || '0');

  useEffect(() => {

    debounce(() => {
      ViagensService.getById(Number(id))
        .then((result) => {

        if (result instanceof Error) {
          alert(result.message);
          navigate('/viagens');
        } else {
          // console.log(result);
          setCard(result); 
        }
      });
  });
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const totalExpenses = expenses.reduce(
      (total, expense) => total + expense.valor,
      0
    );
    setTotalAmount(totalExpenses);
    if (card) setDiferenca(card.adiantamento - totalExpenses);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses]);

  const handleDelete = (id: number) => {
    if (confirm('Realmente dejesa apagar?')) {
      ViagensService.deletebyId(id)
      .then(result => {
        if (result instanceof Error) {
          alert(result.message)
        } else {
          alert('Registro apagado com sucesso!');
          navigate('/viagens');
        }
      })
    }
  }

  const handleDeleteDespesa = () => {
    if (confirm('Realmente dejesa apagar?')) {
      DespesasService.deletebyId()
      .then(result => {
        if (result instanceof Error) {
          alert(result.message)
        } else {
          alert('Registro apagado com sucesso!');
          navigate('/viagens');
        }
      })
    }
  }
    

  {/* ícones da categoria */}
  const getCategoryIcon = (category : number) => {
  switch (category) {     
    case 1: 
    return <Box sx={{  display:'flex', flexDirection: 'row', gap: 1, alignItems: 'center', color: '#8D8D99'}} >
    <DirectionsCar/> Locomoção </Box>;

    case 2:
    return <Box sx={{  display:'flex', flexDirection: 'row', gap: 1, alignItems: 'center', color: '#8D8D99'}}> 
    <Restaurant fontSize="small"/> Alimentação </Box>;
    
    case 3: 
    return <Box sx={{  display:'flex', flexDirection: 'row', gap: 1, alignItems: 'center', color: '#8D8D99'}}>
    <Pending/> Outros </Box>;    
    
    case 4: 
    return <Box sx={{  display:'flex', flexDirection: 'row', gap: 1, alignItems: 'center', color: '#8D8D99'}}> 
    <Hotel/> Hotel </Box>;

    case 5: 
    return <Box sx={{  display:'flex', flexDirection: 'row', gap: 1, alignItems: 'center', color: '#8D8D99'}}>
    <DirectionsBus/> Transporte </Box>;

    }
  };
    
  {/* abrir o modal */}
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  {/* funçao para formatar o número para valor monetário */}
  const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    });
  };

   {/* funçao para formatar data */}
  const formatDate = (date: string | number | Date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

return (
  <Box>
   <NavBar/>

   {/*BOTÕES */}
   <Stack direction="row" spacing={2} sx={{ marginTop: 10, marginLeft: 12, }}>
    
   <Button 
    onClick={() => navigate('')}
    size="medium" 
    sx={{ backgroundColor: '#CADCF8', color: '#5497FD', padding: 1.5}}
    startIcon={<ShareOutlined />}>Compartilhar</Button>

   <Button
    onClick={() => navigate('')}
    size="medium" 
    sx={{ backgroundColor: '#CADCF8', color: '#5497FD', padding: 1.5}}
    startIcon={<LocalPrintshopOutlined />}>Imprimir</Button>

   <Button
    onClick={() => handleDelete(Number(id))}
    size="medium" 
    sx={{backgroundColor: '#CADCF8', color: '#5497FD', padding: 1.5}}
    startIcon={<DeleteOutline />}>Deletar</Button>
    
   </Stack>
 
   {/* VIAGEM */}

   <Typography variant="h6" sx={{ marginLeft: 12, marginTop: 5, fontWeight: 'bold', color: '#3C3C3C'}}>Detalhes da Viagem # {id}</Typography>
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: 14}}>


   {/* DETALHES FORNECIDOS PELO FORMULÁRIO */}
  
    <Card sx={{ width: '460px', height: '500px', marginLeft: 12, marginTop: 2, backgroundColor: '#F5F5F6', boxShadow: 'none'}}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 3}}>

    {/* DESTINO */}

    <Box sx={{ display:'flex', flexDirection:'column'}}>
       <Box sx={{  display:'flex', flexDirection: 'row', gap:0.25, alignItems: 'center'}}>
        <FmdGoodOutlined fontSize="small" sx={{color:'#7C7C8A'}}/>
        <Typography variant="subtitle1" color="text.secondary">Destino</Typography>
       </Box>
       { card && ( <Typography sx={{ fontWeight: 500}}>{card.cidade}</Typography> )}
    </Box>
 

    {/* DATA DE IDA */}
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5}}>
 
    <Box sx={{ display:'flex', flexDirection:'column'}}>
      <Box sx={{  display:'flex', flexDirection: 'row', gap:0.25, alignItems: 'center'}}>
        <CalendarMonthOutlined fontSize="small" sx={{color:'#7C7C8A'}}/>
        <Typography variant="subtitle1" color="text.secondary">Data de Ida</Typography>
      </Box>
      { card && ( <Typography sx={{ fontWeight: 500}}>{formatDate(card.dataIda)}</Typography> )}
    </Box>

    {/* DATA DE VOLTA */}
    <Box sx={{ display:'flex', flexDirection:'column'}}>
      <Box sx={{  display:'flex', flexDirection: 'row', gap:0.25, alignItems: 'center'}}>
        <CalendarMonthOutlined fontSize="small" sx={{color:'#7C7C8A'}}/>
        <Typography variant="subtitle1" color="text.secondary">Data de Volta</Typography>
      </Box>
      { card && ( <Typography sx={{ fontWeight: 500}}>{formatDate(card.dataVolta)}</Typography> )}
    </Box>
    
    </Box>

    <Divider/>

    {/* RESUMO FINANCEIRO */}
    <Typography variant="h6">Resumo Financeiro</Typography>
      
    {/* ADIANTAMENTO */}
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5}}>

    <Box sx={{ display:'flex', flexDirection:'column'}}>
     <Box sx={{  display:'flex', flexDirection: 'row', gap:0.75, alignItems: 'center'}}>
      <Payments fontSize="small" sx={{color:'#7C7C8A'}}/>
      <Typography variant="subtitle1" color="text.secondary">Adiatamento</Typography>
     </Box>
     { card && ( <Typography sx={{ fontWeight: 500}}>{formatCurrency(card.adiantamento)}</Typography> )}
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
        <Typography variant="subtitle1" color="text.secondary">A Receber / A Pagar</Typography>
      </Box>
        <Typography sx={{ fontWeight: 500, color: diferenca >= 0 ? 'green' : 'red' }}> {formatCurrency(Math.abs(diferenca))}</Typography>
        <Typography sx={{ color: '#7C7C8A' }}>{diferenca >= 0 ? 'A Receber' : 'A Pagar'}</Typography>
    </Box>

    </CardContent>
   </Card> 
   

   <Box>
    <Box sx={{display:'flex', flexDirection: 'row', width: '740px', justifyContent: 'space-between', marginTop: 3, alignItems: 'center'}}>
      <Typography variant="h6" sx={{ marginLeft: 5, marginTop: 1, fontWeight: 'bold', color: '#3C3C3C' }}>Custos</Typography>

      {/* botão de abrir o modal */}
      <Button 
        onClick={handleOpen} 
        size="small" 
        sx={{backgroundColor: '#CADCF8', color: '#5497FD', marginTop: 2}} 
        startIcon={<AddCircle />}> Adicionar Custo 
      </Button>
    </Box>

    {/* tabela de custos */}

  <TableContainer>
    <Table sx={{ width: '706px', marginLeft: 5, marginTop: 1, marginBottom: 10 }} aria-label="simple table">
  
    <TableHead>
      <TableRow>
      <TableCell></TableCell>
      <TableCell>Descrição </TableCell>
      <TableCell align="left">Data</TableCell>
      <TableCell align="left">Categoria</TableCell>
      <TableCell align="left">Valor</TableCell>
      <TableCell align="left">Anexos</TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
   
    {expenses.map((row => (
    <TableRow 
    key={row.id}
    sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor:'#FFFFFF', boxShadow: 0.75, borderRadius: 0, color: '#8D8D99' }}>
    
    <TableCell>
      <IconButton 
      onClick={() => handleDeleteDespesa()}
      aria-label="expand row" size="small" color="error">
        <RemoveCircle/>
      </IconButton>
    </TableCell>

    <TableCell sx={{ color: '#8D8D99'}} component="th" scope="row">{row.descricao}</TableCell>
    <TableCell sx={{ color: '#8D8D99'}} align="left"> {formatDate(row.data)}</TableCell>
    <TableCell sx={{ color: '#8D8D99'}} align="left">{getCategoryIcon(row.categoriaId) }</TableCell>
    <TableCell sx={{ color: '#8D8D99'}} align="left">{formatCurrency(row.valor)}</TableCell>

    <TableCell sx={{ color: '#8D8D99'}} align="left"> 
      <IconButton sx={{ backgroundColor: '#CADCF8', color: '#0065FF'}} >  
        <AttachFile/>
      </IconButton>
    </TableCell>
    </TableRow>
    )))}

    </TableBody>
    
    <TableFooter>
    {loadingExpenses && (
       <TableRow>
       <TableCell colSpan={6}>
         <LinearProgress variant='indeterminate' />
       </TableCell>
        </TableRow>
     )}
    </TableFooter>
</Table>
</TableContainer>
</Box>
</Box>

<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description">
  <Box sx={style}>
  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 1}}>
    <RemoveCircle/>
  <Typography id="modal-modal-title" variant="h6" component="h2">
    Nova Despesa
  </Typography>
 
  </Box>
  {/* formulário para adicionar uma nova despesa */}
  <Box sx={{ display: 'flex', justifyContent: 'center'}}>

  <NovaDespesaForm/>
  
  </Box>
    

  </Box>
  </Modal>

</Box>
  )
}