import React, { useState } from 'react';
import { View, Text, StyleSheet,Vibration,Platform } from 'react-native';
import { color } from '../../utils/color';
import { paddingSizes } from '../../utils/sizes';
import { CountDown } from '../../countdown/countdown';
import { RoundedButton } from '../../button/RoundedButton';
import { ProgressBar } from 'react-native-paper';
import {Timing} from './timing/timing';
import {useKeepAwake} from 'expo-keep-awake'

const DEFAULT_VALUE=0.1;
export const Timer = ({ focusSubject, onTimerEnd, clearSubject}) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const[minutes, setMinutes]= useState(DEFAULT_VALUE);
  const onProgress = (progress) => {
    setProgress(progress);
  };
  const vibrate =()=>{
    if(Platform.OS==='ios'){
      const interval = setInterval(()=>Vibration.vibrate(), 1000);
      setTimeout(()=>clearInterval(interval),10000)
    }
    else{
      Vibration.vibrate(10000);
    }
  }
  const onEnd =()=>{
    vibrate();
   setMinutes(DEFAULT_VALUE);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd()
  };
  const changeTime = (time)=>{
    setMinutes(time);
    setProgress(1);
    setIsStarted(false)
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <CountDown minute={minutes} 
        isPaused={!isStarted} 
        onProgress={onProgress}
        onEnd={onEnd} />
      </View>

      <View style={styles.textcontainer}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>

        
      </View>
       <View style={{ paddingTop: 15, paddingBottom:10 }}>
          <ProgressBar
            progress={progress}
            color={color.white}
            style={{ height: 10 }}
          />
        </View>
        <View style={styles.buttonsWrapper}>
         <Timing onChangeTime={changeTime} />
        </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton
            title="Pause"
            size={100}
            onPress={() => setIsStarted(false)}
          />
        ) : (
          <RoundedButton
            title="Start"
            size={100}
            onPress={() => setIsStarted(true)}
          />
        )}
      </View>
      <View style={styles.clearSubject}>
      <RoundedButton size={80} title='-' onPress={clearSubject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: paddingSizes.xxl,
  },
  title: {
    color: color.white,
    textAlign: 'center',
  },
  task: {
    color: color.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  countdown: {
    paddingTop: paddingSizes.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textcontainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    //flex:0.1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: paddingSizes.md,
    
  },

  buttonsWrapper: {
    flex:0.3,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: paddingSizes.md,
    
  },
  clearSubject:{
    alignItems:'center',

  }
});
