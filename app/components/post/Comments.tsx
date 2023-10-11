import { useState } from "react"
import SingleComment from "./SingleComment"
import { useUser } from "@/app/context/user"
import { BiLoaderCircle } from "react-icons/bi"
import ClientOnly from "../ClientOnly"
import { useCommentStore } from "@/app/stores/comment"
import useCreateComment from '@/app/hooks/useCreateComment'
import { useGeneralStore } from "@/app/stores/general"
import { CommentsCompTypes } from "@/app/types"

export default function Comments({ params }: CommentsCompTypes) {

  let { commentsByPost, setCommentsByPost } = useCommentStore()
  let { setIsLoginOpen } = useGeneralStore()

  const contextUser = useUser()
  const [comment, setComment] = useState<string>('')
  const [inputFocused, setInputFocused] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const addComment = async () => {
    if (!contextUser?.user) return setIsLoginOpen(true); // 打开登录界面

    try {
      setIsUploading(true)
      await useCreateComment(contextUser?.user?.id, params?.postId, comment)
      setCommentsByPost(params?.postId)
      setComment(''); // 本地评论
      setIsUploading(false); // 关闭加载
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  return (
    <>
      <div
        id="Comments"
        className="relative bg-[#F8F8F8] z-0 w-full h-[calc(100%-273px)] border-t-2 overflow-auto"
      >

        <div className="pt-2" />

        <ClientOnly>
          {commentsByPost.length < 1 ? (
            <div className="text-center mt-6 text-xl text-gray-500">没有评论!</div>
          ) : (
            <div>
              {commentsByPost.map((comment, index) => (
                <SingleComment key={index} comment={comment} params={params} />
              ))}
            </div>
          )}
        </ClientOnly>

        <div className="mb-28" />

      </div>

      <div
        id="CreateComment"
        className="absolute flex items-center justify-between bottom-0 bg-white h-[85px] lg:max-w-[550px] w-full py-5 px-8 border-t-2"
      >
        <div
          className={`
                      bg-[#F1F1F2] flex items-center rounded-lg w-full lg:max-w-[420px]
                      ${inputFocused ? 'border-2 border-gray-400' : 'border-2 border-[#F1F1F2]'}
                    `}
        >
          <input
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            onChange={e => setComment(e.target.value)}
            value={comment || ''}
            className="bg-[#F1F1F2] text-[14px] focus:outline-none w-full lg:max-w-[420px] p-2 rounded-lg"
            type="text"
            placeholder="来一条有趣的评论吧♪(･ω･)ﾉ"
          />
        </div>
        {!isUploading ? (
          <button
            disabled={!comment}
            onClick={() => addComment()}
            className={`
                        font-semibold text-sm ml-5 pr-1
                        ${comment ? 'text-[#F02C56] cursor-pointer' : 'text-gray-400'}
                      `}
          >
            发送
          </button>
        ) : (
          <BiLoaderCircle className="animate-spin" color="#E91E62" size="20" />
        )}

      </div>
    </>
  )
}
