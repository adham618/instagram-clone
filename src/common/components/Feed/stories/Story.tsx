/* eslint-disable @next/next/no-img-element */
interface StoryProps {
  img: string,
  username: string
}

const Story = ({ img, username }: StoryProps) => {
  return (
    <div className="">
      <div className=" hover:scale-110 transition transform duration-200 ease-out">
        <img
          className="h-12 w-12 rounded-full object-contain p-[1.5px] border-red-500 border-2 cursor-pointer"
          src={img}
          alt="avatar"
          draggable='false'
        />
      </div>
      <p className="text-xs w-14 truncate text-center capitalize">{username}</p>
    </div>
  )
}
export default Story