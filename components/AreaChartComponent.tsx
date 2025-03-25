'use client'
import { memo, useEffect, useState } from "react"
import {  Area, AreaChart, CartesianGrid, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
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

const AreaChartComponent = ({ chartData, currentPrice }: { chartData: Array<object>, currentPrice: number }) => {

    const [hoveredData, setHoveredData] = useState({ x: null, y: null, yPosition: 0 });

    const [dotCoordinates, setDotCoordinates] = useState({cx: 0, cy: 0})

    const [lastCircleCoordinates, setLastCircleCoordinates] = useState({cx: 0, cy: 0, price: 0})

    console.log("AreaChartComponent Rendered")


    return (

        <Card className=" p-0 border-t rounded-none shadow-none z-10">

            <CardContent className="relative p-0 border-none shadow-none">
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
                        {currentPrice}
                    </div>
                )}
                <ChartContainer config={chartConfig} className="p-0 border-0">
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: -61,
                            right: -1,
                            bottom: -30
                        }}
                        style={{ padding: 0 }}
                        className="border-x rounded-none"
                        onMouseMove={(e) => {

                            if (e && e.activeTooltipIndex) {
                                const activeDotElements = document.querySelectorAll(' .recharts-active-dot');
                                if (activeDotElements && activeDotElements.length > 0) {
                                    const activeDotElement = activeDotElements[0];
                                    const circle = activeDotElement.querySelector('circle');


                                    if (circle) {
                                        const cx = parseFloat(circle.getAttribute('cx') as string);
                                        const cy = parseFloat(circle.getAttribute('cy') as string);

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
                                setHoveredData({ x: xValue, y: yValue, yPosition: yPixel as number });
                            }
                        }}
                        onMouseLeave={() => setHoveredData({ x: null, y: null, yPosition: 0 })}

                    >
                        <CartesianGrid horizontal={false} stroke="lightgray" className="p-0 border-0" />



                        <XAxis
                            dataKey="price"
                            //   tickLine={false}
                            //   axisLine={false}
                            interval={42}
                            tickCount={4}
                            //   tickMargin={8}
                            //   tickFormatter={(value) => Math.round(value)}
                            style={{ display: 'none', border: 'none' }}
                        />
                        <YAxis domain={['dataMin - 2200', 'dataMax + 600']} tickCount={6} style={{ display: 'none' }} />
                        <Tooltip cursor={{ stroke: "black", strokeWidth: 1 }} content={(props) => <CustomTooltip {...props} yValue={dotCoordinates.cy} />} />

                        {hoveredData.y !== null && (
                            <ReferenceLine y={hoveredData.y} stroke="black" strokeWidth={0.3} strokeDasharray="4 4" />
                        )}

                        <defs className="border-0">
                            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1" className="border-0">
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
                            className="p-0 border-0"
                            dot={(props) => 
                            <CustomDot {...props} 
                                key={props.cx + props.cy} 
                                setDotCoordinates={setDotCoordinates} 
                                setLastCircleCoordinates={setLastCircleCoordinates} 
                                noOfDots={chartData.length} 
                            />}
                        //   stackId="a"

                        />

                    </AreaChart>


                </ChartContainer>
            </CardContent>
        </Card>
    )
}

// active, payload, label, yValue
const CustomTooltip = (props: any) => {
    if (props.active && props.payload && props.payload.length) {

        // console.log("Payload: ", payload)
        // console.log(label)

        console.log("CustomTooltip Rendered")

        const price = props.payload[0].value;  // Get the hovered price
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
                top: props.yValue - 10,
                transition: "all 0.2s ease-in-out"

            }}
                className="transition-all duration-200 ease-in-out font-medium"
            >
                {Math.round(price)}
            </div>
        );
    }
    return null;
};

const CustomDot = (props: { cx: any; cy: any; dataKey: any; index: any; payload: any; setDotCoordinates: any; setLastCircleCoordinates: any; noOfDots: any }) => {
    const { cx, cy, dataKey, index, payload, setDotCoordinates, setLastCircleCoordinates, noOfDots } = props;

    useEffect(() => {
        if (index === noOfDots - 1) {
            setLastCircleCoordinates({ cx, cy, price: payload.price });
        }
    }, [cx, cy, index, noOfDots, setLastCircleCoordinates, props]);

    console.log("CustomDot rendered")

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
            onMouseLeave={() => setDotCoordinates({ cx: 0, cy: 0 })}
        />
    );
};


export default AreaChartComponent