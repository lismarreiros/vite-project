import Box from "@mui/material/Box";
import { Image } from '@mui/icons-material';
import { FormInput } from "../FormInput";
import { useState } from "react";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

export const Adiantamento = () => {
    const [uploadedFile, setUploadedFile] = useState("");

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          setUploadedFile(file.name);
      }
    };

    return (
        <Box marginY={10}>
            <Box display="flex" flexDirection="column" gap={4} marginTop={3}>
                <FormInput type="date" name="dataAdia" label="Data" />
                <FormInput type="value" name="valorAdia" label="Valor"/>
                <FormInput type="image" name="imageAdia" label="Anexo" onChangeUploadImage={handleFileUpload} />
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