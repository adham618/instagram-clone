import Image from "next/image"
import { SearchIcon } from '@heroicons/react/outline'

interface HeaderProps {

}

const Header = ({ }: HeaderProps) => {
  return (
    <header>
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        {/* Left -Logo */}
        <div className="relative w-24 hidden lg:inline-grid cursor-pointer">
          <Image src="/insta.svg" layout="fill" objectFit="contain" alt="logo" draggable="false" />
        </div>
        <div className="relative w-10 lg:hidden cursor-pointer">
          <Image src="/insta-logo.svg" layout="fill" priority objectFit="contain" alt="logo" draggable="false" />
        </div>
        {/* Middle - Search input field */}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
              type="text"
              placeholder="Search" />
          </div>
        </div>
        {/* Right - Icons && Avatar */}
      </div>
    </header>
  )
}
export default Header