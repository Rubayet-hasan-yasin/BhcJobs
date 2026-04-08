import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { getIndustryImage } from '../utils/imagePath';

interface Industry {
  id: number;
  name: string;
  image: string;
  jobs_count?: number;
}

interface Props {
  industry: Industry;
  index?: number;
}

export const IndustryCard: React.FC<Props> = ({ industry }) => {
  return (
    <TouchableOpacity 
      style={{ width: 104, marginRight: 20, alignItems: 'center' }}
      activeOpacity={0.7}
    >
      <View 
        style={{ 
          width: 80, 
          height: 80, 
          backgroundColor: '#eef2ff', 
          borderRadius: 24, 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginBottom: 12,
          borderWidth: 1,
          borderColor: '#e0e7ff',
        }}
      >
        <Image 
          source={{ uri: getIndustryImage(industry.image) }} 
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
        {industry.jobs_count !== undefined && (
          <View style={{
            position: 'absolute',
            top: -6,
            right: -6,
            backgroundColor: '#2563eb',
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 12,
            borderWidth: 1.5,
            borderColor: '#ffffff',
            minWidth: 20,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
             <Text style={{ fontSize: 10, color: 'white', fontWeight: 'bold' }}>
               {industry.jobs_count > 99 ? '99+' : industry.jobs_count}
             </Text>
          </View>
        )}
      </View>
      <Text 
        style={{ width: '100%', fontSize: 13, fontWeight: '600', color: '#1f2937', textAlign: 'center', flexShrink: 1 }} 
        numberOfLines={2}
      >
        {industry.name}
      </Text>
    </TouchableOpacity>
  );
};
