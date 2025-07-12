import React, {useState} from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import * as Google from 'expo-google-app-auth';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => navigation.replace('LocationPermission'))
      .catch(e => alert(e.message));
  };
  const handleGoogle = async () => {
    const result = await Google.logInAsync({ 
      androidClientId: 'YOUR_ANDROID_CLIENT_ID', 
      iosClientId: 'YOUR_IOS_CLIENT_ID',
      scopes: ['profile', 'email'],
    });
    if(result.type === 'success'){
      const credential = GoogleAuthProvider.credential(result.idToken);
      await signInWithCredential(auth, credential);
      navigation.replace('LocationPermission');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text style={styles.or}>or</Text>
      <Button title="Continue with Google" onPress={handleGoogle} />
      <Text style={styles.link} onPress={() => navigation.navigate('SignIn')}>Already have an account? Sign In</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, justifyContent:'center' },
  title: { fontSize:24, fontWeight:'bold', textAlign:'center', marginBottom:16 },
  input: { borderWidth:1, borderColor:'#ccc', padding:10, marginBottom:12, borderRadius:8 },
  or: { textAlign:'center', marginVertical:8 },
  link: { textAlign:'center', color:'#0077CC', marginTop:12 }
});