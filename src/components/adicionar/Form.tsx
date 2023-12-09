import { Box, Button } from '@mui/material';
import { Alert } from '@mui/joy';

import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from 'react';
import { Destino } from "./stepcomponents/Destino";
import { Transporte } from "./stepcomponents/Transporte";
import { Hospedagem } from "./stepcomponents/Hospedagem";
import { Adiantamento } from "./stepcomponents/Adiantamento";
import { Steps } from "./Stepper";
import { NavBar } from '../layouts/Navbar';
import { StepsMobile } from './StepperMobile';
import { ViagensService } from '../../../services/api/viagens/ViagensService';


const schema = z.object({
cidade: z.string().min(1, 'Informe pelo menos uma cidade')
.transform(name => {
  return name.trim().split(' ').map(word => {
    return word[0].toLocaleUpperCase().concat(word.substring(1))
  }).join(' ')
}),

dataIda: z.coerce.date({
errorMap: () => {
return {
message: 'Selecione uma data de ida'
}}}),

dataVolta: z.coerce.date({
errorMap: () => {
return {
message: 'Selecione uma data de volta'
}}}), 
   
categoriaT: z.coerce.number({   
errorMap: () => {
return {
message: 'Selecione uma opção.'
}}}),

valorTrans: z.coerce.number({
errorMap: () => {
return {
message: 'Informe  um valor.'
}}})
.positive({message:'Digite um número válido'}),

nomeHotel: z.string().min(1, {message: 'Informe um nome'}),

valorHotel: z.coerce.number({
errorMap: () => {
return {
message: 'Informe  um valor.'
}}}),


adiantamento: z.coerce.number({
errorMap: () => {
return {
message: 'Informe  um valor.'
}}}),
   
adiantData: z.coerce.date({
errorMap: () => {
return {
message: 'Selecione uma data.'
}}}),




}).required();

type FormValues =  z.infer<typeof schema>;


const Form = () => {
  const navigate = useNavigate();
  const methods = useForm<FormValues>({
  resolver: zodResolver(schema),
  criteriaMode: "all",
  mode: "all",
  defaultValues: {
  cidade: "",
  dataIda: undefined,
  dataVolta: undefined,
  categoriaT: undefined,
  valorTrans: undefined,
  nomeHotel: "",
  valorHotel: undefined,
  adiantamento: undefined,
  adiantData: undefined,
  },
  });

  const [images, setImages] = useState({
    imagemTrans: null,
    imagemHotel: null,
    adiantImagem: null,
  });
  
  const handleImageUpload = (file: File, imageType: string) => {
    // Do something with the uploaded file in the parent component
    console.log(`Uploaded ${imageType} file:`, file);
  
    // Update the state with the uploaded image
    setImages(prevImages => ({
      ...prevImages,
      [imageType]: file,
    }));
  };
  
  const sourceSteps = [{
   label: "Destino",
   fields: ["cidade", "dataIda", "dataVolta"],
   Component: <Destino />,
   hasError: false,
   },
   {
   label: "Transporte",
   fields: ["valorTrans", "categoria", "imagemTrans"],
   Component: <Transporte onImageUpload={handleImageUpload} />,
   hasError: false,
   },
   {
   label: "Hospedagem",
   fields: ["nomeHotel", "valorHotel", "imageHotel"],
   Component: <Hospedagem onImageUpload={handleImageUpload}/>,
   hasError: false,
   },
   {
   label:"Adiantamento",
   fields: ["adiantamento", "adiantData", "adiantImagem"],
   Component: <Adiantamento onImageUpload={handleImageUpload}/>,
   hasError: false,
  },
  ];
  
  const getSteps = (errors: string[]) => {
    return sourceSteps.map((step) => {
    return {
    ...step,
    hasError: errors.some((error) => step.fields.includes(error)),};
    });
  };
  

  if (methods.formState.isSubmitSuccessful) {
    return (
      <Box sx={{margin: 3}}>   
      <Alert variant='solid' color="success" sx={{ width: 300}}>
        Success
      </Alert>
      <Button onClick={() => navigate('/viagens')}>
        Ver minhas viagens
      </Button></Box>
    );
  }

  const steps = getSteps(Object.keys(methods.formState.errors));
 

  function createViagem(data: FormValues) {
    const userId = localStorage.getItem('user');
    console.log(userId)
    if (images.imagemTrans && images.imagemHotel && images.adiantImagem && userId) {
      ViagensService.create(data, images.imagemTrans, images.imagemHotel, images.adiantImagem, userId)
      .then(response => {
        // Handle the response as needed
        console.log('Viagem criada', response);
      })
      .catch(error => {
        // Handle the error
        console.error('Error', error);
      });
    }
  }

  return( 
  <FormProvider {...methods}>
    <NavBar/>
    <form onSubmit={methods.handleSubmit(createViagem)}>
    {window.innerWidth <=600 ? (
    <StepsMobile items={steps}/>
     ): (
    <Steps items={steps}/>
    )}
    </form>
  </FormProvider>
  );
}

export default Form