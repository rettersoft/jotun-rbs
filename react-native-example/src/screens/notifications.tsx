import * as React from 'react'
import { Button, Text, View } from 'react-native'

import useRio from '../hooks/useRio'

const NotificationScreen = () => {
    const rio = useRio()
    const notificationObj = React.useRef<any>(null)
    const [notifications, setNotifications] = React.useState<any>(null)

    const getNotificationObject = async () => {
        notificationObj.current = await rio.getCloudObject({
            classId: 'Notification',
        })
        // console.log('notificationObj', notificationObj.current.instanceId)
        notificationObj.current.state.public.subscribe((s: any) => setNotifications(s.notifications))
    }

    const setPushToken = async () => {
        try {
            await notificationObj.current.call({
                method: 'setPushToken',
                body: {
                    platform: 'ios',
                    deviceId: 'b',
                    pushToken: '123456789',
                },
            })
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getNotificationObject()
    }, [])

    return (
        <View>
            <Text>{JSON.stringify(notifications)}</Text>

            <Button title="Set Push Token" onPress={setPushToken} />
        </View>
    )
}

export default NotificationScreen
