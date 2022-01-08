import { useEffect, useState } from "react"
import Story from "./Story"
import data from './data'
import { useSession } from "next-auth/react"

interface StoriesProps {

}

const Stories = ({ }: StoriesProps) => {
  const { data: session } = useSession()
  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thumb-black scrollbar-thin">
      <Story img={session?.user?.image as string} username={session?.user?.name as string} />
      {data.map(profile => (
        <Story key={profile.id} img={profile.avatar} username={profile.name} />
      ))}
    </div>
  )
}
export default Stories