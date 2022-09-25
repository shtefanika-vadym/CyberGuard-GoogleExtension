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
    result: null,
    recentActivity: [],
  },
  reducers: {
    SET_RECENT_ACTIVITY(state, action) {
      state.recentActivity = action.payload
    },
    FILTER_RECENT_ACTIVITY(state, action) {
      state.recentActivity = state.recentActivity.filter(
        (activity) => activity.id !== action.payload.id,
      )
      // eslint-disable-next-line
      chrome.storage.local.set({ recentActivity: state.recentActivity })
    },
    UPDATE_RECENT_ACTIVITY(state, action) {
      console.log('add new recent activity')
      const existSameNews = state.recentActivity.some(
        (activity) => activity.id === activity.payload.id,
      )
      if (!existSameNews) {
        state.recentActivity = [...state.recentActivity, action.payload]
        // eslint-disable-next-line
        chrome.storage.local.set({ recentActivity: state.recentActivity })
      }
    },
    SET_NEWS_RESULT(state, action) {
      state.result = action.payload
      // eslint-disable-next-line
      chrome.storage.local.set({ newsData: state.result })
    },
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
    RESET_CURRENT_RESULT(state) {
      state.title = ''
      state.content = ''
      state.newsData = null
      state.analysisSteps = state.analysisSteps.map((step) => ({ ...step, completed: false }))
      // eslint-disable-next-line
      chrome.storage.local.remove(['analysisSteps', 'title', 'content', 'newsData'])
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
  SET_NEWS_RESULT,
  SET_RECENT_ACTIVITY,
  RESET_CURRENT_RESULT,
  UPDATE_RECENT_ACTIVITY,
  FILTER_RECENT_ACTIVITY,
  SET_COMPLETED_ANALYSIS_STEPS,
  HANDLE_COMPLETE_ANALYSIS_STEP,
} = store.actions

export default state
