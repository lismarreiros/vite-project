import { Box, Typography, TextField, Button, styled, InputLabel, AppBar } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../shared/contexts';
import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z.string().email('Informe um email válido'),
  senha: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres')
}).required()

type handleLoginFormData = z.infer<typeof loginSchema>;

interface ILoginProps {
 children: React.ReactNode;
}

const BoxLogin = styled(Box)(({ theme }) => ({

  [theme.breakpoints.down('sm')]: {
    width: '305px',
    height: '422px',
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
  const { register, handleSubmit, formState: { errors } } = useForm<handleLoginFormData>({
    resolver: zodResolver(loginSchema)
  });
  const { isAuthenticated, login } = useAuthContext();

  function handleLogin(data: handleLoginFormData) {
    const { email, senha } = data
    login(email, senha)
  }

  if (isAuthenticated) return (
 <>{children}</>
  );

  return (
  <Box>
   <AppBar position="static" sx={{ backgroundColor: '#0747A6', height: '60px'}}></AppBar>
    
   <Box sx={{justifyContent: 'center', display: 'flex', flexDirection: 'row'}}>
    
    <form onSubmit={handleSubmit(handleLogin)}>
     <BoxLogin sx={{ width: '502px', height: '520px', display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 3, backgroundColor: '#FFFFFF', padding: 4, margin: 2, borderRadius: 3, boxShadow: 1, marginTop:7 }}>
     
      <Typography variant='h6' sx={{textAlign: 'center', margin: 2.5, color: '#323238'}}>Login</Typography>
      
      <InputLabel sx={{ display: 'flex', flexDirection: 'column', alignSelf:'center'}}>Usuário
       <TextFieldLogin
          label="E-mail"
          type='email'
          {...register('email')}
        ></TextFieldLogin> 
        {errors.email && <span>{errors.email.message}</span>}
      </InputLabel>

   
      <InputLabel sx={{ display: 'flex', flexDirection: 'column', alignSelf:'center'}}>Senha
        <TextFieldLogin 
          type='password'
          {...register('senha')}
        ></TextFieldLogin>
         {errors.senha && <span>{errors.senha.message}</span>}
      </InputLabel>
    
   
      <Button
        type='submit'
        sx={{backgroundColor: '#0065FF', color: '#FFFFFF', width: '126px', height: '56px', alignSelf: 'center'}}> Entrar </Button>
      
      <Typography sx={{ textAlign: 'center' }}variant='body2'>Ainda não possui uma conta? <Link to="/signup">Cadastre-se</Link></Typography>
     </BoxLogin>
    
    </form>
    
    </Box>
   
  </Box>
)}

