import { useRecoilState } from "recoil"
import modalState from "../../atoms/modalAtom"

import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CameraIcon } from '@heroicons/react/outline'
import Image from "next/image"

import { db, storage } from "../../../../firebase.js"
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "@firebase/firestore"
import { ref, getDownloadURL, uploadString } from "@firebase/storage"
import { useSession } from "next-auth/react"

const Modal = () => {
  const { data: session } = useSession()
  const [open, setOpen] = useRecoilState(modalState)
  const filePickerRef = useRef<HTMLInputElement>(null)
  const captionRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<any>(null)

  const uploadPost = async () => {
    if (loading) return
    setLoading(true)

    // 1- Create a post and add it to firebase posts collections
    // 2- Get the post id for the newely created post
    // 3- Upload the image to firebase storage with the post id
    // 4- get a download url from fb storage and update the orginal post with image

    const docRef = await addDoc(collection(db, "posts"), {
      username: session?.user?.name,
      caption: captionRef.current?.value,
      profileImg: session?.user?.image,
      timeStamp: serverTimestamp()
    })
    console.log("new doc add with id:", docRef.id)
    const imageRef = ref(storage, `posts/${docRef.id}/image`)
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot: any) => {
        const downloadURL = await getDownloadURL(imageRef)

        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL
        })
      }
    )
    setOpen(false)
    setLoading(false)
    setSelectedFile(null)
  }

  const addImageToPost = (e: { target: { files: any[]; filles: Blob[] } }) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target?.result)
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
        <div className="flex items-end justify-center min-h-[600px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-[90%] sm:p-6 mt-16 lg:mt-24">
              <div>
                {
                  selectedFile ? (
                    <Image
                      src={selectedFile}
                      className="w-full object-contain cursor-pointer"
                      onClick={() => setSelectedFile(null)}
                      alt="post-image"
                      width={500}
                      height={300}
                      draggable="false"
                    />
                  ) : (
                    <div
                      onClick={() => filePickerRef.current?.click()}
                      className="mx-auto flex items-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                    >
                      <CameraIcon className="h-6 w-6 text-red-600 mx-auto " aria-hidden="true" />
                    </div>
                  )
                }
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 font-medium text-gray-900"
                >
                  Upload a photo
                </Dialog.Title>
                <div>
                  <input
                    ref={filePickerRef}
                    type="file" hidden
                    onChange={addImageToPost as any}
                  />
                </div>
                <div className="mt-2">
                  <input
                    ref={captionRef}
                    className="border-none focus:ring-0 w-full text-center"
                    type="text"
                    placeholder="Please enter a caption..."
                  />
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  disabled={!selectedFile}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-sm font-medium text-white hover:bg-red-700 focus:outline-none  focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                  onClick={uploadPost}
                >
                  {loading ? "Uploading..." : "Upload Post"}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
