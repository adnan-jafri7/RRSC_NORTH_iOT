import { useState,useEffect, useCallback, useMemo, useRef } from "react";
import { View,Text,Modal, TouchableOpacity,Dimensions,StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {  LineChart,} from 'react-native-chart-kit'
import Home from './src/screens/Home'
import Graph from './src/screens/Graph'


//const Stack = createNativeStackNavigator();

export default function App(){
  const [screen,setScreen]=useState("Temperature")
  const toush=()=>{
    console.log("touched")
  }

  return(
    // <NavigationContainer>
    //   <Stack.Navigator  initialRouteName="Home" screenOptions={{headerTintColor:'#ffffff',headerTitleStyle:{color:'#ffffff'},headerStyle:{backgroundColor:'#1f1e1e'}}}>
    //     <Stack.Screen  name="Home"  component={Home} />
    //     <Stack.Screen  name="Graph" component={Graph} />
    //   </Stack.Navigator>
    // </NavigationContainer>

    <View style={{flexDirection:'row',justifyContent:'center',backgroundColor:'#000000'}}>
      <TouchableOpacity style={{...styles.touchable,backgroundColor:screen==="Moisture"?'#ffffff':'#000000'}} onPress={()=>toush()}>
        <Text style={{...styles.text,color:screen==="Moisture"?'#000000':'#ffffff'}}>Moisture</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{...styles.touchable,backgroundColor:screen==="Temperature"?'#ffffff':'#000000'}} onPress={()=>setScreen("Temperature")}>
        <Text style={{...styles.text,color:screen==="Temperature"?'#000000':'#ffffff'}}>Temperature</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{...styles.touchable,backgroundColor:screen==="Humidity"?'#ffffff':'#000000'}} onPress={()=>setScreen("Humidity")}>
        <Text style={{...styles.text,color:screen==="Humidity"?'#000000':'#ffffff'}}>Humidity</Text>
      </TouchableOpacity>
    </View>
  )

}

const styles=StyleSheet.create({
  touchable:{
    flex:1,
    margin:'2%',
    borderRadius:20,
    borderColor:'#ffffff',
    borderWidth:1,
    padding:'2%',
    justifyContent:'center'
  },
  text:{
    color:'#ffffff',
    textAlign:'center'
  }
})

