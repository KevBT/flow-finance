"use client";

import { useEffect, useState } from "react";
import Head from "@/app/components/Head/Head";
import SkeletonTable from "@/app/loaders/SkeletonTable";
import OpenButton from "../accounts/OpenButton/OpenButton";
import useAccounts from "../accounts/hooks/useAccounts";
import BentoInformation from "./components/BentoInformation/BentoInformation";
import ModalNewExpense from "./components/ModalNewExpense";
import TableExpenses from "./components/TableExpenses/TableExpenses";
import useExpenses from "./hooks/useExpenses";
import { monthNames } from "@/app/utils/months";
import BackIcon from "./assets/back";
import NextIcon from "./assets/nextIcon";
import { ExpenseAgrupedModel } from "./models/ExpenseAgruped";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableIncomes from "./components/TableIncomes/TableIncomes";
import useIncomes from "./components/TableIncomes/hooks/useIncomes";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Resume() {
  const { data: accounts, loading: loadingAccounts, setRefresh } = useAccounts()
  const { expenses, loading: loadingExpenses, setRefresh: setRefreshExpenses } = useExpenses()
  const {data: incomes, deleteIncome} = useIncomes()
  const [mesActual, setMesActual] = useState(0)
  const [anioActual, setAnioActual] = useState(2024)

  const currentDate = new Date()
  const monthName = monthNames[mesActual]

  useEffect(() => {
    setMesActual(currentDate.getMonth())
  }, [])

  const refreshData = () => {
    setRefresh(true)
    setRefreshExpenses(true)
  }

  const gastosFiltrados = expenses.filter(gasto => {
    let [año, mesA, día] = gasto.date.split('T')[0].split('-');
    mesA = mesA.startsWith('0') ? mesA.slice(1) : mesA;
    const fechaConvertida = `${año}-${mesA}-${día}`;
    const [anio, mes] = fechaConvertida.split("-")
    return parseInt(anio) === anioActual && parseInt(mes) - 1 === mesActual
  })

  const gastosAgrupados = gastosFiltrados.reduce((acc: ExpenseAgrupedModel[], gasto) => {
    const gastoExistente = acc.find(g => g.categoryname === gasto.categoryname)
    if (gastoExistente) {
      gastoExistente.value += gasto.value
      gastoExistente.details?.push(gasto)
    } else {
      acc.push({ ...gasto, details: [gasto] })
    }
    return acc
  }, [])

  const ingresosFiltrados = incomes.filter(ingreso => {
    const [anio, mes] = ingreso.date.split("-")
    return parseInt(anio) === anioActual && parseInt(mes) - 1 === mesActual
  })

  const calcularCrecimiento = (cuenta: string) => {
    const ingresosDelMes = ingresosFiltrados.filter(ingreso => ingreso.account === cuenta)
      .reduce((total, ingreso) => total + ingreso.value, 0)
    const gastosDelMes = gastosFiltrados.filter(gasto => gasto.accountname === cuenta)
      .reduce((total, gasto) => total + gasto.value, 0)
    const crecimiento = ingresosDelMes - gastosDelMes
    const value = accounts.filter(acc => acc.name === cuenta)[0]
    const porcentajeCrecimiento = (crecimiento / +value?.value) * 100
    if (!porcentajeCrecimiento) return '0'
    return porcentajeCrecimiento.toFixed(2)
  }

  const cambiarMes = (direccion: string) => {
    setMesActual(prevMes => {
      if (direccion === "anterior") {
        return prevMes === 0 ? 11 : prevMes - 1
      } else {
        return prevMes === 11 ? 0 : prevMes + 1
      }
    })
    if (mesActual === 0 && direccion === "anterior") {
      setAnioActual(prevAnio => prevAnio - 1)
    } else if (mesActual === 11 && direccion === "siguiente") {
      setAnioActual(prevAnio => prevAnio + 1)
    }
  }

  return (
    <>
      <Head />
      <div>
        <section className="w-full md:w-[100%] px-5 mt-5 md:px-10">
          <h1 className='text-2xl font-medium text-start text-[var(--color-usage)] pb-2 animate-fade-in'>Resumen</h1>
          <div className='grid grid-cols-1 lg:grid-cols-2 mt-3 gap-5'>
            <BentoInformation expenses={gastosFiltrados} crecimiento={calcularCrecimiento} accounts={accounts} loadingAccounts={loadingAccounts} />
          </div>
          <div className="mt-12">
            <div className="grid grid-cols-2 items-center">
              <div className="flex gap-3 items-center">
                <h3 className="text-md md:text-2xl text-[var(--color-usage)] font-medium">{monthName} - {anioActual }</h3>
                <OpenButton />
              </div>
              <div className="text-end">
                <button className="border-gray-300 border rounded-md mr-3 hover:bg-[var(--color-usage)] transition-colors" title='Mes anterior' onClick={() => cambiarMes("anterior")}>
                  <BackIcon />
                </button>
                  <button className="border-gray-300 border rounded-md hover:bg-[var(--color-usage)] transition-colors" title='Mes siguiente' onClick={() => cambiarMes("siguiente")}>
                  <NextIcon />
                </button>
              </div>
            </div>
            {
              loadingExpenses ? <SkeletonTable />
              : (
                  <Tabs defaultValue="gastos">
                    <TabsList className="grid w-full grid-cols-2 bg-gray-500">
                      <TabsTrigger value="gastos">Gastos</TabsTrigger>
                      <TabsTrigger value="ingresos">Ingresos</TabsTrigger>
                    </TabsList>
                    <TabsContent value="gastos">
                      <TableExpenses data={gastosAgrupados} monthCurrent={mesActual} refresh={setRefresh} />
                    </TabsContent>
                    <TabsContent value='ingresos'>
                      <TableIncomes monthCurrent={mesActual} yearCurrent={anioActual} incomes={incomes} deleteIncome={deleteIncome} />
                    </TabsContent>
                  </Tabs>
                )
            }
          </div>
        </section>
        <ModalNewExpense refresh={refreshData} accounts={accounts} />
      </div>
    </>
  );
}
