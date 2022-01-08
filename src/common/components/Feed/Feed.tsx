import { useSession } from "next-auth/react"
import MiniProfile from "./MiniProfile/MiniProfile"
import Posts from "./posts/Posts"
import Stories from "./stories/Stories"
import Suggestions from "./Suggestions/Suggestions"

interface FeedProps {

}

const Feed = ({ }: FeedProps) => {
  const { data: session } = useSession()
  return (
    <main className={`grid grid-cols-1 md:grid-cols-3 md:max-w-5xl xl-grid-cols-3 xl:max-w-6xl mx-auto ${!session && "!grid-cols-1 !max-w-2xl"}`}>
      <section className="col-span-2">
        {session && (
          <Stories />
        )}
        <Posts />
      </section>
      {session && (<section className="hidden md:inline-grid">
        <div className="fixed top-20 mr-5">
          <MiniProfile />
          <Suggestions />
        </div>
      </section>
      )}
    </main>
  )
}
export default Feed