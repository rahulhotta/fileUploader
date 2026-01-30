import { useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface Props {
  onFilesSelected: (files: FileList) => void;
}

export const DropZone: React.FC<Props> = ({ onFilesSelected }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    onFilesSelected(files);

    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Box
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
      }}
      sx={{
        border: "2px dashed #1976d2",
        borderRadius: 2,
        p: 3,
        textAlign: "center",
        bgcolor: "#f5faff",
      }}
    >
      <input
        ref={fileInputRef}  
        type="file"
        multiple
        hidden
        id="fileInput"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <label htmlFor="fileInput">
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Select Files
        </Button>
      </label>

      <Typography mt={1}>
        Drag & drop files here or click to select
      </Typography>
    </Box>
  );
};
