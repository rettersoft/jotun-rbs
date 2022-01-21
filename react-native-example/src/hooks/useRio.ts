import * as React from 'react'
import Rio from '@retter/sdk'

import { RioContext } from '../providers/rio'

const useRio = (): Rio => {
    const context = React.useContext(RioContext)

    return context
}

export default useRio
