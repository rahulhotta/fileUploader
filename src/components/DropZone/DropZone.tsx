import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface Props {
  onFilesSelected: (files: FileList) => void;
}

export const DropZone: React.FC<Props> = ({ onFilesSelected }) => {
  return (
    <Box
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        onFilesSelected(e.dataTransfer.files);
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
        type="file"
        multiple
        hidden
        id="fileInput"
        onChange={(e) => e.target.files && onFilesSelected(e.target.files)}
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
