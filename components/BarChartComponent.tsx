import React from 'react'
import { Card, CardContent } from './ui/card'
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"

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

const BarChartComponent = ({ chartData }: { chartData: Array<object> }) => {
  return (
    <Card className=" border-x rounded-none bottom-[40px] h-[43px] overflow-hidden z-0 shadow-none">
      <CardContent className="border-0 p-0 shadow-none">
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} className="border-none p-0">
            <CartesianGrid horizontal={false} vertical={false} />
            <XAxis dataKey="name" type="category" style={{ display: 'none' }} />
            <Bar dataKey="volume" fill="hsl(216 12.2% 83.9%)" style={{ transform: 'scaleY(0.1)' }} className="border-none" />
          </BarChart>
        </ChartContainer>

      </CardContent>
    </Card>
  )
}

export default BarChartComponent