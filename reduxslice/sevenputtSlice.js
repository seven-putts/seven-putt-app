import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  currentGame: {
    putts: 0,
    equipments: {
      disc: null,
      basket: null,
      plastic: null,
    },
    round1: [],
    round2: [],
    round3: [],
    mode: "Single Player",
  },
  inGame: false,
  inLobby: false,
  multiplayerOptions: null,
};

export const counterSlice = createSlice({
  name: "sevenPutt",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
    },

    toggleGame: (state) => {
      state.inGame = !state.inGame;
    },

    resetGame: (state) => {
      state.currentGame = {
        putts: 0,
        equipments: {
          disc: null,
          basket: null,
        },
        round1: [],
        round2: [],
        round3: [],
      };
    },

    selectBasket: (state, action) => {
      state.currentGame = {
        ...state.currentGame,
        equipments: {
          ...state.currentGame.equipments,
          basket: action.payload,
        },
      };
    },

    selectDisc: (state, action) => {
      state.currentGame = {
        ...state.currentGame,
        equipments: {
          ...state.currentGame.equipments,
          disc: action.payload,
        },
      };
    },

    addRound: (state, action) => {
      const gets = action.payload.filter((putt) => putt === "success");

      state.currentGame.putts += gets.length;

      if (state.currentGame.round1.length < 4) {
        state.currentGame.round1 = [
          ...state.currentGame.round1,
          action.payload,
        ];
      } else if (state.currentGame.round2.length < 4) {
        state.currentGame.round2 = [
          ...state.currentGame.round2,
          action.payload,
        ];
      } else if (state.currentGame.round3.length < 4) {
        state.currentGame.round3 = [
          ...state.currentGame.round3,
          action.payload,
        ];
      }
    },

    choosePlastic: (state, action) => {
      state.currentGame.equipments.plastic = action.payload;
    },

    changeMode: (state, action) => {
      state.currentGame.mode = action.payload;
    },

    toggleLobby: (state, action) => {
      if (!action.payload || action.payload === {}) {
        state.inLobby = false;
        state.multiplayerOptions = action.payload;
      } else {
        state.inLobby = true;
        state.multiplayerOptions = action.payload;
      }
    },

    goHome: (state) => {
      state.inLobby = !state.inLobby;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  login,
  logout,
  toggleGame,
  resetGame,
  selectBasket,
  selectDisc,
  addRound,
  choosePlastic,
  changeMode,
  toggleLobby,
  goHome,
} = counterSlice.actions;

export default counterSlice.reducer;
