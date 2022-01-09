/* eslint-disable @next/next/no-img-element */
import { BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon, HeartIcon, PaperAirplaneIcon } from "@heroicons/react/outline"
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid"
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { db } from "../../../../../firebase"
import Moment from "react-moment"

interface PostProps {
  username: string,
  userimg: string,
  img: string,
  captions: string,
  id: any
}

const Post = ({ id, username, userimg, img, captions }: PostProps) => {
  const { data: session } = useSession()
  const [comments, setComments] = useState<any>([])
  const [comment, setComment] = useState("")
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs as any)
      ),
    [id]
  )

  useEffect(
    () =>
      onSnapshot(
        collection(db, "posts", id, "likes"),
        (snapshot) => setLikes(snapshot.docs as any)
      ),
    [id]
  )

  useEffect(
    () => setHasLiked(
      likes.findIndex((like: any) => like.id === session?.user?.uid) !== -1
    ),
    []
  )

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid))
    }
    else {
      await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
        username: session?.user?.name
      })
    }

  }

  // console.log(hasLiked)

  const sendComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const commentToSend = comment
    setComment("")

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session?.user?.name,
      userImage: session?.user?.image,
      timestamp: serverTimestamp()
    })

  }

  //console.log(comments)

  return (
    <div className="bg-white my-7 border rounded-sm">
      <div className="flex items-center p-5">
        <Image className="rounded-full border p-1 cursor-pointer" priority width={40} height={40} objectFit="contain" src={userimg} alt="userimg" draggable='false' />
        <p className="flex-1 font-bold ml-3 cursor-pointer">{username}</p>
        <DotsHorizontalIcon className="h-5 cursor-pointer" />
      </div>
      {/* Img  */}
      <img className="object-cover w-full" src={img} alt="post-img" />
      {/* Buttons  */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled onClick={likePost} className="btn text-red-500" />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}

            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* Captions  */}
      <p className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="font-bold mr-1">{username}</span>
        {captions}
      </p>
      {/* Comments  */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment: any) => {
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img src={comment.data().userImage} alt="userImage" className="h7 rounded-full" />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username}</span>{" "}{comment.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-xs" >{comment.data().timestamp?.toDate()}</Moment>
            </div>
          })}
        </div>
      )}
      {/* Input Box */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="border-none focus:ring-0 outline-none flex-1" />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}

    </div>
  )
}
export default Post