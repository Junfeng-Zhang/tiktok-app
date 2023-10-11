import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { RandomUsers } from '../types';
import useGetRandomUsers from '../hooks/useGetRandomUsers';

interface GeneralStore {
  isLoginOpen: boolean,
  isEditProfileOpen: boolean,
  randomUsers: RandomUsers[]
  setIsLoginOpen: (val: boolean) => void,
  setIsEditProfileOpen: (val: boolean) => void,
  setRandomUsers: () => void,
}

export const useGeneralStore = create<GeneralStore>()(
  devtools( // 做数据持久化
    persist(
      (set) => ({
        isLoginOpen: false,
        isEditProfileOpen: false,
        randomUsers: [],

        setIsLoginOpen: (val: boolean) => set({ isLoginOpen: val }),
        setIsEditProfileOpen: (val: boolean) => set({ isEditProfileOpen: val }),
        setRandomUsers: async () => {
          const result = await useGetRandomUsers()
          set({ randomUsers: result })
        },
      }),
      {
        name: 'store',
        // 我们没有显示任何身份验证信息，例如会话所需的所有内容。因为它实际上是在会话中，而不是在 localStorage 中
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
)
