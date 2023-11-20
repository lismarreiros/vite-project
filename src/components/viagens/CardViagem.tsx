import { Button, Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Visibility, LocationOn, SyncAlt, CalendarMonth} from '@mui/icons-material';

import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

import { ViagensService, IListagemViagem } from '../../../services/api/viagens/ViagensService';
import { useDebounce } from '../../../shared/hooks/UseDebounce';

interface CardViagemProps {
  viagem: IListagemViagem;
}

export default function CardViagem({ viagem }: CardViagemProps) {
  const navigate = useNavigate();
  const { debounce } = useDebounce();

  useEffect(() => {

    
    debounce(() => {
      ViagensService.getById(viagem.id)
      .then((result) => {

        if (result instanceof Error) {
          alert(result.message)
          return;
        } else {
          console.log(result)
        }
      });  
    });
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viagem.id]);
  
  const formatDate = (date: string | number | Date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  

return (
  <>

  <Card key={viagem.id} sx={{ width: '706px', height: '110px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 1 }}>
  
  <Box>
  
  <CardContent>
 
   {/* ID E DESTINO */} 

    <Box sx={{ display:'flex', flexDirection: 'row', gap: 1, justifyContent: 'space-evenly'}}>
        
        <Typography sx={{ fontWeight:'bold', fontSize: 14 }} color="inherit" gutterBottom>{viagem.id}</Typography>
        <br/>
        <Box sx={{  display:'flex', flexDirection: 'row', gap:0.25, justifyContent: 'center', alignItems: 'center'}}>
          <LocationOn fontSize="small" sx={{color:'#7C7C8A'}}/>
          <Typography variant="subtitle1" color="text.secondary">{viagem.cidade}</Typography>
        </Box>

     {/* DATA DE IDA E VOLTA */}
  
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginLeft: 2}}>
        
        <Box sx={{  display:'flex', flexDirection: 'row', gap: 0.25, justifyContent: 'center', alignItems: 'center'}}>
          <CalendarMonth fontSize="small" sx={{color:'#7C7C8A'}}/>
          <Typography variant="subtitle1" color="text.secondary">{formatDate(viagem.dataIda)}</Typography>
        </Box>
    
        <SyncAlt sx={{color:'#7C7C8A'}} />
      
        <Box sx={{  display:'flex', flexDirection: 'row', gap: 0.25, justifyContent: 'center', alignItems: 'center',}}>
          <CalendarMonth fontSize="small" sx={{color:'#7C7C8A'}}/>
          <Typography variant="subtitle1" color="text.secondary">{formatDate(viagem.dataVolta)}</Typography>
        </Box>
      
      </Box>
    
    </Box>

    {/* DATA DA POSTAGEM */}
 
    <Typography variant="body2" color="text.secondary">
      <br/>
      
    </Typography>
  
</CardContent>

</Box>

{/* BOTÃO DE IR PRO DETALHES */}

<CardActions>
  <Button 
   onClick={() => navigate(`/${viagem.id}/despesas`)}
   size="small" 
   sx={{gap: 0.75, backgroundColor: '#CADCF8', color: '#0065FF', marginRight: 2}}>
    <Visibility/>
    Detalhes
  </Button>
</CardActions>
</Card>

</>

 );
}