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

export function transformVolumes(volumes) {

  // const transformedData = []

  const transformedData =  volumes.map((item, index) => {
    return {
      volume: item[1],
      timestamp: item[0]
    }
  })

  return transformedData

}