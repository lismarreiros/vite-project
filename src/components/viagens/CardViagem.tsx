import { Button, Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Visibility, LocationOn, SyncAlt, CalendarMonth } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

export default function CardViagem() {
  const navigate = useNavigate();
    
return (
<Card sx={{ width: '706px', height: '110px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 1 }}>
  <Box>
  
  <CardContent>
  {/* ID E DESTINO */}  
  <Box sx={{ display:'flex', flexDirection: 'row', gap: 1}}>
      <Typography sx={{ fontSize: 14 }} color="inherit" gutterBottom>ID: 112 </Typography>
      <br/>
    <Box sx={{  display:'flex', flexDirection: 'row', gap:0.25, justifyContent: 'center', alignItems: 'center'}}>
      <LocationOn fontSize="small" sx={{color:'#7C7C8A'}}/>
      <Typography variant="subtitle1" color="text.secondary">Bom Jesus -PI</Typography>
    </Box>

  {/* DATA DE IDA E VOLTA */}
  <Box sx={{display: 'flex', flexDirection: 'row', paddingLeft: 7, gap: 1}}>
    <Box sx={{  display:'flex', flexDirection: 'row', gap: 0.25, justifyContent: 'center', alignItems: 'center'}}>
      <CalendarMonth fontSize="small" sx={{color:'#7C7C8A'}}/>
      <Typography variant="subtitle1" color="text.secondary">12/12/2002</Typography>
    </Box>
    <SyncAlt sx={{color:'#7C7C8A'}} />
    <Box sx={{  display:'flex', flexDirection: 'row', gap: 0.25, justifyContent: 'center', alignItems: 'center',}}>
      <CalendarMonth fontSize="small" sx={{color:'#7C7C8A'}}/>
      <Typography variant="subtitle1" color="text.secondary">12/12/2002</Typography>
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

  );
}