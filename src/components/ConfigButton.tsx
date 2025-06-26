import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native'

// Define valid types
export const ButtonType = {
  DEFAULT: 'confirm',
  LOGOUT: 'logout',
} as const

export type ButtonType = typeof ButtonType[keyof typeof ButtonType]

export const BUTTON_PRESETS: Record<ButtonType, { backgroundColor: string; text: string }> = {
  [ButtonType.DEFAULT]: {
    backgroundColor: '#111', //#0569FF blue
    text: 'Confirm Trade',
  },
  [ButtonType.LOGOUT]: {
    backgroundColor: '#FF3B30',
    text: 'Logout',
  },
}

type ConfigurableButtonProps = {
  type?: ButtonType
  onPress: (event: GestureResponderEvent) => void
  title?: string
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

export const ConfigButton = ({
  type = 'confirm',
  onPress,
  disabled = false,
  title,
  style,
  textStyle,
}: ConfigurableButtonProps) => {
  const preset = BUTTON_PRESETS[type]

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? '#aaa' : preset.backgroundColor },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, textStyle]}>
        {title || preset.text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
})
