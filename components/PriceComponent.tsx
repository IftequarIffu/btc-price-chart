// import { COINGECKO_API_URL } from '@/lib/constants'
// import { convertIntegerToCommaFormat } from '@/lib/utils'
// import { useQuery } from '@tanstack/react-query'
// import axios from 'axios'
// import { Link } from 'lucide-react'
// import React from 'react'


// // const buttons = [
// //     {
// //         name: "Summary",
// //         isSelected: false
// //     },
// //     {
// //         name: "Chart",
// //         isSelected: true
// //     },
// //     {
// //         name: "Statistics",
// //         isSelected: false
// //     },
// //     {
// //         name: "Analytics",
// //         isSelected: false
// //     },
// //     {
// //         name: "Settings",
// //         isSelected: false
// //     },
// // ]


// const PriceComponent = ({buttons}) => {

//     const { isPending: isCoinDataPending, error: isCoinDataErrored, data: coinData } = useQuery({
//         queryKey: [`price`],
//         queryFn: async () => {
//             const res = await axios.get(`${COINGECKO_API_URL}/api/v3/coins/bitcoin`)
//             // console.log("API call made")
//             // const transformedData = transformWholeData(res.data)
//             const currentPrice = res.data.market_data.current_price.usd
//             const priceChange24hr = res.data.market_data.price_change_24h
//             const priceChangePerc24hr = res.data.market_data.price_change_percentage_24h
//             return {
//                 currentPrice,
//                 priceChange24hr,
//                 priceChangePerc24hr
//             }
//         },
//         refetchInterval: 30*1000,
//         notifyOnChangeProps: "all",
//       })


//   return (
//     <div className="border-b px-8 pt-8 space-y-3">

//                 {
//                     coinData && 
//                     <div className="space-y-1 font-semibold">
//                         <div className="flex gap-1 items-start">
//                             <h1 className="text-4xl">{convertIntegerToCommaFormat(coinData?.currentPrice)}</h1>
//                             <p className="text-gray-600/50 font-semibold ">USD</p>
//                         </div>
//                         <div className={`flex gap-1 text-sm font-semibold ${coinData?.priceChange24hr > 0 ? "text-green-600" : "text-red-600"}`}>
//                             <p>
//                                 {coinData?.priceChange24hr > 0 && "+"}
//                                 {coinData?.priceChange24hr.toFixed(2)}
//                             </p>
//                             <p>({coinData?.priceChangePerc24hr.toFixed(2)}%)</p>
//                         </div>
    
//                     </div>
//                 }
                

//                 {/* Tabs */}
//                 <div className="flex">
//                     {buttons.map((item, index) => (
//                         <Link key={index} 
//                         href={"#"} 
//                         className={`${index === 0 ? "ps-0 py-3 pe-3" : "p-3"} ${!item.isSelected && 'text-black/60 hover:text-black/80'} text-sm  border-[hsl(var(--chart-6))] ${item.isSelected && "border-b-4 hover:text-black"}`}>{item.name}</Link>
//                     ))}

//                 </div>


//             </div>
//   )
// }

// export default PriceComponent