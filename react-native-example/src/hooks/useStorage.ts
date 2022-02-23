import * as React from 'react'

import { StorageContext, StorageContextProps } from '../providers/storage'

const useStorage = (): StorageContextProps => {
    const context = React.useContext(StorageContext)

    return context!
}

export default useStorage
