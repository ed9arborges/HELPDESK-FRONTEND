import foodSvg from "../assets/food.svg"
import othersSvg from "../assets/others.svg"
import servicesSvg from "../assets/services.svg"
import transportSvg from "../assets/transport.svg"
import accommodationSvg from "../assets/accommodation.svg"

export const CATEGORIES = {  

  food: {
    name: "Food",
    icon: foodSvg,
  },
  others: {
    name: "Others",
    icon: othersSvg,
  },
  services: {
    name: "Services",
    icon: servicesSvg,
  },
  transport: {
    name: "Transport",
    icon: transportSvg,
  },
  accommodation: {
    name: "Accommodation",
    icon: accommodationSvg,
  },
}

export const CATEGORIES_KEYS = Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>