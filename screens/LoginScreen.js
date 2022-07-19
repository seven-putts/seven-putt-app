import {
  Alert,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import SvgTest from "../Svgs/Svgtest";
import { Icon } from "react-native-elements";
import {
  useFonts,
  Piazzolla_700Bold,
  Piazzolla_600SemiBold,
} from "@expo-google-fonts/piazzolla";
import AppLoading from "expo-app-loading";
import Firebase from "../firebase";
import { useNavigation } from "@react-navigation/native";

const pryColor = "#f47b04";
const auth = Firebase.auth();

const LoginScreen = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);
  const [isVisible, setisVisible] = useState(false);

  const navigation = useNavigation();

  const toggleVisibility = () => {
    setisVisible(!isVisible);
  };

  const handleLogin = async () => {
    await auth
      .signInWithEmailAndPassword(email.toLowerCase(), password)
      .catch((err) => seterror(err.message));
  };

  const handleForgotPassword = () => {
    if (email == "") return Alert.alert("Please enter mail to reset password");

    auth
      .sendPasswordResetEmail(email.toLowerCase())
      .then(function () {
        alert("Please check your mail to reset password");
        navigation.navigate("Reset", { email: email });
      })
      .catch(function (e) {
        seterror(e.message);
      });
  };

  const [fontsLoaded] = useFonts({
    Piazzolla_600SemiBold,
    Piazzolla_700Bold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={90}
    >
      <Text style={styles.loginText}>Login</Text>

      <Image
        source={require("../assets/7puttLogo.jpeg")}
        style={{
          height: 150,
          width: 150,
          marginVertical: 40,
          borderRadius: 999,
        }}
      />

      <View style={{ marginTop: 30, width: "100%", alignItems: "center" }}>
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

        <TouchableOpacity onPress={() => handleLogin()} style={styles.loginBtn}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleForgotPassword()}>
          <Text
            style={{
              color: "yellow",
              fontSize: 18,
              textDecorationStyle: "solid",
              textDecorationLine: "underline",
              marginTop: 14,
            }}
          >
            Forgot Password ?
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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

  loginText: {
    fontFamily: "Piazzolla_700Bold",
    fontSize: 40,
    color: "yellow",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffcc80",
  },

  loginBtn: {
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
    width: 300,
    textAlign: "center",
  },
});
