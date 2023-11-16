import Box from "@mui/material/Box";
import { FormInput } from "../FormInput";
import { useState } from "react";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Image } from '@mui/icons-material';

export const Transporte = () => {
  const [uploadedFile, setUploadedFile] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    setUploadedFile(file.name);
  }
  };

  return (
  <Box marginY={10}>
   <Box display="flex" flexDirection="column" gap={4} marginTop={2}>
   <FormInput type="category" name="categoriaT" label="Tipo" />
   <FormInput type="value" name="valorTrans" label="Valor"/>
   <FormInput type="image" name="imageTrans" label="Anexo" onChangeUploadImage={handleFileUpload} />
  
   {uploadedFile && (
    <List>
    <ListItem>
    <ListItemAvatar>
    <Avatar>
     <Image />
    </Avatar>
    </ListItemAvatar>
    <ListItemText primary="Imagem" secondary={uploadedFile} />
    </ListItem>
    </List>
    )} 
    
   </Box>
</Box>
);
};