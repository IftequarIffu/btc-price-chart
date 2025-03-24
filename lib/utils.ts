import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { prices } from "./data"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function transformData(prices) {

  // const transformedData = []

  const transformedData =  prices.map((item, index) => {
    return {
      price: item[1],
      timestamp: item[0]
    }
  })

  return transformedData

}