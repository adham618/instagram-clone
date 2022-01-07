/* eslint-disable @next/next/no-img-element */
import { BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon, HeartIcon, PaperAirplaneIcon } from "@heroicons/react/outline"
import Image from "next/image"

interface PostProps {
  username: string,
  userimg: string,
  img: string,
  captions: string,
}

const Post = ({ username, userimg, img, captions }: PostProps) => {
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
      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4">
          <HeartIcon className="btn" />
          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn" />
        </div>
        <BookmarkIcon className="btn" />
      </div>
      {/* Captions  */}
      <p className="p-5 truncate">
        <span className="font-bold mr-1">{username}</span>
        {captions}
      </p>
      {/* Comments  */}
      {/* Input Box */}
      <form className="flex items-center p-4">
        <EmojiHappyIcon className="h-7" />
        <input type="text" placeholder="Add a comment..." className="border-none focus:ring-0 outline-none flex-1" />
        <button className="font-semibold text-blue-400">Post</button>
      </form>
    </div>
  )
}
export default Post