import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import * as React from "react";


type Step = {
  label: string;
  Component: React.ReactNode;
  hasError: boolean;
};

type StepProps = {
  items: Step[];
};

export function Steps({ items }: StepProps) {
const [activeStep, setActiveStep] = React.useState(0);
const handleBack = () => {
  setActiveStep((prevActiveStep) => prevActiveStep - 1);
};

const handleNext = () => {
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
};

const isLastStep = activeStep === items.length - 1;

return (
<Box  sx={{
 width: 600,
 height: 560,
 display: 'flex',
 alignItems: 'center',
 backgroundColor: 'white',
 overflow: 'hidden',
 borderRadius: '12px',
 boxShadow: 1,
 fontWeight: 'bold',
 margin: "20px auto",
 marginTop: 20,
 paddingTop: 10,
 paddingBottom: 5,
 paddingRight: 5,
 paddingLeft: 5
}}>
        
<Box sx={{
 display: 'flex',
 flexDirection: 'column',
 alignItems: 'center' ,
 m: 3,
 width:"100%",}}>

 <Stepper sx={{width: 548, justifyContent: "space-between"}} activeStep={activeStep}>
  {items.map(({ label, hasError }) => {
  return (
  <Step key={label}>
    <StepLabel error={hasError}>{label}</StepLabel>
  </Step>
  );
  })}
  </Stepper>

 <Box sx={{ width: '516px'}}>{items[activeStep].Component}</Box>
 <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: 2}}>
 <Box>
 <Button sx={{width: '167px', height: '60px', mr: 1}}
   variant="outlined"
   color="inherit"
   disabled={activeStep === 0}
   onClick={handleBack}>Voltar</Button>
 </Box>

 <Box>
 {isLastStep ? (
 <Button 
   key="enviar" 
   type="submit"
   variant="contained"
   sx={{width: '167px', height: '60px', backgroundColor: "#0065FF", color: 'white'}}>Enviar</Button>
  
  ) : (
  
  <Button 
    sx={{width: '167px', height: '60px', backgroundColor: "#0065FF", color: 'white'}} 
    key="proximo" 
    type="button" 
    onClick={handleNext}
    variant="contained">Continuar</Button>
    )}
  
  </Box>
</Box>
</Box>
</Box>
);
}