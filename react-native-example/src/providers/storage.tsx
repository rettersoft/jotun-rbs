import * as React from 'react'
import { RetterCloudObject } from '@retter/sdk'

import useRio from '../hooks/useRio'

export interface StorageContextProps {
    store: (file: string) => Promise<{
        url: string
        mimeType: string
    }>
}

export const StorageContext = React.createContext<StorageContextProps | null>(null)

export const StorageProvider: React.FC = ({ children }) => {
    const rio = useRio()
    const storageObject = React.useRef<RetterCloudObject | null>(null)

    const getStorageObject = async () => {
        storageObject.current = await rio.getCloudObject({
            classId: 'Storage',
        })
    }

    React.useEffect(() => {
        getStorageObject()
    }, [])

    const store = async (file: string) => {
        const response = await storageObject.current?.call({
            method: 'store',
            body: file,
        })

        return response
    }

    return <StorageContext.Provider value={{ store }}>{children}</StorageContext.Provider>
}
