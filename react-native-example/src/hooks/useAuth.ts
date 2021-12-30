import * as React from 'react'

import { AuthContext, AuthContextProps } from '../providers/auth'

const useAuth = (): AuthContextProps => {
    const context = React.useContext(AuthContext)

    return context!
}

export default useAuth
