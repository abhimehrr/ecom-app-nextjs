import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString) => {
  try {
    // Parse the input date string
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string");
    }

    // Format the date
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    // Format the time
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format

    return `${day}-${month}-${year}, ${hours}:${minutes} ${period}`;
  } catch (error) {
    console.error("Error formatting date:", error.message);
    return "Invalid date";
  }
};

export const formatIndianRupee = (amount) => {
  if (isNaN(amount)) {
    return "NaN";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const calculateOriginalPrice = (discountedPrice, discountPercentage) => {
  if (isNaN(discountedPrice) || isNaN(discountPercentage)) {
    return "NaN";
  }

  const originalPrice = discountedPrice / (1 - discountPercentage / 100);
  return Math.round(originalPrice * 100) / 100;
};
