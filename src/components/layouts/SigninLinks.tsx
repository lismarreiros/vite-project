import { AppBar,
    IconButton,
    Typography,
    Avatar, 
    Menu, 
    MenuItem,
    Grid,
  } from "@mui/material";
  import { AirplanemodeActive, AddCircle } from "@mui/icons-material";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
 
  
  
  export const SigninLinks = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
  
  
    return (
    <AppBar sx={{backgroundColor: '#0747A6' }} position='sticky'>
      
    {/* Botão de Mostrar todas as viagens*/}
    <Grid container sx={{ marginTop: 0.5, paddingLeft: 2, marginLeft: 2}} >
      <Grid xs={11}>
      <IconButton
      onClick={() => navigate('/viagens')}
      size="large" 
      edge="start" 
      color="inherit" 
      aria-label="menu"
      sx={{ mr: 0, gap: 1}}
      >
      <AirplanemodeActive />     
      <Typography variant="subtitle1" component='div'>Viagens</Typography>
      </IconButton>
    
    {/* Botão de abrir o formulário para adicionar uma viagem*/}    
      <IconButton
      onClick={() => navigate('/')}
      size="large" 
      edge="start" 
      color="inherit" 
      aria-label="menu"
      sx={{ gap: 1}}
      >
      <AddCircle/>     
      <Typography variant="subtitle1" component='div'>Adicionar Viagem</Typography>
      
      </IconButton>
      </Grid>
    
    {/* Botão para abrir o Menu*/}
      <Grid>
      <IconButton
      size="large" 
      edge="start" 
      color="inherit" 
      aria-label="menu"
      onClick={()=>setOpen(true)}
      sx={{gap:1, }}
      >
      <Avatar sx={{width:30, height: 30}} src="#" />
      <Typography sx={{color:"white"}}>José</Typography>
      </IconButton>
    </Grid>
  </Grid>
  
  
  {/* menu hidden */}
      <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      open={open}
      onClose={() => setOpen(false)}
      anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
      }}
      transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
      }}
      >
      <MenuItem>Perfil</MenuItem>
      <MenuItem>Configurações</MenuItem>
      <MenuItem>Logout</MenuItem>
  
      </Menu>
    </AppBar>
    )
  }

  export default SigninLinks