import { authApi } from "@/api-service";

interface File {
  entity: string;
  file: any;
}

const getExtension = (filename: string) => {
  return filename.split('.').pop();
}

function generateBase64String(filename: string, entity: string) {
  let timestamp = new Date().getTime();
  let timestampBase64 = btoa(timestamp.toString().concat(filename).concat(localStorage.getItem("authToken") ?? "")).replace(/[+/=]/g, '').replace(/\//g, 'x');
  let randomBytes = crypto.getRandomValues(new Uint8Array(16));
  let randomBytesArray = Array.from(randomBytes);
  let randomBytesBase64 = btoa(String.fromCharCode.apply(null, randomBytesArray)).replace(/[+/=]/g, '').replace(/\//g, 'x');
  let base64String = timestampBase64 + randomBytesBase64;
  return entity + "-" + base64String.substring(0, 32) + "." + getExtension(filename);
}

const generateSignedUrl = async (file: File) => {
  try {
    const fileName = generateBase64String(file?.file?.path ?? file?.file?.name, file?.entity);

    console.log('🔍 Generating signed URL for:', fileName);

    const response = await authApi.post("api/upload/generate-signed-url", {
      entity: file.entity,
      fileName: fileName,
    });

    const { data } = response;
    if (data?.status) {
      console.log('✅ Signed URL generated successfully');
      return addImageToGCPBucket(data?.data, fileName, file?.file, file.entity);
    } else {
      throw new Error('Failed to get a valid response from the server.');
    }
  } catch (error) {
    console.error('❌ Error generating signed URL:', error);
    throw error;
  }
};

const generatePublicUrl = (imagePath: string, entity: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  return `${baseUrl}api/upload/image/${entity}/${imagePath}`;
};

const addImageToGCPBucket = async (signedUrl: string, imagePath: string, file: any, entity: string) => {
  try {
    console.log('🚀 Starting GCP upload for:', imagePath);
    console.log('📁 File type:', file.type);
    console.log('📏 File size:', file.size);
    console.log('🔗 Signed URL:', signedUrl);

    // 🔧 FIXED: Ensure we're using the actual file data
    const fileData = file instanceof File ? file : file;

    // 🔧 FIXED: Remove problematic headers that cause 400 errors
    const response = await fetch(signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": fileData.type || "image/jpeg"
        // Removed x-goog-content-length-range and Cache-Control headers
        // These can cause 400 errors with GCP signed URLs
      },
      body: fileData
    });

    console.log('📊 Upload response status:', response.status);
    console.log('📊 Upload response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Upload failed:', response.status, response.statusText);
      console.error('❌ Error details:', errorText);
      throw new Error(`Failed to upload image: ${response.status} ${response.statusText}`);
    }

    const publicUrl = generatePublicUrl(imagePath, entity);
    console.log('✅ Upload successful!');
    console.log('🔗 Public URL:', publicUrl);

    return { imagePath: imagePath, publicUrl: publicUrl };
  }
  catch (error) {
    console.error('❌ Error uploading file:', error);
    throw error;
  }
};

export default generateSignedUrl;