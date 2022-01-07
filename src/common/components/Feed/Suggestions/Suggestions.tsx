/* eslint-disable @next/next/no-img-element */
// import { useEffect, useState } from "react"
import { Key, ReactChild, ReactFragment, ReactPortal } from "react"
import data from "./data"

interface SuggestionsProps {
}

const Suggestions = ({ }: SuggestionsProps) => {
  // const [suggestions, setSuggestions] = useState<any[]>([])
  // useEffect(() => {
  //   const suggestions = [...Array(5)].map((_, i) => ({
  //     ...data,
  //     id: i
  //   }))
  //   setSuggestions(suggestions)
  // }, [])
  return (
    <div className="mt-4 ml-10 md:ml-3 lg:ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>
      {data.slice(0, 5).map((profile: { id: string; avatar: string; name: string; company: { name: string } }) => (
        <div
          key={profile.id}
          className="flex items-center justify-between mt-3 max-h-10"
        >
          <img className="w-10 h-10 rounded-full border p-[2px]" src={profile.avatar} alt="avatar" draggable='false' />
          <div className="flex-1 ml-4">
            <h2 className="font-semibold text-sm">{profile.name}</h2>
            <h3 className="text-xs text-gray-400">
              Works at {profile.company.name}
            </h3>
          </div>
          <button className="text-blue-400 text-xs font-bold">Follow</button>
        </div>
      ))}
    </div>
  )
}
export default Suggestions