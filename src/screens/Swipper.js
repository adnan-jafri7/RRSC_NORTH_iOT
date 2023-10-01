import { useState,useEffect, useCallback, useMemo, useRef } from "react";
import { View,Text,Modal, TouchableOpacity,Dimensions } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {  LineChart,} from 'react-native-chart-kit'
import Home from './Home'
import Graph from './Graph'
import Swiper from "react-native-screens-swiper";

const Stack = createNativeStackNavigator();
export default function MySwiper() {
    return (
      <Swiper>
        <Stack.Screen name="Screen1" component={Home} />
        <Stack.Screen name="Screen2" component={Graph} />
        {/* Add more screens as needed */}
      </Swiper>
    );
  }