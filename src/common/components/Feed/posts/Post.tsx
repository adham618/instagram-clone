/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, serverTimestamp, updateDoc, onSnapshot, orderBy, query, setDoc, deleteDoc } from '@firebase/firestore'
import { db } from '../../../../../firebase'

import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon
} from '@heroicons/react/outline'
import { useSession } from "next-auth/react"
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import Moment from 'react-moment'

interface PostProps {
  id: string
  img: string
  username: string
  userImg: string
  caption: string
}


const Post = ({ id, img, username, userImg, caption }: PostProps) => {

  const { data: session } = useSession()
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(() =>
    onSnapshot(query(collection(db, "posts", id, "comments"), orderBy('timestamp', 'desc')), snapshot => {
      setComments(snapshot.docs as any)
    }
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [db, id]
  )

  useEffect(() =>
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs as any)
    }
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [db, id]
  )

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like: any) => like.id === session?.user?.uid) !== -1
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [likes]
  )


  const likePost = async () => {
    console.log(hasLiked)
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid as any))
    } else {
      await setDoc(doc(db, "posts", id, "likes", session?.user?.uid as any), {
        username: session?.user?.name,
      })
    }
  }

  const sendComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const commentToSend = comment
    setComment('')
    await addDoc(collection(db, 'posts', id, "comments"), {
      comment: commentToSend,
      username: session?.user?.name,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    })
  }

  return (
    <div className="b-white my-7 border rounded-sm">
      <div className="flex  items-center p-5">
        <img src={userImg} className="rounded-full h-12 w-12 object-contain border p-1 mr-3" alt="" />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      <img src={img} className="object-cover w-full" alt="" draggable="false" />

      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex  space-x-4">

            {hasLiked ? (
              <HeartIconFilled onClick={likePost} className="btn text-red-500" />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )
            }
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}


      <p className="p-5 truncate">
        {likes.length > 0 && (
          <span className="font-bold mb-1 block">{likes.length} likes</span>
        )}
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>

      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment: any) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img className="h-7 rounded-full" src={comment.data().userImage} alt="" draggable="false" />
              <p className="text-sm flex-1"><span className="font-bold">{comment.data().username}</span>{" "}{comment.data().comment}</p>
              <Moment interval={10000} className="pr-5 text-xs" fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}


      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment..." className="border-none flex-1 focus:ring-0 outline-none" />
          <button type="submit" disabled={!comment.trim()} onClick={sendComment} className="font-semibold text-blue-400" >Post</button>
        </form>
      )}



    </div>
  )
}

export default Post