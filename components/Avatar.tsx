// components/Avatar.tsx
import React from 'react';
import { Image, Text, View } from 'react-native';

type AvatarProps = {
  uri?: string;           // URL of the avatar image
  name?: string;          // Full name for fallback initials
  size?: number;          // Size in pixels
  className?: string;     // Additional Tailwind classes
};

const getInitials = (name?: string) => {
  if (!name) return '?';
  return name
    .split(' ').slice(0,2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
};

const Avatar: React.FC<AvatarProps> = ({ uri, name, size = 48, className }) => {
  const initials = getInitials(name);
  const sizeStyle = { width: size, height: size, borderRadius: size / 2 };

  return (
    <View
      className={
        'bg-gray-200 items-center justify-center flex' +
        className
      }
      style={sizeStyle}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={sizeStyle}
          className="rounded-full"
        />
      ) : (
        <Text className="text-white" style={{ fontSize: size / 2 }}>
          {initials}
        </Text>
      )}
    </View>
  );
};

export default Avatar;
