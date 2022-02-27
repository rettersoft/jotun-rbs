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
            lastName: 'Doe ' + Math.floor(Math.random() * 100),
            phoneNumber: '905346332511',
        })

        auth.profile().then(setProfile)
    }

    const uploadImage = async () => {
        try {
            const { url, mimeType } = await store('base64image')
        } catch (error) {}
    }

    const upsertAddress = async () => {
        await auth.userObject?.call({
            method: 'upsertAddress',
            body: {
                city: 'city',
                district: 'district',
                building: 'building',
                doorNumber: 'doorNumber',
            },
        })
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

            <Text style={{ marginTop: 15 }}>Adresler</Text>
            {auth.states.user?.addresses?.map((r: any) => (
                <View key={r.id} style={{ borderWidth: 1, marginTop: 5, padding: 5 }}>
                    <Text key={r.id}>{JSON.stringify(r, null, 2)}</Text>
                    <Button
                        title="Update Address"
                        onPress={async () => {
                            await auth.userObject?.call({
                                method: 'upsertAddress',
                                body: {
                                    id: r.id,
                                    city: 'city ' + Math.floor(Math.random() * 100),
                                    district: 'district',
                                    building: 'building',
                                    doorNumber: 'doorNumber',
                                },
                            })
                        }}
                    />
                    <Button
                        title="RemoveAddress"
                        onPress={async () => {
                            await auth.userObject?.call({
                                method: 'deleteAddress',
                                body: { id: r.id },
                            })
                        }}
                    />
                </View>
            ))}

            <Button title="Update" onPress={updateProfile} />
            <Button title="Insert Address" onPress={upsertAddress} />
        </View>
    )
}

export default ProfileScreen
