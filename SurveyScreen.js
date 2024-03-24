// SurveyScreen.js

import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet,Alert } from "react-native";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    // apiKey: "AIzaSyBKODnBfg9S2Cydnz-yRFyJuCkM0OS5Daw",
    // authDomain: "arlocation-f4ab2.firebaseapp.com",
    // projectId: "arlocation-f4ab2",
    // storageBucket: "arlocation-f4ab2.appspot.com",
    // messagingSenderId: "353570558425",
    // appId: "1:353570558425:web:604ffd1d745d38afd949c8"
    apiKey: "AIzaSyBuOB6mNYlzvyogVJAeWIjK8VunH0Hkkv8",
    authDomain: "jobgo-49784.firebaseapp.com",
    projectId: "jobgo-49784",
    storageBucket: "jobgo-49784.appspot.com",
    messagingSenderId: "612092656820",
    appId: "1:612092656820:web:6532c819185bd53230abe1",
    measurementId: "G-ZZYZK191EE"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const SurveyScreen = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [feedback, setFeedback] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [satisfactionLevel, setSatisfactionLevel] = useState(3); // Default to level 3

  const submitSurvey = async () => {
    try {
      // Validate input fields
      if (!name || !age || !feedback || !selectedGender) {
        Alert.alert('Error', 'Please fill out all fields.');
        return;
      }

      // Store survey responses in Firebase Firestore
      await addDoc(collection(db, 'surveys'), {
        name,
        age,
        gender: selectedGender,
        feedback,
        satisfactionLevel,
        timestamp: serverTimestamp(),
      });

      // Show success message
      Alert.alert('Success', 'Survey submitted successfully!');
      
      // Clear input fields
      setName('');
      setAge('');
      setFeedback('');
      setSelectedGender('');
      setSatisfactionLevel(3);
    } catch (error) {
      console.error('Error submitting survey:', error);
      // Display error message to the user
      Alert.alert('Error', 'Error submitting survey. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text style={styles.label}>Enter your age:</Text>
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={(text) => setAge(text)}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Select your gender:</Text>
      <Picker
        selectedValue={selectedGender}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedGender(itemValue)}
      >
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Other" value="other" />
      </Picker>
      <Text style={styles.label}>Feedback:</Text>
      <TextInput
        style={[styles.input, styles.feedbackInput]}
        placeholder="Feedback"
        value={feedback}
        onChangeText={(text) => setFeedback(text)}
        multiline
      />
      <Text style={styles.label}>Rate your satisfaction level:</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={5}
        step={1}
        value={satisfactionLevel}
        onValueChange={(value) => setSatisfactionLevel(value)}
      />
      <Text style={styles.sliderValue}>{satisfactionLevel}</Text>
      <Button title="Submit Survey" onPress={submitSurvey} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "left",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  feedbackInput: {
    height: 80,
  },
  picker: {
    height: 10,
    width: "100%",
    marginBottom: 180,
    borderColor: "white",
    borderWidth: 1,
  },
  slider: {
    width: "100%",
    marginBottom: 10,
  },
  sliderValue: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default SurveyScreen;