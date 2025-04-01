import {
    doc,
    collection,
    onSnapshot,
    query,
    where,
    orderBy,
    getDocs,
    writeBatch,
    updateDoc,
    setDoc,
    addDoc,
    runTransaction,
  } from 'firebase/firestore';
  
  import { db } from '../../config/firebaseConfig';
  
  export function subscribeToFirestoreDoc(collectionPath, docId, callback) {
    const docRef = doc(db, collectionPath, docId);
    return onSnapshot(docRef, (docSnapshot) => {
      callback(docSnapshot.exists() ? docSnapshot.data() : null);
    });
  }
  
  export function subscribeToFirestoreCollection(collectionPath, callback, sort = 'asc') {
    const collectionRef = collection(db, collectionPath);
    const orderedQuery = query(collectionRef, orderBy('timestamp', sort));
  
    return onSnapshot(orderedQuery, (snapshot) => {
      callback(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }
  
  export function subscribeToUserConversations(collectionPath, userID, callback) {
    const collectionRef = collection(db, collectionPath);
    const filteredQuery = query(
      collectionRef,
      where('participants', 'array-contains', userID),
      orderBy('lastMessage.timestamp', 'desc')
    );
  
    return onSnapshot(filteredQuery, async (snapshot) => {
      const data = await Promise.all(
        snapshot.docs.map(async (doc) => ({ id: doc.id, ...doc.data(), lastMessage: doc.data().lastMessage || null }))
      );
      callback(data);
    });
  }
  
  export function subscribeToFirestoreQuery(queryRef, callback) {
    return onSnapshot(queryRef, (snapshot) => {
      callback(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }
  
  export async function addDataToFirestore(collectionPath, data) {
    try {
      const docRef = await addDoc(collection(db, collectionPath), data);
      console.log('Document added with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding document:', error.message);
      return null;
    }
  }
  
  export async function updateConversationWithMessageTransaction(collectionPath, conversationId, message, datentime) {
    try {
      await runTransaction(db, async (transaction) => {
        const conversationRef = doc(db, collectionPath, conversationId);
        const messagesRef = collection(db, collectionPath, conversationId, 'messages');
  
        transaction.update(conversationRef, { lastMessage: message, timestamp: datentime });
        const newMessageRef = doc(messagesRef);
        transaction.set(newMessageRef, { ...message, timestamp: datentime });
  
        console.log(`Transaction committed: Message ID - ${newMessageRef.id}`);
      });
      return 'Transaction successful';
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  }
  
  export async function setDataToFirestore(collectionPath, docId, data) {
    try {
      await setDoc(doc(db, collectionPath, docId), data);
      console.log('Document written with ID:', docId);
    } catch (error) {
      console.error('Error setting document:', error.message);
    }
  }
  
  export async function updateDataInFirestore(collectionPath, docId, data) {
    try {
      await updateDoc(doc(db, collectionPath, docId), data);
      console.log('Document updated with ID:', docId);
    } catch (error) {
      console.error('Error updating document:', error.message);
    }
  }
  
  export const subscribeToUserNotifications = (userId, callback) => {
    const notificationsRef = collection(db, 'notifications');
    const q = query(notificationsRef, where('userId', 'array-contains', userId));
  
    return onSnapshot(q, (querySnapshot) => {
      callback(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  };
  
  export const markAllNotificationsAsRead = async (userId) => {
    const batch = writeBatch(db);
    try {
      const notificationsRef = collection(db, 'notifications');
      const q = query(notificationsRef, where('userId', '==', userId), where('isRead', '==', false));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((docSnap) => {
        batch.update(doc(db, 'notifications', docSnap.id), { isRead: true });
      });
      await batch.commit();
    } catch (error) {
      console.error('Error marking notifications as read:', error);
      throw new Error('Failed to mark notifications as read');
    }
  };
  