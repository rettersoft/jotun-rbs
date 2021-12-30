import * as React from 'react'
import RBS, { RbsRegion } from '@rettersoft/rbs-sdk'

const rbs = RBS.getInstance({
    projectId: '038335f5e09844f29b73607364418ce8',
    region: RbsRegion.euWest1Beta,
})

export const RbsContext = React.createContext<RBS>(rbs)

export const RbsProvider: React.FC = ({ children }) => {
    return <RbsContext.Provider value={rbs}>{children}</RbsContext.Provider>
}
