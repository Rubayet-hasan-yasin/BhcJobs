import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  loading, 
  variant = 'primary', 
  className = '', 
  onPress, 
  disabled, 
  ...props 
}) => {
  const baseClasses = "rounded-2xl px-4 flex-row justify-center items-center";
  let variantClasses = "";
  let textClasses = "text-base font-bold";

  switch (variant) {
    case 'primary':
      variantClasses = "bg-indigo-600 shadow-sm shadow-indigo-300";
      textClasses += " text-white";
      break;
    case 'secondary':
      variantClasses = "bg-white shadow-sm shadow-gray-200 border border-gray-100";
      textClasses += " text-indigo-600";
      break;
    case 'outline':
      variantClasses = "border border-indigo-600 bg-transparent";
      textClasses += " text-indigo-600";
      break;
    case 'glass':
      variantClasses = "bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.4)] shadow-none";
      textClasses += " text-white";
      break;
  }

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={isDisabled ? undefined : onPress}
      className={`${baseClasses} ${variantClasses} ${isDisabled ? 'opacity-60' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' || variant === 'glass' ? 'white' : '#4f46e5'} />
      ) : (
        <Text className={textClasses}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
