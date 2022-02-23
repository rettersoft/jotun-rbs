import { NavigationContainer } from '@react-navigation/native'

import StackNavigator from './src/routes'
import { RioProvider } from './src/providers/rio'
import { AuthProvider } from './src/providers/auth'
import { StorageProvider } from './src/providers/storage'

export default function App() {
    return (
        <RioProvider>
            <AuthProvider>
                <StorageProvider>
                    <NavigationContainer>
                        <StackNavigator />
                    </NavigationContainer>
                </StorageProvider>
            </AuthProvider>
        </RioProvider>
    )
}
