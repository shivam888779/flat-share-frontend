import generateSignedUrl from '@/utils/generateSignedUrl';
import React, { useState, ChangeEvent } from 'react';

interface ImageUploadProps {
  onUploadSuccess: (imagePath: string, publicUrl: string) => void;
  entity: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadSuccess, entity }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const result = await generateSignedUrl({
        entity: entity,
        file: selectedFile,
      });

      if (result && result.imagePath && result.publicUrl) {
        onUploadSuccess(result.imagePath, result.publicUrl);
      } else {
        throw new Error("Upload did not return required data.");
      }
    } catch (err) {
      setError('Failed to upload image.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
      {preview && <img src={preview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '10px' }} />}
      <button onClick={handleUpload} disabled={!selectedFile || uploading}>
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ImageUpload; 