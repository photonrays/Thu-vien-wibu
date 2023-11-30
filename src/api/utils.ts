/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
export function getPreviousMonthDateTimeUTC() {
    const now = new Date();
    const previousMonthDateTime = new Date(now.getTime());
  
    // Subtract one month from the current date
    previousMonthDateTime.setUTCMonth(previousMonthDateTime.getUTCMonth() - 1);
  
    // Handle edge case where current month is January
    if (previousMonthDateTime.getUTCMonth() === 11) {
      previousMonthDateTime.setUTCFullYear(previousMonthDateTime.getUTCFullYear() - 1);
    }
  
    const year = previousMonthDateTime.getUTCFullYear();
    const month = String(previousMonthDateTime.getUTCMonth() + 1).padStart(2, '0');
    const day = String(previousMonthDateTime.getUTCDate()).padStart(2, '0');
    const hours = String(previousMonthDateTime.getUTCHours()).padStart(2, '0');
    const minutes = String(previousMonthDateTime.getUTCMinutes()).padStart(2, '0');
    const seconds = String(previousMonthDateTime.getUTCSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  export const filterSomeAttribute = (arr: any[], selector: any, attribute: string) => {
    const filtered = arr?.filter(val => val?.type === selector)[0];
    return attribute ? filtered?.attributes[attribute] || 'No ' + attribute : filtered;
}
  
  