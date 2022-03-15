
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {  Pressable, StyleSheet, Text, View } from 'react-native';
import { DatabaseContext } from '../db/setup';
import { useForm, Controller } from "react-hook-form";
import { Cattle } from '../db/cattle';
import { RootStackScreenProps } from '../types';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import Checkbox from 'expo-checkbox';
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesome } from '@expo/vector-icons';
import { ChooseDate } from "../components/ChooseDate";
import { ErrorMessage } from '../components/ErrorMessage';






export default function AddHerdRecord({ navigation }: RootStackScreenProps<'Register a Cow'>) {
  const sexSegments = ['Female', 'Male']
  const [wasPurchased, setWasPurchased] = useState(false);
  const dbContext = useContext(DatabaseContext);
  const [sires, setSires] = useState(new Array<Cattle>());
  const [dams, setDams] = useState(new Array<Cattle>());
  const getDams = async () => {
    let results = await (dbContext?.database.find("Select * from Cattle where (sex = ?)", ["Female"])) as Cattle[];
    console.log("dams", results)
    setDams(results)
  }
  const getSires = async () => {
    let results = await (dbContext?.database.find("Select * from Cattle where (sex = ?)", ["Male"])) as Cattle[];
    console.log("sires", results)
    setSires(results)
  }
  useEffect(() => {
    getDams();
  }, []);
  useEffect(() => {
    getSires();
  }, []);
  async function onSubmit(data: { tag: string; sex: string; dateOfBirth: string; description: string; parentSire: string; parentDam: string; purchaseDate: string; purchasedFrom: string; }) {
    console.log("saving", data)
    var record = await dbContext?.database.save(new Cattle(data.tag, data.sex, data.dateOfBirth, data.description, data.parentSire, data.parentDam, data.purchaseDate, data.purchasedFrom));
    navigation.goBack();
  }
  const { control, handleSubmit } = useForm({
    defaultValues: {
      sex: sexSegments[0],
      tag: '',
      description: '',
      dateOfBirth: '',
      purchasedFrom: '',
      purchaseDate: '',
      parentSire: '',
      parentDam: '',
    }
  });

  return (
    <View style={styles.form}>
      <StatusBar style="light" />
      <View style={styles.formRow}>
        <Controller
          name="tag"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value }, fieldState: { invalid, error } }) => (
            <View style={styles.formField}>
              {invalid && <ErrorMessage>ID/Tag Number is required</ErrorMessage>}
              <FloatingLabelInput
                containerStyles={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                label='Animal ID / Tag Number'
              />
            </View>
          )} />
      </View>
      <View style={styles.formRow}>
        <View style={styles.formField} >
          <Controller
            name="sex"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value }, fieldState: { invalid, error } }) => (
              <View style={{ alignSelf: 'stretch' }}>
                {invalid && <ErrorMessage>Sex is required</ErrorMessage>}
                <SegmentedControl
                  values={sexSegments}
                  onValueChange={onChange} />
              </View>

            )}
          />
        </View>

      </View>

      <Controller
        name="dateOfBirth"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value }, fieldState: { invalid, isDirty } }) => (
          <View style={styles.formRow}>
            <View style={styles.formField}>
              {invalid && <ErrorMessage>Date of birth is required</ErrorMessage>}
              <ChooseDate value={value} onChange={onChange} label="Date of Birth" />
            </View>

          </View>
        )}
      />

      <View style={styles.formRow}>
        <Controller
          name="description"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value }, fieldState: { invalid } }) => (
            <View style={styles.formField}>
              {invalid && <ErrorMessage>Description is required</ErrorMessage>}
              <FloatingLabelInput
                multiline
                containerStyles={styles.input}
                label='Description (Colour/Breed)'
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            </View>
          )} />
      </View>
      <View style={styles.formRow}>

        <Controller
          name="parentSire"
          control={control}
          rules={{
            required: false,
          }}
          render={({ field: { onChange } }) => (
            <SelectDropdown
              data={sires}
              defaultButtonText='Select Sire (Parent Bull)'
              onSelect={(selectedItem) => onChange(selectedItem.tag)}
              buttonTextStyle={{ fontSize: 14 }}
              rowTextForSelection={(item) => item.tag}
              buttonTextAfterSelection={(selectedItem) => selectedItem.tag}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#444"}
                    size={18}
                  />
                );
              }}
            />
          )} />
      </View>

      <View style={styles.formRow}>
        <Controller
          name="parentDam"
          control={control}
          rules={{
            required: false,
          }}
          render={({ field: { onChange } }) => (
            <SelectDropdown
              data={dams}
              defaultButtonText='Select Dam (Parent Cow)'
              onSelect={(selectedItem) => onChange(selectedItem.tag)}
              buttonTextStyle={{ fontSize: 14 }}
              rowTextForSelection={(item) => item.tag}
              buttonTextAfterSelection={(selectedItem) => selectedItem.tag}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#444"}
                    size={18}
                  />
                );
              }}
            />

          )} />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.purchaseLabel}>Did you purchase this cow ?</Text>
        <Checkbox
          value={wasPurchased}
          onValueChange={setWasPurchased}
          color={wasPurchased ? '#4630EB' : undefined} />

      </View>
      {wasPurchased && <View style={styles.formRow}>
        <View style={styles.formField}>
          <Controller
            shouldUnregister={!wasPurchased}
            name="purchaseDate"
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, value } }) => (
              <ChooseDate value={value} onChange={onChange} label="Purchase Date" />
            )} />
        </View>
      </View>}
      {wasPurchased && <View style={styles.formRow}>

        <View style={styles.formField}>
          <Controller
            name="purchasedFrom"
            shouldUnregister={!wasPurchased}
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FloatingLabelInput
                label='Purchased From'
                containerStyles={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />)} />
        </View>
      </View>}

      <View style={styles.formRow}>
        <View style={styles.formField}>
          <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.text}>Save</Text>
          </Pressable>
        </View>
      </View>

    </View>
  );
}




const styles = StyleSheet.create({
  formRow: {
    flexDirection: 'row',
    display: 'flex',
    marginTop: 10,
    marginBottom: 15,
    marginRight: 10,
  },
  formField: {
    flex: 5,
    marginLeft: 10,
    display: 'flex',
    // alignItems: 'center'
  },
  form: {
    flex: 5,
    backgroundColor: 'white'
  },
  input: {
    height: 40,
    // marginLeft: 10,
    borderBottomWidth: 1,
    borderColor: 'grey',
    // padding: 10,
  },
  dateLabel: {
    // marginLeft: 50
  },
  purchaseLabel: {
    marginLeft: 10,
    paddingRight: 10
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#0984e3',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});