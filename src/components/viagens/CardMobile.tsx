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
  
  interface CardViagemProps {
    viagem: IListagemViagem;
  }
  
export default function CardMobile({ viagem }: CardViagemProps) {
  const navigate = useNavigate();
  const { debounce } = useDebounce();
 
  const [isLoading, setIsLoading] = useState(true);
 

  useEffect(() => {
    setIsLoading(true);
    
    debounce(() => {
      ViagensService.getById(viagem.id)
      .then((result) => {
        setIsLoading(false);

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
  
  <CardM key={viagem.id}>
    
    
    <CardContent>
    
    {/* ID E DESTINO */}  

    <Box sx={{ display:'flex', flexDirection: 'column', gap: 1}}>
      
      <Typography sx={{ fontSize: 14, marginBottom: 0.55 }} color="inherit" >{viagem.id} </Typography>
        
        <Box sx={{  display:'flex', flexDirection: 'row', gap:0.25, alignItems: 'center'}}>
          <LocationOn fontSize="small" sx={{color:'#7C7C8A'}}/>
          <Typography variant="subtitle1" color="text.secondary">{viagem.cidade}</Typography>
        </Box>

    {/* DATA DE IDA E VOLTA */}
    
    <Box sx={{display: 'flex', flexDirection: 'row', gap: 1}}>
    
      <Box sx={{  display:'flex', flexDirection: 'row', gap: 0.25, alignItems: 'center', justifyContent: 'center'}}>
        <CalendarMonth fontSize="small" sx={{color:'#7C7C8A'}}/>
        <Typography component="span" variant="subtitle2" color="text.secondary">{formatDate(viagem.dataIda)}</Typography>
      </Box>

      <SyncAlt sx={{color:'#7C7C8A'}} />

      <Box sx={{ display:'flex', flexDirection: 'row', gap: 0.25, alignItems: 'center', justifyContent: 'center'}}>
        <CalendarMonth fontSize="small" sx={{color:'#7C7C8A'}}/>
        <Typography component='span' variant="subtitle2" color="text.secondary">{formatDate(viagem.dataVolta)}</Typography>
      </Box>
    </Box>

    </Box>

    {/* DATA DA POSTAGEM */}
  
  </CardContent>


   {/* BOTÃO DE IR PRO DETALHES */}
  
  <CardActions>
    <IconButton 
       onClick={() => navigate(`/${viagem.id}/despesas`)}
     size="small" 
     sx={{ backgroundColor: '#CADCF8', color: '#0065FF', marginRight: 2}}>
      <Visibility/>
    </IconButton>
  </CardActions>

</CardM> 

<footer>
  {isLoading && (
  <LinearProgress variant='indeterminate'/>
  )}
</footer>
   </>
  )
}
