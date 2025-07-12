import React, {useEffect} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { auth } from '../firebase';

export default function LocationPermission({ navigation }) {
  const requestLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted') return alert('Permission denied');
    let location = await Location.getCurrentPositionAsync({});
    const userDoc = doc(db, 'users', auth.currentUser.uid);
    await setDoc(userDoc, { latitude: location.coords.latitude, longitude: location.coords.longitude });
    navigation.replace('Nearby');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enable Location Access</Text>
      <Text style={styles.subtitle}>To see people nearby, enable your location.</Text>
      <Button title="Allow Location" onPress={requestLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, justifyContent:'center', alignItems:'center' },
  title: { fontSize:24, fontWeight:'bold', marginBottom:10, textAlign:'center' },
  subtitle: { fontSize:16, color:'#666', marginBottom:20, textAlign:'center' },
});