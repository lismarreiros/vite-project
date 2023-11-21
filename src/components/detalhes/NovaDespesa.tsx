import { FormControl, FormLabel, styled, FormControlLabel, RadioGroup, Button, InputLabel, OutlinedInput, InputAdornment, TextField, Box, Radio, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CloudUpload } from '@mui/icons-material';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { DespesasService } from '../../../services/api/despesas/DespesasService';
import { useState } from 'react';

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

  type FormDespesas =  z.infer<typeof schema>;

  const NovaDespesaForm = () => {
  const { id } = useParams(); 
  const { control, 
    handleSubmit, 
    formState: { errors }} = useForm<FormDespesas>({
    resolver: zodResolver(schema),
    criteriaMode: "all",
    mode: "all",
  });

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
    
  <form onSubmit={(e) => {
    e.preventDefault();
    handleSubmit(createDespesa)(e);
  }}>
  <FormControl sx={{ display: 'flex', flexDirection: 'column', marginTop: 5, gap: 3}}>
      
  {/* INPUT TEXTO - DESCRIÇÃO */}
  <Controller
    name="descricao"
    control={control}
    render={({ field }) => (
    <div>
    <InputLabel htmlFor="component-outlined">Descrição</InputLabel>
    <OutlinedInput
    sx={{ width: '520px', height: '56px', backgroundColor: '#FFFFFF' }}
    id="component-outlined"
    label="Descrição"
    {...field}/>
    {errors.descricao && (<Typography color="error">{errors.descricao.message}</Typography>)}
    </div>
    )}
  />



  <Box sx={{display: 'flex', flexDirection: 'row', gap: 2, }}>
  
  {/* INPUT DA DATA */}
  <Box>
  <Controller
   name="data"
   control={control}
   render={({ field }) => (
   <LocalizationProvider dateAdapter={AdapterDayjs}>
   <DatePicker
    label="Data"
    format="DD/MM/YYYY"
    sx={{ width: '260px', height: '56px', backgroundColor: '#FFFFFF' }}
    {...field} />
   </LocalizationProvider>)}
   />
   
   {errors.data && (<Typography color="error">{errors.data.message}</Typography>)}
  </Box>
  
  {/* INPUT VALOR */}
   <Box>
   <Controller
    name="valor"
    control={control}
    render={({ field }) => (
    <TextField
     label="Valor"
     type="number"
     sx={{ width: '240px', height: '56px', backgroundColor: '#FFFFFF' }}
     InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
    {...field}>
    </TextField>
    )} />
       
    {errors.valor && ( <Typography color="error">{errors.valor.message}</Typography>  )}
   </Box>
   </Box>
   
   {/* INPUT CATEGORIA */}

    <FormLabel sx={{ marginTop: 3 }} id="demo-row-radio-buttons-group-label">Categoria</FormLabel>
    
    <Controller
    name="categoriaId"
    control={control}
    render={({ field }) => (
    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" {...field}>
    <FormControlLabel value="2" control={<Radio />} label="Alimentação" />
    <FormControlLabel value="1" control={<Radio />} label="Locomoção" />
    <FormControlLabel value="3" control={<Radio />} label="Outros" />
    </RadioGroup> )} />
        
    {errors.categoriaId && (<Typography color="error">{errors.categoriaId.message}</Typography>)}

 

  {/* INPUT DE IMAGEM/ARQUIVOS */}
   <Button 
   sx={{ width: '206px', height: '56px', marginTop: 2, backgroundColor: '#0065FF'}}
   component="label" variant="contained" startIcon={<CloudUpload />}>
   Upload file
    <VisuallyHiddenInput type="file" accept="image/*" capture="environment" onChange={(e) => setImage(e.target.files)} /> 
   </Button>
 
  {/* BOTÃO DE SALVAR NOVA DESPESA */}
  
  <Box sx={{ alignSelf:'flex-end', marginTop: 2}}>
    <Button
      type="submit"
      size="large" 
      sx={{backgroundColor: '#CADCF8', color: '#5497FD', padding: 1.5, width: '100px', height: '34px'}}>
      Salvar
    </Button>
  </Box>
  </FormControl>
  </form>
   
  )
}

export default NovaDespesaForm