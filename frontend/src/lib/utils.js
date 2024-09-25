import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import animationData from "@/assets/lottie-json"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const colors = [
  "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",
  "bg-[#3a6964] text-[#34ebd8] border-[1px] border-[#34ebd8]",
  "bg-[#2f2d3b] text-[#5638ff] border-[1px] border-[#5638ff]",
  "bg-[#949c75] text-[#c0e336] border-[1px] border-[#c0e336]",
]

export const colorsBg = [
  "#ff006faa",
  "#34ebd8",
  "#5638ff",
  "#c0e336",
]

export const themes = [
  {
    mode: "light",
    color: "rgb(240, 240, 240, 0.7)"
  },
  {
    mode: "dark",
    color: "rgb(60, 60, 60, 0.7)"
  }
];

export const getColor = (color) => {
  if (color >= 0 && color < colors.length) {
    return colors[color]
  }
  return colors[0]
}

export const AnimationDefaultOptions = {
  loop: true,
  autoplay: true,
  animationData
}