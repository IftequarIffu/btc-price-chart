'use client'
import React, { memo, useCallback, useRef, useState } from 'react'
import { ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, Bar, ReferenceLine } from 'recharts';
import { ChartContainer } from './ui/chart';
import { throttle } from "lodash";


const ComposedChartComponent = ({ chartData, config, lastCircleCoordinates, updateLastCircleCoordinates }: { chartData: Array<object>, config: any, lastCircleCoordinates: any, updateLastCircleCoordinates: (x: number, y: number) => void}) => {

    

    const dotRef = useRef({ cx: 0, cy: 0, timestamp: 0, price: 0 })

    const [activePrice, setActivePrice] = useState(0)

    // const [lastPointCoordinates, setLastPointCoordinates] = useState({cx: 0, cy: 0})


    const handleMouseMove = throttle((e: any ) => {
        if (e && e.activeTooltipIndex) {
            // console.log("ActiveTooltip: ", e)
            const activeDotElements = document.querySelectorAll(' .recharts-active-dot');
            if (activeDotElements && activeDotElements.length > 0) {
                const activeDotElement = activeDotElements[0];
                const circle = activeDotElement.querySelector('circle');


                if (circle) {
                    const cx = parseFloat(circle.getAttribute('cx') as string);
                    const cy = parseFloat(circle.getAttribute('cy') as string);

                    // setDotCoordinates({ cx: cx, cy: cy })
                    dotRef.current = {...dotRef.current, cx: cx, cy: cy}

                }
            }
        }

        if (e && e.activePayload) {
            
            // const timestamp = e.activePayload[0].payload.timestamp;
            const price = e.activePayload[0].payload.price;
            setActivePrice(price)
            
            // dotRef.current = {...dotRef.current, timestamp: timestamp, price: price}
            // console.log(dotRef.current)
        }
    }, 50)

    return (
        <ChartContainer config={config} className="p-0 border-0">
            
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
            onMouseMove={(e) => handleMouseMove(e)}

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
            {/* <YAxis domain={['dataMin - 2200', 'dataMax + 600']} tickCount={6} style={{ display: 'none' }} /> */}
            <YAxis domain={['dataMin - 2200', 'dataMax + 600']} yAxisId={1} tickCount={6} hide={true} style={{ display: 'none' }} />

            <YAxis domain={['dataMin - 2200', 'dataMax + 600']} yAxisId={2} tickCount={6} hide={true} style={{ display: 'none' }} />
            <Tooltip 
            // cursor={true}
            cursor={{ stroke: "black", strokeWidth: 1, strokeDasharray: "4 4", }} 
                content={(props) => <CustomTooltip {...props} yValue={dotRef.current.cy} />}
            />

            {/* {dotRef.current.price !== 0 && ( */}
            <ReferenceLine yAxisId={1} y={activePrice} stroke="black" strokeWidth={0.3} strokeDasharray="4 4" />
            {/* )} */}

            {/* <ReferenceLineComponent price={dotRef.current.price} /> */}

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
                // activeDot={false}
                
                onMouseMove={(e: any) => {
                    const points = e.points
                    if(lastCircleCoordinates.cx === 0 && lastCircleCoordinates.cy === 0) {
                        updateLastCircleCoordinates(points[points.length - 1].x, points[points.length - 1].y)
                    }
                    
                    // console.log(points[points.length - 1])
                }}
                dot={(props) =><CustomDot {...props} />}
            />

            <Bar dataKey="volume"
                yAxisId={2}
                fill="hsl(216 12.2% 83.9%)"
                style={{ transform: 'scaleY(0.1)', transformOrigin: 'bottom' }}
                className="border-red"
            />

        </ComposedChart>
        </ChartContainer>
    )
}

const CustomTooltip = (props: any) => {
    if (props.active && props.payload && props.payload.length) {

        const price = props.payload[0].value;  // Get the hovered price
        return (
            <div style={{
                position: "absolute",
                left: "540px",   // Aligns to the right
                // left: "10%",
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


const CustomDot = memo(
    ({ cx, cy, index, noOfDots } : {cx: any, cy: any, index: any, noOfDots: number}) => {
        
        return <circle data-circle-index={index} cx={cx} cy={cy} r={0.001} fill="#8884d8" strokeWidth={0.1} />;
    },
    (prevProps, nextProps) => prevProps.cx === nextProps.cx && prevProps.cy === nextProps.cy && prevProps.noOfDots === nextProps.noOfDots
);


CustomDot.displayName = "CustomDot"


export default ComposedChartComponent