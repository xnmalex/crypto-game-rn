import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons';

type AvatarProps = {
  username?: string
  size?: number
  iconName?: string
  style?: object
  image_uri: string
}

export const Avatar = ({ username, size = 96, iconName = 'person', style = {}, image_uri }: AvatarProps) => {
  const [error, setError] = useState(false)

  const containerSize = {
    width: size,
    height: size,
    borderRadius: size / 2,
  }

  return (
    <View style={[styles.container, containerSize, style]}>
      {error ? (
        <Ionicons name={iconName} size={size * 0.6} color="#999" />
      ) : (
        <Image
          source={{
            uri: image_uri,
          }}
          onError={() => setError(true)}
          style={[styles.image, containerSize]}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
  },
})
