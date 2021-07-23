import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export const RoundedButton = ({
  style = [],
  textStyle = [],
  size = 125,
  ...otherprops
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]} onPress={otherprops.onPress}>
      <Text style={[styles(size).text, textStyle]}>{otherprops.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) => {
  return (StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      borderColor:'snow',
      borderWidth:2,
      justifyContent:"center",
      //alignItems:"center",
    },
    text: {
      color: 'snow',
      fontSize: size/3,
    
    },
  })
  )
};
