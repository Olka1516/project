import { collection, doc, updateDoc, getFirestore, getDocs, setDoc, getDoc } from "firebase/firestore";
import {
  getAuth, setPersistence, browserSessionPersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged
} from "firebase/auth";

export interface Client {
  count: number;
  name: string;
  phone: string;
  role: string;
  date: Date;
  email: string;
  inTrainings: string;
}

export const getClients = async () => {
  const db = getFirestore();
  const data = await getDocs(collection(db, "clients"));
  const clients: Client[] = [];
  data.forEach((client: any) => {
    clients.push(client.data());
  })
  return clients;
}

export const updateTrainingsCountByClientId = async (id: string, trainingsCount: number) => {
  const db = getFirestore();
  const clientsRef = doc(db, "clients", id);
  await updateDoc(clientsRef, {
    count: trainingsCount
  });
}

export const changeTrainingsCountByClientId = async (id: string, newTrainingsCount: number) => {
  const db = getFirestore();
  const clientsRef = doc(db, "clients", id);
  await updateDoc(clientsRef, {
    count: newTrainingsCount
  });
}

export const decreaseTrainingsCountForCurrentUserById = async (id: string, trainingsCount: number) => {
  const db = getFirestore();
  const clientsRef = doc(db, "clients", id);
  await updateDoc(clientsRef, {
    count: trainingsCount > 0 ? --trainingsCount : 0,
    inTrainings: "Not in training"
  });
  return trainingsCount;
}

export const signUpByUserEmailAndPassword = async (email: string, password: string, name: string, date: Date, phone: string) => {
  const auth = getAuth();
  const db = getFirestore();
  await setPersistence(auth, browserSessionPersistence);
  await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "clients", auth.currentUser!.uid), {
    name: name,
    phone: phone,
    date: date,
    count: 0,
    role: "client",
    id: auth.currentUser!.uid,
  })
}

export const signInByUserEmailAndPassword = async (email: string, password: string) => {
  const auth = getAuth();
  const db = getFirestore();
  await setPersistence(auth, browserSessionPersistence);
  const userSignIn = await signInWithEmailAndPassword(auth, email, password);
  const userData = await getDoc(doc(db, "clients", auth.currentUser!.uid));
  return { userSignIn, userData: userData.data() }
}

export const signOutCurrentUser = async () => {
  const auth = getAuth();
  await signOut(auth);
  return auth;
}

export const resetUserPassword = async (userEmail: string): Promise<void> => {
  const auth = getAuth();
  await sendPasswordResetEmail(auth, userEmail)
}

export const saveCurrentUserDataInState = async (): Promise<Client | undefined> => {
  const db = getFirestore();
  const auth = getAuth();
  const currentUserData = await getDoc(doc(db, "clients", auth.currentUser!.uid));
  return currentUserData.data() as Client | undefined
}

export const isUserSignIn = () => {
  const auth = getAuth();
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user: any) => {
      if (!user) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  })
}

export const changeCurrentUserStatus = async () => {
  const db = getFirestore();
  const auth = getAuth();
  const clientsRef = doc(db, "clients", auth.currentUser!.uid);
  await updateDoc(clientsRef, {
    inTrainings: 'In training'
  });
}