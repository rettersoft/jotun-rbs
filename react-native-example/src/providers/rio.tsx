import * as React from 'react'
import Rio, { RetterRegion } from '@retter/sdk'

const rio = Rio.getInstance({
    projectId: 'vqk2n6tud',
    region: RetterRegion.euWest1,
})

export const RioContext = React.createContext<Rio>(rio)

export const RioProvider: React.FC = ({ children }) => {
    return <RioContext.Provider value={rio}>{children}</RioContext.Provider>
}
