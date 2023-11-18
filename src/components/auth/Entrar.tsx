import { Box, Typography, TextField, Button, styled, InputLabel, AppBar } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../shared/contexts';
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z.string().email(),
  senha: z.string()
}).required()

type handleLoginFormData = z.infer<typeof loginSchema>;

interface ILoginProps {
 children: React.ReactNode;
}

const BoxLogin = styled(Box)(({ theme }) => ({

  [theme.breakpoints.down('sm')]: {
    width: '305px',
    height: '455px',
    marginTop: 25,
  }
}));

const TextFieldLogin = styled(TextField)(({ theme }) => ({    
  width: '325px', 
    height: '56px', 
    alignSelf: 'center', 
    marginTop: 1,
  [theme.breakpoints.down('sm')]: {
    width: '275px',
    height: '56px'
  }
}));

export const Entrar: React.FC<ILoginProps>= ({ children }) => {
  const [error, setError] = useState<string|null>(null);

  const { register, handleSubmit } = useForm<handleLoginFormData>({
    resolver: zodResolver(loginSchema),
    criteriaMode: "all",
    mode: "all",
  });

  const { isAuthenticated, login } = useAuthContext();
  
  const handleLogin = async (data: handleLoginFormData) => {
     const response = await login(data.email, data.senha)
     if (response instanceof Error) {
      console.log(error)
      setError('Usuário ou senha incorretos.')
     }
  };
  
  if (isAuthenticated) 
    return (
      <>{children}</>
    );

  return (
  <Box>
   <AppBar position="static" sx={{ backgroundColor: '#0747A6', height: '60px'}}></AppBar>
    
   <Box sx={{justifyContent: 'center', display: 'flex', flexDirection: 'row'}}>
    
    <form onSubmit={handleSubmit(handleLogin)}>
     <BoxLogin sx={{ width: '502px', height: '720px', display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 3, backgroundColor: '#FFFFFF', padding: 4, margin: 2, borderRadius: 3, boxShadow: 1, marginTop:7 }}>
     
      <Typography variant='h6' sx={{textAlign: 'center', margin: 2.5, color: '#323238'}}>Login</Typography>
      { error && <Typography style={{color: 'red', textAlign: 'center'}}>{error}</Typography>}
      <InputLabel sx={{ display: 'flex', flexDirection: 'column', alignSelf:'center'}}>
        Email
       <TextFieldLogin
          type='email'
          {...register('email')}
        ></TextFieldLogin> 
      </InputLabel>

   
      <InputLabel sx={{ display: 'flex', flexDirection: 'column', alignSelf:'center'}}>Senha
        <TextFieldLogin 
          type='password'
          {...register('senha')}
        ></TextFieldLogin> 
        
      </InputLabel>
     
      <Button
        type='submit'
        variant='contained'
        sx={{ width: '126px', height: '56px', alignSelf: 'center'}}> Entrar </Button>
      
      <Typography sx={{ textAlign: 'center' }} variant='body2'> Ainda não possui uma conta? <Link to="/signup">Cadastre-se</Link></Typography>
     </BoxLogin>
    
    </form>
    
    </Box>
   
  </Box>
)}

