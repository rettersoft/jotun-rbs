import * as React from 'react'
import { Button, Text, View } from 'react-native'

import useRio from '../hooks/useRio'
import useAuth from '../hooks/useAuth'

const ProfileScreen = () => {
    const rio = useRio()
    const auth = useAuth()

    const [profile, setProfile] = React.useState<any>(null)

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
        </View>
    )
}

export default ProfileScreen
