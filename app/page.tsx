// import BarChartComponent from "@/components/BarChartComponent";
// 'use client'
import CryptoPriceChart from "@/components/CryptoPriceChart";
import { prices } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen font-sans">
      {/* Hello World */}
      {/* <BarChartComponent /> */}
      {/* <div className="w-1/2 bg-white p-4"> */}
        <CryptoPriceChart prices={prices} />

      {/* </div> */}
    </div>
  );
}
