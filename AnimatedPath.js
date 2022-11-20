import * as React from 'react';
import {Button, Dimensions, TouchableOpacity, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {interpolatePath, parse} from 'react-native-redash';
import Svg, {G, Path} from 'react-native-svg';
import Txt from './Txt';

const {width, height} = Dimensions.get('window');

const eyeD5 = parse(
  'M103 348C97.5 348 98.5 341 104 336.5C109.5 332 115.5 329.5 125.5 329.5C135.5 329.5 145 334.772 149.5 339.5C154 344.228 152 349.385 147.5 348C143 346.615 142.5 338 125.5 338C108.5 338 108.5 348 103 348Z',
);
const lipD5 = parse(
  'M111 439.5C97 428.767 100 418 111 415C122 412 153 408 208 408C263 408 296 412.5 304.5 415C310.256 416.693 318.5 424 303 438.5C295.481 445.534 256.5 473.5 208 473.5C163.5 473.5 125 450.233 111 439.5Z',
);
const lipD4 = parse(
  'M112 438.5C98 427.767 100.5 416.5 112 416.5C123.5 416.5 153 457 208 457C263 457 297 416.5 304 416.5C310 416.5 318.5 424 303 438.5C295.481 445.534 256.5 473.5 208 473.5C163.5 473.5 126 449.233 112 438.5Z',
);
const eyeD4 = parse(
  'M103 348C98.5 348 98 342.955 104 340.728C110 338.5 115.5 336.5 125.5 336.5C135.5 336.5 141.096 338.455 148.5 340.728C155.904 343 154 350 147.5 348C141 346 134 343 125.5 343C117 343 107.5 348 103 348Z',
);
const lipD3 = parse(
  'M116.5 453.5C101 453.5 101 432.5 112 432.5H208H301.5C318 432.5 320 453.5 298.5 453.5H208H116.5Z',
);
const eyeD3 = parse(
  'M103 348C98.5 348 97.5 340.728 104 340.728L126.5 340.728L148.5 340.728C152.5 340.728 154 348 147.5 348H125.5H103Z',
);
const lipD2 = parse(
  'M121.5 474C113.5 474 110.5 468 112.5 463C114.5 458 153 410 208 410C263 410 296.5 454.5 301 466C304.131 474 291.25 481 286 474C280 466 254.5 430.214 210.5 428.5C166.5 426.786 129.5 474 121.5 474Z',
);
const eyeD2 = parse(
  'M108 361C105.5 358.5 102.5 353.5 104 351.5C105.5 349.5 120.5 342.955 127.5 340.728C134.5 338.5 147.819 337.728 148.819 340.728C149.819 343.728 149 345.5 147.5 346C146 346.5 134.5 351 126.5 354.5C118.5 358 110.5 363.5 108 361Z',
);
const lipD1 = parse(
  'M121.5 474C116.5 474 112 471.5 114 466.5C116 461.5 153 410 208 410C263 410 291 451.5 295.5 463C297.457 468 294.5 474 286 474H208H121.5Z',
);
const eyeD1 = parse(
  'M107.319 339.228C105.819 337.228 105.319 330.228 107.319 329.228C109.319 328.228 120.319 330.728 127.819 332.728C135.319 334.728 147.819 337.728 148.819 340.728C149.819 343.728 146.319 346.728 144.819 347.228C143.319 347.728 134.819 346.728 127.319 345.228C119.819 343.728 108.819 341.228 107.319 339.228Z',
);

const AnimatedPath = () => {
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const progress = useSharedValue(0);
  const animatedProps = useAnimatedProps(() => {
    return {
      d: interpolatePath(
        progress.value,
        [0, 1, 2, 3, 4],
        [lipD1, lipD2, lipD3, lipD4, lipD5],
      ),
    };
  });
  const eyeProps = useAnimatedProps(() => {
    return {
      d: interpolatePath(
        progress.value,
        [0, 1, 2, 3, 4],
        [eyeD1, eyeD2, eyeD3, eyeD4, eyeD5],
      ),
    };
  });

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <Svg
          width={width}
          height={height * 0.8}
          viewBox={`0 0 ${width} ${height}`}
          fill="none">
          <G>
            {/* LIP */}
            <AnimatedPath animatedProps={animatedProps} fill="black" />
            {/* EYE */}
            <AnimatedPath animatedProps={eyeProps} fill="black" />
            <AnimatedPath
              scaleX={-1}
              x={width}
              animatedProps={eyeProps}
              fill="black"
            />
          </G>
        </Svg>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            onPress={() =>
              (progress.value = withTiming(0, {
                duration: 530,
                easing: Easing.bezier(0.27, 0.27, 0.04, 0.99),
              }))
            }
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Txt color="white">1</Txt>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              (progress.value = withTiming(1, {
                duration: 530,
                easing: Easing.bezier(0.27, 0.27, 0.04, 0.99),
              }))
            }
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Txt color="white">2</Txt>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              (progress.value = withTiming(2, {
                duration: 530,
                easing: Easing.bezier(0.27, 0.27, 0.04, 0.99),
              }))
            }
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Txt color="white">3</Txt>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              (progress.value = withTiming(3, {
                duration: 530,
                easing: Easing.bezier(0.27, 0.27, 0.04, 0.99),
              }))
            }
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Txt color="white">4</Txt>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              (progress.value = withTiming(4, {
                duration: 530,
                easing: Easing.bezier(0.27, 0.27, 0.04, 0.99),
              }))
            }
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Txt color="white">5</Txt>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default AnimatedPath;
