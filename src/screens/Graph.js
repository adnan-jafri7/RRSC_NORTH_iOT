import { useState,useEffect, useCallback, useMemo, useRef } from "react";
import { View,Text,Modal, TouchableOpacity,Dimensions, ActivityIndicator } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {  LineChart,} from 'react-native-chart-kit'
import NetInfo from "@react-native-community/netinfo";

export default function Graph({ route,navigation }) {
  const {field}=route.params
  const url="https://api.thingspeak.com/channels/2224333/feeds.json?api_key=DXAKLDRGELS0K467&time_zone=Aisa/Kolkata&results=10"
  const [data,setData]=useState()
  const [date,setDate]=useState()
  const [resError,setError]=useState("")
  const [loading,setLoading]=useState(true)

  const checkInternetConnection = async () => {
    const netInfo = await NetInfo.fetch(); 
    console.log()     
      return netInfo.isInternetReachable
  };


  useEffect(()=>{
    fetchData()
  },[])


  const fetchData = async ()=> {
    
    console.log(await checkInternetConnection())
    if(await checkInternetConnection()){
    try{        
        const response = await fetch(url,{})
        .then((response)=>response.json())
        .then((res)=>{
            
            let resData=[]
            let cusDate=[]
            console.log(res)
            setError("")
            for(let i=0;i<res.feeds.length;i++){
              if(field==="SOIL MOISTURE"){
              resData.push(res.feeds[i].field1)
              cusDate.push(res.feeds[i].created_at.substring(5,10))}
              else if(field==="TEMPERATURE"){
                resData.push(res.feeds[i].field2)
              cusDate.push(res.feeds[i].created_at.substring(5,10))
              }
              else if(field==="HUMIDITY"){
                resData.push(res.feeds[i].field3)
              cusDate.push(res.feeds[i].created_at.substring(5,10))
              }             
              } 
              setDate(cusDate)
              setData(resData)           
              setDate(res.created_at)
              setLoading(false)
          })
        .catch((error)=>{
          setError("Some Error Occurred!")
          console.log(error)
          setLoading(false)})          
    
    }
    catch(error){setError("Some Error Occurred!")
                  setLoading(false)}
    
}
else{setError("No Internet Connection!")}
}
 
    console.log("data2",date)


    const handleDataPointClick = (dataPoint, datasetIndex) => {
      // Handle data point click event here
      console.log(`Data Point Clicked: ${dataPoint}, Dataset Index: ${datasetIndex}`);
    };
  
    const line = {
      labels: [1,2,3,4,5,6,7,8,9,10],
      datasets: [
        {
          data: data,
          strokeWidth: 2,
           // optional
        },
      ],
    };
    return (
      <View style={{backgroundColor:'#000000'}}>
      {!resError.length<1?
        <View style={{backgroundColor:'red'}}>
          <Text style={{color:'#ffffff',textAlign:'center',padding:'1.5%',fontSize:16}}>{resError}</Text>
        </View>:null}
  
    <Text style={{color:'#ffffff',fontSize:22,textAlign:'center',marginTop:'5%',fontWeight:'bold'}}>
      {field} GRAPH
    </Text>
    <Text style={{color:'#ffffff',fontSize:18,textAlign:'center',marginBottom:'2%'}}>
      (Last 10 values)
    </Text>
    {loading?
    <View style={{flexDirection:'column',justifyContent:'center',backgroundColor:'#000000',height:'100%'}}>
    <ActivityIndicator color={'#ffffff'} size={"large"} style={{padding:'1%'}} />
    </View>
    :
    <LineChart
      data={line}
      width={Dimensions.get('window').width}
      height={(Dimensions.get('window').height)-100}
      yAxisLabel={line.data}
      chartConfig={{
        backgroundColor: '#1f1e1e',
        backgroundGradientFrom: '#1f1e1e',
        backgroundGradientTo: '#000000',
        decimalPlaces: 2, // optional, defaults to 2dp
        barPercentage:1,
        
        propsForLabels:{fontSize:16},
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
          
        }
      }}
      onDataPointClick={( dataPoint, datasetIndex ) =>
          console.log(dataPoint)
        }
      bezier
      style={{paddingBottom:10
        
      }}
      
    />}
  </View>
    );
  }
  