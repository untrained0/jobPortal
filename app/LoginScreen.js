import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    Alert,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { useNavigation } from "@react-navigation/native";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { auth } from "../FirebaseConfig";
  import * as LocalAuthentication from "expo-local-authentication";
  
  const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  
    const navigation = useNavigation();
  
    const login = () => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("user credential", userCredential);
          const user = userCredential.user;
          console.log("user details", user);
        })
        .catch((error) => {
          Alert.alert("Error", error.message);
        });
    };
  
    useEffect(() => {
      const getBiometricStatus = async () => {
        const biometricAvailable = await LocalAuthentication.hasHardwareAsync();
        setIsBiometricSupported(biometricAvailable);
      };
      getBiometricStatus();
    }, []);
  
    const handleBiometricAuth = async () => {
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login with biometric authentication",
        cancelLabel: "Cancel",
        disableDeviceFallback: true,
      });
  
      if (biometricAuth.success) {
        navigation.navigate("Welcome");
      } else {
        Alert.alert("Biometric authentication failed");
      }
    };
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white", padding: 10, alignItems: "center" }}>
        <KeyboardAvoidingView>
          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 100 }}>
            <Text style={{ color: "#003580", fontSize: 17, fontWeight: "700" }}>Sign In</Text>
            <Text style={{ marginTop: 15, fontSize: 18, fontWeight: "500" }}>Sign In to Your Account</Text>
          </View>
  
          <View style={{ marginTop: 50 }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>Email</Text>
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Enter your email id"
                placeholderTextColor={"black"}
                style={{ fontSize: 18, borderBottomColor: "gray", borderBottomWidth: 1, marginVertical: 10, width: 300 }}
              />
            </View>
  
            <View style={{ marginTop: 15 }}>
              <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>Password</Text>
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor={"black"}
                style={{ fontSize: 18, borderBottomColor: "gray", borderBottomWidth: 1, marginVertical: 10, width: 300 }}
              />
            </View>
          </View>
  
          <Pressable
            onPress={login}
            style={{ width: 200, backgroundColor: "#003580", padding: 15, borderRadius: 7, marginTop: 50, marginLeft: "auto", marginRight: "auto" }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 17, fontWeight: "bold" }}>Login</Text>
          </Pressable>
  
          {isBiometricSupported && (
            <Pressable onPress={handleBiometricAuth} style={styles.biometricButton}>
              <Text style={styles.buttonText}>Login with Biometric</Text>
            </Pressable>
          )}
  
          <Pressable onPress={() => navigation.navigate("Signup")} style={{ marginTop: 20 }}>
            <Text style={{ textAlign: "center", color: "gray", fontSize: 17 }}>Don't have an account? Sign up</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({
    biometricButton: {
      width: 200,
      backgroundColor: "#003580",
      padding: 15,
      borderRadius: 7,
      marginTop: 50,
    },
    buttonText: {
      textAlign: "center",
      color: "white",
      fontSize: 17,
      fontWeight: "bold",
    },
  });
  