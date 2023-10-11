import { storage } from "@/libs/AppWriteClient"
import Image from "image-js";

// 更新用户头像
const useChangeUserImage = async (file: File, cropper: any, currentImage: string) => {
  let videoId = Math.random().toString(36).slice(2, 22)

  const x = cropper.left;
  const y = cropper.top;
  const width = cropper.width;
  const height = cropper.height;

  try {
    const response = await fetch(URL.createObjectURL(file)); // 将文件转换为URL
    const imageBuffer = await response.arrayBuffer();

    const image = await Image.load(imageBuffer)
    const croppedImage = image.crop({ x, y, width, height });
    const resizedImage = croppedImage.resize({ width: 200, height: 200 });
    const blob = await resizedImage.toBlob();
    const arrayBuffer = await blob.arrayBuffer(); // 传递该数组缓冲区 fn 并返回它；
    const finalFile = new File([arrayBuffer], file.name, { type: blob.type });
    const result = await storage.createFile(String(process.env.NEXT_PUBLIC_BUCKET_ID), videoId, finalFile);

    // 如果当前图像不是默认图像则删除
    if (currentImage != String(process.env.NEXT_PUBLIC_PLACEHOLDER_DEAFULT_IMAGE_ID)) {
      await storage.deleteFile(String(process.env.NEXT_PUBLIC_BUCKET_ID), currentImage);
    }

    return result?.$id
  } catch (error) {
    throw error
  }
}

export default useChangeUserImage