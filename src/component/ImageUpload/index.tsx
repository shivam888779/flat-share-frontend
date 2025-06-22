import Image from "next/image";
import React, { useState, ChangeEvent, useEffect } from "react";

interface ImageUploadProps {
  setSelectedFile: any;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setSelectedFile }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ maxWidth: "200px", maxHeight: "200px", marginTop: "10px" }}
        />
      )}
    </div>
  );
};

export default ImageUpload;
