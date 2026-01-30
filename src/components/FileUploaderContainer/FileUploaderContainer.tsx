import { Box, Stack, Typography } from "@mui/material";
import { useFileUploader } from "../../hooks/useFileUploader";
import { DropZone } from "../DropZone/DropZone";
import { FileList } from "../FileList/FileList";
import { ToastMessage } from "../Toaster/Toaster";
import './FileUploaderContainer.css'
export const FileUploaderContainer = () => {
  const { files, toast, handleFiles, cancelUpload, clearToast, resetFiles } =
    useFileUploader();

  return (
    <Box className="file-uploader-container" >
      <ToastMessage toast={toast} onClose={clearToast} />

      <div className="file-uploader-card" >
        <Stack spacing={2}>
          <div className="file-upload-header">
            <Typography variant="h5" className="file-upload-title">
              File Uploader
            </Typography>

            {files.length > 0 && (
              <button className="reset-btn" onClick={resetFiles}>
                Reset All
              </button>
            )}
          </div>


          <DropZone onFilesSelected={handleFiles} />
          <FileList files={files} onCancel={cancelUpload} />
        </Stack>
      </div>
    </Box>
  );
};
