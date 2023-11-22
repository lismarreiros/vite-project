import Box from "@mui/material/Box";
import { Image } from '@mui/icons-material';
import { FormInput } from "../FormInput";
import { useState } from "react";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

export const Hospedagem = ({onImageUpload}: { onImageUpload: (file: File, imageType: string) => void} ) => {
  const [uploadedFile, setUploadedFile] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
  setUploadedFile(file.name);
  onImageUpload(file, 'imagemHotel');
  }
  };

  return (
  <Box marginY={10}>
   <Box display="flex" flexDirection="column" gap={2} marginTop={3}>
   <FormInput type="text" name="nomeHotel" label="Nome do Hotel" />
   <FormInput type="value" name="valorHotel" label="Valor"/>
   <FormInput type="image" name="imageHotel" label="Anexo" onChangeUploadImage={handleFileUpload}  />
  
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