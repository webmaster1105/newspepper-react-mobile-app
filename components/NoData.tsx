import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface NoDataProps {
  message?: string;
  icon?: string;
  className?: string;
}

const NoData: React.FC<NoDataProps> = ({
  message = 'Result Not Found',
  icon = 'info-outline',
  className = '',
}) => {
  return (
    <View className={"flex-1 items-center justify-center p-4 " + className}>
      <MaterialIcons name={icon} size={48} color="#9ca3af" />
      <Text className="text-gray-500 text-base mt-2">{message}</Text>
    </View>
  );
};

export default NoData;
