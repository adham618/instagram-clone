import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { Key, useEffect, useState } from "react"
import { db } from "../../../../../firebase"
import Post from "./Post"

const Posts = () => {
  const [posts, setPosts] = useState<any>([])
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy('timeStamp', 'desc')),
        (snapshot) => {
          return setPosts(snapshot.docs)
        })
    , []
  )
  return (
    <div>
      {posts.map((post: { id: Key | null | undefined | string; data: () => { (): any; new(): any; username: string; profileImg: string; image: string; caption: string } }) => (
        <Post
          key={post.id}
          id={post.id as any}
          username={post.data().username}
          userimg={post.data().profileImg}
          img={post.data().image}
          captions={post.data().caption} />
      ))}
    </div>
  )
}
export default Posts