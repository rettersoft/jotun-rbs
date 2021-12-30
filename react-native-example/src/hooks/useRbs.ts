import * as React from 'react'
import RBS from '@rettersoft/rbs-sdk'

import { RbsContext } from '../providers/rbs'

const useRbs = (): RBS => {
    const context = React.useContext(RbsContext)

    return context
}

export default useRbs
