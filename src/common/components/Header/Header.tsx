import Image from "next/image"
import { HeartIcon, HomeIcon, MenuIcon, PaperAirplaneIcon, SearchIcon, UserGroupIcon } from '@heroicons/react/outline'
import { useRouter } from "next/router"

interface HeaderProps {

}

const Header = ({ }: HeaderProps) => {
  const router = useRouter()
  return (
    <header className="shadow-sm border-b sticky top-0 bg-white z-50">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        {/* Left -Logo */}
        <div onClick={() => router.push('/')} className="relative w-24 hidden lg:inline-grid cursor-pointer">
          <Image src="/insta.svg" layout="fill" priority objectFit="contain" alt="logo" draggable="false" />
        </div>
        <div onClick={() => router.push('/')} className="relative w-8 lg:hidden cursor-pointer">
          <Image src="/insta-logo.svg" layout="fill" priority objectFit="contain" alt="logo" draggable="false" />
        </div>
        {/* Middle - Search input field */}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block h-9 w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
              type="text"
              placeholder="Search" />
          </div>
        </div>
        {/* Right - Icons && Avatar */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon onClick={() => router.push('/')} className="navBtn" />
          <MenuIcon className="h-6 md:hidden cursor-pointer" />
          <div className="relative navBtn">
            <PaperAirplaneIcon className="rotate-45 " />
            <div className="absolute -top-1 -right-1 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">3</div>
          </div>
          <UserGroupIcon className="navBtn" />
          <HeartIcon className="navBtn" />
          <div className="relative w-9 h-9  border rounded-full p-[1.5px]">
            <Image className="rounded-full cursor-pointer" layout="fill" priority objectFit="contain" src={"/assets/4.jpg"} alt="profile-pic" draggable="false" />
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header