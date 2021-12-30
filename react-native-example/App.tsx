import { NavigationContainer } from '@react-navigation/native'

import StackNavigator from './src/routes'
import { RbsProvider } from './src/providers/rbs'
import { AuthProvider } from './src/providers/auth'

export default function App() {
    return (
        <RbsProvider>
            <AuthProvider>
                <NavigationContainer>
                    <StackNavigator />
                </NavigationContainer>
            </AuthProvider>
        </RbsProvider>
    )
}
