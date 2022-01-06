import Image from "next/image"

interface StoryProps {
  img: string,
  username: string
}

const Story = ({ img, username }: StoryProps) => {
  return (
    <div className="">
      <div className="h-12 w-12 border-red-500 border-2 rounded-full p-[1.5px] hover:scale-110 transition transform duration-200 ease-out">
        <Image
          className=" rounded-full p-[1.5px] border-red-500 border-2 cursor-pointer"
          src={img}
          width={80}
          height={80}
          alt="avatar"
          objectFit="contain"
          draggable='false'
        />
      </div>
      <p className="text-xs w-14 truncate text-center">{username}</p>
    </div>
  )
}
export default Story