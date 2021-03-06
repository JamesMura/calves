/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from '@expo/vector-icons';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import AddHerdRecord from '../screens/AddHerdRecord';
import NotFoundScreen from '../screens/NotFoundScreen';
import ListHerdScreen from '../screens/ListHerdScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types';
import ListExpensesScreen from '../screens/ListExpensesScreen';
import ListEventsScreen from '../screens/ListEventsScreen';

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group>
        <Stack.Screen name="Register a Cow" component={AddHerdRecord} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Herd"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Herd"
        component={ListHerdScreen}
        options={({ navigation }: RootTabScreenProps<'Herd'>) => ({
          title: 'Herd',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cow" size={24} color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Register a Cow')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="plus"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Expenses"
        component={ListExpensesScreen}
        options={({ navigation }: RootTabScreenProps<'Expenses'>) => ({
          title: 'Expenses',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cash-register"
              size={24}
              color={color}
            />
          ),
        })}
      />
      <BottomTab.Screen
        name="Events"
        component={ListEventsScreen}
        options={{
          title: 'Events',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-settings-outline" size={24} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}
