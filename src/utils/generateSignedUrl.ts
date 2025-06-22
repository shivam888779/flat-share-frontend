import { authApi } from "@/api-service";

interface File {
  entity: string;
  file: any;
}

const getExtension = (filename: string) => {
  return filename.split('.').pop();
}

function generateBase64String(filename: string,entity:string) {
  let timestamp = new Date().getTime();
  let timestampBase64 = btoa(timestamp.toString().concat(filename).concat(localStorage.getItem("authToken") ?? "")).replace(/[+/=]/g, '').replace(/\//g, 'x');
  let randomBytes = crypto.getRandomValues(new Uint8Array(16));
  let randomBytesArray = Array.from(randomBytes);
  let randomBytesBase64 = btoa(String.fromCharCode.apply(null, randomBytesArray)).replace(/[+/=]/g, '').replace(/\//g, 'x');
  let base64String = timestampBase64 + randomBytesBase64;
  return entity+"-"+base64String.substring(0, 32) + "." + getExtension(filename);
}

const generateSignedUrl = async (file: File) => {
  try {
    const fileName = generateBase64String(file?.file?.path ?? file?.file?.name,file?.entity);
    
    const response = await authApi.post("api/upload/generate-signed-url", {
      entity: file.entity,
      fileName: fileName,
    });

    const { data } = response;
    if (data?.status) {
      return addImageToGCPBucket(data?.data, fileName, file?.file);
    } else {
      throw new Error('Failed to get a valid response from the server.');
    }
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw error;
  }
};

const generatePublicUrl = (imagePath: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  return `${baseUrl}api/upload/image/${imagePath}`;
};

const addImageToGCPBucket = async (signedUrl: string, imagePath: string, file: any) => {
  try {
    const response = await fetch(`${signedUrl}`, {
      method: "PUT",
      headers: {
        "Content-Type": file.type
      },
      body: file
    });
    
    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }

    const publicUrl = generatePublicUrl(imagePath);

    return { imagePath: imagePath, publicUrl: publicUrl };
  }
  catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export default generateSignedUrl;