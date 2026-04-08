import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { getCompanyImage } from '../utils/imagePath';

interface Company {
  id: number;
  name: string;
  image?: string;
  logo?: string;
  jobs_count?: number;
}

interface Props {
  company: Company;
  index?: number;
}

export const CompanyCard: React.FC<Props> = ({ company }) => {
  const imageUrl = company.image || company.logo;
  return (
    <TouchableOpacity 
      style={{ 
        width: 240, 
        flexDirection: 'row',
        backgroundColor: '#ffffff', 
        padding: 16, 
        borderRadius: 20, 
        borderWidth: 1, 
        borderColor: '#f3f4f6', 
        marginRight: 16, 
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
      }}
      activeOpacity={0.7}
    >
      <View 
        style={{ 
          width: 52, 
          height: 52, 
          backgroundColor: '#f9fafb', 
          borderRadius: 26, 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginRight: 14, 
          borderWidth: 1, 
          borderColor: '#e5e7eb', 
          overflow: 'hidden' 
        }}
      >
        {imageUrl ? (
          <Image 
            source={{ uri: getCompanyImage(imageUrl) }} 
            style={{ width: 34, height: 34, borderRadius: 17 }}
            resizeMode="contain"
          />
        ) : (
          <View style={{ width: 34, height: 34, backgroundColor: '#e5e7eb', borderRadius: 17 }} />
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Text 
          style={{ fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 4 }} 
          numberOfLines={1}
        >
          {company.name}
        </Text>
        <Text 
          style={{ fontSize: 13, fontWeight: '500', color: '#6b7280' }} 
          numberOfLines={1}
        >
          {company.jobs_count || 0} Available Jobs
        </Text>
      </View>
    </TouchableOpacity>
  );
};
