import { FormControl, FormLabel, styled, FormControlLabel, RadioGroup, Button, InputLabel, OutlinedInput, InputAdornment, TextField, Box, Radio } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CloudUpload } from '@mui/icons-material';


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

const NovaDespesaForm = () => {

  return (

    <FormControl
    sx={{ display: 'flex', flexDirection: 'column', marginTop: 5, gap: 3}}>
      
        {/* INPUT DE TEXTO - DESCRIÇÃO */}
        <InputLabel
        htmlFor="component-outlined">Descrição</InputLabel>
        <OutlinedInput
        sx={{width: '520px', height: '56px', backgroundColor: '#FFFFFF'}}
        id="component-outlined"
        label="Descrição"
        />
        <Box sx={{display: 'flex', flexDirection: 'row', gap: 2, }}>
        {/* INPUT DE DATA */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker 
        sx={{width: '264px', height: '56px', backgroundColor: '#FFFFFF'}}
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
      <Button 
      sx={{ width: '206px', height: '56px', marginTop: 2, backgroundColor: '#0065FF'}}
      component="label" variant="contained" startIcon={<CloudUpload />}>
        Upload file
      <VisuallyHiddenInput type="file" />
      </Button>
    
      {/* BOTÃO DE SALVAR NOVA DESPESA */}
      <Box sx={{ alignSelf:'flex-end', marginTop: 7}}>
      <Button
      size="large" 
      sx={{backgroundColor: '#CADCF8', color: '#5497FD', padding: 1.5, width: '100px', height: '34px'}}>
      Salvar
      </Button>
      </Box>
    </FormControl>
   
  )
}

export default NovaDespesaForm