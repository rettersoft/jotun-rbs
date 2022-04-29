import * as React from 'react'
import { Button, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import useRio from '../hooks/useRio'
import useAuth from '../hooks/useAuth'

const HomeScreen = () => {
    const rio = useRio()
    const auth = useAuth()
    const navigation = useNavigation()

    React.useEffect(() => {
        // console.log('methods: ', auth.userObject?.methods)

        ;(async () => {
            const a = await rio.getCloudObject({
                classId: 'Training',
                body: {
                    userId: '5pvqivsot',
                },
            })

            const b = await a.call<any>({
                method: 'getTrainings',
            })
            const id = 'aE5_oGsE' // b.data.items[0].id
            console.log(
                'b: ',
                b.data.items.map((i: any) => ({ id: i.id, status: i.status }))
            )

            const c = await a.call<any>({
                method: 'startTraining',
                body: { id },
            })
            console.log('c', c.data)

            const d = await a.call<any>({
                method: 'nextStep',
                body: { id },
            })
            console.log('d', d.data)
        })()
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
            <Button
                title="Notifications Page"
                onPress={() => {
                    // @ts-ignore
                    navigation.navigate('Notifications')
                }}
            />
            <Text>{JSON.stringify(auth.states, null, 4)}</Text>
        </View>
    )
}

export default HomeScreen
