/* eslint-disable @next/next/no-img-element */

interface MiniProfileProps {

}

const MiniProfile = ({ }: MiniProfileProps) => {
  return (
    <div className="flex items-center justify-between mt-14 ml-10 md:ml-3 lg:ml-10">
      <img className="rounded-full w-16 h-16 border p-[2px] cursor-pointer" src={"/assets/4.jpg"} alt="profile-pic" draggable="false" />
      <div className="flex-1 mx-4 md:mx-1 lg:mx-4 md:text-[12px] xl:text-sm">
        <h2 className="font-bold">poikgd gdgg</h2>
        <h3 className="text-gray-400">Welcome to Instagram</h3>
      </div>
      <button className="text-blue-400 font-semibold md:text-[12px] lg:text-sm">Sign Out</button>
    </div>
  )
}
export default MiniProfile