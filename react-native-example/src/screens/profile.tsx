import * as React from 'react'
import { Button, Text, View } from 'react-native'

import useRbs from '../hooks/useRbs'
import useAuth from '../hooks/useAuth'

const ProfileScreen = () => {
    const rbs = useRbs()
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
                    rbs.signOut()
                }}
            />
            <Text>{JSON.stringify(profile)}</Text>
        </View>
    )
}

export default ProfileScreen
