import * as React from 'react'
import { Button, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import useAuth from '../hooks/useAuth'

const HomeScreen = () => {
    const auth = useAuth()
    const navigation = useNavigation()

    React.useEffect(() => {
        console.log('methods: ', auth.userObject?.methods)
    }, [])

    return (
        <View>
            <Button
                title="Profile Page"
                onPress={() => {
                    // @ts-ignore
                    navigation.navigate('Profile')
                }}
            />
            <Text>{JSON.stringify(auth.states, null, 4)}</Text>
        </View>
    )
}

export default HomeScreen
