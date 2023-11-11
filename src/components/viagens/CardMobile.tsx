import { IconButton, Box, Card, CardActions, CardContent, Typography, styled, LinearProgress, } from '@mui/material';
import { Visibility, LocationOn, SyncAlt, CalendarMonth} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { ViagensService, IListagemViagem } from '../../../services/api/viagens/ViagensService';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../../shared/hooks/UseDebounce';

const CardM = styled(Card)(() => ({
    width: '100%',
    height: '137px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }));
  

export default function CardMobile() {
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
  <CardM key={trip.id}>
    
    
    <CardContent>
    
    {/* ID E DESTINO */}  

    <Box sx={{ display:'flex', flexDirection: 'column'}}>
      
      <Typography sx={{ fontSize: 12, marginBottom: 0.55 }} color="inherit" >{trip.id} </Typography>
        
        <Box sx={{  display:'flex', flexDirection: 'row', gap:0.25, alignItems: 'center'}}>
          <LocationOn fontSize="small" sx={{color:'#7C7C8A'}}/>
          <Typography variant="subtitle1" color="text.secondary">{trip.cidade}</Typography>
        </Box>

    {/* DATA DE IDA E VOLTA */}
    
    <Box sx={{display: 'flex', flexDirection: 'row', gap: 1}}>
    
      <Box sx={{  display:'flex', flexDirection: 'row', gap: 0.25, alignItems: 'center'}}>
        <CalendarMonth fontSize="small" sx={{color:'#7C7C8A'}}/>
        <Typography component="span" variant="subtitle2" color="text.secondary">{trip.dataIda.toLocaleString()}</Typography>
      </Box>

      <SyncAlt sx={{color:'#7C7C8A'}} />

      <Box sx={{  display:'flex', flexDirection: 'row', gap: 0.25, alignItems: 'center',}}>
        <CalendarMonth fontSize="small" sx={{color:'#7C7C8A'}}/>
        <Typography component='span' variant="subtitle2" color="text.secondary">{trip.dataVolta.toLocaleString()}</Typography>
      </Box>
    </Box>

    </Box>

    {/* DATA DA POSTAGEM */}
    
    <Typography variant="subtitle2" color="text.secondary">
    <br/>
      {'Postado há 12 dias'}
    </Typography>
  
  </CardContent>


   {/* BOTÃO DE IR PRO DETALHES */}
  
  <CardActions>
    <IconButton 
     onClick={() => navigate('/detalhes')}
     size="small" 
     sx={{ backgroundColor: '#CADCF8', color: '#0065FF', marginRight: 2}}>
      <Visibility/>
    </IconButton>
  </CardActions>

</CardM> 
))}
<footer>
  {isLoading && (
  <LinearProgress variant='indeterminate'/>
  )}
</footer>
   </>
  )
}
