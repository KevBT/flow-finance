'use client'

import Gift from '@/../public/forbbiden.gif'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import GoogleIcon from '../icons/GoogleIcon'

export default function Forbbiden() {
  const { status } = useSession()

  return (
    <div className="w-full flex flex-col justify-center items-center gap-10 py-10">
      <h1 className="text-white font-semibold text-xl px-10 md:px-0">
        Log in to access your profile.
      </h1>
      <small className="opacity-50 italic font-medium text-white">
        Don&apos;t try strange things
      </small>
      {status === 'authenticated' ? (
        <Link
          href="/"
          className="bg-[#DDDDDD] text-sm font-medium bg-blur rounded-xl p-2 px-5 text-black hover:opacity-80 transition-all"
        >
          Go to Profile
        </Link>
      ) : (
        <button
          className="bg-white text-sm font-medium bg-blur rounded-xl p-2 px-5 text-black hover:opacity-80 transition-all flex items-center gap-2 m-auto md:text-sm"
          onClick={() => signIn('google')}
        >
          <GoogleIcon className="w-5 h-5" />
          Log In
        </button>
      )}

      <Image
        src={Gift}
        alt="Sin autorizacion"
        className="rounded-md px-5 md:px-0"
        priority
      />
    </div>
  )
}
