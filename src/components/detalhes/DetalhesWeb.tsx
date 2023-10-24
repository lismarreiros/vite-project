import { Stack, Typography, Card, Button, Box, Table, TableBody, TableCell, TableContainer, TableRow, TableHead,
CardContent, IconButton, Modal, Divider } from "@mui/material";
import { DeleteOutline, LocalPrintshopOutlined, ShareOutlined, EditNoteOutlined, FmdGoodOutlined, CalendarMonthOutlined, AddCircle, 
AttachFile, RemoveCircle, Hotel, Restaurant, DirectionsBus, DirectionsCar, Pending, Payments } from '@mui/icons-material';
import { NavBar } from "../layouts/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NovaDespesaForm from './NovaDespesa';
  
{/* style do Modal */}
const style = {
position: 'absolute' as 'absolute',
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
  
const DetalhesWeb = () => {
const navigate = useNavigate();
const [categories] = useState(["Alimentação", "Transporte", "Hotel", "Locomoção", "Outros"])

  function createData(
  description: string,
  date: string,
  category: string,
  value: number,
  attachments: string[],
  ) {
  return { description, date, category, value, attachments };
  }
    
  const rows = [
  createData('Café da Manhã', '11/02/2002', categories[0], 24.56, []),
  createData('Passagens', '11/02/2002', categories[1], 24.50, []),
  createData('3 Diárias', '11/02/2002', categories[2], 24.50, []),
  createData('Uber', '11/02/2002', categories[3], 24.50, []),
  createData('Ingresso', '11/02/2002', categories[4], 24.50, []),
 ];

{/* ícones da categoria */}
const getCategoryIcon = (category : string) => {
switch (category) {
    case "Alimentação":
    return <Box sx={{  display:'flex', flexDirection: 'row', gap: 1, alignItems: 'center', color: '#8D8D99'}}> 
    <Restaurant fontSize="small"/>
    {category} 
    </Box>;
        
    case "Transporte":
    return <Box sx={{  display:'flex', flexDirection: 'row', gap: 1, alignItems: 'center', color: '#8D8D99'}}>
    <DirectionsBus/>
    {category}
    </Box>;
      
    case "Hotel":
    return <Box sx={{  display:'flex', flexDirection: 'row', gap: 1, alignItems: 'center', color: '#8D8D99'}}> 
    <Hotel/>
    {category}
    </Box>;
     
    case "Locomoção":
    return <Box sx={{  display:'flex', flexDirection: 'row', gap: 1, alignItems: 'center', color: '#8D8D99'}} >
    <DirectionsCar/>
    {category}
    </Box>;
    
    case "Outros":
    return <Box sx={{  display:'flex', flexDirection: 'row', gap: 1, alignItems: 'center', color: '#8D8D99'}}>
    <Pending/>
    {category}
    </Box>;
    }
   };
    
{/* abrir o modal */}
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

return (
  <Box>
   <NavBar/>

   {/*BOTÕES */}
   <Stack
   direction="row"
   spacing={2}
   sx={{ marginTop: 10, marginLeft: 12, }}>

   <Button
   onClick={() => navigate('')}
   size="medium" 
   sx={{backgroundColor: '#CADCF8', color: '#5497FD', padding: 1.5}}
   startIcon={<EditNoteOutlined />}>Editar</Button>
    
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
   onClick={() => navigate('')}
   size="medium" 
   sx={{backgroundColor: '#CADCF8', color: '#5497FD', padding: 1.5}}
   startIcon={<DeleteOutline />}>Deletar</Button>
    
   </Stack>
 
   {/* VIAGEM */}
   <Typography variant="h6" 
   sx={{ marginLeft: 12, 
   marginTop: 5, 
   fontWeight: 'bold', 
   color: '#3C3C3C'}}>Detalhes da Viagem #12323</Typography>
    
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
     <Typography sx={{ fontWeight: 500}}>Bom Jesus - PI</Typography>
    </Box>


   {/* DATA DE IDA */}
   <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5}}>
 
   <Box sx={{ display:'flex', flexDirection:'column'}}>
    <Box sx={{  display:'flex', flexDirection: 'row', gap:0.25, alignItems: 'center'}}>
     <CalendarMonthOutlined fontSize="small" sx={{color:'#7C7C8A'}}/>
     <Typography variant="subtitle1" color="text.secondary">Data de Ida</Typography>
     </Box>
      <Typography sx={{ fontWeight: 500}}>12/12/2002</Typography>
    </Box>

    {/* DATA DE VOLTA */}
    <Box sx={{ display:'flex', flexDirection:'column'}}>
      <Box sx={{  display:'flex', flexDirection: 'row', gap:0.25, alignItems: 'center'}}>
        <CalendarMonthOutlined fontSize="small" sx={{color:'#7C7C8A'}}/>
        <Typography variant="subtitle1" color="text.secondary">Data de Volta</Typography>
      </Box>
      <Typography sx={{ fontWeight: 500}}>12/12/2002</Typography>
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
     <Typography sx={{ fontWeight: 500}}>R$ 123,00 </Typography>
    </Box>

    {/* CUSTOS */}
    <Box sx={{ display:'flex', flexDirection:'column'}}>
      <Box sx={{  display:'flex', flexDirection: 'row', gap:0.25, alignItems: 'center'}}>
      <RemoveCircle fontSize="small" sx={{color:'#7C7C8A'}}/>
      <Typography variant="subtitle1" color="text.secondary">Total dos Custos</Typography>
      </Box>
      <Typography sx={{ fontWeight: 500}}>R$ 789,99</Typography>
    </Box>

  </Box>
    
    {/* A RECEBER OU A PAGAR */}
    <Box sx={{ display:'flex', flexDirection:'column'}}>
      <Box sx={{  display:'flex', flexDirection: 'row', gap:0.75, alignItems: 'center'}}>
      <Payments fontSize="small" sx={{color:'#7C7C8A'}}/>
      <Typography variant="subtitle1" color="text.secondary">A Receber</Typography>
      </Box>
      <Typography sx={{ fontWeight: 500}}>R$ 789,99</Typography>
    </Box>

    </CardContent>
   </Card>

   <Box>
    <Box 
    sx={{display:'flex', 
    flexDirection: 'row', 
    width: '740px', 
    justifyContent: 'space-between',
    marginTop: 3,
    alignItems: 'center'}}>

    <Typography variant="h6" 
    sx={{ marginLeft: 5, 
    marginTop: 1, 
    fontWeight: 'bold', 
    color: '#3C3C3C'
    }}>Custos</Typography>

    {/* botão de abrir o modal */}
    <Button
    onClick={handleOpen}
    size="small" 
    sx={{backgroundColor: '#CADCF8', color: '#5497FD', marginTop: 2}}
    startIcon={<AddCircle />}
    >
    Adicionar Custo
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
   
    {rows.map((row) => (
    <TableRow
    key={row.description}
    sx={{ '&:last-child td, &:last-child th': { border: 0 }, 
    backgroundColor:'#FFFFFF', 
    boxShadow: 0.75, 
    borderRadius: 0, 
    color: '#8D8D99'
    }}>
    <TableCell>
    <IconButton
    aria-label="expand row"
    size="small"
    color="error"
    >
    <RemoveCircle/>
    </IconButton>
    </TableCell>
    <TableCell sx={{ color: '#8D8D99'}} component="th" scope="row">{row.description}</TableCell>
    <TableCell sx={{ color: '#8D8D99'}} align="left">{row.date}</TableCell>
    <TableCell sx={{ color: '#8D8D99'}} align="left">{getCategoryIcon(row.category)}</TableCell>
    <TableCell sx={{ color: '#8D8D99'}} align="left">R$ {row.value}</TableCell>
    <TableCell sx={{ color: '#8D8D99'}} align="left">
    <IconButton
    sx={{ backgroundColor: '#CADCF8', color: '#0065FF'}}
    >  
    <AttachFile/>{row.attachments}</IconButton></TableCell>
    </TableRow>
    ))}
    </TableBody>
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

export default DetalhesWeb