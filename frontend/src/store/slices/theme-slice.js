export const createThemeSlice = (set) => (
    {
        theme: 'rgb(60, 60, 60,0.7)',
        mode: 'dark',
        setMode: (mode) => set({ mode }),
        setTheme: (theme) => set({ theme })
    }
)