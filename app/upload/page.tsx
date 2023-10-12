"use client"

import React, { useEffect, useState } from "react";
import UploadLayout from "../layouts/UploadLayout";
import { BiLoaderCircle, BiSolidCloudUpload } from "react-icons/bi"
import { AiOutlineCheckCircle } from "react-icons/ai";
import { PiKnifeLight } from 'react-icons/pi'
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/user"
import { UploadError } from "../types";
import useCreatePost from "../hooks/useCreatePost";

export default function Upload() {
  const contextUser = useUser()
  const router = useRouter()

  let [fileDisplay, setFileDisplay] = useState<string>('');
  let [caption, setCaption] = useState<string>('');
  let [file, setFile] = useState<File | null>(null);
  let [error, setError] = useState<UploadError | null>(null);
  let [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    if (!contextUser?.user) router.push('/'); // 如果用户没登录，直接跳转首页
  }, [contextUser]); // 每当这种情况发生变化时

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file); // 将其转换为可读的 URL
      setFileDisplay(fileUrl); // 可读
      setFile(file); // 保存文件的状态
    }
  }

  const discard = () => {
    setFileDisplay('')
    setFile(null)
    setCaption('')
  }

  const clearVideo = () => {
    setFileDisplay('')
    setFile(null)
  }

  const validate = () => {
    setError(null)
    let isError = false

    if (!file) {
      setError({ type: 'File', message: 'A video is required' })
      isError = true
    } else if (!caption) {
      setError({ type: 'caption', message: 'A caption is required' })
      isError = true
    }
    return isError
  }

  const createNewPost = async () => {
    let isError = validate()
    if (isError) return
    if (!file || !contextUser?.user) return
    setIsUploading(true)

    try {
      await useCreatePost(file, contextUser?.user?.id, caption)
      router.push(`/profile/${contextUser?.user?.id}`)
      setIsUploading(false)
    } catch (error) {
      console.log(error)
      setIsUploading(false)
      alert(error)
    }
  }

  return (
    <>
      <UploadLayout>
        <div className="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4">
          <div>
            <h1 className="text-[23px] font-semibold">视频上传</h1>
            <h2 className="text-gray-400 mt-1">将视频发布到您的帐户</h2>
          </div>

          <div className="mt-8 md:flex gap-6">

            {!fileDisplay ?
              <label
                htmlFor="fileInput"
                className="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center justify-center w-full 
                max-w-[260px] h-[470px] text-center p-3 border-2 border-dashed border-gray-300 
                rounded-lg  hover:bg-gray-100 cursor-pointer"
              >
                <BiSolidCloudUpload size="40" color="#b3b3b1" />
                <p className="mt-4 text-[17px]">请选择视频上传</p>
                <p className="mt-1.5 text-gray-500 text-[13px]">拽拉项目</p>
                <p className="mt-12 text-gray-400 text-sm">MP4</p>
                <p className="mt-2 text-gray-400 text-[13px]">最多30分钟</p>
                <p className="mt-2 text-gray-400 text-[13px]">小于 2 GB</p>
                <label
                  htmlFor="fileInput"
                  className="px-2 py-1.5 mt-8 text-white text-[15px] w-[80%] bg-[#F02C56] rounded-sm cursor-pointer"
                >
                  选择文件
                </label>
                <input
                  type="file"
                  id="fileInput"
                  onChange={onChange}
                  hidden
                  accept=".mp4"
                />
              </label>
              :
              <div
                className="md:mx-0 mx-auto mt-4 md:mb-12 mb-16 flex items-center justify-center 
                w-full max-w-[260px] h-[540px] p-3 rounded-2xl cursor-pointer relative "
              >
                {isUploading ? (
                  <div className="absolute flex items-center justify-center z-20 bg-black h-full w-full rounded-[50px] bg-opacity-50">
                    <div className="mx-auto flex items-center justify-center gap-1">
                      <BiLoaderCircle className="animate-spin" color="#F12B56" size={30} />
                      <div className="text-white font-bold">上传中</div>
                    </div>
                  </div>
                ) : null}

                <img
                  className="absolute z-20 pointer-events-none"
                  src="/images/mobile-case.png"
                />
                <img
                  className="absolute right-4 bottom-6 z-20"
                  width="90"
                  src="/images/tiktok-logo-white.png"
                />
                <video
                  autoPlay
                  loop
                  muted
                  className="absolute rounded-xl object-cover z-10 p-[13px] w-full h-full"
                  src={fileDisplay}
                />

                <div className="absolute -bottom-12 flex items-center justify-between z-50 rounded-xl border w-full p-2 border-gray-300">
                  <div className="flex items-center truncate">
                    <AiOutlineCheckCircle size="16" className="min-w-[16px]" />
                    <p className="text-[11px] pl-1 truncate text-ellipsis">{File.name}</p>
                  </div>
                  <button onClick={() => clearVideo()} className="text-[11px] ml-2 font-semibold">
                    Change
                  </button>
                </div>
              </div>
            }


            <div className="mt-4 mb-6">
              <div className="flex bg-[#F8F8F8] py-4 px-6">
                <div>
                  <PiKnifeLight className="mr-4" size="20" />
                </div>
                <div>
                  <div className="text-semibold text-[15px] mb-1.5">视频编辑</div>
                  <div className="text-semibold text-[13px] text-gray-400">
                    您可以快速将视频分成多个部分，删除多余的部分，并将横向视频转换为纵向视频。
                  </div>
                </div>
                <div className="flex justify-end max-w-[130px] w-full h-full text-center my-auto">
                  <button className="px-8 py-1.5 text-white text-[15px] bg-[#F02C56] rounded-sm">
                    编辑
                  </button>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <div className="mb-1 text-[15px]">说明文字</div>
                  <div className="text-gray-400 text-[12px]">{caption.length}/150</div>
                </div>
                <input
                  maxLength={150}
                  type="text"
                  className="w-full border p-2.5 rounded-md focus:outline-none"
                  value={caption}
                  onChange={event => setCaption(event.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <button
                  disabled={isUploading}
                  onClick={() => discard()}
                  className="px-10 py-2.5 mt-8 border text-[16px] hover:bg-gray-100 rounded-sm"
                >
                  忽略
                </button>
                <button
                  disabled={isUploading}
                  onClick={() => createNewPost()}
                  className="px-10 py-2.5 mt-8 border text-[16px] text-white bg-[#F02C56] rounded-sm"
                >
                  {isUploading ? <BiLoaderCircle className="animate-spin" color="#ffffff" size={25} /> : '上传'}
                </button>
              </div>

              {error ? (
                <div className="text-red-600 mt-4"> {error.message} </div>
              ) : null}

            </div>

          </div>
        </div>
      </UploadLayout>
    </>
  )
}
