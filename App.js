import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

import { GlobalStyles } from "./constants/styles";

import AllExpenses from "./screens/AllExpenses";
import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";

const Stack = createNativeStackNavigator(); //Navigator object, which contains all the screens in our app
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({navigation})=>({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: 'white',
        headerRight: ({tintColor})  => 
          <IconButton 
          icon="add"
          size={24}
          color={tintColor}         
          onPress={()=>{
            navigation.navigate('ManageExpense')
          }}/>        
      })}
    >
      <BottomTabs.Screen 
      name="RecentExpenses" 
      component={RecentExpenses} 
      options={{
        title: 'Training Sessions',
        tabBarLabel: 'Recent',
        tabBarIcon: ({color, size}) => (
          <Ionicons name="time-outline" size={size} color={color} />
        ),
      }}
      />
      <BottomTabs.Screen 
      name="All Expenses" 
      component={AllExpenses} 
      options={{
        title: 'All Expenses',
        tabBarLabel: 'Total',
        tabBarIcon: ({color, size}) => (
          <Ionicons name="calendar" size={size} color={color} />
        ),
      }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName="Expenses Overview"
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 }, 
          headerTintColor: 'white'
        }}
        >
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
          name="ManageExpense" 
          component={ManageExpense}
          options={{ 
            presentation: 'modal'
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
