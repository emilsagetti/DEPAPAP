import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names safely, merging Tailwind classes.
 * Handles strings, objects, arrays, undefined, null, boolean.
 * 
 * @param {...any} inputs - Class names, objects, or arrays
 * @returns {string} - Merged class name string
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
