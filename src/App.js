import React from 'react'
import Page from './components/Page'
import PlanPage from './components/PlanPage'

const App = () => <Page>{() => <PlanPage />}</Page>

export default App
