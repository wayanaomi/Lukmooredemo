import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  mobileNavOpen: boolean;
  commandPaletteOpen: boolean;
  activeCurrency: string;
}

const initialState: UiState = {
  mobileNavOpen: false,
  commandPaletteOpen: false,
  activeCurrency: "USD",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMobileNavOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileNavOpen = action.payload;
    },
    setCommandPaletteOpen: (state, action: PayloadAction<boolean>) => {
      state.commandPaletteOpen = action.payload;
    },
    setActiveCurrency: (state, action: PayloadAction<string>) => {
      state.activeCurrency = action.payload;
    },
  },
});

export const { setMobileNavOpen, setCommandPaletteOpen, setActiveCurrency } =
  uiSlice.actions;

export default uiSlice.reducer;
