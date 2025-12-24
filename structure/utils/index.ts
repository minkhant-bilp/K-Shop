import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
var Rabbit = require('rabbit-node');

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(true);
    }, ms);
  });
}

export const zg2uni = (text: string) => {
  return Rabbit.zg2uni(text);
};