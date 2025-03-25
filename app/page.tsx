// import BarChartComponent from "@/components/BarChartComponent";
// 'use client'
import CombinedChart from "@/components/CombinedChart";
import CryptoPriceChart from "@/components/CryptoPriceChart";
import NewComponent from "@/components/NewComponent";
import { data } from "@/lib/data";
import { transformWholeData } from "@/lib/utils";

export default function Home() {

  const chartData = transformWholeData(data)

  return (
    <div className="flex justify-center items-center h-screen font-sans">
      {/* Hello World */}
      {/* <BarChartComponent /> */}
      {/* <div className="w-1/2 bg-white p-4"> */}
        {/* <CryptoPriceChart chartData={chartData} /> */}
        <CombinedChart chartData={chartData} price={63179.71} denom={"USD"} change={2161.42} changePerc={3.54} />
        {/* <NewComponent chartData={chartData}/> */}
      {/* </div> */}
    </div>
  );
}
