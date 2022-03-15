import React from 'react';
import { Text } from 'react-native';

export function ErrorMessage(props: React.PropsWithChildren<{}>) {
  return <Text style={{ color: '#e74c3c' }}>{props.children}</Text>;
}
