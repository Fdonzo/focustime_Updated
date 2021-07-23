import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontSizes, paddingSizes, spacings } from '../utils/sizes';
import { color } from '../utils/color';

const minToMilliSec = (min) => {
  return min * 1000 * 60;
};

const formatTime = (time) => {
  return time < 10 ? `0${time}` : time;
};

export const CountDown = ({ minute, isPaused, onProgress, onEnd }) => {
  const interval = useRef(null);

  const [millis, setMillis] = useState(minToMilliSec(minute));

  const countDown = () => {
    setMillis((prevTime) => {
      if (prevTime === 0) {
        clearInterval(interval.current);
       
        return prevTime;
      } else {
        const timeLeft = prevTime - 1000;
        
        return timeLeft;
      }
    });
  };

 useEffect(()=>{
onProgress(millis / minToMilliSec(minute));
if(millis===0){
 onEnd();
}
 },[millis])

  useEffect(() => {
    setMillis(minToMilliSec(minute));
  }, [minute]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) {
        clearInterval(interval.current);
      }
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => {
      clearInterval(interval.current);
    };
  }, [isPaused]);

  const minutes = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  return (
    <Text style={styles.text}>
      {formatTime(minutes)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: color.white,
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    padding: paddingSizes.lg,
    backgroundColor: '#ff917e',
  },
});
