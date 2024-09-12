'use client'

import Head from '@/app/components/Head/Head'
import SkeletonTitle from '@/app/components/LoaderTitle/LoaderTitle'
import Card from './Card'
import ModalNewAccount from './Modal/ModalNewAccount'
import useAccounts from './hooks/useAccounts'
import SkeletonAccount from './loading'
import Image from 'next/image'
import Gift from '@/../public/empty.gif'
import OpenButton from './OpenButton/OpenButton'

export default function Accounts() {
  const { data, loading, setRefresh, setData } = useAccounts()

  return (
    <>
      <Head />
      <section>
        <div className="flex items-center justify-center pb-3">
          <h1 className="text-2xl font-medium text-center text-purple-500">Cuentas</h1>
          <OpenButton />
        </div>
        <div className="flex gap-3 items-center max-w-[800px] m-auto justify-center">
          {loading ? (
            <></>
          ) : data.length === 0 ? (
            <div className="flex flex-col gap-3 items-center m-auto w-full">
              <Image src={Gift} alt="Sin items" className="rounded-md px-5 md:px-0" priority />
              <small className="opacity-50 italic font-medium text-white">
                No tienes nada registrado aún! Ingresa tus cuentas de activos
              </small>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="grid grid-cols-1 px-10 gap-5 py-5 md:grid-cols-4">
          {loading ? <SkeletonAccount /> : <Card data={data} setData={setData} />}
        </div>
      </section>
      <ModalNewAccount refresh={setRefresh} />
    </>
  )
}
