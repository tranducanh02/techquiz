import {
	Text,
	View,
	TextInput,
	ImageBackground,
	Pressable, Alert, ActivityIndicator
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link, useRouter, Redirect } from "expo-router";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/AuthProvider";
import { useState } from "react";
import RegisterScreen from "./register";


export default function LoginScreen() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();
	const { session, loading: validating } = useAuth();


	const handleLogin = async () => {
		if (!email.trim() || !password.trim()) return Alert.alert("Error", "Please fill in all fields");
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({ email, password });
		setLoading(false);
		if (error) return Alert.alert("Error", error.message);
		router.replace("/(tabs)/");	
	};

	if (session) {
		return <Redirect href="/(tabs)/" />
	} else if (validating) {
		return <ActivityIndicator size='large' color='#f97316' />;
	} else {
		return (
            <View className=' flex-1'>
                <ImageBackground
                    className='flex-1 flex items-center justify-center'
                    source={{
                        uri: 'https://i.pinimg.com/564x/26/2d/9a/262d9a608c4edb4d9a268a1c43699bb7.jpg',
                    }}
                >
                    <View className='w-full px-4'>
                        <View className='w-full flex items-center justify-center'>
                            <FontAwesome5
                                name='connectdevelop'
                                size={70}
                                color='white'
                                className='mb-4'
                            />
                            <Text className='text-3xl mb-4 font-bold text-white text-center'>
                                Log in
                            </Text>
                        </View>

                        <Text className='text-lg font-bold text-white'>Email Address</Text>
                        <TextInput
                            className='w-full border-b-[1px] pb-3 pt-2 rounded-md mb-3 text-white'
                            value={email}
                            onChangeText={setEmail}
                        />
                        <Text className='mt-3 font-bold text-lg text-white'>Password</Text>
                        <TextInput
                            className='w-full border-b-[1px] pb-3 pt-2 rounded-md mb-3 text-white'
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                        <Pressable
                            className={`w-full ${
                                loading ? 'bg-orange-200' : 'bg-orange-600'
                            } rounded-xl p-4 mt-6 border-orange-200`}
                            disabled={loading}
                            onPress={() => handleLogin()}
                        >
                            <Text className='text-white text-center font-bold text-xl'>
                                {loading ? 'Authenticating...' : 'Sign in'}
                            </Text>
                        </Pressable>
                        <Text className='text-center mt-4 text-gray-100'>
                            Don't have an account?{' '}
                            <Link href='/register'>
                                <Text className='text-white'>Register</Text>
                            </Link>
                        </Text>
                    </View>
                </ImageBackground>
            </View>
        );
	}
}