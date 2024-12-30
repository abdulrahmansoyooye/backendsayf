"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

const FileUpload = ({ file, setFile, type}) => {

  
  return (
    <div>
      <CldUploadWidget
        cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
        apiKey={process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}
        apiSecret={process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET}
        onSuccess={(result, { widget }) => {
            console.log(`Success! Here is the uploaded file info:`, result?.info.secure_url);
            setFile(result?.info.secure_url);  
          }}
        options={{
          sources: ["local"], // File sources
          resourceType: "auto", // Allow images, videos, PDFs, etc.
          multiple: false, // Allow multiple uploads if set to true
          clientAllowedFormats: [type], // Restrict file types
        }}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      >
        {({ open }) => (
          <button
            onClick={() =>open()} 
            disabled={file}
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
