// 'use client'
// import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
// import {  Area, AreaChart, Bar, CartesianGrid, ComposedChart, Cross, Legend, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts"
// import {
//     Card,
//     CardContent,
// } from "@/components/ui/card"
// import {
//     ChartConfig,
//     ChartContainer,
// } from "@/components/ui/chart"

// const chartConfig = {
//     price: {
//         label: "price",
//         color: "hsl(var(--chart-6))",
//     },
//     volume: {
//         label: "volume",
//         color: "hsl(var(--chart-4))",
//     }
// } satisfies ChartConfig

// const NewComponent = ({ chartData, currentPrice }: { chartData: Array<object>, currentPrice: number }) => {

//     const [hoveredData, setHoveredData] = useState({ timestamp: 0, price: 0 });

//     const [dotCoordinates, setDotCoordinates] = useState({cx: 0, cy: 0})

//     const [lastCircleCoordinates, setLastCircleCoordinates] = useState({cx: 0, cy: 0})

//     useEffect(() => {

        
//         // let timeoutId = setTimeout(() => {
//             if(chartData) {
//                 // const circle = document.querySelector(`circle[data-circle-index]="7"`)
//                 // console.log("Circles", circle)
//                 // console.log("Circles Data: ", circle?.cx, circle?.cy)
//                 const circles = document.querySelectorAll('circle')
//                 const circle = Array.from(circles)[circles.length - 1]
//                 if(circle)
//                     setLastCircleCoordinates({cx: circle.cx.baseVal.value, cy: circle.cy.baseVal.value})
//                 // console.log("Circle", circle)
//             }
//         // }, 1000)

//         return () => {
//             // clearTimeout(timeoutId)
//             setLastCircleCoordinates({cx: 0, cy: 0})
//         }
        

//     }, [chartData])


//     const dotRef = useRef({cx: 0, cy: 0, timestamp: 0, price: 0})


//     console.log("LastCircle Coordinates: ", lastCircleCoordinates)

//     return (

//         <Card className=" p-0 border-t rounded-none shadow-none z-10">

//             <CardContent className=" p-0 border-none shadow-none">
//                 {/* <div className="relative"> */}
                    
//                 {/* </div> */}
                
//                 <ChartContainer config={chartConfig} className="p-0 border-0">
                    
//                     <ComposedChart
//                         accessibilityLayer
//                         data={chartData}
//                         margin={{
//                             left: -61,
//                             right: -1,
//                             bottom: -30
//                         }}
//                         style={{ padding: 0 }}
//                         className="border-x rounded-none"
//                         onMouseMove={(e) => {

//                             if (e && e.activeTooltipIndex) {
//                                 console.log("ActiveTooltip: ", e)
//                                 const activeDotElements = document.querySelectorAll(' .recharts-active-dot');
//                                 if (activeDotElements && activeDotElements.length > 0) {
//                                     const activeDotElement = activeDotElements[0];
//                                     const circle = activeDotElement.querySelector('circle');


//                                     if (circle) {
//                                         const cx = parseFloat(circle.getAttribute('cx') as string);
//                                         const cy = parseFloat(circle.getAttribute('cy') as string);

//                                         // setDotCoordinates({ cx: cx, cy: cy })
//                                         dotRef.current = {...dotRef.current, cx: cx, cy: cy}

//                                     }
//                                 }
//                             }



//                             if (e && e.activePayload) {
//                                 // console.log(e.activePayload)
//                                 // console.log(e.activePayload[0]?.payload.price, e.activePayload[0]?.payload.timestamp)
//                                 // console.log("DotRef.current", dotRef.current)
//                                 const timestamp = e.activePayload[0].payload.timestamp;
//                                 const price = e.activePayload[0].payload.price;
//                                 // const yPixel = e.chartY;
//                                 // setHoveredData({ timestamp: timestamp, price: price});
//                                 dotRef.current = {...dotRef.current, timestamp: timestamp, price: price}
//                                 console.log(dotRef.current)
//                             }
//                         }}
//                         onMouseLeave={() => setHoveredData({ timestamp: 0, price: 0})}

//                     >
//                         {lastCircleCoordinates.cx !== 0 && lastCircleCoordinates.cy !== 0 && (
//                                             <div
//                                                 style={{
//                                                     position: "absolute",
//                                                     left: `${lastCircleCoordinates.cx - 33}px`,
//                                                     top: `${lastCircleCoordinates.cy + 0}px`,
//                                                     // right: `${lastCircleCoordinates.cx}px`,
//                                                     // transform: "translate(-170%, -50%)",
//                                                     background: "hsl(var(--chart-6))",
//                                                     color: "white",
//                                                     padding: "6px 12px",
//                                                     borderRadius: "4px",
//                                                     fontSize: "12px",
//                                                     whiteSpace: "nowrap",

//                                                 }}
//                                                 className="z-10"
//                                             > 
//                                                 {currentPrice}
//                                             </div>
//                                         )}
//                         <CartesianGrid horizontal={false} stroke="lightgray" className="p-0 border-0" />

