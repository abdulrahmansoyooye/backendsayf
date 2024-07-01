import { uploadFiles } from "@/utils/actions/upload";

const ImageUpload = () => {
  return (
    <form action={uploadFiles}>
      <input name="files" type="file"  />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUpload;
