import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform, AsyncStorage } from 'react-native';
import { Focus } from './src/components/feautures/focus/focus';
import { Timer } from './src/components/feautures/timer/timer';
import { FocusHistory } from './src/components/feautures/focus/focusHistory';
import { CountDown } from './src/components/countdown/countdown';
import { spacings, paddingSizes } from './src/components/utils/sizes';

const STATUS = {
  COMPLETE: 1,
  CANCELED: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusSubjectWithStatus = (focusSubject, status) => {
    setFocusHistory([
      ...focusHistory,
      { subject: focusSubject, status: status, key:String(focusHistory.length+1) },
    ]);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (error) {
      console.log(error);
    }
  };

  const loadSaveHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    loadSaveHistory();
  },[])

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusSubjectWithStatus(focusSubject, STATUS.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusSubjectWithStatus(focusSubject, STATUS.CANCELED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <View style={{flex:0.8}}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff471a',
    opacity: 0.8,
    paddingTop: Platform.OS === 'ios' ? spacings.md : spacings.sm,
    //alignItems:'center',
    paddingLeft: spacings.sm,
    paddingRight: spacings.sm,
  },
  /*innerContainer1:{
    paddingTop:paddingSizes.xxl
  },
  innerContainer2:{
    flex:0.5,
    alignItems:"center",
    justifyContent:"center"
  }
  */
});
