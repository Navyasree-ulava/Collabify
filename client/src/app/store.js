import { configureStore } from '@reduxjs/toolkit'
import workspaceReducer from '../features/workspaceSlice'
import themeReducer from '../features/themeSlice'
import searchReducer from '../features/searchSlice'

export const store = configureStore({
    reducer: {
        workspace: workspaceReducer,
        theme: themeReducer,
        search: searchReducer,
    },
})