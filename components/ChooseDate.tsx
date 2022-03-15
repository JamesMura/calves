import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, TouchableHighlight, Pressable, StyleSheet } from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import DatePicker from 'reactnative-neat-date-picker-2022';

interface ChooseDateParams {
  onChange: (value: string) => void;
  value: string;
  label: string;
}

export function ChooseDate(props: React.PropsWithChildren<ChooseDateParams>) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateValue, setDateValue] = useState(props.value);
  const openDatePicker = () => {
    setShowDatePicker(true);
  };
  const valueChanged = (value: string) => {
    setDateValue(value);
    props.onChange(value);
  };
  return (
    <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
      <View style={{ flex: 5 }}>
        <DatePicker
          isVisible={showDatePicker}
          mode="single"
          maxDate={new Date()}
          onConfirm={(output: { dateString: string }) => {
            valueChanged(output.dateString);
            setShowDatePicker(false);
          }}
          onCancel={() => {
            setShowDatePicker(false);
          }}
        />
        <Pressable onPress={() => openDatePicker()}>
          <View pointerEvents="none">
            <FloatingLabelInput
              editable={false}
              label={props.label}
              containerStyles={styles.dateInput}
              value={dateValue}
            />
          </View>
        </Pressable>
      </View>
      <TouchableHighlight
        style={styles.calendarButton}
        onPress={openDatePicker}
        underlayColor="transparent"
      >
        <View>
          <AntDesign name="calendar" size={24} color="black" />
        </View>
      </TouchableHighlight>
    </View>
  );
}

export const styles = StyleSheet.create({
  dateInput: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 40,
    fontSize: 14,
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  calendarButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
