import Box from "@mui/material/Box";
import { FormInput } from "../FormInput";


export const Destino = () => {
    return (
        <Box marginY={10}>
            <Box display="flex" flexDirection="column" gap={2} marginTop={3}>
            <FormInput  type="text" name="cidade" label="Cidade"/>
            <FormInput  type="date" name="dataIda" label="Data de Ida" />
            <FormInput  type="date" name="dataVolta" label="Data de Volta" />
            </Box>
        </Box>
    );
};