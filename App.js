import { useState,useEffect } from "react";
import { View,Text,ImageBackground, TouchableOpacity,Dimensions } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {  LineChart,} from 'react-native-chart-kit'

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Home" screenOptions={{headerTintColor:'#ffffff',headerTitleStyle:{color:'#ffffff'},headerStyle:{backgroundColor:'#000000'}}}>
        <Stack.Screen  name="Home"  component={HomeScreen} />
        <Stack.Screen  name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}



function HomeScreen({navigation}){
  const url="https://api.thingspeak.com/channels/2224333/feeds/last.json?api_key=DXAKLDRGELS0K467&timezone=Asia%2FKolkata"

  const [data,setData]=useState()
  const [soilMoist,setSoilMoist]=useState()
  const [temp,setTemp]=useState()
  const [humid,setHumid]=useState()
  const [date,setDate]=useState()
  const MINUTE_MS = 1000;



  useEffect(() => {
    const fetchData = async ()=> {
      const response = await fetch(url)
      const data = await response.json()
      setData(data);
      setSoilMoist(data.field1)
      setTemp(data.field2)
      setHumid(data.field3)
      setDate(data.created_at)

      //console.log(data)
    }

    fetchData()

    const interval = setInterval(fetchData, MINUTE_MS)

    return () => clearInterval(interval)
  }, []);

  return(
    <View style={{flexDirection:'column',justifyContent:'space-between',backgroundColor:'#000000',flex:1,}}>
      <View style={{flex:1,alignSelf:'center',margin:10,elevation:20,width:'90%',backgroundColor:'#1f1e1e',borderRadius:20}}>
          <Text style={{color:'#ffffff',alignSelf:'center',fontSize:22,padding:10,fontWeight:'bold'}}>SOIL MOISTURE</Text>
            <View style={{borderRadius:10,margin:10,backgroundColor:'#000000'}}>              
              <Text style={{color:'#ffffff',alignSelf:'center',fontSize:20,padding:10,fontWeight:'bold'}}>Last Updated Value : {soilMoist}%</Text>
              <Text style={{color:'#ffffff',alignSelf:'center',fontSize:18,padding:8,}}>Updated At : {date}</Text>
              <TouchableOpacity onPress={()=>{navigation.navigate('Details')}} style={{borderRadius:10,width:'40%',flexDirection:'row',justifyContent:'center',alignSelf:'center',margin:15,backgroundColor:'rgba(255, 103, 31,0.6)',elevation:20}}>
                <Text style={{color:'#ffffff',fontSize:16,alignSelf:'center',padding:10,fontWeight:'bold'}}>View Graph</Text>
              </TouchableOpacity>
            </View>

      </View>

      <View style={{flex:1,alignSelf:'center',margin:10,elevation:20,width:'90%',backgroundColor:'#1f1e1e',borderRadius:20}}>
          <Text style={{color:'#ffffff',alignSelf:'center',fontSize:22,padding:10,fontWeight:'bold'}}>TEMPERATURE</Text>
            <View style={{borderRadius:10,margin:10,backgroundColor:'#000000'}}>              
              <Text style={{color:'#ffffff',alignSelf:'center',fontSize:20,padding:10,fontWeight:'bold'}}>Last Updated Value : {temp}</Text>
              <Text style={{color:'#ffffff',alignSelf:'center',fontSize:17,padding:8,}}>Updated At : {date}</Text>
              <TouchableOpacity style={{borderRadius:10,width:'40%',flexDirection:'row',justifyContent:'center',alignSelf:'center',margin:15,backgroundColor:'rgba(255, 103, 31,0.6)',elevation:20}}>
                <Text style={{color:'#ffffff',fontSize:16,alignSelf:'center',padding:10,fontWeight:'bold'}}>View Graph</Text>
              </TouchableOpacity>
            </View>

      </View>


      <View style={{flex:1,alignSelf:'center',margin:10,elevation:20,width:'90%',backgroundColor:'#1f1e1e',borderRadius:20}}>
          <Text style={{color:'#ffffff',alignSelf:'center',fontSize:22,padding:10,fontWeight:'bold'}}>HUMIDITY</Text>
            <View style={{borderRadius:10,margin:10,backgroundColor:'#000000'}}>              
              <Text style={{color:'#ffffff',alignSelf:'center',fontSize:20,padding:10,fontWeight:'bold'}}>Last Updated Value : {humid}</Text>
              <Text style={{color:'#ffffff',alignSelf:'center',fontSize:17,padding:8,}}>Updated At : {date}</Text>
              <TouchableOpacity style={{borderRadius:10,width:'40%',flexDirection:'row',justifyContent:'center',alignSelf:'center',margin:15,backgroundColor:'rgba(255, 103, 31,0.6)',elevation:20}}>
                <Text style={{color:'#ffffff',fontSize:16,alignSelf:'center',padding:10,fontWeight:'bold'}}>View Graph</Text>
              </TouchableOpacity>
            </View>
      </View>
      
    </View>
  )
}


