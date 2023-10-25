import { FormControl, FormLabel, 
  styled, FormControlLabel, RadioGroup, 
  Button, InputLabel, OutlinedInput, InputAdornment, 
  TextField, Box, Radio, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CloudUpload } from '@mui/icons-material';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

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

type FormValuesDespesas =  z.infer<typeof schema>;

const NovaDespesaForm = () => {
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

  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // You can update the form state or save the image for later use.
    setUploadedImage(file);
  };

  function createDespesa(data:any) {
  setOutput(JSON.stringify(data, null, 2))}

  return (
    
  <form onSubmit={handleSubmit(createDespesa)}>
  <FormControl
  sx={{ display: 'flex', flexDirection: 'column', marginTop: 5, gap: 3}}>
      
  {/* INPUT TEXTO - DESCRIÇÃO */}
  <Controller
    name="descriptionDes"
    control={control}
    render={({ field }) => (
    <div>
    <InputLabel htmlFor="component-outlined">Descrição</InputLabel>
    <OutlinedInput
    sx={{ width: '520px', height: '56px', backgroundColor: '#FFFFFF' }}
    id="component-outlined"
    label="Descrição"
    {...field}/>
    {errors.descriptionDes && (<Typography color="error">{errors.descriptionDes.message}</Typography>)}
    </div>
    )}
  />



  <Box sx={{display: 'flex', flexDirection: 'row', gap: 2, }}>
  
  {/* INPUT DA DATA */}
  <Box>
  <Controller
   name="dateDes"
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
   
   {errors.dateDes && (<Typography color="error">{errors.dateDes.message}</Typography>)}
  </Box>
  
  {/* INPUT VALOR */}
   <Box>
   <Controller
    name="valueDes"
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
       
    {errors.valueDes && ( <Typography color="error">{errors.valueDes.message}</Typography>  )}
   </Box>
   </Box>
   
   {/* INPUT CATEGORIA */}

    <FormLabel sx={{ marginTop: 3 }} id="demo-row-radio-buttons-group-label">Categoria</FormLabel>
    
    <Controller
    name="categorieDes"
    control={control}
    render={({ field }) => (
    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" {...field}>
    <FormControlLabel value="alimentação" control={<Radio />} label="Alimentação" />
    <FormControlLabel value="locomoção" control={<Radio />} label="Locomoção" />
    <FormControlLabel value="outros" control={<Radio />} label="Outros" />
    </RadioGroup> )} />
        
    {errors.categorieDes && (<Typography color="error">{errors.categorieDes.message}</Typography>)}

 

  {/* INPUT DE IMAGEM/ARQUIVOS */}
   <Button 
   sx={{ width: '206px', height: '56px', marginTop: 2, backgroundColor: '#0065FF'}}
   component="label" variant="contained" startIcon={<CloudUpload />}>
   Upload file
   <VisuallyHiddenInput type="file" />
    <input
    type="file"
    accept="image/*" // Specify the accepted file types (e.g., images)
    style={{ display: 'none' }}
    onChange={handleImageChange}
    />
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