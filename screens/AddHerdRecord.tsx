
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';


import { Colors, View, TextField, DateTimePicker, Picker, SegmentedControl, Spacings, Button, Text } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { DatabaseContext } from '../db/setup';
import { useForm, Controller } from "react-hook-form";
import { Cattle } from '../db/cattle';
import { RootStackScreenProps } from '../types';


const styles = StyleSheet.create({
  container: {},
  withUnderline: {
    borderBottomWidth: 1,
    borderColor: Colors.$outlineNeutralMedium,
    paddingBottom: Spacings.s4
  },
  withFrame: {
    borderWidth: 1,
    borderColor: Colors.$outlineDisabledHeavy,
    padding: 4,
    borderRadius: 2
  }
});

function ErrorMessage(props: React.PropsWithChildren<{}>) {
  return <Text style={{ color: 'red' }}>{props.children}</Text>;
}

export default function AddHerdRecord({ navigation }: RootStackScreenProps<'Register a Cow'>) {
  const sexSegments = [{ label: 'Female' }, { label: 'Male' }]
  const dbContext = useContext(DatabaseContext);
  async function onSubmit(data: { tag: string; sex: string; dateOfBirth: string; description: string; parentSire: string; parentDam: string; purchaseDate: string; purchasedFrom: string; }) {
    var record = await dbContext?.database.save(new Cattle(data.tag, data.sex, data.dateOfBirth, data.description, data.parentSire, data.parentDam, data.purchaseDate, data.purchasedFrom));
    navigation.goBack();
  }
  const { control, handleSubmit } = useForm({
    defaultValues: {
      sex: sexSegments[0].label,
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
    <View flex backgroundColor='white'>
      <StatusBar style="light" />
      <View paddingH-20 paddingT-20 >
        <Controller
          name="tag"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value }, fieldState: { invalid, error } }) => (
            <View>
              {invalid && <ErrorMessage>ID/Tag Number is required</ErrorMessage>}

              <TextField
                text70
                floatingPlaceholderColor='grey'
                migrate={true}
                fieldStyle={styles.withUnderline}
                placeholder={'ID / Tag Number'}
                floatingPlaceholder
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            </View>
          )} />
      </View>
      <View paddingH-20 paddingT-20 row>
        <View flex marginT-10 >
          <Controller
            name="sex"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value }, fieldState: { invalid, error } }) => (
              <View>
                {invalid && <ErrorMessage>sex is required</ErrorMessage>}
                <SegmentedControl segments={sexSegments} onChangeIndex={(index) => onChange(sexSegments[index].label)} />
              </View>

            )}
          />
        </View>
        <View flex marginL-20>
          <Controller
            name="dateOfBirth"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value }, fieldState: { invalid } }) => (
              <View>
                {invalid && <ErrorMessage>date of birth is required</ErrorMessage>}
                <DateTimePicker  maximumDate={new Date()} migrate title={'Date of Birth'} onChange={(value)=> onChange(value.toDateString())} mode={'date'} />
              </View>
            )}
          />
        </View>
      </View>
      <View paddingH-20>
        <Controller
          name="description"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value }, fieldState: { invalid } }) => (
            <View>
              {invalid && <ErrorMessage>a description is required</ErrorMessage>}
              <TextField
                text70
                floatingPlaceholderColor='grey'
                migrate={true}
                fieldStyle={styles.withUnderline}
                placeholder={'Description (Colour/Breed)'}
                floatingPlaceholder
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}

              />
            </View>
          )} />
      </View>
      <View paddingH-20 paddingT-20 row>
        <View flex>
          <Controller
            name="parentSire"
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Picker
                topBarProps={{ useSafeArea: true }}
                placeholder={'Sire (Parent Bull)'}
                migrateTextField={false}
                onChange={(selectedItem: { value: string }) => onChange(selectedItem.value)}
                value={value}
                onBlur={onBlur}
              ><Picker.Item label='1' value={1}></Picker.Item>

              </Picker>
            )} />
        </View>
        <View flex marginL-20>
          <Controller
            name="parentDam"
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Picker
                topBarProps={{ useSafeArea: true }}
                placeholder={'Dam (Parent Cow)'}
                migrateTextField={false}
                onChange={(selectedItem: { value: string }) => onChange(selectedItem.value)}
                value={value}
                onBlur={onBlur}
              >
                <Picker.Item label='1' value={1}></Picker.Item>
              </Picker>
            )} />
        </View>
      </View>
      <View paddingH-20 paddingT-20 row>
        <View flex>
          <Controller
            name="purchaseDate"
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, value } }) => (
              <DateTimePicker maximumDate={new Date()} migrate title="Purchase Date" onChange={(value)=> onChange(value.toDateString())} mode='date' />
            )} />
        </View>
        <View flex marginL-20>
          <Controller
            name="purchasedFrom"
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                migrate
                fieldStyle={styles.withUnderline}
                placeholder={'Purchased From'}
                text70
                floatingPlaceholderColor='grey'
                floatingPlaceholder
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />)} />
        </View>
      </View>
      <View paddingH-20 paddingT-20>
        <Button
          label="Save"
          onPress={handleSubmit(onSubmit)}
          enableShadow
        />
      </View>

    </View>
  );
}


