import { FileItem } from "../FileItem/FileItem";
import type { UploadFile } from "../../hooks/useFileUploader";
import "./FileList.css"
interface Props {
  files: UploadFile[];
  onCancel: (id: string) => void;
}

export const FileList: React.FC<Props> = ({ files, onCancel }) => {
  return (
    <div className="files_list">
      {files.map((file) => (
        <FileItem key={file.id} file={file} onCancel={onCancel} />
      ))}
    </div>
  );
};
