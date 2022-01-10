import { collection, onSnapshot, orderBy, query } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../../../../firebase'
import Post from './Post'

function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(
    () =>
      onSnapshot(query(collection(db, "posts"), orderBy('timeStamp', 'desc')), snapshot => {
        setPosts(snapshot.docs as any)
      }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [db]
  )

  return (
    <div>
      {posts.map((post: any) => (
        <Post key={post.id} id={post.id} username={post.data().username} userImg={post.data().profileImg} img={post.data().image} caption={post.data().caption} />
      ))}

    </div>
  )
}

export default Posts