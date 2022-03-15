import React from 'react';
import { Text, View } from 'react-native';

export function HerdListHeader() {
  return <View style={{ marginTop: 20, paddingBottom: 5, borderBottomWidth: 1, display: "flex", flexDirection: "row", "justifyContent": "space-between" }}>
    <Text style={{ fontWeight: "bold", fontSize: 18 }}>Tag</Text>
    <Text style={{ fontWeight: "bold", fontSize: 18 }}>Sex</Text>
    <Text style={{ fontWeight: "bold", fontSize: 18 }}>Description</Text>
  </View>;
}
