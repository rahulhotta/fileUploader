import { useState, useCallback } from "react";
import axios from "axios";
import type { CancelTokenSource, AxiosProgressEvent } from "axios";

export type UploadStatus = "uploading" | "success" | "error";

export interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: UploadStatus;
  error?: string;
  cancelToken: CancelTokenSource;
}

export interface ToastState {
  message: string;
  severity: "success" | "error" | "info";
}

const UPLOAD_URL = "https://httpbin.org/post";

export const useFileUploader = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [toast, setToast] = useState<ToastState | null>(null);

  const handleFiles = useCallback((selectedFiles: FileList) => {
    const newFiles: UploadFile[] = Array.from(selectedFiles).map((file) => ({
      id: crypto.randomUUID(),
      file,
      progress: 0,
      status: "uploading",
      cancelToken: axios.CancelToken.source(),
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach(uploadFile);
  }, []);

  const uploadFile = async (fileObj: UploadFile): Promise<void> => {
    const formData = new FormData();
    formData.append("file", fileObj.file);

    try {
      await axios.post(UPLOAD_URL, formData, {
        cancelToken: fileObj.cancelToken.token,
        onUploadProgress: (event: AxiosProgressEvent) => {
          const percent = Math.round(
            (event.loaded * 100) / (event.total ?? 1)
          );

          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileObj.id ? { ...f, progress: percent } : f
            )
          );
        },
      });

      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileObj.id ? { ...f, status: "success" } : f
        )
      );

      setToast({
        message: `File ${fileObj.file.name} uploaded successfully!`,
        severity: "success",
      });
    } catch (error: unknown) {
      if (axios.isCancel(error)) {
        setFiles((prev) => prev.filter((f) => f.id !== fileObj.id));
        setToast({
          message: `Upload canceled: ${fileObj.file.name}`,
          severity: "info",
        });
      } else {
        const errMsg =
          error instanceof Error ? error.message : "Upload failed";

        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileObj.id
              ? { ...f, status: "error", error: errMsg }
              : f
          )
        );

        setToast({
          message: `Failed to upload ${fileObj.file.name} — ${errMsg}`,
          severity: "error",
        });
      }
    }
  };
  const resetFiles = () => {
    // Cancel all ongoing uploads
    files.forEach((file) => {
      if (file.status === "uploading") {
        file.cancelToken.cancel("Reset all uploads");
      }
    });
  
    // Clear the list
    setFiles([]);
  };

  const cancelUpload = useCallback(
    (id: string) => {
      const file = files.find((f) => f.id === id);
      if (file) {
        file.cancelToken.cancel("Upload canceled by user");
      }
    },
    [files]
  );

  const clearToast = () => {
    setToast(null);
  };

  return {
    files,
    toast,
    handleFiles,
    cancelUpload,
    clearToast,
    resetFiles
  };
};
