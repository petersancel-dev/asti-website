import { createSlice } from '@reduxjs/toolkit';

interface UIState {
    isMobileMenuOpen: boolean;
    activeDropdown: string | null;
}

const initialState: UIState = {
    isMobileMenuOpen: false,
    activeDropdown: null,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleMobileMenu: (state) => {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },
        openMobileMenu: (state) => {
            state.isMobileMenuOpen = true;
        },
        closeMobileMenu: (state) => {
            state.isMobileMenuOpen = false;
        },
        setActiveDropdown: (state, action) => {
            state.activeDropdown = action.payload;
        },
        clearActiveDropdown: (state) => {
            state.activeDropdown = null;
        },
    },
});

export const {
    toggleMobileMenu,
    openMobileMenu,
    closeMobileMenu,
    setActiveDropdown,
    clearActiveDropdown,
} = uiSlice.actions;

export default uiSlice.reducer;
