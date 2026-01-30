import { Snackbar, Alert } from "@mui/material";
import type { ToastState } from "../../hooks/useFileUploader";
import type { FC } from "react";

interface Props {
  toast: ToastState | null;
  onClose: () => void;
}

export const ToastMessage: FC<Props> = ({ toast, onClose }) => {
  if (!toast) return null; // 👈 prevent Snackbar from rendering at all

  return (
    <Snackbar
      open={true}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={toast.severity} onClose={onClose}>
        {toast.message}
      </Alert>
    </Snackbar>
  );
};
