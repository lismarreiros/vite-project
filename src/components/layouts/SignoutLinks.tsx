import { AppBar,
    IconButton,
    Typography,
    Grid,
  } from "@mui/material";

  import { useNavigate } from "react-router-dom";
 

  const SignedOutLinks = () => {
  const navigate = useNavigate();
	return (
  <AppBar sx={{ height: 60, backgroundColor: '#0747A6' }} position='sticky'>
      
  <Grid container sx={{width: '100%', marginTop: 0.5, paddingLeft: 2, marginLeft: 2}} >
    <Grid xs={11}>
    <IconButton
     onClick={() => navigate('/Signin')}
     size="large" 
     edge="start" 
     color="inherit" 
     aria-label="menu"
     sx={{ mr: 4, gap: 1}}>
     
    <Typography variant="subtitle1" component='div'>Signin</Typography>
    </IconButton>
        
    <IconButton
     onClick={() => navigate('/Signup')}
     size="large" 
     edge="start" 
     color="inherit" 
     aria-label="menu"
     sx={{ gap: 1}}>    
      
     <Typography variant="subtitle1" component='div'>Signup</Typography> 
     </IconButton>
     </Grid>
     </Grid>
     </AppBar>
)}

export default SignedOutLinks