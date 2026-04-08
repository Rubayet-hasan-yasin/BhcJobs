import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { loginUser } from '../src/api';
import { Button } from '../src/components/Button';
import { Input } from '../src/components/Input';
import { useAuth } from '../src/context/AuthContext';


export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{phone?: string; password?: string}>({});

  const handleLogin = async () => {
    const newErrors: any = {};
    if (!phone) newErrors.phone = 'Phone number is required';
    if (!password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await loginUser({ phone, password });
      
      if (response.success || response.token || response.user || response.data) {
        Toast.show({
          type: 'success',
          text1: 'Login Successful\uD83C\uDF89',
          text2: 'Welcome back to BhcJobs',
        });
        login({ token: response.token || 'app-token', user: response.user || response.data || { phone } });
        router.replace('/');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: response.message || 'Invalid credentials',
        });
      }
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.message || 'An error occurred during login',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#f8fafc]">
      <SafeAreaView className="flex-1" edges={['top']}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView 
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {/* Header Content with solid colored background */}
            <View className="bg-indigo-600 pt-10 pb-20 px-6 rounded-b-[40px] items-center shadow-lg shadow-indigo-900/20">
              <Animated.View entering={FadeInDown.delay(100).springify()} className="items-center w-full">
                <View className="bg-white w-24 h-24 rounded-[32px] items-center justify-center mb-6 shadow-xl shadow-indigo-900/30">
                  <Ionicons name="briefcase" size={42} color="#4f46e5" />
                </View>
                <Text className="text-4xl font-extrabold text-white mb-2 tracking-tight text-center w-full">Welcome Back</Text>
                <Text className="text-indigo-100 text-base text-center font-medium px-4 w-full">Sign in to discover exclusive opportunities.</Text>
              </Animated.View>
            </View>

            {/* Input Card */}
            <View className="px-6 -mt-12 flex-1">
              <Animated.View 
                entering={FadeInDown.delay(200).springify().damping(12)} 
                className="bg-white p-7 rounded-[32px] shadow-xl shadow-indigo-200/50 border border-gray-100 mb-6"
              >
                <Input
                  label="Phone Number"
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                  icon="call-outline"
                  value={phone}
                  onChangeText={(text) => {
                    setPhone(text);
                    if (errors.phone) setErrors({...errors, phone: undefined});
                  }}
                  error={errors.phone}
                  autoCapitalize="none"
                />

                <Input
                  label="Password"
                  placeholder="Enter password"
                  secureTextEntry
                  icon="lock-closed-outline"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errors.password) setErrors({...errors, password: undefined});
                  }}
                  error={errors.password}
                />

                <View className="flex-row justify-end mb-8 mt-2 w-full">
                  <TouchableOpacity>
                    <Text className="text-indigo-600 font-bold text-sm">Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                <Button 
                  title="Log In to Account" 
                  onPress={handleLogin} 
                  loading={loading}
                  disabled={loading}
                  className="w-full mt-2 h-14 shadow-lg shadow-indigo-300"
                />
                
                <View className="flex-row justify-center mt-8 mb-2 w-full">
                  <Text className="text-gray-500 font-medium text-base">New to BhcJobs? </Text>
                  <Text 
                    className="text-indigo-600 font-extrabold text-base"
                    onPress={() => router.push('/register')}
                  >
                    Create Account
                  </Text>
                </View>
              </Animated.View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
