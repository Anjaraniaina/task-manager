import {useState} from "react";

const useLocalStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState(()=>{
    // current stored value
    const stored = localStorage.getItem(key);
    // if no stored value, set initialValue
    return stored !== null ? JSON.parse(stored) : initialValue;
  });

  // save a new value
  const setLocalStorageValue = (newValue: any) => {
    setValue(newValue)
    localStorage.setItem(key, newValue);
  }

  return [value, setLocalStorageValue];
}

export {
  useLocalStorage
}