import { database, Query, storage } from "@/libs/AppWriteClient"
import useDeleteComment from "./useDeleteComment";
import useDeleteLike from "./useDeleteLike";
import useGetCommentsByPostId from "./useGetCommentsByPostId";
import useGetLikesByPostId from "./useGetLikesByPostId";

const useDeletePostById = async (postId: string, currentImage: string) => {
  try {
    // 当我们删除一个帖子时，需要删除与其相关的所有点赞
    const likes = await useGetLikesByPostId(postId)
    likes.forEach(async like => { await useDeleteLike(like?.id) })

    // 删除所有与之相关的评论
    const comments = await useGetCommentsByPostId(postId)
    comments.forEach(async comment => { await useDeleteComment(comment?.id) })

    await database.deleteDocument(
      String(process.env.NEXT_PUBLIC_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST),
      postId
    );
    // 因为是POST请求
    await storage.deleteFile(String(process.env.NEXT_PUBLIC_BUCKET_ID), currentImage);
  } catch (error) {
    throw error
  }
}

export default useDeletePostById