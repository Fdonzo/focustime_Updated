import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { spacings, paddingSizes, fontSizes } from '../../utils/sizes';
import { RoundedButton } from '../../button/RoundedButton';

const HistoryItem = ({ item, index }) => {
  return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };
  return (
    <>
      <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        <>
          <Text style={styles.title}>{`Things we've focused:`} </Text>
          {!!focusHistory.length && (
            <>
              <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={{ flex: 1, alignItems: 'center' }}
                data={focusHistory}
                renderItem={HistoryItem}
              />

              <View style={styles.clearConatiner}>
                <RoundedButton size={80} title="Clear" onPress={clearHistory} />
              </View>
            </>
          )}
        </>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => {
    return { color: status > 1 ? 'red' : 'green', fontSize: fontSizes.lg };
  },

  title: {
    color: 'white',
    fontSize: fontSizes.lg,
  },

  clearConatiner: {
    flex:1,
    alignItems: 'center',
    //padding: paddingSizes.sm,
  },
});
