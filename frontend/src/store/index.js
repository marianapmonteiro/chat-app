import { create } from "zustand";
import { createAuthSlice } from "./slices/auth-slice";
import { createThemeSlice } from "./slices/theme-slice";
import { createChatSlice } from "./slices/chat-slice";

export const useAppStore = create()((...a) => ({
    ...createAuthSlice(...a),
    ...createThemeSlice(...a),
    ...createChatSlice(...a)
}))
// export const useThemeStore = create()((...a) => ({
//     ...createThemeSlice(...a)
// }))