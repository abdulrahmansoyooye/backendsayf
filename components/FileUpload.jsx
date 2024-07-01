"use client";
import { uploadFiles } from "@/utils/actions/upload";
import { useCallback, useState } from "react";
import { useFormState } from "react-dom";
import { useDropzone } from "react-dropzone";
const FileUpload = ({ file, setFile, audio }) => {
  const [uploadFile, setUploadFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const formData = new FormData();
  formData.append("file", uploadFile);
  const uploadFileToServer = uploadFiles.bind(null, formData);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await uploadFileToServer();
      setFile(res.data.url);
      setUploadFile("");
      setLoading(false);
      setMessage(`${audio ? "Audio" : "Image"} was uploaded successfully`);
    } catch (error) {
      setMessage("Couldn't upload File to server. Try Again");
      setLoading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    setUploadFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = audio
    ? useDropzone({
        onDrop,
        accept: {
          "audio/*": [],
        },
      })
    : useDropzone({
        onDrop,
        accept: {
          "image/": [],
          "*pdf/*": [],
        },
      });
  return (
    <div className="border p-[1rem] rounded-md ">
      {message && (
        <p className="text-primary-color text-center m-[0.5rem_auto]">
          {message}
        </p>
      )}

      <div className="flex justify-center items-center flex-wrap gap-[1rem]">
        <div {...getRootProps()} className="cursor-pointer">
          <input accept={audio ? "audio/*" : "image/*"} {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the {`${audio ? "Audio" : "Image"}`} here ...</p>
          ) : (
            <p>Click to select an {`${audio ? "Audio" : "Image"}`}</p>
          )}
        </div>

        {uploadFile && <p className="text-center">{uploadFile.name}</p>}
        {uploadFile && (
          <button
            type="submit"
            className="black_btn"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Uploading" : "Upload"}
          </button>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
