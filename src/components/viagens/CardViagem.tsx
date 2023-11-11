import { Button, Box, Card, CardActions, CardContent, Typography, LinearProgress } from '@mui/material';
import { Visibility, LocationOn, SyncAlt, CalendarMonth} from '@mui/icons-material';

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import { ViagensService, IListagemViagem } from '../../../services/api/viagens/ViagensService';
import { useDebounce } from '../../../shared/hooks/UseDebounce';


export default function CardViagem() {
  const navigate = useNavigate();
  const { debounce } = useDebounce();

  const [card, setCard] = useState<IListagemViagem[]>([]);  
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    
    debounce(() => {
      ViagensService.getAll(1)
      .then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message)
          return;
        } else {
          console.log(result)

          setCard(result.data);
          setTotalCount(result.totalCount);
        }
      });  
    });
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

return (
  <>
  {card.map((trip) => (
  <Card key={trip.id} sx={{ width: '706px', height: '110px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 1 }}>
  
  <Box>
  
  <CardContent>
 
   {/* ID E DESTINO */} 

    <Box sx={{ display:'flex', flexDirection: 'row', gap: 1, justifyContent: 'space-evenly'}}>
        
        <Typography sx={{ fontSize: 12 }} color="inherit" gutterBottom>{trip.id}</Typography>
        <br/>
        <Box sx={{  display:'flex', flexDirection: 'row', gap:0.25, justifyContent: 'center', alignItems: 'center'}}>
          <LocationOn fontSize="small" sx={{color:'#7C7C8A'}}/>
          <Typography variant="subtitle1" color="text.secondary">{trip.cidade}</Typography>
        </Box>

     {/* DATA DE IDA E VOLTA */}
  
      <Box sx={{display: 'flex', flexDirection: 'row', paddingLeft: 7, gap: 1}}>
        
        <Box sx={{  display:'flex', flexDirection: 'row', gap: 0.25, justifyContent: 'center', alignItems: 'center'}}>
          <CalendarMonth fontSize="small" sx={{color:'#7C7C8A'}}/>
          <Typography variant="subtitle1" color="text.secondary">{trip.dataIda.toLocaleString()}</Typography>
        </Box>
    
        <SyncAlt sx={{color:'#7C7C8A'}} />
      
        <Box sx={{  display:'flex', flexDirection: 'row', gap: 0.25, justifyContent: 'center', alignItems: 'center',}}>
          <CalendarMonth fontSize="small" sx={{color:'#7C7C8A'}}/>
          <Typography variant="subtitle1" color="text.secondary">{trip.dataVolta.toLocaleString()}</Typography>
        </Box>
      
      </Box>
    
    </Box>

    {/* DATA DA POSTAGEM */}
 
    <Typography variant="body2" color="text.secondary">
      <br/>
      {'Postado há 12 dias'}
    </Typography>
  
</CardContent>

</Box>

{/* BOTÃO DE IR PRO DETALHES */}

<CardActions>
  <Button 
   onClick={() => navigate('/detalhes')}
   size="small" 
   sx={{gap: 0.75, backgroundColor: '#CADCF8', color: '#0065FF', marginRight: 2}}>
    <Visibility/>
    Detalhes
  </Button>
</CardActions>
</Card>

))}

<footer>{isLoading && (
  <LinearProgress variant='indeterminate'/>
)}</footer>
</>

 );
}