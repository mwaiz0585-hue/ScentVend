import AsyncStorage from '@react-native-async-storage/async-storage';
import {InventoryItem, Order} from '../types';
import {defaultInventory} from '../data/inventory';

const ORDERS_STORAGE_KEY = '@scentvend_orders';
const INVENTORY_STORAGE_KEY = '@scentvend_inventory';

export async function saveOrdersToStorage(orders: Order[]) {
  try {
    await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.log('Failed to save orders:', error);
  }
}

export async function loadOrdersFromStorage(): Promise<Order[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);

    if (!jsonValue) {
      return [];
    }

    const parsedOrders = JSON.parse(jsonValue);

    if (!Array.isArray(parsedOrders)) {
      return [];
    }

    return parsedOrders as Order[];
  } catch (error) {
    console.log('Failed to load orders:', error);
    return [];
  }
}

export async function clearOrdersFromStorage() {
  try {
    await AsyncStorage.removeItem(ORDERS_STORAGE_KEY);
  } catch (error) {
    console.log('Failed to clear orders:', error);
  }
}

export async function saveInventoryToStorage(inventory: InventoryItem[]) {
  try {
    await AsyncStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(inventory));
  } catch (error) {
    console.log('Failed to save inventory:', error);
  }
}

export async function loadInventoryFromStorage(): Promise<InventoryItem[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(INVENTORY_STORAGE_KEY);

    if (!jsonValue) {
      return defaultInventory;
    }

    const parsedInventory = JSON.parse(jsonValue);

    if (!Array.isArray(parsedInventory)) {
      return defaultInventory;
    }

    return parsedInventory as InventoryItem[];
  } catch (error) {
    console.log('Failed to load inventory:', error);
    return defaultInventory;
  }
}

export async function resetInventoryStorage() {
  try {
    await AsyncStorage.setItem(
      INVENTORY_STORAGE_KEY,
      JSON.stringify(defaultInventory),
    );
  } catch (error) {
    console.log('Failed to reset inventory:', error);
  }
}