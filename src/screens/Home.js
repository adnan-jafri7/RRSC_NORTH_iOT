import { useState,useEffect, useCallback, useMemo, useRef,PermissionsAndroid } from "react";
import { View,Text,Modal, TouchableOpacity,Dimensions, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";
var RNFS = require('react-native-fs');
import XLSX from 'xlsx'
import Share from 'react-native-share';


export default function Home({navigation}){
    const url="https://api.thingspeak.com/channels/2224333/feeds/last.json?api_key=DXAKLDRGELS0K467&timezone=Asia%2FKolkata"
  
    const [data,setData]=useState()
    const [soilMoist,setSoilMoist]=useState()
    const [temp,setTemp]=useState()
    const [humid,setHumid]=useState()
    const [date,setDate]=useState()
    const [expoModal,setExportModal]=useState(false)
    const [resError,setError]=useState("")
    const MINUTE_MS = 15000;
  
  
  
    useEffect(() => {
  
      fetchData()
  
      const interval = setInterval(fetchData, MINUTE_MS)
  
      return () => clearInterval(interval);
    }, []);

    const checkInternetConnection = async () => {
      const netInfo = await NetInfo.fetch(); 
      console.log()     
        return netInfo.isInternetReachable
    };
    
    const exportData=async ()=>{
      try{
        const response =await fetch("https://api.thingspeak.com/channels/2224333/feeds.json?api_key=DXAKLDRGELS0K467&time_zone=Aisa/Kolkata&results=10")
        .then((response)=>response.json())
        .then((json)=>{
          console.log(json.feeds)
          let wb = XLSX.utils.book_new();
          let ws = XLSX.utils.json_to_sheet(json.feeds)    
          XLSX.utils.book_append_sheet(wb,ws,"Users")
          const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});
          RNFS.writeFile(RNFS.ExternalDirectoryPath + '/my_exported_file.xlsx', wbout, 'ascii').then((r)=>{
            openFile(RNFS.ExternalDirectoryPath + '/my_exported_file.xlsx')
            console.log('Success');
           }).catch((e)=>{
             console.log('Error', e);
           });
        })
        .catch((error)=>{alert("Some error occurred!");console.log(error)})
      }
      catch(error){}
    }

    const openFile = async (filePath) => {
      try {
        const fileExists = await RNFS.exists(filePath);
        
        if (fileExists) {
          const options = {
            title: 'Open Excel File',
            failOnCancel: false,
            url: 'file://' + filePath,
          };
          
          await Share.open(options);
        } else {
          console.warn('File does not exist');
        }
      } catch (error) {
        console.error('Error opening file:', error);
      }
    };
    
    

    const fetchData = async ()=> {
        console.log(await checkInternetConnection())
        if(await checkInternetConnection()){
        try{
            
            const response = await fetch(url,{})
            .then((response)=>response.json())
            .then((data)=>{
                console.log(data)
                setError("")
                setData(data);
                setSoilMoist(data.field1)
                setTemp(data.field2)
                setHumid(data.field3)
                setDate(data.created_at)})
            .catch((error)=>{setError("Some Error Occurred!")})          
        
        }
        catch(error){setError("Some Error Occurred!")}
        
    }
    else{setError("No Internet Connection!")}

    
  }
    return(
      <View style={styles.topContainer}>
      {!resError.length<1?
        <View style={{backgroundColor:'red'}}>
          <Text style={{color:'#ffffff',textAlign:'center',padding:5,fontSize:16}}>{resError}</Text>
        </View>:null}
        <View style={styles.card}>
            <Text style={styles.cardTitle}>SOIL MOISTURE</Text>
              <View style={styles.cardContainer}>              
                <Text style={styles.valueText}>Last Updated Value : {soilMoist}%</Text>
                <Text style={styles.timeStamp}>Updated At : {date}</Text>
                <View style={styles.btnContainer}>
                <TouchableOpacity onPress={()=>{navigation.navigate('Graph',{field:"SOIL MOISTURE"})}} style={styles.btnView}>
                  <Text style={styles.btnText}>View Graph</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{}} style={styles.btnView}>
                  <Text style={styles.btnText}>Show Location</Text>
                </TouchableOpacity>
                </View>
              </View>
  
              <Modal
          animationType="slide"
          transparent={true}
          visible={expoModal}
          
          
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setExportModal(!expoModal);
          }}>
          
            <View style={{backgroundColor:'#1f1e1e',height:'100%'}}>
              <Text style={{color:'#ffffff',padding:10,fontSize:16}}>Select Date</Text>
            </View>
         
        </Modal>
  
        </View>
  
        <View style={styles.card}>
            <Text style={styles.cardTitle}>TEMPERATURE</Text>
              <View style={styles.cardContainer}>              
                <Text style={styles.valueText}>Last Updated Value : {temp}</Text>
                <Text style={styles.timeStamp}>Updated At : {date}</Text>
                <View style={styles.btnContainer}>
                <TouchableOpacity onPress={()=>{navigation.navigate('Graph',{field:"TEMPERATURE"})}} style={styles.btnView}>
                  <Text style={styles.btnText}>View Graph</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{}} style={styles.btnView}>
                  <Text style={styles.btnText}>Show Location</Text>
                </TouchableOpacity>
                </View>
              </View>
  
        </View>
  
  
        <View style={styles.card}>
            <Text style={styles.cardTitle}>HUMIDITY</Text>
              <View style={styles.cardContainer}>              
                <Text style={styles.valueText}>Last Updated Value : {humid}</Text>
                <Text style={styles.timeStamp}>Updated At : {date}</Text>
                <View style={styles.btnContainer}>
                <TouchableOpacity onPress={()=>{navigation.navigate('Graph',{field:"HUMIDITY"})}} style={styles.btnView}>
                  <Text style={styles.btnText}>View Graph</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{}} style={styles.btnView}>
                  <Text style={styles.btnText}>Show Location</Text>
                </TouchableOpacity>
                </View>
              </View>
        </View>
  
        <TouchableOpacity
                  style={{alignItems: 'center', justifyContent: 'center',width: 70, elevation:20, position: 'absolute', bottom: 200, right: 20,height: 70,backgroundColor: 'rgba(255, 103, 31,0.6)',borderRadius: 100,}}
                  onPress={() => { exportData() }}
              >
                  <Text style={{ color: "white",fontSize:16 }}>Export</Text>
              </TouchableOpacity>
         
        
      </View>
    )
  }
  const styles=StyleSheet.create({
    topContainer:{
      flexDirection:'column',
      justifyContent:'space-between',
      backgroundColor:'#000000',
      flex:1,
    },
    card:{
      flex:1,
      alignSelf:'center',
      margin:'2%',
      elevation:20,
      width:'90%',
      backgroundColor:'#1f1e1e',
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
    btnContainer:{
      flexDirection:'row',
      justifyContent:'space-evenly'
    },
    btnView:{
      borderRadius:10,
      width:'40%',
      flexDirection:'row',
      justifyContent:'center',
      alignSelf:'center',
      margin:'3%',
      backgroundColor:'rgba(255, 103, 31,0.6)',
      elevation:20
    },
    btnText:{
      color:'#ffffff',
      fontSize:16,
      alignSelf:'center',
      padding:'7%',
      fontWeight:'bold'
    }
  })