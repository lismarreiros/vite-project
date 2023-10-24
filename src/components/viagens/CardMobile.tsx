import { IconButton, Box, Card, CardActions, CardContent, Typography, styled, } from '@mui/material';
import { Visibility, LocationOn, SyncAlt, CalendarMonth} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

const CardM = styled(Card)(() => ({
    width: '100%',
    height: '137px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }));
  

const CardMobile = () => {
    const navigate = useNavigate();

  return (
<CardM>
 
  <CardContent>
  {/* ID E DESTINO */}  
<Box sx={{ display:'flex', flexDirection: 'column'}}>
      <Typography sx={{ fontSize: 12, marginBottom: 0.55 }} color="inherit" >ID: 112 </Typography>
    <Box sx={{  display:'flex', flexDirection: 'row', gap:0.25, alignItems: 'center'}}>
      <LocationOn fontSize="small" sx={{color:'#7C7C8A'}}/>
      <Typography variant="subtitle1" color="text.secondary">Bom Jesus -PI</Typography>
</Box>

  {/* DATA DE IDA E VOLTA */}
<Box sx={{display: 'flex', flexDirection: 'row', gap: 1}}>
    <Box sx={{  display:'flex', flexDirection: 'row', gap: 0.25, alignItems: 'center'}}>
      <CalendarMonth fontSize="small" sx={{color:'#7C7C8A'}}/>
      <Typography variant="subtitle2" color="text.secondary">12/12/2002</Typography>
    </Box>
    <SyncAlt sx={{color:'#7C7C8A'}} />
    <Box sx={{  display:'flex', flexDirection: 'row', gap: 0.25, alignItems: 'center',}}>
      <CalendarMonth fontSize="small" sx={{color:'#7C7C8A'}}/>
      <Typography variant="subtitle2" color="text.secondary">12/12/2002</Typography>
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
  )
}

export default CardMobile