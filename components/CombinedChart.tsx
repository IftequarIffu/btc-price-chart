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
import { transformData, transformVolumes } from "@/lib/utils"
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import AreaChartComponent from "./AreaChartComponent"
import BarChartComponent from "./BarChartComponent"
import { convertIntegerToCommaFormat } from "@/lib/utils"
import Link from "next/link"
import { AiOutlineArrowsAlt } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";




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
        days: null
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

    const [selectedTimeRange, setSelectedTimeRange] = useState(timeRanges[0].text)

    

    return (
        <div className="w-1/2 relative border font-medium">

            {/* Top Div */}
            <div className="border-b px-8 pt-8">


                {/* Prices Section. Can be moved to a separate component */}
                <div className="space-y-2">
                    <div className="flex gap-1 items-start">
                        <h1 className="text-4xl">{convertIntegerToCommaFormat(price)}</h1>
                        <p className="text-gray-600/50 font-semibold ">{denom}</p>
                    </div>
                    <div className={`flex gap-2 font-semibold ${change > 0 ? "text-green-600" : "text-red-600"}`}>
                        <p>
                            {change > 0 && "+"}
                            {convertIntegerToCommaFormat(change)}
                        </p>
                        <p>({changePerc}%)</p>
                    </div>

                </div>

                {/* Tabs */}
                <div className="flex mt-6">
                    {buttons.map((item, index) => (
                        <Link key={index} href={"#"} className={`${index === 0 ? "ps-0 py-3 pe-3" : "p-3"} ${!item.isSelected && 'text-black/60 hover:text-black/80'} text-base  border-[hsl(var(--chart-6))] ${item.isSelected && "border-b-4 hover:text-black"}`}>{item.name}</Link>
                    ))}

                </div>


            </div>


            <div className="p-8">
                <div className="flex justify-between mb-4 text-black/60 ">

                    <div className="flex  space-x-4">
                        <div className="flex space-x-1 items-center cursor-pointer hover:text-black/80">
                            <AiOutlineArrowsAlt />
                            <p>Fullscreen</p>
                        </div>
                        <div className="flex space-x-1 items-center cursor-pointer hover:text-black/80">
                            <AiOutlinePlusCircle />
                            <p>Compare</p>
                        </div>
                    </div>

                    {/* Time Ranges */}
                    <div className="flex space-x-2">
                        {timeRanges.map((item, index) => (
                            <button onClick={() => setSelectedTimeRange(item.text)} className={`px-2 rounded-sm text-sm text-black/50 hover:text-black/80 ${selectedTimeRange === item.text && 'bg-[hsl(var(--chart-6))] text-white hover:text-white'}`}>
                                {item.text}
                            </button>
                        ))}
                    </div>

                </div>
                <AreaChartComponent chartData={chartData} />

                <BarChartComponent chartData={chartData} />
            </div>



        </div>

    )
}