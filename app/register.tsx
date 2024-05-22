import { Text, View, TextInput, ImageBackground, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';

export default function RegisterScreen() {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleRegister = async () => {
        if (!email.trim() || !password.trim())
            return Alert.alert('Error', 'Please fill in all fields');
        setLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });
        setLoading(false);
        if (error) return Alert.alert('Error', error.message);
        router.replace('/');
    };

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
                            Register
                        </Text>
                    </View>

                    <Text className='text-lg font-bold text-white'>Email Address</Text>
                    <TextInput
                        className='w-full border-b-[1px] pb-3 pt-2 rounded-md mb-3 text-white'
                        onChangeText={setEmail}
                        value={email}
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
                        } rounded-xl p-4 mt-6 `}
                        disabled={loading}
                        onPress={() => handleRegister()}
                    >
                        <Text className='text-white text-center font-bold text-xl'>
                            {loading ? 'Registering...' : 'Sign up'}
                        </Text>
                    </Pressable>
                    <Text className='text-center mt-4 text-gray-100'>
                        Already have an account?{' '}
                        <Link href='/'>
                            <Text className='text-white'>Sign in</Text>
                        </Link>
                    </Text>
                </View>
            </ImageBackground>
        </View>
    );
}
