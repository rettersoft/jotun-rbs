import * as React from 'react'
import { Button, Text, View } from 'react-native'

import useRio from '../hooks/useRio'
import useAuth from '../hooks/useAuth'
import useStorage from '../hooks/useStorage'

const ProfileScreen = () => {
    const rio = useRio()
    const auth = useAuth()
    const { store } = useStorage()

    const [profile, setProfile] = React.useState<any>(null)

    const updateProfile = async () => {
        await auth.updateProfile({
            firstName: 'John',
            lastName: 'Doe',
            phoneNumber: '905346332511',
        })

        auth.profile().then(setProfile)
    }

    const uploadImage = async () => {
        try {
            const { url, mimeType } = await store('base64image')
        } catch (error) {}
    }

    React.useEffect(() => {
        auth.profile().then(setProfile)
    }, [])

    return (
        <View>
            <Button
                title="Signout"
                onPress={() => {
                    rio.signOut()
                }}
            />
            <Text>{JSON.stringify(profile)}</Text>

            <Button title="Update" onPress={updateProfile} />
        </View>
    )
}

export default ProfileScreen
