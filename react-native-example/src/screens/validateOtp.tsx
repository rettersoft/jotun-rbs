import * as React from 'react'
import { Button, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import useRbs from '../hooks/useRbs'
import useAuth from '../hooks/useAuth'

const ValidateOtpScreen = () => {
    const rbs = useRbs()
    const auth = useAuth()
    const navigation = useNavigation()

    const [otp] = React.useState('141414')

    const validateOtp = React.useCallback(async () => {
        try {
            const { data } = await auth.validateOtp(otp)
            console.log(data)
            if (data.message === 'signup_required') {
                // @ts-ignore
                navigation.navigate('SignUp', { signupToken: data.signupToken })
            } else if (data.message === 'auth_success') {
                rbs.authenticateWithCustomToken(data.customToken)
            }
        } catch (error: any) {
            // incorrect_otp
            // try_again_later
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message)
            }
        }
    }, [otp])

    return (
        <View>
            {/* otp form */}
            <Button title="Validate Otp" onPress={validateOtp} />
        </View>
    )
}

export default ValidateOtpScreen
