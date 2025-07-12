import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Onboarding({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to NearCircle</Text>
      <Text style={styles.subtitle}>Connect with people nearby in real time</Text>
      <Button title="Get Started" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', padding:20 },
  title: { fontSize:28, fontWeight:'bold', marginBottom:10 },
  subtitle: { fontSize:16, textAlign:'center', marginBottom:20, color:'#666' },
});