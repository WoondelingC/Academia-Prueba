import React from 'react'
import {Provider} from 'react-redux'
import {store} from '../store/store'
import AppRouter from '../routers/AppRouter'

const TaskApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}

export default TaskApp