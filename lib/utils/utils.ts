import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';


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

// export function numberWithCommas(x: number) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// }

// export function displayMoney(value: number = 0, addDecimal: boolean = false) {
//   let splitString = `${value}`.split('.');
//   let naturalPart = splitString[0] || '0';
//   let decimalPart = splitString[1];
//   if (decimalPart) decimalPart = `.${decimalPart.substring(0, 2).padEnd(2, '0')}`;
//   return `${naturalPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${
//     decimalPart || (addDecimal ? '.00' : '')
//   }`;
// }

// export function calculateTotalPrice(items: Product[]) {
//   return items.reduce((total, item) => {
//     const itemTotal = item.price * item.orderStock;
//     return total + itemTotal;
//   }, 0);
// }
