import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../utils/Colors";
import * as LocalAuthentication from "expo-local-authentication";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const register = () => {
    if (email === "" || password === "" || phone === "") {
      Alert.alert(
        "Invalid Details",
        "Please enter all the credentials",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } else {
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredentials) => {
          const user = userCredentials._tokenResponse.email;
          const uid = auth.currentUser.uid;

          setDoc(doc(db, "users", `${uid}`), {
            email: user,
            phone: phone,
            image: image,
          });

          navigation.navigate("Welcome");
        }
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={{ color: "#FE7654", fontSize: 17, fontWeight: "700" }}>
          Register
        </Text>

        <Text style={{ marginTop: 15, fontSize: 18, fontWeight: "500" }}>
          Create an Account
        </Text>

        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={
                image == null
                  ? require("./../assets/images/kemal.jpg")
                  : { uri: image }
              }
              style={styles.profileImage}
            />
            <View style={styles.cameraIcon}>
              <MaterialIcons
                name="photo-camera"
                size={24}
                color={Colors.GRAY}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 50, width: "100%" }}>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter your email"
              style={styles.input}
            />
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Enter your password"
              secureTextEntry={true}
              style={styles.input}
            />
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholder="Enter your phone number"
              style={styles.input}
            />
          </View>
        </View>

        

        <Pressable onPress={register} style={styles.registerButton}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Login")}
          style={{ marginTop: 20 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 17 }}>
            Already have an account? Sign In
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: Colors.BLACK,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 10,
    zIndex: 9999,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "gray",
  },
  input: {
    fontSize: 18,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 10,
    width: 300,
  },
  biometricButton: {
    width: 200,
    backgroundColor: "#003580",
    padding: 15,
    borderRadius: 7,
    marginTop: 50,
  },
  registerButton: {
    width: 200,
    backgroundColor: "#FE7654",
    padding: 15,
    borderRadius: 7,
    marginTop: 
 50,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
});
