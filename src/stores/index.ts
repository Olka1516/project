import { defineStore } from 'pinia'
import { reactive, toRefs } from "vue";
import { changeCurrentUserStatus, changeTrainingsCountByClientId, decreaseTrainingsCountForCurrentUserById, isUserSignIn, resetUserPassword, saveCurrentUserDataInState, signInByUserEmailAndPassword, signOutCurrentUser, signUpByUserEmailAndPassword, updateTrainingsCountByClientId } from '../service/firebaseService';

export interface State {
  count: number | undefined;
  name: string | undefined;
  phone: string | undefined;
  role: string | undefined;
  date: Date | undefined;
  email: string | undefined;
  inTrainings: string | undefined;
}

export const useUserStore = defineStore('user', () => {
  const state: State = reactive({
    count: undefined,
    name: undefined,
    phone: undefined,
    role: undefined,
    date: undefined,
    email: undefined,
    inTrainings: undefined
  })

  const decrease = (selectedClient: { id: string; count: number }[]) => {
    selectedClient.forEach(async client => {
      state.count = await decreaseTrainingsCountForCurrentUserById(client.id, client.count)
    });
  }

  const set8 = (selectedClient: {id: string}[]) => {
    selectedClient.forEach(async client => {
      await updateTrainingsCountByClientId(client.id, 8)
    });
  }

  const set12 = (selectedClient: {id: string}[]) => {
    selectedClient.forEach(async client => {
      await updateTrainingsCountByClientId(client.id, 12)
    });
  }

  const changeCount = async (id: string, newCount: number) => {
    await changeTrainingsCountByClientId(id, newCount);
  }

  const signUp = async ({ email, password, name, date, phone }: any) => {
    await signUpByUserEmailAndPassword(email, password, name, date, phone);
  }

  const signIn = async ({ email, password }: any) => {
    await signInByUserEmailAndPassword(email, password);
  }

  const signOutClient = async () => {
    const currentUserSignOut: any = await signOutCurrentUser();
    if (!currentUserSignOut) {
      state.name = undefined;
      state.count = undefined;
      state.phone = undefined;
      state.date = undefined;
      state.email = undefined;
    } else {
      throw new Error("Something went wrong");
    }
  }
  const resetPas = async (userEmail: string) => {
    await resetUserPassword(userEmail)
  }

  const changeUserData = async () => {
    const currentUserData = await saveCurrentUserDataInState()
    state.name = currentUserData.name;
    state.phone = currentUserData.phone;
    state.role = currentUserData.role;
    state.count = currentUserData.count;
    state.inTrainings = currentUserData.inTrainings;
    state.email = currentUserData.email;
    const date = new Date(+currentUserData.date.seconds * 1000);
    state.date = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  const isUserLogIn = async () => {
    return await isUserSignIn();
  }

  const changeStatus = async () => {
    await changeCurrentUserStatus();
  }

  return {
    ...toRefs(state),
    decrease,
    set8,
    set12,
    signUp,
    signIn,
    signOutClient,
    resetPas,
    changeCount,
    changeUserData,
    isUserLogIn,
    changeStatus
  }
});
