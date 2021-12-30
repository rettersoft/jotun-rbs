import * as React from 'react'
import { Button, View } from 'react-native'
import { useRoute } from '@react-navigation/native'

import useRbs from '../hooks/useRbs'
import useAuth from '../hooks/useAuth'
import { SignupInput } from '../providers/auth'

const SignUpScreen = () => {
    const rbs = useRbs()
    const auth = useAuth()
    const route = useRoute<any>()

    const [form] = React.useState<SignupInput>({
        signupToken: route.params.signupToken,
        profile: {
            firstName: 'Semih',
            lastName: 'Ayhan',
            phoneNumber: '905346332511',
            email: 'semih.ayhan@rettermobile.com',
            district: '',
            province: '',
            dealer: '',
        },
        terms: {
            kvkk: true,
            privacy: true,
        },
    })

    const signUp = React.useCallback(async () => {
        try {
            const { data } = await auth.signUp(form)
            console.log(data)
            if (data?.message === 'signup_complete') {
                rbs.authenticateWithCustomToken(data.customToken)
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.validationErrors) {
                // valdiaton error
                alert(JSON.stringify(error.response.data.validationErrors, null, 2))
            } else if (error.response && error.response.data && error.response.data.message) {
                // invalid_signup_token
                alert(error.response.data.message)
            }
        }
    }, [form])

    return (
        <View>
            {/* signup form */}
            <Button title="Sign Up" onPress={signUp} />
        </View>
    )
}

export default SignUpScreen
