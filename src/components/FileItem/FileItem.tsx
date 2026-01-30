import {
    Card,
    CardContent,
    Typography,
    Button,
    Stack,
    LinearProgress,
    CircularProgress,
    Tooltip,
  } from "@mui/material";
  
  import CheckCircleIcon from "@mui/icons-material/CheckCircle";
  import ErrorIcon from "@mui/icons-material/Error";
  
  import type { UploadFile } from "../../hooks/useFileUploader";
  
  interface Props {
    file: UploadFile;
    onCancel: (id: string) => void;
  }
  
  export const FileItem: React.FC<Props> = ({ file, onCancel }) => {
    const renderStatusIcon = () => {
      switch (file.status) {
        case "uploading":
          return (
            <Tooltip title="Uploading...">
              <CircularProgress size={18} color="primary" />
            </Tooltip>
          );
        case "success":
          return (
            <Tooltip title="Upload successful">
              <CheckCircleIcon color="success" />
            </Tooltip>
          );
        case "error":
          return (
            <Tooltip title="Upload failed">
              <ErrorIcon color="error" />
            </Tooltip>
          );
        default:
          return null;
      }
    };
  
    return (
      <Card variant="outlined" sx={{ mt: 1 }}>
        <CardContent>
          <Stack spacing={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>{file.file.name}</Typography>
  
              {/* Status Icon with Tooltip */}
              {renderStatusIcon()}
            </Stack>
  
            <LinearProgress variant="determinate" value={file.progress} />
  
            {file.status === "uploading" && (
              <Button
                size="small"
                color="error"
                onClick={() => onCancel(file.id)}
              >
                Cancel
              </Button>
            )}
  
            {file.status === "error" && (
              <Typography color="error" variant="caption">
                {file.error}
              </Typography>
            )}
          </Stack>
        </CardContent>
      </Card>
    );
  };
  