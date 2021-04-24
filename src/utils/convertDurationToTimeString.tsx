
export function convertDurationToTimeString(duration: number) {
   
   const sec_in_hr = 3600;
   const hours = Math.floor(duration / sec_in_hr);
   const minutes = Math.floor((duration % sec_in_hr) / 60);
   const seconds = duration % 60;

   const timeString = [hours, minutes, seconds]
      .map(unit => String(unit)
         .padStart(2, '0')).join(':')

   return timeString;
}