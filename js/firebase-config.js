// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, limit, updateDoc, doc, getDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDG5iTs2BHAHEmoWJe5voWf8bVyrW6BZlk",
  authDomain: "tiestyle-369c7.firebaseapp.com",
  projectId: "tiestyle-369c7",
  storageBucket: "tiestyle-369c7.firebasestorage.app",
  messagingSenderId: "948288815145",
  appId: "1:948288815145:web:90a7b3b48ef442e3c31c38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Export Firebase services
export { 
  db, 
  auth,
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  updateDoc,
  doc,
  getDoc,
  Timestamp,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
};

// Helper functions for order management
export async function saveOrderToFirebase(orderData) {
  try {
    const ordersRef = collection(db, 'orders');
    const docRef = await addDoc(ordersRef, {
      ...orderData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return { success: true, orderId: docRef.id };
  } catch (error) {
    console.error('Error saving order to Firebase:', error);
    return { success: false, error: error.message };
  }
}

export async function getOrdersByPhone(phoneNumber) {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef, 
      where('customer.phone', '==', phoneNumber),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, orders };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { success: false, error: error.message, orders: [] };
  }
}

export async function getTodaysOrders() {
  try {
    const ordersRef = collection(db, 'orders');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const q = query(
      ordersRef,
      where('createdAt', '>=', Timestamp.fromDate(today)),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, orders };
  } catch (error) {
    console.error('Error fetching today\'s orders:', error);
    return { success: false, error: error.message, orders: [] };
  }
}

export async function getAllOrders(limitCount = 100) {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, orderBy('createdAt', 'desc'), limit(limitCount));
    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, orders };
  } catch (error) {
    console.error('Error fetching all orders:', error);
    return { success: false, error: error.message, orders: [] };
  }
}

export async function updateOrderStatus(orderId, newStatus) {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      status: newStatus,
      updatedAt: Timestamp.now()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating order status:', error);
    return { success: false, error: error.message };
  }
}

export async function updatePaymentStatus(orderId, paymentStatus) {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      paymentStatus: paymentStatus,
      updatedAt: Timestamp.now()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating payment status:', error);
    return { success: false, error: error.message };
  }
}

export async function getOrderById(orderId) {
  try {
    // First try to get by document ID
    const orderRef = doc(db, 'orders', orderId);
    const orderDoc = await getDoc(orderRef);
    
    if (orderDoc.exists()) {
      return { success: true, order: { id: orderDoc.id, ...orderDoc.data() } };
    }
    
    // If not found by document ID, search by orderId field
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('orderId', '==', orderId), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { success: true, order: { id: doc.id, ...doc.data() } };
    }
    
    return { success: false, error: 'Order not found' };
  } catch (error) {
    console.error('Error fetching order:', error);
    return { success: false, error: error.message };
  }
}

// Customer CRM functions
export async function getCustomerOrders(phoneNumber) {
  return await getOrdersByPhone(phoneNumber);
}

export async function getCustomerStats(phoneNumber) {
  try {
    const result = await getOrdersByPhone(phoneNumber);
    if (!result.success) return result;
    
    const orders = result.orders;
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + (order.totals?.total || 0), 0);
    const completedOrders = orders.filter(o => o.status === 'completed').length;
    
    return {
      success: true,
      stats: {
        totalOrders,
        totalSpent,
        completedOrders,
        lastOrderDate: orders[0]?.createdAt || null
      }
    };
  } catch (error) {
    console.error('Error fetching customer stats:', error);
    return { success: false, error: error.message };
  }
}
