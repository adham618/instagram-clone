import { signIn as signinprovider, getProviders } from "next-auth/react"
import Image from "next/image"
import Header from "../../common/components/Header/Header"

interface signinProps {
  providers: {
    provider: {
      id: any,
      name: any,
    }
  }
}

const signin = ({ providers }: signinProps) => {

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-36 px-14 text-center">
        <Image src={"/insta.svg"} width={400} height={200} alt="instagram-logo" draggable="false" />
        <div className="">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button className="p-3 bg-blue-500 rounded-lg text-white" onClick={() => signinprovider(provider.id, { callbackUrl: "/" })}>
                Sign In with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}
export default signin

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}