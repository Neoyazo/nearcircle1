import React, {useState} from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigation.replace('LocationPermission'))
      .catch(e => alert(e.message));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Sign In" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>No account? Sign Up</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, justifyContent:'center' },
  title: { fontSize:24, fontWeight:'bold', textAlign:'center', marginBottom:16 },
  input: { borderWidth:1, borderColor:'#ccc', padding:10, marginBottom:12, borderRadius:8 },
  link: { textAlign:'center', color:'#0077CC', marginTop:12 }
});