function DetailsScreen({ navigation }) {

  const data={
    "channel": {
        "id": 2224333,
        "name": "Soil Moisture Sensor ",
        "latitude": "0.0",
        "longitude": "0.0",
        "field1": "Soil Moisture",
        "field2": "Temperature",
        "field3": "Humidity",
        "created_at": "2023-07-20T05:06:19Z",
        "updated_at": "2023-08-23T10:39:24Z",
        "last_entry_id": 1262
    },
    "feeds": [
        {
            "created_at": "2023-08-29T05:32:20Z",
            "entry_id": 1253,
            "field1": "5",
            "field2": "28.10",
            "field3": "51.10"
        },
        {
            "created_at": "2023-08-29T05:32:39Z",
            "entry_id": 1254,
            "field1": "6",
            "field2": "28.00",
            "field3": "51.00"
        },
        {
            "created_at": "2023-08-29T05:32:59Z",
            "entry_id": 1255,
            "field1": "5",
            "field2": "27.80",
            "field3": "49.90"
        },
        {
            "created_at": "2023-08-29T05:33:18Z",
            "entry_id": 1256,
            "field1": "7",
            "field2": "27.70",
            "field3": "50.00"
        },
        {
            "created_at": "2023-08-29T05:33:36Z",
            "entry_id": 1257,
            "field1": "5",
            "field2": "28.00",
            "field3": "50.70"
        },
        {
            "created_at": "2023-08-29T05:33:56Z",
            "entry_id": 1258,
            "field1": "5",
            "field2": "28.00",
            "field3": "50.20"
        },
        {
            "created_at": "2023-08-29T05:34:15Z",
            "entry_id": 1259,
            "field1": "5",
            "field2": "28.00",
            "field3": "50.90"
        },
        {
            "created_at": "2023-08-29T05:34:34Z",
            "entry_id": 1260,
            "field1": "5",
            "field2": "28.00",
            "field3": "50.30"
        },
        {
            "created_at": "2023-08-29T05:34:53Z",
            "entry_id": 1261,
            "field1": "6",
            "field2": "28.00",
            "field3": "50.60"
        },
        {
            "created_at": "2023-08-29T05:35:12Z",
            "entry_id": 1262,
            "field1": "6",
            "field2": "27.90",
            "field3": "50.60"
        }
    ]
}
  let data2=[]
  let data3=[]
    for(let i=0;i<data.feeds.length;i++){
    data2.push(data.feeds[i].field1) 
    data3.push(data.feeds[i].created_at)   
    }
  console.log("data2",data2)
  const line = {
    labels: data2,
    datasets: [
      {
        data: data2,
        strokeWidth: 2,
         // optional
      },
    ],
  };
  return (
    <View style={{backgroundColor:'#1f1e1e'}}>

  <Text style={{color:'#ffffff',fontSize:22,textAlign:'center',marginTop:20,fontWeight:'bold'}}>
    SOIL MOISTURE % GRAPH
  </Text>
  <LineChart
    data={line}
    width={Dimensions.get('window').width} // from react-native
    height={Dimensions.get('window').height}
    yAxisLabel={line.data}
    chartConfig={{
      backgroundColor: '#1f1e1e',
      backgroundGradientFrom: '#1f1e1e',
      backgroundGradientTo: '#000000',
      decimalPlaces: 2, // optional, defaults to 2dp
      barPercentage:1,
      propsForLabels:{fontSize:16},
      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      style: {
        borderRadius: 16,
        
      }
    }}
    bezier
    style={{
      marginVertical: 50,
      borderRadius: 16
    }}
  />
</View>
  );
}

