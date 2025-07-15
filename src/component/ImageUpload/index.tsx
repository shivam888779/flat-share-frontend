import React, { useState, ChangeEvent } from "react";
import { Box, Button, Stack, IconButton, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

interface ImageUploadProps {
  setSelectedFiles: (files: File[]) => void;
  maxImages?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setSelectedFiles, maxImages = 3 }) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target);
    if (event.target.files) {
      let filesArray = Array.from(event.target.files);
      let newFiles = [...files, ...filesArray].slice(0, maxImages);
      console.log(newFiles);
      setFiles(newFiles);
      setSelectedFiles(newFiles);

      const previewPromises = newFiles.map(
        file =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          })
      );
      Promise.all(previewPromises).then(setPreviews);
      event.target.value = '';
    }
  };

  const handleRemove = (idx: number) => {
    const newFiles = files.filter((_, i) => i !== idx);
    setFiles(newFiles);
    setSelectedFiles(newFiles);
    setPreviews(previews.filter((_, i) => i !== idx));
  };

  return (
    <Box>
      <Box
        sx={{
          border: '2px dashed #e5e7eb',
          borderRadius: '8px',
          p: 2,
          backgroundColor: '#f9fafb',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: '#f3f4f6',
          },
        }}
        onClick={() => document.getElementById('file-upload-input')?.click()}
      >
        <input
          id="file-upload-input"
          type="file"
          accept="image/*"
          multiple={maxImages > 1}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          disabled={files.length >= maxImages}
        />

        <Stack direction="row" alignItems="center" spacing={2}>
          <Button
            variant="outlined"
            size="small"
            disabled={files.length >= maxImages}
            sx={{
              borderColor: '#e5e7eb',
              backgroundColor: 'white',
              color: '#374151',
              fontWeight: 500,
              fontSize: '0.875rem',
              textTransform: 'none',
              px: 2,
              py: 0.75,
              '&:hover': {
                borderColor: '#9ca3af',
                backgroundColor: '#f9fafb',
              },
              '&.Mui-disabled': {
                backgroundColor: '#f3f4f6',
                borderColor: '#e5e7eb',
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              document.getElementById('file-upload-input')?.click();
            }}
          >
            Choose files | {files.length === 0 ? 'No file chosen' : `${files.length} file(s) chosen`}
          </Button>

          <Typography
            variant="caption"
            sx={{
              color: '#9ca3af',
              fontSize: '0.75rem',
            }}
          >
            Hold Ctrl (or Cmd on Mac) to select up to {maxImages} images
          </Typography>
        </Stack>
      </Box>

      {previews.length > 0 && (
        <Stack direction="row" spacing={1} sx={{ mt: 2 }} flexWrap="wrap">
          {previews.map((src, idx) => (
            <Box
              key={idx}
              sx={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                width: 100,
                height: 100,
                mb: 1,
              }}
            >
              <img
                src={src}
                alt={`Preview ${idx + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <IconButton
                size="small"
                onClick={() => handleRemove(idx)}
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  width: 24,
                  height: 24,
                  '&:hover': {
                    backgroundColor: 'white',
                  },
                }}
              >
                <CloseIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default ImageUpload;