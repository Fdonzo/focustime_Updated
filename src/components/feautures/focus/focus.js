import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../button/RoundedButton';
import {fontSizes,paddingSizes, spacings} from "../../utils/sizes"

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}> What would like to focus on ? </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputStyle}
            onSubmitEditing={({ nativeEvent }) => {
              setSubject(nativeEvent.text);
            }}
          />
          <RoundedButton
            size={50}
            title="+"
            onPress={() => addSubject(subject)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: paddingSizes.md,
    justifyContent: 'center',
  },
  title: {
    color: 'snow',
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    alignContent: 'center',
    //paddingLeft:10,
  },
  inputContainer: {
    paddingTop: paddingSizes.md,
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputStyle: {
    flex: 1,
    marginRight: spacings.md,
  },
});
