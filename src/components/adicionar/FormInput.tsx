import { useMediaQuery } from '@mui/material';
import { Box, TextField, InputAdornment, Radio, RadioGroup,  FormControl,
        FormControlLabel, Button, IconButton, FormHelperText, styled } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, useFormContext } from "react-hook-form";
import { CloudUpload, CameraAltOutlined, ImageOutlined } from "@mui/icons-material";

type FormInputProps = {
  name: string;
  label: string;
  type: 'text' | 'date' | 'value' | 'category' | 'image';
  onChangeUploadImage?: (event: React.ChangeEvent<HTMLInputElement>) => void
};

export const FormInput = ({ name, label, type, onChangeUploadImage }: FormInputProps) => {
  const isMobile = useMediaQuery('(max-width: 620px)');
    
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
  
  const { control } = useFormContext();

  return (
  <Controller
  name={name}
  control={control}
  render={({ field, fieldState }) =>  {

  return (
      
  <Box display="flex" flexDirection="column">

  {/* INPUT DE TEXTO */}
  {type === "text" && ( 
   <TextField
    label={label}
    error={Boolean(fieldState.error)}
    helperText={fieldState.error?.message}
    {...field}
    /> )}
            
  {/* INPUT DE DATA */}
  {type === "date" && (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
    format="DD/MM/YYYY"
    label={label}
    {...field}
    slotProps ={{
    textField: {
    helperText: fieldState.error?.message,}
    }}/>
    </LocalizationProvider>)}
    
  {/* INPUT DE VALOR */}
  {type === "value" && (
    <TextField
    type="number"
    label={label}
    error={Boolean(fieldState.error)}
    helperText={fieldState.error?.message}
    defaultValue="disabled"
    InputProps={{startAdornment: <InputAdornment position="start">R$</InputAdornment>,}}
    {...field}/> )}
      
  {/* INPUT DE CATEGORIA DE TRANSPORTE */}
  {type === "category" && (
    <FormControl error={Boolean(fieldState.error)} > 
    <RadioGroup
    {...field}
    row
    aria-labelledby="demo-row-radio-buttons-group-label"
    name="row-radio-buttons-group"
    sx={{
    display: 'flex',
    justifyContent: 'flex-start',
    color: '#00000099'
    }}>
    <FormControlLabel value="avião" control={<Radio />} label="Avião" />
    <FormControlLabel value="ônibus" control={<Radio />} label="Ônibus" />
    <FormControlLabel value="carro" control={<Radio />} label="Carro" />
    </RadioGroup>
    <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>)}

  {/* INPUT DE ANEXOS/IMAGENS */}
  {type === 'image' && ( 
    <div>
    {isMobile ? (
    <Box sx={{ display: 'flex', gap: 1, flexDirection: 'row-reverse'}}>
       
      <IconButton
      sx={{ color: "#0065FF", boxShadow: 1, backgroundColor: "#CADCF8", 
      '& .MuiIconButton-root:hover' : {
      backgroundColor: "#CADCF8" }}}
      component="label">
      <CameraAltOutlined />
      </IconButton>
        
      <IconButton
      sx={{ color: "#0065FF", backgroundColor: "#CADCF8", boxShadow: 1 }}
      component="label">
      <ImageOutlined />
      <VisuallyHiddenInput type="file" accept="image/*" capture="environment" onChange={onChangeUploadImage} />
      </IconButton>
      </Box>
    ) : (
        
    <Button
    sx={{ width: 190, height: 50, gap: 1 }}
    size="medium"
    component="label"
    variant="contained">
    <CloudUpload />
    Upload File
    <VisuallyHiddenInput type="file" onChange={onChangeUploadImage} />
    </Button>)}
    </div>
  )}

</Box>
);
}}
/>
);
};