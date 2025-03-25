"use client"

import { TrendingUp } from "lucide-react"
import { ComposedChart, Area, AreaChart, Bar, BarChart, CartesianGrid, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { transformWholeData } from "@/lib/utils"
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import AreaChartComponent from "./AreaChartComponent"
import BarChartComponent from "./BarChartComponent"
import { convertIntegerToCommaFormat } from "@/lib/utils"
import Link from "next/link"
import { AiOutlineArrowsAlt } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { dataTagErrorSymbol, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { COINGECKO_API_URL } from "@/lib/constants"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



const buttons = [
    {
        name: "Summary",
        isSelected: false
    },
    {
        name: "Chart",
        isSelected: true
    },
    {
        name: "Statistics",
        isSelected: false
    },
    {
        name: "Analytics",
        isSelected: false
    },
    {
        name: "Settings",
        isSelected: false
    },
]

const timeRanges = [
    {
        id: 0,
        text: '1d',
        days: 1
    },
    {
        id: 1,
        text: '3d',
        days: 3
    },
    {
        id: 2,
        text: '1w',
        days: 1 * 7
    },
    {
        id: 3,
        text: '1m',
        days: 1 * 30
    },
    {
        id: 4,
        text: '6m',
        days: 1 * 30 * 6
    },
    {
        id: 5,
        text: '1y',
        days: 1 * 365
    },
    {
        id: 6,
        text: 'max',
        days: 0
    },
]


const chartConfig = {
    price: {
        label: "price",
        color: "hsl(var(--chart-6))",
    },
    volume: {
        label: "volume",
        color: "hsl(var(--chart-4))",
    }
} satisfies ChartConfig

export default function CombinedChart(
    { chartData, price, denom, change, changePerc }:
        {
            chartData: Array<object>,
            price: number,
            denom: string,
            change: number,
            changePerc: number
        }) {

    const [selectedTimeRange, setSelectedTimeRange] = useState(timeRanges[0].days)

    console.log("CombinedChart rendered")

    const { isPending, error, data } = useQuery({
        queryKey: [`timeRange-${selectedTimeRange}`],
        queryFn: async () => {
            const res = await axios.get(`${COINGECKO_API_URL}/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${selectedTimeRange}`)
            // console.log("API call made")
            const transformedData = transformWholeData(res.data)
            return transformedData
        },
        refetchInterval: 60*1000,
        notifyOnChangeProps: "all",
      })

      console.log("Error: ", error)
      console.log("isPending: ", isPending)

      const { isPending: isCoinDataPending, error: isCoinDataErrored, data: coinData } = useQuery({
        queryKey: [`price`],
        queryFn: async () => {
            const res = await axios.get(`${COINGECKO_API_URL}/api/v3/coins/bitcoin`)
            // console.log("API call made")
            // const transformedData = transformWholeData(res.data)
            const currentPrice = res.data.market_data.current_price.usd
            const priceChange24hr = res.data.market_data.price_change_24h
            const priceChangePerc24hr = res.data.market_data.price_change_percentage_24h
            return {
                currentPrice,
                priceChange24hr,
                priceChangePerc24hr
            }
        },
        refetchInterval: 30*1000,
        notifyOnChangeProps: "all",
      })

      
    

    return (
        <div className="w-5/12 bg-white font-medium rounded-md relative">

            {/* Top Div */}
            <div className="border-b px-8 pt-8 space-y-3">

                {
                    coinData && 
                    <div className="space-y-1 font-semibold">
                        <div className="flex gap-1 items-start">
                            <h1 className="text-4xl">{convertIntegerToCommaFormat(coinData?.currentPrice)}</h1>
                            <p className="text-gray-600/50 font-semibold ">USD</p>
                        </div>
                        <div className={`flex gap-1 text-sm font-semibold ${coinData?.priceChange24hr > 0 ? "text-green-600" : "text-red-600"}`}>
                            <p>
                                {coinData?.priceChange24hr > 0 && "+"}
                                {coinData?.priceChange24hr.toFixed(2)}
                            </p>
                            <p>({coinData?.priceChangePerc24hr.toFixed(2)}%)</p>
                        </div>
    
                    </div>
                }
                

                {/* Tabs */}
                <div className="flex">
                    {buttons.map((item, index) => (
                        <Link key={index} 
                        href={"#"} 
                        className={`${index === 0 ? "ps-0 py-3 pe-3" : "p-3"} ${!item.isSelected && 'text-black/60 hover:text-black/80'} text-sm  border-[hsl(var(--chart-6))] ${item.isSelected && "border-b-4 hover:text-black"}`}>{item.name}</Link>
                    ))}

                </div>


            </div>


            <div className="p-8">
                <div className="flex justify-between mb-4 text-black/60 ">

                    <div className="flex  space-x-4">
                        
                    <div className="flex space-x-1 items-center text-sm cursor-pointer hover:text-black/80">
                            <AiOutlineArrowsAlt />
                            <p>Fullscreen</p>
                        </div>
{/* 
                        <Dialog>
                        <DialogTrigger asChild>
                        <div className="flex space-x-1 items-center text-sm cursor-pointer hover:text-black/80">
                            <AiOutlineArrowsAlt />
                            <p>Fullscreen</p>
                        </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[1000px]">
                            
                            <div className="mt-1">

                            </div>

                            <AreaChartComponent chartData={data as any} currentPrice={coinData?.currentPrice} />
                            <BarChartComponent chartData={data as any} />
                           
                        </DialogContent>
                        </Dialog> */}

                            
                        {/* </div> */}
                        <div className="flex space-x-1 items-center text-sm cursor-pointer hover:text-black/80">
                            <AiOutlinePlusCircle />
                            <p>Compare</p>
                        </div>
                    </div>

                    {/* Time Ranges */}
                    <div className="flex space-x-2">
                        {timeRanges.map((item, index) => (
                            <button key={index} 
                                disabled={item.days === 0}
                                onClick={() => {
                                    if(item.days !== 0)
                                        setSelectedTimeRange(item.days)
                                 }} className={`px-2 rounded-sm text-sm text-black/50 ${item.days !== 0 && "hover:text-black/80"} ${selectedTimeRange === item.days && 'bg-[hsl(var(--chart-6))] text-white hover:text-white'}`}>
                                {item.text}
                            </button>
                        ))}
                    </div>

                </div>
                <Suspense fallback={<h1>Loading...</h1>}>
                <AreaChartComponent chartData={data as any} currentPrice={coinData?.currentPrice} />
                </Suspense>

                <BarChartComponent chartData={data as any} />
            </div>



        </div>

    )
}