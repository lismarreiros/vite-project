import Box from '@mui/material/Box';
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { Destino } from "./stepcomponents/Destino";
import { Transporte } from "./stepcomponents/Transporte";
import { Hospedagem } from "./stepcomponents/Hospedagem";
import { Adiantamento } from "./stepcomponents/Adiantamento";
import { Steps } from "./Stepper";
import { useState } from 'react';
import { NavBar } from '../layouts/Navbar';
import { StepsMobile } from './StepperMobile';

const schema = z.object({
    cidade: z.string().min(1, 'Informe pelo menos uma cidade')
    .max(100)
    .transform(cidade => {
        return cidade.trim().split('').map(word => {
            return word[0].toLocaleUpperCase().concat(word.substring(1))
        }).join(' ')

    }),

    dataIda: z.coerce.date({
        errorMap: () => {
            return {
                message: 'Selecione uma data de ida'
            }
        }
    }),
    dataVolta: z.coerce.date({
        errorMap: () => {
            return {
                message: 'Selecione uma data de volta'
            }
        }
    }), 
   
    category: z.string({   
        errorMap: () => {
            return {
                message: 'Selecione uma opção.'
            }
        }
    }),

    valorTrans: z.coerce.number({
        errorMap: () => {
            return {
                message: 'Informe  um valor.'
            }
        }
    })
    .positive({message:'Digite um número válido'}),

    imageTrans: z.instanceof(FileList).transform(list => list.item(0)),

    nomeHotel: z.string().min(1, {message: 'Informe um nome'}),

    valorHotel: z.coerce.number({
        errorMap: () => {
            return {
                message: 'Informe  um valor.'
            }
        }
    }),

    imageHotel: z.instanceof(FileList).transform(list => list.item(0))
    .optional(),

    valorAdia: z.coerce.number({
        errorMap: () => {
            return {
                message: 'Informe  um valor.'
            }
        }
    }),
    dataAdia: z.coerce.date({
        errorMap: () => {
            return {
                message: 'Selecione uma data.'
            }
        }
    }),

    imageAdia: z.instanceof(FileList).transform(list => list.item(0))
    .optional(),

}).required();

type FormValues =  z.infer<typeof schema>;

const sourceSteps = [
    {
        label: "Destino",
        fields: ["cidade", "dataIda", "dataVolta"],
        Component: <Destino />,
        hasError: false,
    },
    {
        label: "Transporte",
        fields: ["valorTrans", "category", "imageTrans"],
        Component: <Transporte />,
        hasError: false,
    },
    {
        label: "Hospedagem",
        fields: ["nomeHotel", "valorHotel", "imageHotel"],
        Component: <Hospedagem />,
        hasError: false,
    },
    {
        label:"Adiantamento",
        fields: ["valorAdia", "dataAdia", "imageAdia"],
        Component: <Adiantamento />,
        hasError: false,
    },
];

const getSteps = (errors: string[]) => {
    return sourceSteps.map((step) => {
        return {
            ...step,
            hasError: errors.some((error) => step.fields.includes(error)),
        };
    });
};

 const Form = () => {
    const [output, setOutput] = useState('')
    const methods = useForm<FormValues>({
        resolver: zodResolver(schema),
        criteriaMode: "all",
        mode: "all",
        defaultValues: {
            cidade: "",
            dataIda: undefined,
            dataVolta: undefined,
            category: undefined,
            valorTrans: undefined,
            nomeHotel: "",
            valorHotel: undefined,
            valorAdia: undefined,
            dataAdia: undefined,
        },
    });

    if (methods.formState.isSubmitSuccessful) {
        return (
            <Box>
                <Typography variant="h2">Formulário enviado com sucesso!</Typography>
                <Button onClick={() => methods.reset()}>
                    Clique aqui para enviar um novo cadastro
                </Button>
            </Box>
        );
    }

    const steps = getSteps(Object.keys(methods.formState.errors));

    function createUser(data:any) {
        setOutput(JSON.stringify(data, null, 2))
    }


    return( 
        <FormProvider {...methods}>
            <NavBar/>
            <form onSubmit={methods.handleSubmit(createUser)}>
                {window.innerWidth <=600 ? (
                    <StepsMobile items={steps}/>
                ): (
                    <Steps items={steps}/>
                )}
            </form>
            <pre>{output}</pre>
        </FormProvider>
    );
}

export default Form