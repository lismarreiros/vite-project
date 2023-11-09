import { FormControl, InputLabel, TextField, OutlinedInput, Box, InputAdornment, 
FormLabel, FormControlLabel, Radio, RadioGroup, IconButton, styled, Button, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ImageOutlined, RemoveCircle, CameraAltOutlined } from "@mui/icons-material";
import { NavBar } from "../layouts/Navbar";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from 'react';
import { useForm, Controller } from "react-hook-form";

const schema = z.object({
  descriptionDes: z.string().min(1, 'Descrição é obrigatória')
  .max(100),

  dateDes: z.coerce.date({
  errorMap: () => {
  return {
  message: 'Selecione uma data'
  }}}),

  valueDes: z.coerce.number().min(0.01, {
    message: 'Informe um valor válido.',
  }),
  categorieDes: z.string().min(1, 'Selecione uma opção.'),

  imageDes: z.instanceof(FileList).transform(list => list.item(0)).optional(),

}).required();

type FormValuesDespesas =  z.infer<typeof schema>;

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
  const [output, setOutput] = useState('')
  const { control, 
   handleSubmit, 
   formState: { errors }} = useForm<FormValuesDespesas>({
   resolver: zodResolver(schema),
   criteriaMode: "all",
   mode: "all",
   defaultValues: {
   descriptionDes: '',
   dateDes: undefined,
   valueDes: 0,
   categorieDes: '',
   imageDes: undefined,  
  },
  })
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // You can update the form state or save the image for later use.
    setUploadedImage(file);
  };

  function createDespesa(data:any) {
  setOutput(JSON.stringify(data, null, 2))}
  
  return (
  <div>
   <NavBar/>
   
   <form onSubmit={handleSubmit(createDespesa)}>
   <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 1, marginTop: 3}}>
    <RemoveCircle/>
    <Typography id="modal-modal-title" variant="h6" component="h2">Nova Despesa</Typography>
   </Box>

   <FormControl
   sx={{ display: 'flex', flexDirection: 'column', marginTop: 5, gap: 2, margin: 5}}>
      
  {/* INPUT DE TEXTO - DESCRIÇÃO */}

  <Controller 
    name="descriptionDes"
    control={control}
    render={({ field }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1}}>
      <InputLabel htmlFor="component-outlined">Descrição</InputLabel>
      <OutlinedInput
      sx={{width: '100%', height: '56px', backgroundColor: '#FFFFFF'}}
      id="component-outlined"
      label="Descrição"
      {...field}/>
      {errors.descriptionDes && <Typography color="error">{errors.descriptionDes?.message}</Typography>}
    </Box>
    )} 
    />

   <Box sx={{display: 'flex', flexDirection: 'row', gap: 2, justifyContent:'sp' }}>
   
  {/* INPUT DE DATA */}
  
   <Controller
   name="dateDes"
   control={control}
   render={({field}) => (
    <Box sx={{gap:1}}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
     label="Data"
     sx={{width: '100%', height: '56px', backgroundColor: '#FFFFFF'}}
     format="DD/MM/YYYY"
     {...field}/>
    </LocalizationProvider>
    {errors.dateDes && <Typography color="error">{errors.dateDes.message}</Typography>}
  </Box>
   )} />
 

  {/* INPUT DE VALOR */}

  <Controller
  name="valueDes"
  control={control}
  render={({ field }) => (
    <Box>
    <TextField
    label="Valor"
    sx={{width: '100%', height: '56px', backgroundColor: '#FFFFFF'}}
    type="number"
    defaultValue="disabled"
    InputProps={{startAdornment: <InputAdornment position="start">R$</InputAdornment>}} {...field}/>
    {errors.valueDes && <Typography color="error"> {errors.valueDes.message}</Typography>}
   </Box>
  )} />
   
  </Box>

   {/* INPUT DE ESCOLHER A CATEGORIA */} 
   <FormLabel sx={{marginTop: 3}}id="demo-row-radio-buttons-group-label">Categoria</FormLabel>
   <Controller
   name="categorieDes"
   control={control}
   render={({field}) => (
   <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" {...field}>
   <FormControlLabel value="alimentação" control={<Radio />} label="Alimentação" />
   <FormControlLabel value="locomoção" control={<Radio />} label="Locomoção" />
   <FormControlLabel value="outros" control={<Radio />} label="Outros" />
   </RadioGroup>
   )} />

   {errors.categorieDes && (<Typography color="error" >{errors.categorieDes.message}</Typography>)}



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
   <VisuallyHiddenInput type="file" accept="image/*" capture="environment" />
    <input
    type="file"
    accept="image/*" // Specify the accepted file types (e.g., images)
    style={{ display: 'none' }}
    onChange={handleImageChange}
    />
   </IconButton>
   </Box>

   

   {/* BOTÃO DE SALVAR NOVA DESPESA */}
   <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
   <Button
   onClick={() => navigate('/detalhes')}
   size="large" 
   sx={{backgroundColor: '#CADCF8', color: '#5497FD', padding: 1.5, width: '100px', height: '34px'}}>
   Voltar
   </Button>
   <Button
   type="submit"
   size="large" 
   sx={{backgroundColor: '#CADCF8', color: '#5497FD', padding: 1.5, width: '100px', height: '34px'}}>
   Salvar
   </Button>
   </Box>
 
   </FormControl>

   <pre>{output}</pre>
</form>
</div>
   
)}

export default NDespesaMobile