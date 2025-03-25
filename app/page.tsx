import CombinedChart from "@/components/CombinedChart";
import { data } from "@/lib/data";
import { transformWholeData } from "@/lib/utils";

export default function Home() {

  const chartData = transformWholeData(data)

  return (
    <div className="flex justify-center items-center h-screen font-sans bg-stone-900">
     
        <CombinedChart chartData={chartData} price={63179.71} denom={"USD"} change={2161.42} changePerc={3.54} />
        
    </div>
  );
}
