"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts"

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
import { transformData } from "@/lib/utils"
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"


const chartConfig = {
    price: {
        label: "price",
        color: "hsl(var(--chart-6))",
    },
} satisfies ChartConfig

export default function CryptoPriceChart({ prices }: { prices: Array<object> }) {

    const chartData = transformData(prices)

    const [hoveredData, setHoveredData] = useState({ x: null, y: null, yPosition: undefined });

    const [dotCoordinates, setDotCoordinates] = useState([])

    const [lastCircleCoordinates, setLastCircleCoordinates] = useState(null)


    return (
        <Card className="w-1/2 p-0 border-none rounded-none">

            <CardContent className="relative p-0 border-none">
                {lastCircleCoordinates && (
                    <div
                        style={{
                            position: "absolute",
                            left: `${lastCircleCoordinates.cx - 40}px`,
                            top: `${lastCircleCoordinates.cy}px`,
                            // right: `${lastCircleCoordinates.cx}px`,
                            // transform: "translate(-170%, -50%)",
                            background: "hsl(var(--chart-6))",
                            color: "white",
                            padding: "6px 12px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            whiteSpace: "nowrap",

                        }}
                        className="z-10"
                    >
                        {Math.round(lastCircleCoordinates.price)}
                    </div>
                )}
                <ChartContainer config={chartConfig} className="p-0">
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: -61,
                            right: -1,
                            bottom: -30
                        }}
                        style={{ padding: 0 }}
                        className="border-x border-b rounded-none"
                        onMouseMove={(e) => {

                            if (e && e.activeTooltipIndex) {
                                const activeDotElements = document.querySelectorAll(' .recharts-active-dot');
                                if (activeDotElements && activeDotElements.length > 0) {
                                    const activeDotElement = activeDotElements[0];
                                    const circle = activeDotElement.querySelector('circle');


                                    if (circle) {
                                        const cx = parseFloat(circle.getAttribute('cx'));
                                        const cy = parseFloat(circle.getAttribute('cy'));

                                        setDotCoordinates({ cx: cx, cy: cy })

                                    }
                                }
                            }



                            if (e && e.activePayload) {
                                // console.log(e.activePayload)
                                // console.log(e.activePayload[0]?.payload.price, e.activePayload[0]?.payload.timestamp)
                                const xValue = e.activePayload[0].payload.timestamp;
                                const yValue = e.activePayload[0].payload.price;
                                const yPixel = e.chartY;
                                setHoveredData({ x: xValue, y: yValue, yPosition: yPixel });
                            }
                        }}
                        onMouseLeave={() => setHoveredData({ x: null, y: null, yPosition: undefined })}

                    >
                        <CartesianGrid horizontal={false} stroke="lightgray" className="p-0" />



                        <XAxis
                            dataKey="price"
                            //   tickLine={false}
                            //   axisLine={false}
                            interval={42}
                            tickCount={4}
                            //   tickMargin={8}
                            //   tickFormatter={(value) => Math.round(value)}
                            style={{ display: 'none' }}
                        />
                        <YAxis domain={['dataMin - 2200', 'dataMax + 600']} tickCount={6} style={{ display: 'none' }} />
                        <Tooltip cursor={{ stroke: "black", strokeWidth: 1 }} content={(props) => <CustomTooltip {...props} yValue={dotCoordinates.cy} />} />

                        {hoveredData.y !== null && (
                            <ReferenceLine y={hoveredData.y} stroke="black" strokeWidth={0.3} strokeDasharray="4 4" />
                        )}

                        <defs>
                            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-price)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="white"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="price"
                            type="linear"
                            fill="url(#fillMobile)"
                            fillOpacity={0.4}
                            stroke="var(--color-price)"
                            strokeWidth={1.3}
                            className="p-0"
                            dot={(props) => <CustomDot {...props} key={props.cx + props.cy} setDotCoordinates={setDotCoordinates} setLastCircleCoordinates={setLastCircleCoordinates} noOfDots={chartData.length} />}
                        //   stackId="a"
                        />

                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}


const CustomTooltip = ({ active, payload, label, yValue }) => {
    if (active && payload && payload.length) {

        const price = payload[0].value;  // Get the hovered price
        return (
            <div style={{
                position: "absolute",
                left: "100%",   // Aligns to the right
                transform: "translateX(1250%)", // Adjust position
                background: "black",
                color: "white",
                padding: "6px 12px",
                borderRadius: "4px",
                fontSize: "12px",
                top: yValue - 10,
                transition: "all 0.2s ease-in-out"

            }}
                className="transition-all duration-200 ease-in-out"
            >
                {Math.round(price)}
            </div>
        );
    }
    return null;
};

const CustomDot = (props) => {
    const { cx, cy, dataKey, index, payload, setDotCoordinates, setLastCircleCoordinates, noOfDots } = props;

    useEffect(() => {
        if (index === noOfDots - 1) {
            setLastCircleCoordinates({ cx, cy, price: payload.price });
        }
    }, [cx, cy, index, noOfDots, setLastCircleCoordinates]);

    return (
        <circle
            cx={cx}
            cy={cy}
            r={0.3}
            fill="#8884d8"
            // stroke="white" 
            strokeWidth={2}
            className="transition-all duration-300 ease-in-out transform"
            onMouseMove={() => setDotCoordinates({ cx: cx, cy: cy })}
            onMouseLeave={() => setDotCoordinates({ cx: null, cy: null })}
        />
    );
};