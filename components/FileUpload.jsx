"use client";
import { CldUploadWidget } from "next-cloudinary";

const FileUpload = ({ file, setFile, type }) => {
  const handleUploadSuccess = (result) => {
    const uploadedFileUrl = result?.info?.secure_url;
    if (uploadedFileUrl) {
      setFile(uploadedFileUrl);
    } else {
      console.error("File upload succeeded but URL is missing:", result);
    }
  };

  const handleError = (error) => {
    console.error("File upload error:", error);
    alert("An error occurred during file upload. Please try again.");
  };

  return (
    <div>
      <CldUploadWidget
        cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        options={{
          sources: ["local","unsplash","image_search","shutterstock"],
          resourceType: "auto",
          multiple: false,
          clientAllowedFormats: type ? [type] : undefined,
        }}
        onSuccess={handleUploadSuccess}
        onError={handleError}
      >
        {({ open }) => (
          <button
            onClick={(e) => {
              e.preventDefault();
              open();
            }}
            // disabled={!!file}
            className="bg-black w-full text-white py-2 px-4 rounded hover:bg-gray-900"
          >
            Upload {type}
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default FileUpload;
