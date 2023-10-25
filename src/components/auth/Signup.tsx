import { Box, Typography, TextField, Button, styled, InputLabel, AppBar } from '@mui/material';
import { Link } from 'react-router-dom';


const Signup = () => {
 const BoxSignup = styled(Box)(({ theme }) => ({
 [theme.breakpoints.down('sm')]: {
 width: '305px',
 height: '622px',
 marginTop: 25,
 }
 }));
    
 const TextFieldSignup = styled(TextField)(({ theme }) => ({
 [theme.breakpoints.down('sm')]: {
 width: '275px',
 height: '56px'
 }
 }));
   
 return (
    <Box>
    <AppBar position="static" sx={{ backgroundColor: '#0747A6', height: '60px'}}></AppBar>
           
        
    <Box sx={{justifyContent: 'center', display: 'flex', flexDirection: 'row'}}>
    <form>
    <BoxSignup 
    sx={{ width: '502px', height: '620px', display: 'flex', justifyContent: 'center', 
    flexDirection: 'column', gap: 3, backgroundColor: '#FFFFFF',
    padding: 4, margin: 2, borderRadius: 3, boxShadow: 1, marginTop:7
    }}>
        
    <Typography variant='h6' sx={{textAlign: 'center', margin: 2.5, color: '#323238'}}>Criar Conta</Typography>

    <InputLabel sx={{ display: 'flex', flexDirection: 'column', alignSelf:'center'}}>Nome do Usuário
    <TextFieldSignup 
    label=""
    sx={{ width: '325px', height: '56px', alignSelf: 'center'}}>
    
    </TextFieldSignup>
    </InputLabel>
      
    <InputLabel sx={{ display: 'flex', flexDirection: 'column', alignSelf:'center'}}>Email
    <TextFieldSignup 
    label=""
    sx={{ width: '325px', height: '56px', alignSelf: 'center'}}>
    
    </TextFieldSignup>
    </InputLabel>
    
       
    <InputLabel sx={{ display: 'flex', flexDirection: 'column', alignSelf:'center'}}>Senha
    <TextFieldSignup sx={{ width: '325px', height: '56px', alignSelf: 'center'}}>Senha</TextFieldSignup></InputLabel>
          
    <InputLabel sx={{ display: 'flex', flexDirection: 'column', alignSelf:'center'}}>Confirmar Senha
    <TextFieldSignup sx={{ width: '325px', height: '56px', alignSelf: 'center'}}>Senha</TextFieldSignup></InputLabel>
            
       
    <Button
    sx={{backgroundColor: '#0065FF', color: '#FFFFFF', width: '126px', height: '56px', alignSelf: 'center'}}
    >CRIAR
    </Button>
    <Typography sx={{ textAlign: 'center' }}variant='body2'>Já possui uma conta? <Link to="/signin">Faça o login.</Link></Typography>
    </BoxSignup>
    </form>
    </Box>
       
    </Box>
  )
}

export default Signup

