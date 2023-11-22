import * as React from 'react';
import { Button, Box, Stepper, StepLabel, Step }from '@mui/material/';


type StepMobile = {
  label: string;
  Component: React.ReactNode;
  hasError: boolean;
};

type StepPropsMobile = {
  items: StepMobile[];
};


export function StepsMobile({ items }: StepPropsMobile) {

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isLastStep = activeStep === items.length - 1;

return (
<Box>
  
<Stepper 
  sx={{ marginTop: 0, width: '100%', height: '120px', backgroundColor: '#0747A6', alignItems: 'center', color: 'white', textDecorationColor: 'white' }} 
  activeStep={activeStep}
  alternativeLabel>

  {items.map(({ label, hasError }) => {
    return (
    <Step sx={{color: 'white'}} key={label}>
    <StepLabel
    sx={{
    '& .MuiStepLabel-labelContainer': {
    color: 'white',
    },
    '& .MuiStepLabel-labelContainer.Mui-completed': {
    color: '#7A7A7A'
    },
    '& .MuiStepIcon-root' : {
    color: '#DADADA',
    }, 
    '& .MuiStepIcon-root.Mui-active': {
    color: '#7A7A7A'
    },
    '& .MuiStepIcon-root.Mui-completed': {
     color: '#4CAF50'
    },
    '& .MuiStepIcon-root.Mui-error': {
    color: '#EE7070f'
    },
    '& MuiStepLabel-label.Mui-active' :{
    color: '#FFFFFF'
    }
  }}
  error={hasError}>
  {label}
  </StepLabel>
  </Step>
  );
})}

</Stepper>

<Box sx={{ width: 337, height: 499, display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: '12px', boxShadow: 1, margin: "20px auto", marginTop: 10 }}>
    
  <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: 0, padding: 2 }}>
    
  <Box sx={{width: '299px', height: '390px', alignItems:'center', padding: '2px' }}>
    {items[activeStep].Component}
  </Box>
    

  <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 2,  marginBottom: 2}}>
    <Box>
    <Button
      sx={{width: '120px', height: '39px', mr: 1, color: '#0065FF'}}
      variant="outlined"
      color="inherit"
      disabled={activeStep === 0}
      onClick={handleBack} >
      Voltar
    </Button>
    </Box>

    <Box>
    {isLastStep ? (
    <Button 
      key="enviar" 
      type="submit"
      sx={{width: '120px', height: '39px', backgroundColor: "#0065FF", color: 'white'}} >
      Enviar
    </Button>

) : (
  
  <Button 
    sx={{width: '120px', height: '39px', backgroundColor: "#0065FF", color: 'white'}} 
    key="proximo" 
    type="button" 
    onClick={handleNext}
    variant="contained" >
    Continuar
  </Button>
)}

</Box>
</Box>

</Box>

    
</Box>
</Box>

);
}