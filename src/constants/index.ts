export const days = ['', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];
export const hours = [
  '8:00',
  '',
  '9:00',
  '',
  '10:00',
  '',
  '11:00',
  '',
  '12:00',
  '',
  '13:00',
  '',
  '14:00',
  '',
  '15:00',
  '',
  '16:00',
  '',
  '17:00',
  '',
  '18:00',
  '',
  '19:00',
  '',
];

export const MONDAY_TO_FRIDAY = 5;

//added 12:00, one of lectures starts at that time
export const courseStartTimeToEventRow: { [time: string]: number } = {
  '8.15': 0,
  '10.00': 1,
  '11.45': 2,
  '12.00': 2,
  '13.45': 3,
  '15.30': 4,
  '17.15': 5,
  '18.45': 6,
};

//groupTimeToEventRowMapping - 1;
export const ROWS_COUNT = 6;
export const dayMapping: { [key: number]: string } = {
  0: 'poniedziałek',
  1: 'wtorek',
  2: 'środa',
  3: 'czwartek',
  4: 'piątek',
  5: 'sobota',
  6: 'niedziela',
};
