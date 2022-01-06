import Stories from "./Stories"

interface FeedProps {

}

const Feed = ({ }: FeedProps) => {
  return (
    <main className="grid grid-cols-1 m-auto md:grid-cols-2 md:max-w-3xl xl-grid-cols-3 xl:max-w-6xl">
      <section className="col-span-2">
        <Stories />
      </section>
      {/* Posts */}

      <section></section>
      {/* MiniProfile */}
      {/* Suggestions */}
    </main>
  )
}
export default Feed