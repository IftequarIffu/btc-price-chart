'use client'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import {  Area, AreaChart, Bar, CartesianGrid, ComposedChart, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
} from "@/components/ui/chart"
import ComposedChartComponent from "./ComposedChartComponent"

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

    // const [hoveredData, setHoveredData] = useState({ timestamp: 0, price: 0 });

    // const [dotCoordinates, setDotCoordinates] = useState({cx: 0, cy: 0})

    const [lastCircleCoordinates, setLastCircleCoordinates] = useState({cx: 0, cy: 0})

    const updateLastCircleCoordinates = (cx: number, cy: number) => {
        setLastCircleCoordinates({cx: cx, cy: cy})
    }

    // useEffect(() => {


    //      const timeoutId = setTimeout(() => {
    //         if(chartData) {
    //             // const circle = document.querySelector(`circle[data-circle-index]="7"`)
    //             // console.log("Circles", circle)
    //             // console.log("Circles Data: ", circle?.cx, circle?.cy)
    //             const circles = document.querySelectorAll('circle')
    //             const circle = Array.from(circles)[circles.length - 1]
    //             if(circle && lastCircleCoordinates.cx === 0 && lastCircleCoordinates.cy === 0)
    //                 setLastCircleCoordinates({cx: circle.cx.baseVal.value, cy: circle.cy.baseVal.value})
    //             // console.log("Circle", circle)
    //         }
    //     }, 1000)
            

    //     return () => {
    //         clearTimeout(timeoutId)
    //         setLastCircleCoordinates({cx: 0, cy: 0})
    //     }
        

    // }, [chartData, currentPrice])


    // const dotRef = useRef({cx: 0, cy: 0, timestamp: 0, price: 0})

    



    return (

        <Card className=" p-0 border-t rounded-none shadow-none z-10">

            <CardContent className=" p-0 border-none shadow-none relative">

                {lastCircleCoordinates && lastCircleCoordinates.cx !== 0 && lastCircleCoordinates.cy !== 0 && (
                    <div
                        style={{
                            position: "absolute",
                            left: `${lastCircleCoordinates.cx - 30}px`,
                            top: `${lastCircleCoordinates.cy + 0}px`,
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
                    
                 <ComposedChartComponent chartData={chartData} config={chartConfig} lastCircleCoordinates={lastCircleCoordinates} updateLastCircleCoordinates={updateLastCircleCoordinates} />
                
                {/* <ChartContainer config={chartConfig} className="p-0 border-0">
                    <ComposedChart
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
                                        dotRef.current = {...dotRef.current, cx: cx, cy: cy}

                                    }
                                }
                            }

                            if (e && e.activePayload) {
                                const timestamp = e.activePayload[0].payload.timestamp;
                                const price = e.activePayload[0].payload.price;
                                dotRef.current = {...dotRef.current, timestamp: timestamp, price: price}
                            }
                        }}
                        onMouseLeave={() => setHoveredData({ timestamp: 0, price: 0})}

                    >
                        <CartesianGrid horizontal={false} stroke="lightgray" className="p-0 border-0" />

                        <XAxis
                            dataKey="price"
                           
                            interval={42}
                            tickCount={4}
                           
                            style={{ display: 'none', border: 'none' }}
                        />
                        <YAxis domain={['dataMin - 2200', 'dataMax + 600']} yAxisId={1} tickCount={6} hide={true} style={{ display: 'none' }} />

                        <YAxis domain={['dataMin - 2200', 'dataMax + 600']} yAxisId={2} tickCount={6} hide={true} style={{ display: 'none' }} />
                        <Tooltip cursor={{ stroke: "black", strokeWidth: 1,  }} 
                        content={(props) => <CustomTooltip {...props} yValue={dotRef.current.cy} />} 
                        />
                       

                        <ReferenceLineComponent price={dotRef.current.price} />

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
                            yAxisId={1}
                            // onMouseMove={(e) => {

                            //     if (e && e.activeTooltipIndex) {
                            //         const activeDotElements = document.querySelectorAll(' .recharts-active-dot');
                            //         if (activeDotElements && activeDotElements.length > 0) {
                            //             const activeDotElement = activeDotElements[0];
                            //             const circle = activeDotElement.querySelector('circle');
    
    
                            //             if (circle) {
                            //                 const cx = parseFloat(circle.getAttribute('cx') as string);
                            //                 const cy = parseFloat(circle.getAttribute('cy') as string);
    
                            //                 dotRef.current = {...dotRef.current, cx: cx, cy: cy}
    
                            //             }
                            //         }
                            //     }
    
    
    
                            //     if (e && e.activePayload) {
                                    
                            //         const timestamp = e.activePayload[0].payload.timestamp;
                            //         const price = e.activePayload[0].payload.price;
                                    
                            //         dotRef.current = {...dotRef.current, timestamp: timestamp, price: price}
                            //     }
                            // }}
                            // onMouseLeave={() => setHoveredData({ timestamp: 0, price: 0})}

                            dot={(props) => 
                            <CustomDot {...props} 
                                
                            />}

                        />

                        <Bar dataKey="volume" 
                            yAxisId={2}
                            fill="hsl(216 12.2% 83.9%)" 
                            style={{ transform: 'scaleY(0.1)', transformOrigin: 'bottom' }}  
                            className="border-red" 
                        />

                    </ComposedChart>


                   

                </ChartContainer> */}
            </CardContent>
        </Card>
    )
}

const ReferenceLineComponent = ({price}: {price: number}) => {

    console.log("ReferenceLineComponent rendered")
    
    return (<ReferenceLine y={price} stroke="black" strokeWidth={0.3} strokeDasharray="4 4" />)
};



ReferenceLineComponent.displayName = "ReferenceLineComponent"

const CustomTooltip = (props: any) => {
    if (props.active && props.payload && props.payload.length) {

       

        const price = props.payload[0].value;  // Get the hovered price
        return (
            <div style={{
                position: "absolute",
                left: "540px",   // Aligns to the right
                // transform: "translateX(1250%)", // Adjust position
                background: "black",
                color: "white",
                padding: "6px 12px",
                borderRadius: "4px",
                fontSize: "12px",
                top: props.yValue - 10,
                transition: "all 0.2s ease-in-out"

            }}
                className="transition-all duration-200 ease-in-out font-bold"
            >
                {Math.round(price)}
            </div>
        );
    }
    return null;
};

// const CustomDot = memo((props: { cx: any; cy: any; dataKey: any; index: any; payload: any; noOfDots: any }) => {
//     const { cx, cy } = props;

//     // useEffect(() => {
//     //     if (index === noOfDots - 1) {
//     //         setLastCircleCoordinates({ cx, cy, price: payload.price });
//     //     }
//     // }, [cx, cy, index, noOfDots, setLastCircleCoordinates, props]);

//     console.log("CustomDot rendered")

//     return (
//         <circle
//             cx={cx}
//             cy={cy}
//             r={0.3}
//             fill="#8884d8"
//             // stroke="white" 
//             strokeWidth={2}
//             className="transition-all duration-300 ease-in-out transform"
//             // onMouseMove={() => setDotCoordinates({ cx: cx, cy: cy })}
//             // onMouseLeave={() => setDotCoordinates({ cx: 0, cy: 0 })}
//         />
//     );
// });

const CustomDot = memo(
    ({ cx, cy, index } : {cx: any, cy: any, index: any}) => {
        // console.log("CustomDot rendered");
        return <circle data-circle-index={index} cx={cx} cy={cy} r={0.3} fill="#8884d8" strokeWidth={2} />;
    },
    (prevProps, nextProps) => prevProps.cx === nextProps.cx && prevProps.cy === nextProps.cy
);


CustomDot.displayName = "CustomDot"

export default AreaChartComponent