import React, {Component  } from 'react';  
import {Platform, StyleSheet, Text, View,ActivityIndicator,FlatList} from 'react-native';  

import ModalDropdown from 'react-native-modal-dropdown';
import {Picker} from '@react-native-community/picker';


export default class App extends Component {  

   constructor(props){
      super(props)
      this.state = {
         stateName: [],
         data : [],
         flag : false,
         Confirmed : '',
         Active : '',
         Recovered : '',
         Death : '',
         isDataFetch : false,
         DateTime : '',
      }
      
  }

  
  getMoviesFromApiAsync = async () => {
   
   fetch('https://api.covid19india.org/data.json')
      .then((response) => response.json())
      .then((json) => this.setState({data : json.statewise}))
      .catch((error) => console.error(error))
      //.finally(() => setLoading(false));
      
    };
 async onValueChangeCat(value) {
   this.setState({stateName:value});
   //console.log("value : "+value);
   for(var i=0;i<this.state.data.length;i++){
         if(value == this.state.data[i].state){
            console.log("value : "+this.state.data[i].state);
            this.setState({flag : true});
            this.setState({Confirmed : this.state.data[i].confirmed});
            this.setState({Active : this.state.data[i].active});
            this.setState({Recovered : this.state.data[i].recovered});
            this.setState({Death : this.state.data[i].deaths});
            this.setState({DateTime : this.state.data[i].lastupdatedtime})
            this.setState({isDataFetch : true});
            break;
         }
   }
 }

  render() {
   this.getMoviesFromApiAsync();
    return (  
      <View style={styles.container}>  


      <View style={{width : '100%',height:'50%', flexDirection : 'column',
            backgroundColor : '#D9D6D5'}}>

      <View style = {{marginTop : '25%'}}>
      <Text style = {{justifyContent : 'center',alignSelf : 'center',
            fontWeight : 'bold',fontSize : 20}}>Covid 19 Metrics</Text>

      <Text style = {{justifyContent : 'center',alignSelf : 'center',
            fontSize : 20,marginTop : '5%'}}>India</Text>

      <View style = {{width : '100%',justifyContent : 'center', 
         flexDirection : 'row',marginTop : '5%'}}>
      <Text style = {{width : '30%',justifyContent : 'center',textAlign : 'center',
                     fontSize : 20,alignSelf : 'center'}}>State</Text>
      <View style = {{width : '50%',height : '100%',backgroundColor : '#fff',
               margin : '2%'}}>
                 
                 <Picker
            itemStyle={{width : '100%',justifyContent :'space-evenly',
            alignSelf :'center'}}
            mode="dropdown"
            style={{width : '100%',height : '10%',marginTop : '10%',
            padding : '5%'}}
            selectedValue={this.state.stateName}
            onValueChange={(data) => this.onValueChangeCat(data)}
          >
            {this.state.data.map((item, index) => (
              <Picker.Item
                color="#000"
                label={item.state}
                value={item.state}
                index={index}
              />
            ))}
          </Picker>
      </View>
      </View>
      </View>
      </View>
      <View style={{width : '100%',height : '50%',flexDirection : 'column'}}>

      {/* <FlatList
          data={this.state.data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.state}, {item.statecode}</Text>
          )}
        /> */}
        
        {
           !this.state.isDataFetch ? 

           <View style = {{flex: 1,width : '100%',height:'100%',marginTop : '30%'}}>
           <ActivityIndicator size="large" color="#00ff00" />
           <Text style ={{marginTop : '10%',justifyContent : 'center',alignSelf : 'center',fontSize : 20}}>Getting Data...</Text>
           </View> :



         <View style= {{marginTop : '10%'}}>

             <View style = {{flexDirection : 'row',width : '100%',
             justifyContent : 'center'}}>  
            <Text style = {{color : '#ADA8A7',fontWeight : 'bold',fontStyle :'italic'}}>As on </Text>
            <Text style = {{color : '#ADA8A7',fontWeight : 'bold',fontStyle :'italic'}}>{this.state.DateTime}</Text>
         </View>
        
         <View style = {{flexDirection : 'row',padding : '5%',marginTop : '5%'}}>
         <Text style = {styles.Textstyle}>Confirmed</Text>
         <Text style = {styles.Textstyle}>{this.state.Confirmed}</Text>
         </View>
         <View style = {{flexDirection : 'row',padding : '5%'}}>
            <Text style = {styles.Textstyle}>Active</Text>
            <Text style = {styles.Textstyle}>{this.state.Active}</Text>
         </View>
         <View style = {{flexDirection : 'row',padding : '5%'}}>
            <Text style = {styles.Textstyle}>Recovered</Text>
            <Text style = {styles.Textstyle}>{this.state.Recovered}</Text>
         </View>
         <View style = {{flexDirection : 'row',padding : '5%'}}>
            <Text style = {styles.Textstyle}>Death</Text>
            <Text style = {styles.Textstyle}>{this.state.Death}</Text>
         </View>
         </View>
        }
        
        
     

      </View>
        
      </View>  
    );  
  }  
}  
  
const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    justifyContent: 'center',  
    alignItems: 'center',  
    backgroundColor: '#F5FCFF',  
  },  
  Textstyle : {
   width : '50%',
   textAlign : 'center',
   fontSize : 17
  }
});  