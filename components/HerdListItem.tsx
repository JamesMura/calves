import React from 'react';
import { Text, View } from 'react-native';

export function HerdListItem({ item }) {
  return (
    <View
      style={{
        marginTop: 20,
        paddingBottom: 5,
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text>{item.tag}</Text>
      <Text>{item.sex}</Text>
      <Text>{item.description}</Text>
    </View>
  );
}