//                         <XAxis
//                             // dataKey="timestamp"
//                             // xAxisId={1}
//                             //   tickLine={false}
//                             //   axisLine={false}
//                             interval={42}
//                             tickCount={4}
//                             hide={true}
//                             // hide={true}
//                             //   tickMargin={8}
//                             //   tickFormatter={(value) => Math.round(value)}
//                             // style={{ display: 'none', border: 'none' }}
//                         />
//                         <YAxis domain={['dataMin - 2200', 'dataMax + 600']} yAxisId={1} tickCount={6} hide={true} style={{ display: 'none' }} />

//                         <YAxis domain={['dataMin - 2200', 'dataMax + 600']} yAxisId={2} tickCount={6} hide={true} style={{ display: 'none' }} />
                        
//                         {/* <YAxis
//                             yAxisId="right"  // Attach to BarChart
//                             orientation="right"
//                             domain={[0, 'dataMax']}  // Ensure volume is properly positioned
//                             tickCount={4}
//                             style={{ display: 'none' }}
//                         /> */}

                        
                        
//                         <Tooltip 
//                         // cursorStyle={}
//                         // cursor={false}
//                         cursor={{ stroke: 'black', strokeWidth: 2, strokeDasharray: "4 4" }}
//                         // cursor={<CustomCursor points={undefined} x={undefined} y={undefined} width={undefined} height={undefined} />}
//                         // cursor={(props) => <CustomCursor yValue={dotRef.current.cy} />}
//                         content={(props) => <CustomTooltip {...props} yValue={dotRef.current.cy} />} 
//                         />

//                         {/* <Tooltip 
//                         // cursorStyle={}
//                         // cursor={false}
//                         cursor={{ stroke: 'black', strokeWidth: 2, strokeDasharray: "4 4",  }}
//                         // content={(props) => <CustomTooltip {...props} xValue={dotRef.current.cx} />} 
//                         /> */}

//                         {/* <Cross x={dotRef.current.cx} y={dotRef.current.cy} height={10} /> */}
                       
//                         {/* {dotRef.current.price !== 0 && ( */}
//                             {/* <ReferenceLine yAxisId={1} y={dotRef.current.price} stroke="black" strokeWidth={0.3} strokeDasharray="4 4" /> */}
//                         {/* )} */}

//                         <ReferenceLineComponent getPrice={() => dotRef.current.price} />

//                         <defs className="border-0">
//                             <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1" className="border-0">
//                                 <stop
//                                     offset="5%"
//                                     stopColor="var(--color-price)"
//                                     stopOpacity={0.3}
//                                 />
//                                 <stop
//                                     offset="95%"
//                                     stopColor="white"
//                                     stopOpacity={0.1}
//                                 />
//                             </linearGradient>
//                         </defs>
//                         <Area
//                             dataKey="price"
//                             type="linear"
//                             fill="url(#fillMobile)"
//                             fillOpacity={0.4}
//                             stroke="var(--color-price)"
//                             strokeWidth={1.3}
//                             className="p-0 border-0"
//                             legendType="line"
//                             yAxisId={1}
//                             // activeDot={false}
//                             // onMouseMove={(e) => {
//                             //     console.log("Event: ", e.clientX, e.clientY)
//                             //     // console.log(document.querySelectorAll('.recharts-area-area'))
//                             //     if (e && e.activeTooltipIndex) {
//                             //         const activeDotElements = document.querySelectorAll(' .recharts-active-dot');
//                             //         if (activeDotElements && activeDotElements.length > 0) {
//                             //             const activeDotElement = activeDotElements[0];
//                             //             const circle = activeDotElement.querySelector('circle');

//                             //             console.log("Circle in Area", circle)
    
    
//                             //             if (circle) {
//                             //                 const cx = parseFloat(circle.getAttribute('cx') as string);
//                             //                 const cy = parseFloat(circle.getAttribute('cy') as string);
    
//                             //                 // setDotCoordinates({ cx: cx, cy: cy })
//                             //                 dotRef.current = {...dotRef.current, cx: cx, cy: cy}
    
//                             //             }
//                             //         }
//                             //     }
    
    
    
//                             //     if (e && e.activePayload) {
//                             //         // console.log(e.activePayload)
//                             //         // console.log(e.activePayload[0]?.payload.price, e.activePayload[0]?.payload.timestamp)
//                             //         // console.log("DotRef.current", dotRef.current)
//                             //         const timestamp = e.activePayload[0].payload.timestamp;
//                             //         const price = e.activePayload[0].payload.price;

//                             //         console.log("ActivePayload in Area", e.activePayload)
//                             //         // const yPixel = e.chartY;
//                             //         // setHoveredData({ timestamp: timestamp, price: price});
//                             //         dotRef.current = {...dotRef.current, timestamp: timestamp, price: price}
//                             //     }
//                             // }}
//                             // onMouseLeave={() => setHoveredData({ timestamp: 0, price: 0})}

                            

//                             dot={(props) => 
//                             <CustomDot {...props} 
//                                 // key={props.cx + props.cy} 
//                                 // setDotCoordinates={setDotCoordinates} 
//                                 // setLastCircleCoordinates={funcSetLastCicleCoordinates} 
//                                 noOfDots={Number(chartData.length)} 
//                             />}
//                         //   stackId="a"

