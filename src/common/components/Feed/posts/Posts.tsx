import Post from "./Post"

interface PostsProps {

}

const posts = [
  {
    id: "123",
    username: "hgsj fshkhd",
    userimg: "https://links.papareact.com/3ke",
    img: "https://links.papareact.com/3ke",
    captions: "Subscribe And Destroy The Like Button For YT Algorithm"
  }, {
    id: "13",
    username: "hgsj fshkhd",
    userimg: "https://links.papareact.com/3ke",
    img: "https://links.papareact.com/3ke",
    captions: "Subscribe And Destroy The Like Button For YT Algorithm"
  }, {
    id: "163",
    username: "hgsj fshkhd",
    userimg: "https://links.papareact.com/3ke",
    img: "https://links.papareact.com/3ke",
    captions: "Subscribe And Destroy The Like Button For YT Algorithm"
  },
]

const Posts = ({ }: PostsProps) => {
  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} username={post.username} userimg={post.userimg} img={post.img} captions={post.captions} />
      ))}
    </div>
  )
}
export default Posts