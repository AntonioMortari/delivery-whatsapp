import { SafeAreaView } from 'react-native'
import { Loading } from '@/components/loading'
import { Slot } from 'expo-router'
import { StripeProvider } from '@stripe/stripe-react-native';

import {
    useFonts,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold
} from '@expo-google-fonts/inter'

export default function Layout() {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold
    })

    if (!fontsLoaded) {
        return <Loading />
    }

    console.log(process.env.STRIPE_PUBLIC_KEY)

    return (
        <StripeProvider publishableKey={process.env.STRIPE_PUBLIC_KEY || ''}>
            <SafeAreaView className="flex-1 bg-slate-900">
                <Slot></Slot>
            </SafeAreaView>
        </StripeProvider>
    )

}

