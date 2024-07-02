
import { WebComponents } from "../components/website/components/WebComponent"; 
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'
export const getCurrentUser = () => {
  return getLocalStorage('auth')
}
export const getLocalStorage = (key: string): any => {
  const auth = localStorage.getItem(key) || null;
  return auth ? JSON.parse(auth) : null
}



export const getBaseConfigSection = (name: string) => {
  const comp = WebComponents.find(comp => comp.component.name === name)
  return comp?.config
}

export function generateNonce() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


export function setRedirectUrl(url: string) {
  return localStorage.setItem('redirectUrl', url)
}

export function getRedirectUrl() {
  return localStorage.getItem('redirectUrl')
}

export function removeRedirectUrl() {
  return localStorage.removeItem('redirectUrl')
}


export function getDateJs() {
  dayjs.extend(utc)
  dayjs.extend(timezone)
  const configTimezone = import.meta.env.VITE_TIMEZONE 
  if (configTimezone) {
    return dayjs.tz(new Date(), configTimezone)
  } else {
    return dayjs()
  } 
}

export function getDate() {
  const now = getDateJs().toDate()
  return now
}