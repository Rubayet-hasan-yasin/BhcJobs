import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, RefreshControl, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getIndustries, getJobs, getCompanies } from '../src/api';
import { IndustryCard } from '../src/components/IndustryCard';
import { JobCard } from '../src/components/JobCard';
import { CompanyCard } from '../src/components/CompanyCard';
import { Button } from '../src/components/Button';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';


export default function LandingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [industries, setIndustries] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);

  const fetchData = async () => {
    try {
      const [inds, jbs, comps] = await Promise.all([
        getIndustries().catch(() => ({ data: [] })),
        getJobs().catch(() => ({ data: [] })),
        getCompanies().catch(() => ({ data: [] }))
      ]);
      const indsList = Array.isArray(inds) ? inds : (inds?.data || []);
      const jobsList = Array.isArray(jbs) ? jbs : (jbs?.data || []);
      const compsList = Array.isArray(comps) ? comps : (comps?.data || []);

      setIndustries(indsList);
      setJobs(jobsList);
      setCompanies(compsList);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#f8fafc]">
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }
  

  return (
    <View className="flex-1 bg-[#f8fafc]">
      
      <SafeAreaView className="flex-1 flex-col">
        
        <Animated.View entering={FadeInDown.delay(50)} className="flex-row justify-between items-center px-6 pt-4 pb-2 w-full bg-indigo-600">
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3 border border-white/30 text-center">
               <Ionicons name="briefcase" size={20} color="#fff" />
            </View>
            <Text className="text-white text-xl font-bold tracking-wider">BHC JOBS</Text>
          </View>
          <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center border border-white/30">
             <Ionicons name="notifications-outline" size={20} color="#fff" />
             <View className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full border border-indigo-600" />
          </TouchableOpacity>
        </Animated.View>

        <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />}
        >
          {/* Hero Section */}
          <Animated.View entering={FadeInDown.delay(100).springify()} className="px-6 pt-6 pb-4 bg-indigo-600 rounded-b-[40px]">
            <Text className="text-white text-[32px] font-extrabold mb-3 leading-[40px]">
              Find The Job That{'\n'}Fits Your Life
            </Text>
            <Text className="text-indigo-100 text-sm font-medium mb-6 leading-5">
              Discover thousands of opportunities with top companies waiting for you.
            </Text>
            
            {/* Functional Mock Search Component */}
            <View className="bg-white rounded-2xl p-1 mb-8 flex-row items-center shadow-lg shadow-indigo-900/40">
               <View className="flex-row flex-1 items-center px-3">
                 <Ionicons name="search" size={20} color="#9ca3af" />
                 <Text className="text-gray-400 ml-2 flex-1 text-sm">Job title, keyword, or company</Text>
               </View>
               <TouchableOpacity className="bg-indigo-600 px-5 py-3 rounded-xl ml-2">
                 <Text className="text-white font-bold text-sm">Search</Text>
               </TouchableOpacity>
            </View>

            <View className="flex-row gap-4 mb-2">
              <Button 
                title="Sign In" 
                className="flex-1 h-12 py-0" 
                variant="secondary"
                onPress={() => router.push('/login')} 
              />
              <Button 
                title="Register" 
                className="flex-1 h-12 py-0" 
                variant="glass"
                onPress={() => router.push('/register')} 
              />
            </View>
          </Animated.View>

          
          <View className="px-5 mt-4">
            
            {/* Popular Industries */}
            {industries.length > 0 && (
              <View className="mb-10">
                <Text className="text-xl font-extrabold text-gray-900 mb-5 ml-1">Popular Industries</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={industries}
                  keyExtractor={(item: any) => item.id.toString()}
                  renderItem={({ item, index }) => <IndustryCard industry={item} index={index} />}
                  contentContainerStyle={{ paddingLeft: 4, paddingBottom: 16, paddingTop: 5 }}
                />
              </View>
            )}

            {/* Popular Companies */}
            {companies.length > 0 && (
              <View className="mb-10">
                <View className="flex-row justify-between items-end mb-5 mx-1">
                  <Text className="text-xl font-extrabold text-gray-900">Top Companies</Text>
                  <TouchableOpacity className="flex-row items-center">
                    <Text className="text-indigo-600 font-bold text-sm mr-1">View All</Text>
                    <Ionicons name="arrow-forward" size={14} color="#4f46e5" />
                  </TouchableOpacity>
                </View>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={companies}
                  keyExtractor={(item: any) => item.id.toString()}
                  renderItem={({ item, index }) => <CompanyCard company={item} index={index} />}
                  contentContainerStyle={{ paddingLeft: 4, paddingBottom: 16 }}
                />
              </View>
            )}

            {/* Trending Jobs */}
            {jobs.length > 0 && (
              <View className="mb-12">
                <View className="flex-row justify-between items-end mb-5 mx-1">
                  <Text className="text-xl font-extrabold text-gray-900">Trending Jobs</Text>
                  <TouchableOpacity className="flex-row items-center bg-indigo-50 px-3 py-1.5 rounded-full">
                    <Text className="text-indigo-600 font-bold text-sm">See All</Text>
                  </TouchableOpacity>
                </View>
                {jobs.slice(0, 5).map((job: any, index: number) => (
                  <JobCard key={job.id} job={job} index={index} />
                ))}
              </View>
            )}
            
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
