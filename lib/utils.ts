import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export function transformData(prices) {

//   // const transformedData = []

//   const transformedData =  prices.map((item, index) => {
//     return {
//       price: item[1],
//       timestamp: item[0]
//     }
//   })

//   return transformedData

// }

// export function transformVolumes(volumes) {

//   // const transformedData = []

//   const transformedData =  volumes.map((item, index) => {
//     return {
//       volume: item[1],
//       timestamp: item[0]
//     }
//   })

//   return transformedData

// }

export function transformWholeData(data: any) {

  const transformedData =  []

  for(let i=0; i<data.prices.length; i++) {
    transformedData.push({
      timestamp: data.prices[i][0],
      price: data.prices[i][1],
      volume: data.total_volumes[i][1]
    })
  }

  return transformedData
}

export function convertIntegerToCommaFormat(num: number) {
  if(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}