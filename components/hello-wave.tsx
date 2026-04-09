import Animated from 'react-native-reanimated';

import { fontSize, lineHeight, v } from '@/constants/sizing';

export function HelloWave() {
  return (
    <Animated.Text
      style={{
        fontSize: fontSize.title1,
        lineHeight: lineHeight.title,
        marginTop: -v(6),
        animationName: {
          '50%': { transform: [{ rotate: '25deg' }] },
        },
        animationIterationCount: 4,
        animationDuration: '300ms',
      }}>
      👋
    </Animated.Text>
  );
}
