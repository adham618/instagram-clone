import MiniProfile from "./MiniProfile/MiniProfile"
import Posts from "./posts/Posts"
import Stories from "./stories/Stories"
import Suggestions from "./Suggestions/Suggestions"

interface FeedProps {

}

const Feed = ({ }: FeedProps) => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-3 md:max-w-5xl xl-grid-cols-3 xl:max-w-6xl mx-auto">
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>

      <section className="hidden md:inline-grid">
        <div className="fixed top-20 mr-5">
          <MiniProfile />
          <Suggestions />
        </div>
      </section>
    </main>
  )
}
export default Feed