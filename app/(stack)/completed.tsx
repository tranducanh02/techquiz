import {
	SafeAreaView,
	Text,
	Pressable,
	View,
	ImageBackground,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { saveScore } from "../../lib/util";
import { useAuth } from "../../lib/AuthProvider";

export default function CompletedScreen() {
	const { score } = useLocalSearchParams();
	const { session } = useAuth();
	const router = useRouter();

	const storeScore = useCallback(() => {
		saveScore({ userScore: Number(score), userID: session?.user.id });
	}, []);

	useEffect(() => {
		storeScore();
	}, [storeScore]);

	return (
        <View className='flex flex-1 bg-orange-400'>
            <ImageBackground
                source={{
                    uri: 'https://images.unsplash.com/photo-1595789412965-8a2d37e7cfe5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                }}
                className='flex-1 p-4'
            >
                <SafeAreaView />
                <Pressable onPress={() => router.replace('/(tabs)/')}>
                    <MaterialIcons name='cancel' size={60} color='white' />
                </Pressable>

                <View className='flex-1 flex items-center justify-center'>
                    <View className='bg-orange-50 w-full py-[50px] rounded-xl p-4 flex items-center justify-center shadow-lg shadow-orange-500'>
                        <Text className='text-3xl text-orange-600 font-bold mb-4'>
                            {Number(score) > 10 ? 'Congratulations🥳' : 'Sorry! You lose 🥲'}
                        </Text>
                        <Text className='font-bold text-xl'>You scored {score}!</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}