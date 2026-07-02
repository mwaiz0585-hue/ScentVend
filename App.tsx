import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import CriteriaScreen from './src/screens/CriteriaScreen';
import RecommendationScreen from './src/screens/RecommendationScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import UnlockCodeScreen from './src/screens/UnlockCodeScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import MachineVerifyScreen from './src/screens/MachineVerifyScreen';
import QRScannerScreen from './src/screens/QRScannerScreen';
import AdminInventoryScreen from './src/screens/AdminInventoryScreen';
import AdminDashboardScreen from './src/screens/AdminDashboardScreen';
import DemoGuideScreen from './src/screens/DemoGuideScreen';
import SystemOverviewScreen from './src/screens/SystemOverviewScreen';
import OrderDetailsScreen from './src/screens/OrderDetailsScreen';

import {
  Criteria,
  InventoryItem,
  Order,
  Perfume,
  RootStackParamList,
  UserRole,
} from './src/types';

import {generateCode} from './src/utils/generateCode';
import {defaultInventory} from './src/data/inventory';

import {
  clearOrdersFromStorage,
  loadInventoryFromStorage,
  loadOrdersFromStorage,
  resetInventoryStorage,
  saveInventoryToStorage,
  saveOrdersToStorage,
} from './src/utils/orderStorage';

const Stack = createNativeStackNavigator<RootStackParamList>();

const initialCriteria: Criteria = {
  scent: '',
  occasion: '',
  gender: '',
  strength: '',
  budget: '',
};

export default function App() {
  const [appBooted, setAppBooted] = useState(false);

  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState<UserRole>('customer');

  const [criteria, setCriteria] = useState<Criteria>(initialCriteria);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);

  const [unlockCode, setUnlockCode] = useState('');
  const [pendingMachineCode, setPendingMachineCode] = useState('');

  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [inventory, setInventory] =
    useState<InventoryItem[]>(defaultInventory);

  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const [inventoryLoaded, setInventoryLoaded] = useState(false);

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setAppBooted(true);
    }, 2200);

    return () => clearTimeout(bootTimer);
  }, []);

  useEffect(() => {
    async function loadSavedData() {
      const savedOrders = await loadOrdersFromStorage();
      const savedInventory = await loadInventoryFromStorage();

      setOrders(savedOrders);
      setInventory(savedInventory);

      setOrdersLoaded(true);
      setInventoryLoaded(true);
    }

    loadSavedData();
  }, []);

  useEffect(() => {
    if (ordersLoaded) {
      saveOrdersToStorage(orders);
    }
  }, [orders, ordersLoaded]);

  useEffect(() => {
    if (inventoryLoaded) {
      saveInventoryToStorage(inventory);
    }
  }, [inventory, inventoryLoaded]);

  function handlePaymentSuccess() {
    if (!selectedPerfume) {
      return;
    }

    const code = generateCode();

    const newOrder: Order = {
      id: Date.now().toString(),
      perfumeId: selectedPerfume.id,
      perfumeName: selectedPerfume.name,
      perfumeEmoji: selectedPerfume.emoji,
      amount: selectedPerfume.price,
      code,
      date: new Date().toLocaleString(),
      status: 'unused',
    };

    setUnlockCode(code);
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    setSelectedOrder(newOrder);
  }

  async function handleClearHistory() {
    await clearOrdersFromStorage();

    setOrders([]);
    setUnlockCode('');
    setPendingMachineCode('');
    setSelectedOrder(null);
  }

  async function handleResetInventory() {
    await resetInventoryStorage();
    setInventory(defaultInventory);
  }

  function updateInventoryStock(perfumeId: string, amount: number) {
    setInventory(prevInventory =>
      prevInventory.map(item => {
        if (item.perfumeId !== perfumeId) {
          return item;
        }

        const newStock = Math.max(0, item.stock + amount);

        return {
          ...item,
          stock: newStock,
          updatedAt: new Date().toLocaleString(),
        };
      }),
    );
  }

  const currentOrder =
    orders.find(order => order.code === unlockCode) || selectedOrder || null;

  if (!appBooted || !ordersLoaded || !inventoryLoaded) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTintColor: '#1E1336',
          headerTitleStyle: {
            fontWeight: '800',
          },
          contentStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}>
        <Stack.Screen name="Login" options={{headerShown: false}}>
          {props => (
            <LoginScreen
              {...props}
              onLogin={(name, role) => {
                setUserName(name);
                setUserRole(role);
                props.navigation.replace('Home');
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Home" options={{title: 'ScentVend'}}>
          {props => (
            <HomeScreen
              {...props}
              userName={userName}
              userRole={userRole}
              onLogout={() => {
                setUserName('');
                setUserRole('customer');
                setSelectedPerfume(null);
                setUnlockCode('');
                setPendingMachineCode('');
                setSelectedOrder(null);
                props.navigation.replace('Login');
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Criteria" options={{title: 'Perfume Match'}}>
          {props => (
            <CriteriaScreen
              {...props}
              criteria={criteria}
              setCriteria={setCriteria}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Recommendation" options={{title: 'Recommendation'}}>
          {props => (
            <RecommendationScreen
              {...props}
              criteria={criteria}
              inventory={inventory}
              setSelectedPerfume={setSelectedPerfume}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Payment" options={{title: 'Payment'}}>
          {props => (
            <PaymentScreen
              {...props}
              selectedPerfume={selectedPerfume}
              inventory={inventory}
              onPaymentSuccess={handlePaymentSuccess}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="UnlockCode" options={{title: 'Unlock Code'}}>
          {props => (
            <UnlockCodeScreen
              {...props}
              selectedPerfume={selectedPerfume}
              unlockCode={unlockCode}
              currentOrder={currentOrder}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="History" options={{title: 'Order History'}}>
          {props => (
            <HistoryScreen
              {...props}
              orders={orders}
              onClearHistory={handleClearHistory}
              onSelectOrder={order => {
                setSelectedOrder(order);
                props.navigation.navigate('OrderDetails');
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="OrderDetails" options={{title: 'Order Details'}}>
          {props => (
            <OrderDetailsScreen {...props} selectedOrder={selectedOrder} />
          )}
        </Stack.Screen>

        <Stack.Screen name="MachineVerify" options={{title: 'Machine Verify'}}>
          {props => (
            <MachineVerifyScreen
              {...props}
              orders={orders}
              setOrders={setOrders}
              inventory={inventory}
              setInventory={setInventory}
              incomingCode={pendingMachineCode}
              clearIncomingCode={() => setPendingMachineCode('')}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="QRScanner" options={{title: 'QR Scanner'}}>
          {props => (
            <QRScannerScreen
              {...props}
              orders={orders}
              onCodeDetected={code => setPendingMachineCode(code)}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="AdminDashboard" options={{title: 'Admin Dashboard'}}>
          {props => (
            <AdminDashboardScreen
              {...props}
              orders={orders}
              inventory={inventory}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="AdminInventory" options={{title: 'Admin Inventory'}}>
          {props => (
            <AdminInventoryScreen
              {...props}
              inventory={inventory}
              updateInventoryStock={updateInventoryStock}
              onResetInventory={handleResetInventory}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="DemoGuide" options={{title: 'Demo Guide'}}>
          {props => <DemoGuideScreen {...props} />}
        </Stack.Screen>

        <Stack.Screen
          name="SystemOverview"
          options={{title: 'System Overview'}}>
          {props => <SystemOverviewScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}