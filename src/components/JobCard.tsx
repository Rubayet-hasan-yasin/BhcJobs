import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { getCompanyImage } from '../utils/imagePath';

interface Job {
  id: number;
  job_title: string;
  company_name: string;
  currency: string;
  min_salary: number;
  max_salary: number;
  type: string;
  expiry: string;
  food_amount?: number;
  food_option?: string;
  company?: {
    image?: string;
  };
  country?: {
    name: string;
  };
}

interface Props {
  job: Job;
  index?: number;
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  const day = date.getDate();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const JobCard: React.FC<Props> = ({ job, index = 0 }) => {
  const companyLogo = job.company?.image;
  const BDT_CONVERSION_RATE = 33; // Approx rate

  return (
    <AnimatedTouchableOpacity 
      entering={FadeInUp.delay(Math.min(index, 8) * 100).springify().damping(12)}
      className="bg-white p-5 rounded-3xl shadow-sm border border-gray-200 mb-4"
      activeOpacity={0.8}
    >
      {/* Header: Title, Logo, and Favorite Icon */}
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-row flex-1">
          {/* Company Logo */}
          <View className="w-14 h-14 bg-gray-50 rounded-2xl items-center justify-center border border-gray-100 mr-4 overflow-hidden">
            {companyLogo ? (
              <Image 
                source={{ uri: getCompanyImage(companyLogo) }} 
                className="w-10 h-10 rounded-xl"
                resizeMode="contain"
              />
            ) : (
              <Ionicons name="business" size={24} color="#d1d5db" />
            )}
          </View>
          
          <View className="flex-1 justify-center">
            <Text className="text-lg font-bold text-gray-900 mb-1" numberOfLines={1}>
              {job.job_title}
            </Text>
            <Text className="text-sm text-gray-500 font-medium">{job.company_name}</Text>
          </View>
        </View>

        {/* Favorite Icon */}
        <TouchableOpacity className="ml-2 pt-1 px-1">
          <Ionicons name="star-outline" size={22} color="#f59e0b" />
        </TouchableOpacity>
      </View>
      
      {/* Pay Details */}
      <View className="mb-4 gap-1.5">
        <View className="flex-row items-center">
          <Ionicons name="wallet-outline" size={16} color="#4f46e5" />
          <Text className="text-sm font-semibold text-gray-700 ml-2">
            Salary: <Text className="font-bold text-gray-900">
              {job.currency} {job.min_salary} {job.max_salary ? `- ${job.max_salary}` : ''} {job.currency === 'SAR' ? `(BDT ${job.min_salary * BDT_CONVERSION_RATE} approx.)` : ''}
            </Text>
          </Text>
        </View>
        {job.food_amount !== null && job.food_amount !== undefined && (
          <View className="flex-row items-center">
             <Ionicons name="restaurant-outline" size={16} color="#16a34a" />
             <Text className="text-sm font-medium text-gray-600 ml-2">
               Food Allowance: <Text className="font-semibold text-gray-800">
                 {job.currency} {job.food_amount} {job.currency === 'SAR' ? `(BDT ${job.food_amount * BDT_CONVERSION_RATE} approx.)` : ''}
               </Text>
             </Text>
          </View>
        )}
      </View>

      {/* Location Badges */}
      <View className="flex-row flex-wrap gap-2 mb-4">
        {job.type && (
          <View className="bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
            <Text className="text-[11px] font-bold text-blue-700 tracking-wide uppercase">{job.type}</Text>
          </View>
        )}
        {job.country?.name && (
          <View className="bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
            <Text className="text-[11px] font-bold text-emerald-700 tracking-wide uppercase">{job.country.name}</Text>
          </View>
        )}
      </View>

      {/* Divider */}
      <View className="h-[1px] bg-gray-100 mb-3" />

      {/* Footer: Timeline & Buttons */}
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">Application Deadline</Text>
          <Text className="text-xs font-semibold text-red-500">{formatDate(job.expiry)}</Text>
        </View>

        <View className="flex-row gap-2">
          <TouchableOpacity className="bg-indigo-50 px-4 py-2 rounded-xl">
            <Text className="text-indigo-600 text-xs font-bold">View</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-indigo-600 px-4 py-2 rounded-xl shadow-sm shadow-indigo-200">
            <Text className="text-white text-xs font-bold">Apply Now</Text>
          </TouchableOpacity>
        </View>
      </View>

    </AnimatedTouchableOpacity>
  );
};
