import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function Nearby() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'users'), snapshot => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>People Nearby</Text>
      <FlatList 
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.photoURL || 'https://via.placeholder.com/50' }} style={styles.avatar} />
            <Text style={styles.name}>{item.name || 'User'}</Text>
            <Text style={styles.status}>{item.status || 'Available'}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  title: { fontSize:24, fontWeight:'bold', marginBottom:10 },
  card: { flexDirection:'row', alignItems:'center', padding:10, background:'#fff', marginBottom:8, borderRadius:8, shadowColor:'#000', shadowOpacity:0.1, shadowRadius:5 },
  avatar: { width:50, height:50, borderRadius:25, marginRight:10 },
  name: { fontSize:18, fontWeight:'bold' },
  status: { fontSize:14, color:'#666', marginLeft:10 },
});