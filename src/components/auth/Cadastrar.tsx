import { Box, Typography, TextField, Button, styled, InputLabel, AppBar } from '@mui/material';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const signupSchema = z.object({
  nome: z.string().min(3, 'Digite seu nome')
  .transform(name => {
    return name.trim().split(' ').map(word => {
      return word[0].toLocaleUpperCase().concat(word.substring(1))
    }).join(' ')
  }),
  email: z.string().email('Informe um email válido'),
  senha: z.string().min(6, 'Minímo 6 caracteres'),
  confirmSenha: z.string()
}).required().refine((fields) => fields.senha === fields.confirmSenha, {
  path: ['confirmSenha'],
  message: 'As senhas precisam ser iguais'
});

type handleSignupFormData = z.infer<typeof signupSchema>;


const BoxSignup = styled(Box)(({ theme }) => ({
 [theme.breakpoints.down('sm')]: {
 width: '300px',
 height: '740px',
 marginTop: 25,
 }
 }));
    
const TextFieldSignup = styled(TextField)(({ theme }) => ({
 [theme.breakpoints.down('sm')]: {
 width: '275px',
 height: '56px'
 }
 }));


const Cadastrar: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<handleSignupFormData>({
    resolver: zodResolver(signupSchema),  
    criteriaMode: "all",
    mode: "all",
  });

  function createUser(data: handleSignupFormData) {
    
  }
  
 return (
  <Box>
  <AppBar position="static" sx={{ backgroundColor: '#0747A6', height: '60px'}}></AppBar>     
  
  <Box sx={{justifyContent: 'center', display: 'flex', flexDirection: 'row'}}>
    <form onSubmit={handleSubmit(createUser)}>
    <BoxSignup sx={{ width: '502px', height: '740px', display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 4, backgroundColor: '#FFFFFF', padding: 4, margin: 2, borderRadius: 3, boxShadow: 1, marginTop:7, }}>
      <Typography variant='h6' sx={{textAlign: 'center', margin: 2.5, color: '#323238'}}>Criar Conta</Typography>

        <InputLabel
        sx={{ display: 'flex', flexDirection: 'column', alignSelf:'center'}}>
         Nome do Usuário
         <TextFieldSignup 
            type="text"
            {...register('nome')} 
            sx={{ width: '325px', height: '56px', alignSelf: 'center'}}>
         </TextFieldSignup>
        {errors.nome && <Typography sx={{color: 'red'}}>{errors.nome.message}</Typography>}
        </InputLabel>
      
        <InputLabel sx={{ display: 'flex', flexDirection: 'column', alignSelf:'center'}}>
          Email
         <TextFieldSignup 
            type="email"
            {...register('email')}
            sx={{ width: '325px', height: '56px', alignSelf: 'center'}}>
         </TextFieldSignup>
          {errors.email && <Typography sx={{color: 'red'}}>{errors.email.message}</Typography>}
        </InputLabel>
    
        <InputLabel sx={{ display: 'flex', flexDirection: 'column', alignSelf:'center'}}>
          Senha
          <TextFieldSignup 
            type="password"
            {...register('senha')}
            sx={{ width: '325px', height: '56px', alignSelf: 'center'}}>
          </TextFieldSignup>
          {errors.senha && <Typography sx={{color: 'red'}}>{errors.senha.message}</Typography>}
        </InputLabel>
          
        <InputLabel sx={{ display: 'flex', flexDirection: 'column', alignSelf:'center'}}>
          Confirmar Senha
         <TextFieldSignup 
            type="password"
            {...register('confirmSenha')}
            sx={{ width: '325px', height: '56px', alignSelf: 'center'}}>
         </TextFieldSignup>
         {errors.confirmSenha && <Typography sx={{color: 'red'}}>{errors.confirmSenha.message}</Typography>}
        </InputLabel>
            
       
        <Button 
          type='submit'
          variant='contained'
          sx={{backgroundColor: '#0065FF', color: '#FFFFFF', width: '126px', height: '56px', alignSelf: 'center'}}>
          CRIAR
        </Button>
        <Typography sx={{ textAlign: 'center' }}variant='body2'>Já possui uma conta? <Link to="/">Faça o login.</Link></Typography>
    </BoxSignup>
    </form>
  </Box>
       
  </Box>
  )
}

export default Cadastrar

