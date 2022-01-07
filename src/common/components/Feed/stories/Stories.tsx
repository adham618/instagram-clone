import { useEffect, useState } from "react"
import Story from "./Story"
import data from './data'

interface StoriesProps {

}

const Stories = ({ }: StoriesProps) => {
  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thumb-black scrollbar-thin">
      {data.map(profile => (
        <Story key={profile.id} img={profile.avatar} username={profile.name} />
      ))}
    </div>
  )
}
export default Stories