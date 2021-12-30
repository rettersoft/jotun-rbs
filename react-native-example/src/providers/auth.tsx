import { z } from 'zod'
import * as React from 'react'
import { RBSAuthChangedEvent, RBSAuthStatus, RBSCloudObject } from '@rettersoft/rbs-sdk'

import useRbs from '../hooks/useRbs'

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
    authStatus: RBSAuthStatus
    userObject: RBSCloudObject | null
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
    const rbs = useRbs()
    const userObject = React.useRef<RBSCloudObject | null>(null)
    const msisdnAuthenticatorObject = React.useRef<RBSCloudObject | null>(null)

    const [roleState, setRoleState] = React.useState<any>({})
    const [userState, setUserState] = React.useState<any>({})
    const [publicState, setPublicState] = React.useState<any>({})

    const [authStatus, setAuthStatus] = React.useState<RBSAuthStatus | null>(null)

    const getUserObject = async (uid: string) => {
        const obj = await rbs.getCloudObject({
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
        return await rbs.getCloudObject({
            classId: 'MsisdnAuthenticator',
            payload: {
                msisdn,
            },
        })
    }

    React.useEffect(() => {
        rbs.authStatus.subscribe(async ({ authStatus, uid }: RBSAuthChangedEvent) => {
            console.log('uid', uid)
            console.log('authStatus', authStatus)
            setAuthStatus(authStatus)
            if (authStatus === RBSAuthStatus.SIGNED_IN) {
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
            payload: {
                captcha: 'any', // not implemented
                msisdn,
            },
        })
    }

    const validateOtp = async (otp: string): Promise<any> => {
        return await msisdnAuthenticatorObject.current?.call({
            method: 'validateOtp',
            payload: {
                captcha: 'any', // not implemented
                otp,
            },
        })
    }

    const signUp = async (form: SignupInput): Promise<any> => {
        return await msisdnAuthenticatorObject.current?.call({
            method: 'signup',
            payload: { ...form },
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