//                         />
//                         {/* <Legend /> */}

//                         <Bar dataKey="volume" 
//                             yAxisId={2}
//                             fill="hsl(216 12.2% 83.9%)" 
//                             style={{ transform: 'scaleY(0.1)', transformOrigin: 'bottom' }}  
//                             className="border-red" 
//                         />
                        

//                     </ComposedChart>


//                 </ChartContainer>
//             </CardContent>
//         </Card>
//     )
// }

// // const ReferenceLineComponent = ({ getPrice }: { getPrice: () => number }) => {
    
// //         const [price, setPrice] = useState(getPrice());

// //         console.log(price)
      
// //         useEffect(() => {
// //           const interval = setInterval(() => {
// //             const newPrice = getPrice();
// //             setPrice(newPrice); // Update state to trigger re-render
// //           }, 16); // Update every ~16ms (60fps)
          
// //           return () => clearInterval(interval);
// //         }, []);
      
        
    
// //     return (<ReferenceLine yAxisId={1} y={price} stroke="black" strokeWidth={0.3} strokeDasharray="4 4" />)
// // };

// const ReferenceLineComponent = ({ getPrice }: { getPrice: () => number }) => {
//     const [price, setPrice] = useState(getPrice());
//     const animationRef = useRef<number | null>(null);
  
//     useEffect(() => {
//       const updatePrice = () => {
//         setPrice(getPrice());
//         animationRef.current = requestAnimationFrame(updatePrice);
//       };
  
//       animationRef.current = requestAnimationFrame(updatePrice);
  
//       return () => {
//         if (animationRef.current) {
//           cancelAnimationFrame(animationRef.current);
//         }
//       };
//     }, []);
  
//     return (
//       <ReferenceLine
//         yAxisId={1}
//         y={price}
//         stroke="black"
//         strokeWidth={0.3}
//         strokeDasharray="4 4"
//       />
//     );
//   };
  


// ReferenceLineComponent.displayName = "ReferenceLineComponent"

// const CustomCursor = ({ points, x, y, width, height, yValue }) => {
//     if (!points || points.length === 0) return null;
  
//     const { cx, cy } = points[0]; // Active dot coordinates
  
//     return (
//       <g>
//         {/* Vertical Line */}
//         <line
//           x1={cx}
//           x2={cx}
//           y1={0}
//           y2={height}
//           stroke="black"
//           strokeWidth={2}
//           strokeDasharray="4 4"
//         />
//         {/* Horizontal Line */}
//         <line
//           x1={0}
//           x2={width}
//           y1={yValue}
//           y2={yValue}
//           stroke="black"
//           strokeWidth={2}
//           strokeDasharray="4 4"
//         />
//       </g>
//     );
//   };

// // active, payload, label, yValue
// const CustomTooltip = (props: any) => {
//     if (props.active && props.payload && props.payload.length) {

//         const price = props.payload[0].value;  // Get the hovered price
//         return (
//             <div style={{
//                 position: "absolute",
//                 left: "540px",   // Aligns to the right
//                 // left: "10%",
//                 // transform: "translateX(1250%)", // Adjust position
//                 background: "black",
//                 color: "white",
//                 padding: "6px 12px",
//                 borderRadius: "4px",
//                 fontSize: "12px",
//                 top: props.yValue - 10,
//                 transition: "all 0.2s ease-in-out"

//             }}
//                 className="transition-all duration-200 ease-in-out font-bold"
//             >
//                 {Math.round(price)}
//             </div>
//         );
//     }
//     return null;
// };


// const CustomDot = memo(
//     ({ cx, cy, index, noOfDots } : {cx: any, cy: any, index: any, noOfDots: number}) => {
//         // console.log("CustomDot rendered");

//         // if(index === noOfDots - 1) {
//         //     return (
//         //         // <div className="flex">
//         //             // <>
//         //             //     <circle data-circle-index={index} cx={cx} cy={cy} r={0.1} fill="#8884d8" strokeWidth={0.5} />
//         //             //     <rect></rect>
//         //             // </> 

//         //             <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
//         //                 <circle data-circle-index={index} cx={cx} cy={cy} r={0.1} fill="#8884d8" strokeWidth={0.5} />
                        
//         //                 <rect  width="80" height="60" rx="10" ry="10" stroke="black" fill="none" />

                        
//         //                 <text font-size="16" text-anchor="middle" alignment-baseline="middle" fill="black">Hello</text>
//         //             </svg>

                    
//         //             // <p>Hello</p>
//         //         // </div>
//         //     )
//         // }
        
//         return <circle data-circle-index={index} cx={cx} cy={cy} r={0.1} fill="#8884d8" strokeWidth={0.5} />;
//     },
//     (prevProps, nextProps) => prevProps.cx === nextProps.cx && prevProps.cy === nextProps.cy && prevProps.noOfDots === nextProps.noOfDots
// );


// CustomDot.displayName = "CustomDot"

// export default NewComponent