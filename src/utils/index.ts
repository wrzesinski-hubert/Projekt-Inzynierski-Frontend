import { courseStartTimeToEventRow } from '../constants/index';
import { SchedulerEvent } from '../types';

export const createClassTime = (startTime: string): [string, string] => {
  const startTimeMapped = courseStartTimeToEventRow[startTime];
  const endTime = Object.keys(courseStartTimeToEventRow).find(
    (key) => courseStartTimeToEventRow[key] === startTimeMapped + 1,
  )!;
  return [startTime, endTime];
};

export const selectGroupsToShow = (schedulerEvents: Array<SchedulerEvent>, index: number) => {
  return schedulerEvents.filter(({ time }: { time: [string, string] }) => courseStartTimeToEventRow[time[0]] === index);
};

type Procedure = (...args: any[]) => any;

interface Debounce {
  (...args: any[]): any;
  clear: () => void;
  flush: () => void;
}

export const debounce = (func: Procedure, wait: number, immediate: boolean = false) => {
  let timeout: number | null;
  let args: any;
  let context: any;
  let result: any;

  const later = () => {
    timeout = null;
    if (!immediate) {
      result = func.apply(context, args);
      context = args = null;
    }
  };

  const debouncedFunc: Procedure = function (this: any) {
    context = this;
    args = arguments;
    const callNow = immediate && !timeout;

    if (!timeout) {
      timeout = window.setTimeout(later, wait);
    }

    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  const clear = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  const flush = () => {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;

      clearTimeout(timeout);
      timeout = null;
    }
  };

  const debounced: Debounce = (() => {
    const f: any = debouncedFunc;
    f.clear = clear;
    f.flush = flush;
    return f;
  })();

  return debounced;
};