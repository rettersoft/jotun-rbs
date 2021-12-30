import * as React from 'react'
import { Button, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import useAuth from '../hooks/useAuth'

const SendOtpScreen = () => {
    const auth = useAuth()
    const navigation = useNavigation()

    const [msisdn] = React.useState('905346332511')

    const sendOtp = React.useCallback(async () => {
        try {
            const { data } = await auth.sendOtp(msisdn)
            // reponse messages: 429: too_soon_for_another_otp, 200: otp_sent
            console.log(data)
            // @ts-ignore
            navigation.navigate('ValidateOtp')
        } catch (error: any) {
            // too soon for another otp
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message)
            }
        }
    }, [msisdn])

    return (
        <View>
            {/* misdn form */}
            <Button title="Send Otp" onPress={sendOtp} />
        </View>
    )
}

export default SendOtpScreen
