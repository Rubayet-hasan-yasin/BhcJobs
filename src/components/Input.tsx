import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`w-full ${className || 'mb-5'}`}>
      {label && <Text className="mb-2 text-sm font-bold text-gray-900 ml-1">{label}</Text>}
      <View 
        className={`flex-row items-center border rounded-2xl px-4 h-[56px] w-full ${
          error ? 'border-red-400 bg-red-50' : 
          isFocused ? 'border-indigo-500 bg-[#f4f6ff]' : 'border-gray-200 bg-[#f8fafc]'
        }`}
      >
        {icon && (
          <Ionicons 
            name={icon} 
            size={20} 
            color={error ? '#ef4444' : isFocused ? '#4f46e5' : '#6b7280'} 
            style={{ marginRight: 12 }}
          />
        )}
        <TextInput
          className="flex-1 text-base text-gray-900 font-medium h-full w-full"
          placeholderTextColor="#9ca3af"
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus && props.onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur && props.onBlur(e);
          }}
          style={{ paddingVertical: 0, margin: 0, borderWidth: 0 }}
          {...props}
        />
      </View>
      {error && <Text className="mt-1.5 text-xs font-semibold text-red-500 ml-2">{error}</Text>}
    </View>
  );
};
