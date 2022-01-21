import { NavigationContainer } from '@react-navigation/native'

import StackNavigator from './src/routes'
import { RioProvider } from './src/providers/rio'
import { AuthProvider } from './src/providers/auth'

export default function App() {
    return (
        <RioProvider>
            <AuthProvider>
                <NavigationContainer>
                    <StackNavigator />
                </NavigationContainer>
            </AuthProvider>
        </RioProvider>
    )
}
