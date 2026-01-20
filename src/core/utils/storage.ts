import AsyncStorage from '@react-native-async-storage/async-storage';


export const STORAGE_KEYS = {
  AUTH_TOKEN: 'AUTH_TOKEN',
  USER: 'USER',
  HAS_PASSWORD: 'HAS_PASSWORD',
  MOBILE: 'MOBILE',
  LOGGED_IN:'LOGGED_IN',
  SELECTED_BRAND:'SELECTED_BRAND',
} as const;

/**
 * Generic set item
 */
export const setItem = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`AsyncStorage setItem error (${key})`, error);
  }
};

/**
 * Generic get item
 */
export const getItem = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? (JSON.parse(jsonValue) as T) : null;
  } catch (error) {
    console.error(`AsyncStorage getItem error (${key})`, error);
    return null;
  }
};

/**
 * Remove item
 */
export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`AsyncStorage removeItem error (${key})`, error);
  }
};

/**
 * Clear all storage (use carefully)
 */
export const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('AsyncStorage clear error', error);
  }
};
