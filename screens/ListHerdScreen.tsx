import React, { useContext, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { RootTabScreenProps } from '../types';
import { Cattle } from '../db/cattle';
import { DatabaseContext } from '../db/setup';
import { HerdListHeader } from '../components/HerdListHeader';
import { HerdListItem } from '../components/HerdListItem';

export default function ListHerdScreen({
  navigation,
}: RootTabScreenProps<'Herd'>) {
  const dbContext = useContext(DatabaseContext);
  const [cows, setCows] = useState(new Array<Cattle>());
  const getCows = async () => {
    setCows(
      (await dbContext?.database.find('Select * from Cattle')) as Cattle[],
    );
  };
  useFocusEffect(
    React.useCallback(() => {
      getCows();
    }, []),
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cows}
        style={{ alignSelf: 'stretch', margin: 10 }}
        ListHeaderComponent={HerdListHeader}
        renderItem={HerdListItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
