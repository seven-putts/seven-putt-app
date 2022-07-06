import { configureStore } from '@reduxjs/toolkit'
import sevenPuttReducer from './sevenputtSlice'

export const store = configureStore({
  reducer: {
    sevenPutt: sevenPuttReducer,
  },
})