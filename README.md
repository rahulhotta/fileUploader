# File Uploader Web Application

A React + TypeScript + vite application that allows users to upload multiple files with real-time progress tracking, cancel uploads, reset all uploads, and view success/error notifications using toast messages.

The app uses a mock upload API (`https://httpbin.org/post`) and is designed with a clean, component-based architecture.

---

## 🚀 Features

- Upload multiple files in parallel
- Show upload progress (0–100%)
- Cancel individual file uploads
- Reset all uploads
- Success / Error / Info toast notifications (multiple toasts supported)
- Drag & drop file selection
- Professional and responsive UI
- Built with React, TypeScript, and Material UI

---

## 🛠️ Tech Stack

- React + TypeScript (SWC)
- Material UI
- Axios (for API calls & progress tracking)
- Mock API: `https://httpbin.org/post`
- Custom CSS for styling
- GitHub for version control

---

## Project flow

<img width="386" height="149" alt="image" src="https://github.com/user-attachments/assets/bb8bd97b-d820-4370-aab3-b91c9afcf28f" />

The application follows a component-based architecture with a clear separation between business logic and UI rendering.

All file upload logic (file handling, progress tracking, cancel/reset actions, and toast notifications) is centralized in a custom React hook (useFileUploader).
UI responsibilities are divided into small, reusable presentational components such as DropZone, FileList, FileItem, and Toaster, while FileUploaderContainer acts as the main orchestration component that connects the hook with the UI.

Data flows in a unidirectional manner from the hook to the UI components via props, and user actions (file selection, cancel, reset) flow back through callback functions. This structure improves maintainability, reusability, and scalability of the application.

## Access the poject here
https://fileuploader-rahul.netlify.app/
Hosted using netlify

## ▶️ Instructions to Run the App

### 1. Clone the repository

```bash
git clone https://github.com/rahulhotta/fileUploader.git
cd <your-project-folder>
npm install
npm run dev
