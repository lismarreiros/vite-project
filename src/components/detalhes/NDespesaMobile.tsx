import { FormControl, InputLabel, TextField, OutlinedInput, Box, InputAdornment, FormLabel, FormControlLabel, Radio, RadioGroup, IconButton, styled, Button, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ImageOutlined, RemoveCircle, CameraAltOutlined } from "@mui/icons-material";
import { NavBar } from "../layouts/Navbar";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useParams } from 'react-router-dom';
import { DespesasService } from "../../../services/api/despesas/DespesasService";


const schema = z.object({
  descricao: z.string().min(1, 'Descrição é obrigatória')
  .max(100),

  data: z.coerce.date({
  errorMap: () => {
  return {
  message: 'Selecione uma data'
  }}}),

  valor: z.coerce.number().min(0.01, {
    message: 'Informe um valor válido.',
  }),
  categoriaId: z.string().min(1, 'Selecione uma opção.'),


}).required();

type FormDespesas =  z.infer<typeof schema>;

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const NDespesaMobile = () => {

  const { control, 
   handleSubmit, 
   formState: { errors }} = useForm<FormDespesas>({
   resolver: zodResolver(schema),
   criteriaMode: "all",
   mode: "all",
   defaultValues: {
   descricao: '',
   data: undefined,
   valor: undefined,
   categoriaId: '',
  },
  })

  const { id  } = useParams<'id'>();

  const [image, setImage] = useState<FileList | null>(null);
  
  function createDespesa(data: any) {
    const despesa = {
      viagemId: Number(id),
      descricao: data.descricao,
      data: data.data,
      valor: data.valor,
      categoriaId: data.categoriaId,
    }

    if (image) {
      DespesasService.create(despesa, image[0])
      .then(response => {
        console.log('Despesa criada', response);
      })
      .catch(error => {
        console.error('Error', error);
      });
    }
  }


  return (
  <div>
   <NavBar/>
   
   <form onSubmit={handleSubmit(createDespesa)}>
   <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 1, marginTop: 3}}>
    <RemoveCircle/>
    <Typography id="modal-modal-title" variant="h6" component="h2">Nova Despesa</Typography>
   </Box>

   <FormControl sx={{ display: 'flex', flexDirection: 'column', marginTop: 5, gap: 2, margin: 5}}>
      
  {/* INPUT DE TEXTO - DESCRIÇÃO */}

  <Controller 
    name="descricao"
    control={control}
    render={({ field }) => (

    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1}}>
      <InputLabel htmlFor="component-outlined">Descrição</InputLabel>
      <OutlinedInput 
        sx={{width: '100%', height: '56px', backgroundColor: '#FFFFFF'}} id="component-outlined" label="Descrição"
        {...field}/>
        {errors.descricao && <Typography color="error">{errors.descricao?.message}</Typography>}
    </Box>
    )} 
    />

   <Box sx={{display: 'flex', flexDirection: 'row', gap: 2, justifyContent:'sp' }}>
   
  {/* INPUT DE DATA */}
  
   <Controller name="data" control={control} render={({field}) => (
    <Box sx={{gap:1}}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
     label="Data"
     sx={{width: '100%', height: '56px', backgroundColor: '#FFFFFF'}}
     format="DD/MM/YYYY"
     {...field}/>
    </LocalizationProvider>
    {errors.data && <Typography color="error">{errors.data?.message}</Typography>}
  </Box>
   )} />
 

  {/* INPUT DE VALOR */}

  <Controller
  name="valor"
  control={control}
  render={({ field }) => (
    <Box>
    <TextField
    label="Valor"
    sx={{width: '100%', height: '56px', backgroundColor: '#FFFFFF'}}
    type="number"
    defaultValue="disabled"
    InputProps={{startAdornment: <InputAdornment position="start">R$</InputAdornment>}} {...field}/>
    {errors.valor && <Typography color="error"> {errors.valor.message}</Typography>}
   </Box>
  )} />
   
  </Box>

   {/* INPUT DE ESCOLHER A CATEGORIA */} 
   <FormLabel sx={{marginTop: 3}}id="demo-row-radio-buttons-group-label">Categoria</FormLabel>
   <Controller name="categoriaId" control={control} render={({field}) => (
   <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" {...field}>
   <FormControlLabel value="2" control={<Radio />} label="Alimentação" />
   <FormControlLabel value="1" control={<Radio />} label="Locomoção" />
   <FormControlLabel value="3" control={<Radio />} label="Outros" />
   </RadioGroup>
   )} />

   {errors.categoriaId && (<Typography color="error" >{errors.categoriaId.message}</Typography>)}



  {/* INPUT DE IMAGEM/ARQUIVOS */}
   <Box sx={{alignSelf: 'flex-end'}}>
   <IconButton
      sx={{ color: "#0065FF", boxShadow: 1, backgroundColor: "#CADCF8", 
      '& .MuiIconButton-root:hover' : {
      backgroundColor: "#CADCF8" }}}
      component="label">
      <CameraAltOutlined />
    </IconButton>
   
   <IconButton
   sx={{ color: "#0065FF", backgroundColor: "#CADCF8", boxShadow: 1, marginLeft: 2 }}
   component="label">
   <ImageOutlined />
   <VisuallyHiddenInput type="file" accept="image/*" capture="environment" onChange={(e) => setImage(e.target.files)} /> 
   </IconButton>
   </Box>

   

   {/* BOTÃO DE SALVAR NOVA DESPESA */}
   <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
   <Button
   onClick={() => history.back()}
   size="large" 
   sx={{backgroundColor: '#CADCF8', color: '#5497FD', padding: 1.5, width: '100px', height: '34px'}}>
   Voltar
   </Button>
   <Button 
   onClick={handleSubmit(createDespesa)}
   type="submit" size="large"  sx={{backgroundColor: '#CADCF8', color: '#5497FD', padding: 1.5, width: '100px', height: '34px'}}>
   Salvar
   </Button>
   </Box>
 
   </FormControl>

</form>
</div>
   
)}

export default NDespesaMobile