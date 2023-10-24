import { IconButton, Stack, Typography, Box, CardContent, Card, Divider,  } from '@mui/material';
import { DeleteOutline, LocalPrintshopOutlined, ShareOutlined, EditNoteOutlined, FmdGoodOutlined, CalendarMonthOutlined, AddCircle, 
AttachFile, RemoveCircle, Hotel, Restaurant, DirectionsBus, DirectionsCar, Pending, Payments } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { NavBar } from '../layouts/Navbar';

const DetalhesMobile = () => {
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

   ];

    
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

  return (
    <div>
    <NavBar/>

    {/* BOTÕES DE EDITAR, DELETAR... */}
    <Stack
    direction="row"
    spacing={2}
    sx={{ marginTop: 7, justifyContent: 'center' }}>
 
    <IconButton
    onClick={() => navigate('')}
    size="small" 
    sx={{backgroundColor: '#CADCF8', color: '#5497FD', padding: 1.5}}>
    <EditNoteOutlined/></IconButton>
     
    <IconButton 
    onClick={() => navigate('')}
    size="small" 
    sx={{ backgroundColor: '#CADCF8', color: '#5497FD', padding: 1.5}}>
    <ShareOutlined/></IconButton>
 
    <IconButton
    onClick={() => navigate('')}
    size="small" 
    sx={{ backgroundColor: '#CADCF8', color: '#5497FD', padding: 1.5}}>
    <LocalPrintshopOutlined/></IconButton>
 
    <IconButton
    onClick={() => navigate('')}
    size="small" 
    sx={{backgroundColor: '#CADCF8', color: '#5497FD', padding: 1.5}}>
    <DeleteOutline /></IconButton>
     
    </Stack>
    
    <Typography variant="subtitle1" 
    sx={{ marginLeft: 3, 
    marginTop: 5, 
    fontWeight: 'bold', 
    color: '#3C3C3C'}}>Detalhes da Viagem #12323</Typography>
    
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
    <Typography variant="body2">Resumo Financeiro</Typography>
      
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
</Box>
 
{/* CUSTOS */}
<Box 
sx={{display:'flex', 
flexDirection: 'row', 
justifyContent: 'space-between',
alignItems: 'center',
padding: 3,
paddingBottom: 2}}>

  <Typography variant="subtitle1" 
  sx={{ fontWeight: 'bold', 
  color: '#3C3C3C'}}>Custos</Typography>

  {/* botão de abrir o modal */}
  <IconButton
  onClick={() => navigate('/novadespesa')}
  size="small" 
  sx={{backgroundColor: '#CADCF8', color: '#5497FD'}}>
  <AddCircle /> 
 </IconButton>
</Box>

<Stack>
  <Card sx={{ height: '87px', backgroundColor: '#FFFFFF', margin: 2, display:'flex', flexDirection: 'row', padding: 2, justifyContent: 'space-evenly'}}>
    
  <IconButton
  aria-label="expand row"
  size="small"
  color="error">
  <RemoveCircle/>
  </IconButton>
 
  {rows.map((row) => ( 
  <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2}}>
  <Box>
    <Typography variant="subtitle1">{row.description}</Typography>
    <Typography variant="subtitle1">{row.date}</Typography>
    <Typography>{getCategoryIcon(row.category)}</Typography>
  </Box>
    <Box sx={{ alignSelf: 'center'}}>
     <Typography>R${row.value}</Typography>
    </Box>
   
    <IconButton
    aria-label="expand row"
    size="small"
    sx={{ color: '#0065FF'}}
    ><AttachFile/>{row.attachments}</IconButton> 
    </Box>
 ))}

    </Card>
</Stack>
</div>
  )
}

export default DetalhesMobile