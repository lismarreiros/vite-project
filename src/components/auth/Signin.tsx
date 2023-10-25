import { Box, Typography, TextField, Button, styled, InputLabel, AppBar } from '@mui/material';
import { Link } from 'react-router-dom';



const BoxLogin = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '305px',
    height: '422px',
    marginTop: 25,
  }
}));

const TextFieldLogin = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '275px',
    height: '56px'
  }
}));
const Signin = () => {
  return (
  <Box>
   <AppBar position="static" sx={{ backgroundColor: '#0747A6', height: '60px'}}></AppBar>
  
    
    
    <Box sx={{justifyContent: 'center', display: 'flex', flexDirection: 'row'}}>
    <form>
    <BoxLogin 
     sx={{ width: '502px', height: '520px', display: 'flex', justifyContent: 'center', 
     flexDirection: 'column', gap: 3, backgroundColor: '#FFFFFF',
     padding: 4, margin: 2, borderRadius: 3, boxShadow: 1, marginTop:7
     }}>
    
    <Typography variant='h6' sx={{textAlign: 'center', margin: 2.5, color: '#323238'}}>Login</Typography>
   
    <InputLabel sx={{ display: 'flex', flexDirection: 'column', alignSelf:'center'}}>Usuário
    <TextFieldLogin 
    label="E-mail"
    sx={{ width: '325px', height: '56px', alignSelf: 'center'}}>
    Login
    </TextFieldLogin>
    </InputLabel>

   
    <InputLabel sx={{ display: 'flex', flexDirection: 'column', alignSelf:'center'}}>Senha
    <TextFieldLogin sx={{ width: '325px', height: '56px', alignSelf: 'center'}}>Senha</TextFieldLogin></InputLabel>
    
   
    <Button
    sx={{backgroundColor: '#0065FF', color: '#FFFFFF', width: '126px', height: '56px', alignSelf: 'center'}}
    >Entrar
    </Button>
    <Typography sx={{ textAlign: 'center' }}variant='body2'>Ainda não possui uma conta? <Link to="/signup">Cadastre-se</Link></Typography>
    </BoxLogin>
    </form>
    </Box>
   
    </Box>
  )
}

export default Signin