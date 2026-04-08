import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { registerUser, verifyPhone } from '../src/api';
import { Button } from '../src/components/Button';
import { Input } from '../src/components/Input';


export default function RegisterScreen() {
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpMode, setIsOtpMode] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{name?: string; phone?: string; password?: string; confirmPassword?: string; otp?: string}>({});

  const handleRegister = async () => {
    const newErrors: any = {};
    if (!name) newErrors.name = 'Full name is required';
    if (!phone) newErrors.phone = 'Phone number is required';
    if (!password) newErrors.password = 'Password is required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await registerUser({ name, phone, password, password_confirmation: confirmPassword });
      
      const otpMessage = response.otp ? `\nYour OTP is: ${response.otp}` : '';
      
      Toast.show({
        type: 'success',
        text1: 'Registration Successful',
        text2: `Please verify your phone number.${otpMessage}`,
      });
      setIsOtpMode(true);
    } catch (error: any) {
      console.error(error);
      const errorMsg = error.response?.data?.message || 'An error occurred during registration';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setErrors({ otp: 'OTP is required' });
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await verifyPhone({ phone, otp });
      
      if (response.success || response.message) {
         Toast.show({
           type: 'success',
           text1: 'Phone number verified successfully!',
           onHide: () => router.replace('/login')
         });
      } else {
         Toast.show({
           type: 'error',
           text1: 'Verification Failed',
           text2: 'Invalid OTP or some error occurred'
         });
      }
    } catch (error: any) {
      console.error(error);
      const errorMsg = error.response?.data?.message || 'Invalid OTP';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMsg,
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
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} showsVerticalScrollIndicator={false} bounces={false}>
            {/* Header Content with solid colored background */}
            <View className="bg-indigo-600 pt-10 pb-20 px-6 rounded-b-[40px] items-center shadow-lg shadow-indigo-900/20">
              <Animated.View entering={FadeInDown.delay(100).springify()} className="items-center w-full">
                <View className="bg-white w-20 h-20 rounded-[28px] items-center justify-center mb-6 shadow-xl shadow-indigo-900/30">
                  <Ionicons name={isOtpMode ? "shield-checkmark" : "person-add"} size={36} color="#4f46e5" />
                </View>
                <Text className="text-4xl font-extrabold text-white mb-2 tracking-tight text-center w-full">
                  {isOtpMode ? 'Verify Phone' : 'Create Account'}
                </Text>
                <Text className="text-indigo-100 text-base text-center font-medium px-4 w-full">
                  {isOtpMode ? 'Enter the OTP sent to your phone.' : 'Join us and jumpstart your career.'}
                </Text>
              </Animated.View>
            </View>

            {/* Input Card */}
            <View className="px-6 -mt-12 flex-1">
              <Animated.View 
                entering={FadeInDown.delay(200).springify().damping(12)} 
                className="bg-white p-7 rounded-[32px] shadow-xl shadow-indigo-200/50 border border-gray-100 mb-6"
              >
                {!isOtpMode ? (
                  <>
                    <Input
                      label="Full Name"
                      placeholder="Enter your name"
                      icon="person-outline"
                      value={name}
                      onChangeText={(text) => {
                        setName(text);
                        if (errors.name) setErrors({...errors, name: undefined});
                      }}
                      error={errors.name}
                    />

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
                      placeholder="Create a password"
                      secureTextEntry
                      icon="lock-closed-outline"
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);
                        if (errors.password) setErrors({...errors, password: undefined});
                      }}
                      error={errors.password}
                    />

                    <Input
                      label="Confirm Password"
                      placeholder="Confirm your password"
                      secureTextEntry
                      icon="checkmark-circle-outline"
                      value={confirmPassword}
                      onChangeText={(text) => {
                        setConfirmPassword(text);
                        if (errors.confirmPassword) setErrors({...errors, confirmPassword: undefined});
                      }}
                      error={errors.confirmPassword}
                    />

                    <View className="mt-8">
                      <Button 
                        title="Sign Up Now" 
                        onPress={handleRegister} 
                        loading={loading}
                        disabled={loading}
                        className="w-full h-14 shadow-lg shadow-indigo-300"
                      />
                    </View>
                    
                    <View className="flex-row justify-center mt-8 mb-2">
                      <Text className="text-gray-500 font-medium text-base">Already have an account? </Text>
                      <Text 
                        className="text-indigo-600 font-extrabold text-base"
                        onPress={() => router.push('/login')}
                      >
                        Sign In
                      </Text>
                    </View>
                  </>
                ) : (
                  <>
                    <Input
                      label="Enter OTP"
                      placeholder="123456"
                      keyboardType="number-pad"
                      icon="key-outline"
                      value={otp}
                      onChangeText={(text) => {
                        setOtp(text);
                        if (errors.otp) setErrors({...errors, otp: undefined});
                      }}
                      error={errors.otp}
                      className="mb-8"
                    />

                    <Button 
                      title="Verify & Continue" 
                      onPress={handleVerifyOtp} 
                      loading={loading}
                      disabled={loading}
                      className="w-full h-14 shadow-lg shadow-indigo-300 mb-6"
                    />

                    <TouchableOpacity onPress={() => setIsOtpMode(false)} className="items-center">
                      <Text className="text-gray-500 font-medium">Changed your mind? <Text className="text-indigo-600 font-bold">Go Back</Text></Text>
                    </TouchableOpacity>
                  </>
                )}
              </Animated.View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
