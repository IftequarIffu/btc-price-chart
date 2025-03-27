'use client'
import { COINGECKO_API_URL } from "@/lib/constants"
import { transformWholeData } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { ComposedChart, XAxis, YAxis, Tooltip, Legend, Area, Bar, Line, CartesianGrid } from "recharts"

  
const Demo = () => {

    const { isPending, error, data } = useQuery({
        queryKey: [`timeRange-0`],
        queryFn: async () => {
            const res = await axios.get(`${COINGECKO_API_URL}/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1`)
            // console.log("API call made")
            const transformedData = transformWholeData(res.data)
            console.log("In UseQuery", transformedData)
            return transformedData
        },
        refetchInterval: 60*1000,
        notifyOnChangeProps: "all",
      })

  return (
    <ComposedChart width={730} height={250} data={data}>
    <XAxis dataKey="timestamp"  hide={true}/>
    <YAxis yAxisId={1} hide={true}/>
    <YAxis yAxisId={2} hide={true} />
    {/* <Tooltip /> */}
    {/* <Legend /> */}
    {/* <CartesianGrid stroke="#f5f5f5"  /> */}
    {/* <Area type="linear" dataKey="price" fill="#8884d8" stroke="#8884d8" /> */}
    
    <Area
        dataKey="price"
        type="monotone"
        fill="red"
        // fillOpacity={0.4}
        stroke="#8884d8"
        // strokeWidth={1.3}
        // className="p-0 border-0"
        // dot={false}
        yAxisId={1}
            
    />
    
    <Bar dataKey="volume" yAxisId={2} style={{ transform: 'scaleY(0.1)', transformOrigin: 'bottom' }} fill="#413ea0" />

    
    </ComposedChart>
  )
}

export default Demo