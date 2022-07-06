import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
// import { pryColor from '../App'
import SvgTest from "../Svgs/Svgtest";
import { Icon } from "react-native-elements";
import {
  useFonts,
  Piazzolla_700Bold,
  Piazzolla_600SemiBold,
} from "@expo-google-fonts/piazzolla";
import AppLoading from "expo-app-loading";
import Firebase from "../firebase";

const pryColor = "#f47b04";
const auth = Firebase.auth();
const firestore = Firebase.firestore();

const SignupScreen = () => {
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);

  const [isVisible, setisVisible] = useState(false);

  const toggleVisibility = () => {
    setisVisible(!isVisible);
  };

  const [fontsLoaded] = useFonts({
    Piazzolla_600SemiBold,
    Piazzolla_700Bold,
  });

  const Signup = async () => {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        firestore.collection("users").doc(data.user.uid).set({
          uid: data.user.uid,
          email: email,
          fullName: fullName,
        });
      })
      .catch((err) => seterror(err.message));
  };

  console.log(error);

  if (!fontsLoaded) return <AppLoading />;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={90}
    >
      <Text style={styles.signupText}>Signup to 7-putt</Text>

      <Image
        source={require("../assets/7puttLogo.jpeg")}
        style={{
          height: 150,
          width: 150,
          marginVertical: 30,
          borderRadius: 999,
        }}
      />

      <View style={{ marginTop: 30, width: "100%", alignItems: "center" }}>
        <TextInput
          style={styles.textInput}
          placeholder="Full Name"
          placeholderTextColor="slategray"
          value={fullName}
          onChangeText={(text) => setfullName(text)}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor="slategray"
          value={email}
          onChangeText={(text) => setemail(text)}
        />

        <View style={[styles.textInput, styles.passwordContainer]}>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Password"
            placeholderTextColor="slategray"
            value={password}
            onChangeText={(text) => setpassword(text)}
          />
          {isVisible ? (
            <Icon
              type="material"
              name="visibility"
              onPress={() => toggleVisibility()}
            />
          ) : (
            <Icon
              type="material"
              onPress={() => toggleVisibility()}
              name="visibility-off"
            />
          )}
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity onPress={() => Signup()} style={styles.signupBtn}>
          <Text style={styles.btnText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: pryColor,
    justifyContent: "center",
  },

  textInput: {
    marginTop: 10,
    backgroundColor: "#ffcc80",
    width: "70%",
    paddingVertical: 8,
    paddingHorizontal: 7,
    borderRadius: 10,
    fontSize: 16,
  },

  signupText: {
    fontFamily: "Piazzolla_700Bold",
    fontSize: 40,
    color: "yellow",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffcc80",
  },

  signupBtn: {
    backgroundColor: "white",
    width: "70%",
    marginTop: 30,
    borderRadius: 10,
    paddingVertical: 7,
  },

  btnText: {
    fontSize: 20,
    fontFamily: "Piazzolla_600SemiBold",
    textAlign: "center",
  },

  error: {
    fontSize: 18,
    color: "#fcd1d1",
    marginTop: 10,
  },
});
