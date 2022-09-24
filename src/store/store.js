import { configureStore, createSlice } from '@reduxjs/toolkit'

const store = createSlice({
  name: 'store',
  initialState: {
    title: '',
    content: '',
    currentTab: null,
    analysisSteps: [
      {
        title: 'Analysis started',
        completed: false,
      },
      {
        title: 'Select title',
        completed: false,
      },
      {
        title: 'Select description',
        completed: false,
      },
      {
        title: 'AI analysis',
        completed: false,
      },
      {
        title: 'Results',
        completed: false,
      },
    ],
  },
  reducers: {
    SET_NEWS_TITLE(state, action) {
      state.title = action.payload
    },
    SET_NEWS_CONTENT(state, action) {
      state.content = action.payload
    },
    SET_CURRENT_TAB(state, action) {
      state.currentTab = action.payload
    },
    SET_COMPLETED_ANALYSIS_STEPS(state, action) {
      state.analysisSteps = action.payload
    },
    HANDLE_COMPLETE_ANALYSIS_STEP(state, action) {
      let finish = false
      state.analysisSteps = state.analysisSteps.map((step) => {
        const updatedStep = { ...step, completed: true }
        if (step.title === action.payload) {
          finish = true
          return updatedStep
        } else if (!finish) return updatedStep
        return step
      })
      //eslint-disable-next-line
      chrome.storage.local.set({ analysisSteps: state.analysisSteps })
    },
  },
})

const state = configureStore({
  reducer: store.reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export const {
  SET_NEWS_TITLE,
  SET_NEWS_CONTENT,
  SET_CURRENT_TAB,
  SET_COMPLETED_ANALYSIS_STEPS,
  HANDLE_COMPLETE_ANALYSIS_STEP,
} = store.actions

export default state
