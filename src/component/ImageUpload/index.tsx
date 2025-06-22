import React, { useState, ChangeEvent } from "react";

interface ImageUploadProps {
  setSelectedFiles: (files: File[]) => void;
  maxImages?: number; // Optional, defaults to 1
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setSelectedFiles, maxImages = 1 }) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      let filesArray = Array.from(event.target.files);
      // Combine with existing files, but do not exceed maxImages
      let newFiles = [...files, ...filesArray].slice(0, maxImages);
      setFiles(newFiles);
      setSelectedFiles(newFiles);

      // Generate previews
      const previewPromises = newFiles.map(
        file =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          })
      );
      Promise.all(previewPromises).then(setPreviews);
      // Reset the input value so the same file can be selected again if removed
      event.target.value = '';
    }
  };

  const handleRemove = (idx: number) => {
    const newFiles = files.filter((_, i) => i !== idx);
    setFiles(newFiles);
    setSelectedFiles(newFiles);
    // Remove the corresponding preview
    setPreviews(previews.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple={maxImages > 1}
        onChange={handleFileChange}
        style={{ marginBottom: '8px' }}
        disabled={files.length >= maxImages}
      />
      {maxImages > 1 && (
        <p style={{ fontSize: '0.8rem', color: '#666', margin: 0 }}>
          Hold Ctrl (or Cmd on Mac) to select up to {maxImages} images.
        </p>
      )}
      <div style={{ display: "flex", flexWrap: 'wrap', gap: "10px", marginTop: "10px" }}>
        {previews.map((src, idx) => (
          <div key={idx} style={{ position: 'relative', display: 'inline-block' }}>
            <img
              src={src}
              alt={`Preview ${idx + 1}`}
              style={{ maxWidth: "100px", maxHeight: "100px", borderRadius: 4, border: '1px solid #ccc' }}
            />
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              style={{
                position: 'absolute',
                top: 2,
                right: 2,
                background: '#fff',
                border: '1px solid #ccc',
                borderRadius: '50%',
                width: 22,
                height: 22,
                cursor: 'pointer',
                fontWeight: 'bold',
                color: '#d00',
                lineHeight: '18px',
                padding: 0
              }}
              aria-label={`Remove image ${idx + 1}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;