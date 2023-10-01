import { useState,useEffect, useCallback, useMemo, useRef, } from "react";
import { View,Text,Modal, TouchableOpacity,Dimensions,StyleSheet, StatusBar, PermissionsAndroid, ActivityIndicator } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {  LineChart,} from 'react-native-chart-kit'
import Home from './src/screens/Home'
import Graph from './src/screens/Graph'
import NetInfo from "@react-native-community/netinfo";
var RNFS = require('react-native-fs');
import XLSX from 'xlsx';
import Share from 'react-native-share';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


//const Stack = createNativeStackNavigator();

export default function App(){
  const [screen,setScreen]=useState("Temperature")
  //const url="https://api.thingspeak.com/channels/2224333/feeds/last.json?api_key=DXAKLDRGELS0K467&timezone=Asia%2FKolkata"
  const url="https://api.thingspeak.com/channels/2224333/feeds.json?api_key=DXAKLDRGELS0K467&time_zone=Aisa/Kolkata&results=15"
  const [data,setData]=useState()
  const [soilMoist,setSoilMoist]=useState()
  const [temp,setTemp]=useState()
  const [humid,setHumid]=useState()
  const [date,setDate]=useState()
  const [soilMoistAll,setSoilMoistAll]=useState()
  const [tempAll,setTempAll]=useState()
  const [humidAll,setHumidAll]=useState()
  const [dateAll,setDateAll]=useState()
  const [expoModal,setExportModal]=useState(false)
  const [resError,setError]=useState("")
  const [graphHeight,setGraphHeight]=useState(500)
  const MINUTE_MS = 15000;
  const [loading,setLoading]=useState(false)


  useEffect(() => {  
    fetchData()
    
  }, []);

  const checkInternetConnection = async () => {
    const netInfo = await NetInfo.fetch(); 
    console.log()     
      return netInfo.isInternetReachable
  };

  const fetchData = async ()=> {
    setLoading(true)
    console.log(await checkInternetConnection())
    if(await checkInternetConnection()){
    try{        
        const response = await fetch(url,{})
        .then((response)=>response.json())
        .then((data)=>{
            let moist=[]
            let humid=[]
            let temp=[]
            let date=[]
            console.log(data)
            setError("")
            setData(data);
            setSoilMoist(data.feeds[data.feeds.length-1].field1)
            setTemp(data.feeds[data.feeds.length-1].field2)
            setHumid(data.feeds[data.feeds.length-1].field3)
            setDate(data.feeds[data.feeds.length-1].created_at)
            setLoading(false)

            for(let i=0;i<data.feeds.length;i++){
              moist.push(data.feeds[i].field1)
              temp.push(data.feeds[i].field2)
              humid.push(data.feeds[i].field3)             
            }
            for(let j=0;j<5;j++){
              date.push(data.feeds[j].created_at.substring(5,10))
              }            
            setSoilMoistAll(moist)
            setHumidAll(humid)
            setTempAll(temp)
            setDateAll(date)  
          })
           
        .catch((error)=>{setLoading(false)
           setError("Some Error Occurred!");
           console.log(error)})          
    
    }
    catch(error){
      setLoading(false)
      setError("Some Error Occurred!");console.log(error)}
    
}
else{setError("No Internet Connection!")}
}

const line = {
  labels:dateAll ,
  datasets: [
    {
      data: screen==="Moisture"?soilMoistAll:screen==="Temperature"?tempAll:screen==="Humidity"?humidAll:null,
      strokeWidth: 2,
       // optional
    },
  ],
};

  return(
    // <NavigationContainer>
    //   <Stack.Navigator  initialRouteName="Home" screenOptions={{headerTintColor:'#ffffff',headerTitleStyle:{color:'#ffffff'},headerStyle:{backgroundColor:'#1f1e1e'}}}>
    //     <Stack.Screen  name="Home"  component={Home} />
    //     <Stack.Screen  name="Graph" component={Graph} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    loading?
    <View style={{flexDirection:'column',justifyContent:'center',flex:1,backgroundColor:'#000000'}}> 
      <ActivityIndicator size={"large"} color={'#ffffff'} style={{alignSelf:"center"}}/>
      </View>
      : 
    <View style={styles.topContainer}>

      <StatusBar backgroundColor={'#000000'}/>
      <Modal
          animationType="slide"
          transparent={true}
          visible={expoModal}
          
          onRequestClose={() => {
            
            setExportModal(!expoModal);
          }}>
          
            <View style={{backgroundColor:'rgba(50, 50, 50, 0.8)',flex:1,flexDirection:'column',justifyContent:'center'}}>
              <View style={{width:'90%',backgroundColor:'#000000',alignSelf:'center',borderRadius:10,padding:'2%'}}>
                <Text style={{color:'#ffffff',padding:10,fontSize:16}}>Select Date</Text>
                <View style={{borderRadius:10,borderWidth:1,borderColor:'#ffffff',padding:'2%',width:'70%',alignSelf:'center',margin:'2%'}}>
                    <Text style={{fontSize:16,color:'#ffffff'}}>From</Text>
                </View>
                <View style={{borderRadius:10,borderWidth:1,borderColor:'#ffffff',padding:'2%',width:'70%',alignSelf:'center',margin:'2%'}}>
                    <Text style={{fontSize:16,color:'#ffffff'}}>To</Text>
                </View>
               <View style={{margin:'2%',alignSelf:'flex-end',borderRadius:10,flexDirection:'row'}}> 
                  <TouchableOpacity style={{margin:'2%',alignSelf:'flex-end',borderWidth:1,borderColor:'#ffffff',borderRadius:10,padding:'2%'}} onPress={()=>setExportModal(false)}>
                    <Text style={{fontSize:16,color:'#ffffff'}}>Close</Text>  
                  </TouchableOpacity>
                  <TouchableOpacity style={{margin:'2%',alignSelf:'flex-end',borderWidth:1,borderColor:'#ffffff',borderRadius:10,padding:'2%'}} onPress={()=>setExportModal(false)}>
                    <Text style={{fontSize:16,color:'#ffffff'}}>Submit</Text>  
                  </TouchableOpacity>
              </View>
              </View>
            </View>
         
        </Modal>
    
    <View style={{backgroundColor:'#383838',elevation:20, shadowColor:'#ffffff', flexDirection:'row', justifyContent:'flex-end'}}>
      <TouchableOpacity style={{margin:'2%'}} onPress={()=>fetchData()}>
        <MaterialIcons name={"refresh"} color={"#ffffff"} size={20}/>
      </TouchableOpacity>
        <TouchableOpacity style={{margin:'2%'}} onPress={()=>setExportModal(true)}>
        <MaterialIcons name={"download"} color={"#ffffff"} size={20}/>
      </TouchableOpacity>

    </View>  
    <View style={styles.menuContainer}>      
        <TouchableOpacity style={{...styles.touchable,backgroundColor:screen==="Moisture"?'#ffffff':'#000000'}} onPress={()=>setScreen("Moisture")}>
          <Text style={{...styles.text,color:screen==="Moisture"?'#000000':'#ffffff'}}>Moisture</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.touchable,backgroundColor:screen==="Temperature"?'#ffffff':'#000000'}} onPress={()=>setScreen("Temperature")}>
          <Text style={{...styles.text,color:screen==="Temperature"?'#000000':'#ffffff'}}>Temperature</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.touchable,backgroundColor:screen==="Humidity"?'#ffffff':'#000000'}} onPress={()=>setScreen("Humidity")}>
          <Text style={{...styles.text,color:screen==="Humidity"?'#000000':'#ffffff'}}>Humidity</Text>
        </TouchableOpacity>
      </View>
      {!resError.length<1?
        <View style={{backgroundColor:'red'}}>
          <Text style={{color:'#ffffff',textAlign:'center',padding:5,fontSize:16}}>{resError}</Text>
        </View>:null}

      <View style={styles.card}>
          <Text style={styles.valueText}>Last Updated Value : {screen==="Moisture"?soilMoist:screen==="Temperature"?temp:humid}</Text>
          <Text style={styles.timeStamp}>Updated At : {date}</Text>
       
      </View>
        {dateAll!==undefined?
      <View style={styles.graphContainer} onLayout={(e)=>{setGraphHeight(Math.round(e.nativeEvent.layout.height))}} >
      <LineChart
      data={line}
      width={Dimensions.get('window').width}
      height={graphHeight}
      yAxisLabel={line.data}
      chartConfig={{
        backgroundColor: '#1f1e1e',
        backgroundGradientFrom: '#000000',
        backgroundGradientTo: '#000000',
        decimalPlaces: 2, // optional, defaults to 2dp
        barPercentage:1,        
        
        propsForLabels:{fontSize:16},
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
       
      }}
      onDataPointClick={( dataPoint, datasetIndex ) =>
          console.log(dataPoint)
        }
      bezier
      style={{paddingBottom:0}}
      
    />

      </View>:null}
      
      
    </View>
  )

}

const styles=StyleSheet.create({

  topContainer:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#000000'
  },
  card:{
    height:'20%',
    alignSelf:'center',
    margin:'2%',
    elevation:20,
    shadowColor:'#ffffff',
    justifyContent:"center",
    width:'90%',
    backgroundColor:'#383838',
    borderRadius:20
  },
  cardTitle:{
    color:'#ffffff',
    alignSelf:'center',
    fontSize:22,
    padding:'2%',
    fontWeight:'bold'
  },
  cardContainer:{
    borderRadius:10,
    margin:'2%',
    backgroundColor:'#000000'
  },
  valueText:{
    color:'#ffffff',
    alignSelf:'center',
    fontSize:20,
    padding:'2%',
    fontWeight:'bold',
    flexWrap:'wrap'
  },
  timeStamp:{
    color:'#ffffff',
    alignSelf:'center',
    fontSize:16,
    padding:'2%',
  },

  menuContainer:{
    backgroundColor:"#000000",
    flexDirection:'row',
    height:'7%'
  },
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
  },
  graphContainer:{
    height:'70%',
    marginTop:'5%',
    backgroundColor:'#000000',
    
    
  }
})

