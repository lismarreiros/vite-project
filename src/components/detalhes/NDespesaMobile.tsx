import { FormControl, InputLabel, TextField, OutlinedInput, Box, InputAdornment, 
FormLabel, FormControlLabel, Radio, RadioGroup, IconButton, styled, Button, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ImageOutlined, RemoveCircle } from "@mui/icons-material";
import { NavBar } from "../layouts/Navbar";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from 'react';


const schema = z.object({
    descricaoDes: z.string().min(1, 'Descrição obrigatória')
    .max(100)
    .transform(cidade => {
    return cidade.trim().split('').map(word => {
    return word[0].toLocaleUpperCase().concat(word.substring(1))
    }).join(' ')}),

    dataDes: z.coerce.date({
    errorMap: () => {
    return {
    message: 'Selecione uma data'
    }}}),

    valueDes: z.coerce.number({
    errorMap: () => {
    return {
    message: 'Informe  um valor.'
    }}})
    .positive({message:'Digite um número válido'}),

    imageDes: z.instanceof(FileList).transform(list => list.item(0)).optional(),

    categoriaDes:  z.string({   
    errorMap: () => {
    return {
    message: 'Selecione uma opção.'
    }}}),

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
  const navigate = useNavigate();
  const methods = useForm<FormValuesDespesas>({
    resolver: zodResolver(schema),
    criteriaMode: "all",
    mode: "all",
    defaultValues: {
    descricaoDes: "",
    dataDes: undefined,
    valueDes: undefined,
    categoriaDes: ''
    },
    });
    
    function createDespesa(data:any) {
    setOutput(JSON.stringify(data, null, 2))}
  
    return (
  <FormProvider {...methods}>
   <NavBar/>
   <form onSubmit={methods.handleSubmit(createDespesa)}>
   <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 1, marginTop: 3}}>
    <RemoveCircle/>
    <Typography id="modal-modal-title" variant="h6" component="h2">
    Nova Despesa
    </Typography>
   </Box>

   <FormControl
   sx={{ display: 'flex', flexDirection: 'column', marginTop: 5, gap: 2, margin: 5}}>
      
   {/* INPUT DE TEXTO - DESCRIÇÃO */}
   <InputLabel htmlFor="component-outlined">Descrição</InputLabel>
   
   <OutlinedInput
   sx={{height: '56px', backgroundColor: '#FFFFFF'}}
   id="component-outlined"
   label="Descrição"/>


   <Box sx={{display: 'flex', flexDirection: 'row', gap: 2, }}>
   
   {/* INPUT DE DATA */}
   <LocalizationProvider dateAdapter={AdapterDayjs}>
   <DatePicker 
   sx={{width: '164px', height: '56px', backgroundColor: '#FFFFFF'}}
   format="DD/MM/YYYY"/>
   </LocalizationProvider>

   {/* INPUT DE VALOR */}
   <TextField
   sx={{width: '237px', height: '56px', backgroundColor: '#FFFFFF'}}
   type="number"
   defaultValue="disabled"
   InputProps={{startAdornment: <InputAdornment position="start">R$</InputAdornment>}}/>
   </Box>

   {/* INPUT DE ESCOLHER A CATEGORIA */}      
   <FormLabel sx={{marginTop: 3}}id="demo-row-radio-buttons-group-label">Categoria</FormLabel>
   <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
   <FormControlLabel value="alimentação" control={<Radio />} label="Alimentação" />
   <FormControlLabel value="locomoção" control={<Radio />} label="Locomoção" />
   <FormControlLabel value="outros" control={<Radio />} label="Outros" />
   </RadioGroup>

   {/* INPUT DE IMAGEM/ARQUIVOS */}
   <Box sx={{alignSelf: 'flex-end'}}>
   <IconButton
   sx={{ color: "#0065FF", backgroundColor: "#CADCF8", boxShadow: 1 }}
   component="label">
   <ImageOutlined />
   <VisuallyHiddenInput type="file" accept="image/*" capture="environment" />
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
   size="large" 
   sx={{backgroundColor: '#CADCF8', color: '#5497FD', padding: 1.5, width: '100px', height: '34px'}}>
   Salvar
   </Button>
   </Box>
 
   </FormControl>

   <pre>{output}</pre>
</form>
</FormProvider>
   
)}

export default NDespesaMobile