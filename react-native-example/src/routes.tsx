import * as React from 'react'
import { RetterAuthStatus } from '@retter/sdk'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import useAuth from './hooks/useAuth'
import HOmeScreen from './screens/home'
import SignUpScreen from './screens/signUp'
import SendOtpScreen from './screens/sendOtp'
import ProfileScreen from './screens/profile'
import ValidateOtpScreen from './screens/validateOtp'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
    const auth = useAuth()

    return (
        <Stack.Navigator>
            {auth.authStatus === RetterAuthStatus.SIGNED_IN ? (
                <>
                    <Stack.Screen name="Home" component={HOmeScreen} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                </>
            ) : (
                <>
                    <Stack.Screen name="SendOtp" component={SendOtpScreen} />
                    <Stack.Screen name="ValidateOtp" component={ValidateOtpScreen} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                </>
            )}
        </Stack.Navigator>
    )
}

export default StackNavigator
