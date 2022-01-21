import { z } from 'zod'
import * as React from 'react'
import { RetterAuthChangedEvent, RetterAuthStatus, RetterCloudObject } from '@retter/sdk'

import useRio from '../hooks/useRio'

export const SignupInputProfile = z.object({
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string(),
    email: z.string().email().optional(),
    district: z.string().optional(),
    province: z.string().optional(),
    dealer: z.string().optional(),
})

export const SignupInput = z.object({
    signupToken: z.string(),
    profile: SignupInputProfile,
    terms: z.object({
        kvkk: z.boolean(),
        privacy: z.boolean(),
    }),
})

export type SignupInput = z.infer<typeof SignupInput>

export interface AuthContextProps {
    authStatus: RetterAuthStatus
    userObject: RetterCloudObject | null
    sendOtp: (msisdn: string) => Promise<any>
    validateOtp: (otp: string) => Promise<any>
    signUp: (form: SignupInput) => Promise<any>
    profile: () => Promise<any>
    states: {
        role: any
        user: any
        public: any
    }
}

export const AuthContext = React.createContext<AuthContextProps | null>(null)

export const AuthProvider: React.FC = ({ children }) => {
    const rio = useRio()
    const userObject = React.useRef<RetterCloudObject | null>(null)
    const msisdnAuthenticatorObject = React.useRef<RetterCloudObject | null>(null)

    const [roleState, setRoleState] = React.useState<any>({})
    const [userState, setUserState] = React.useState<any>({})
    const [publicState, setPublicState] = React.useState<any>({})

    const [authStatus, setAuthStatus] = React.useState<RetterAuthStatus | null>(null)

    const getUserObject = async (uid: string) => {
        const obj = await rio.getCloudObject({
            classId: 'User',
            instanceId: uid,
        })

        // state listeners
        obj.state?.role?.subscribe(setRoleState)
        obj.state?.user?.subscribe(setUserState)
        obj.state?.public?.subscribe(setPublicState)

        return obj
    }

    const getMsisdnAuthenticator = async (msisdn: string) => {
        return await rio.getCloudObject({
            classId: 'MsisdnAuthenticator',
            body: {
                msisdn,
            },
        })
    }

    React.useEffect(() => {
        rio.authStatus.subscribe(async ({ authStatus, uid }: RetterAuthChangedEvent) => {
            console.log('uid', uid)
            console.log('authStatus', authStatus)
            setAuthStatus(authStatus)
            if (authStatus === RetterAuthStatus.SIGNED_IN) {
                userObject.current = await getUserObject(uid!)
                msisdnAuthenticatorObject.current = null
            } else {
                userObject.current = null
            }
        })
    }, [])

    const sendOtp = async (msisdn: string): Promise<any> => {
        msisdnAuthenticatorObject.current = await getMsisdnAuthenticator(msisdn)
        console.log('instanceId: ', msisdnAuthenticatorObject.current?.instanceId)

        return await msisdnAuthenticatorObject.current?.call({
            method: 'sendOtp',
            body: {
                captcha: 'any', // not implemented
                msisdn,
            },
        })
    }

    const validateOtp = async (otp: string): Promise<any> => {
        return await msisdnAuthenticatorObject.current?.call({
            method: 'validateOtp',
            body: {
                captcha: 'any', // not implemented
                otp,
            },
        })
    }

    const signUp = async (form: SignupInput): Promise<any> => {
        return await msisdnAuthenticatorObject.current?.call({
            method: 'signup',
            body: { ...form },
        })
    }

    const profile = async (): Promise<any> => {
        return (
            await userObject.current?.call({
                method: 'profile',
            })
        )?.data
    }

    if (authStatus === null) return null

    return (
        <AuthContext.Provider
            value={{
                authStatus,
                userObject: userObject.current,
                sendOtp,
                validateOtp,
                signUp,
                profile,
                states: {
                    role: roleState,
                    user: userState,
                    public: publicState,
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
