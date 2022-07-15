import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const pryColor = "#f47b04";

const ResetPassword = () => {
  const { params } = useRoute();

  return (
    <View style={styles.container}>
      <Text style={{ color: "yellow", fontSize: 24 }}>Password Reset</Text>
      <Text
        style={{
          maxWidth: "80%",
          marginTop: 20,
          fontSize: 20,
          textAlign: "center",
          color: "white",
        }}
      >{`A Link has been sent to ${params.email}  to reset your password`}</Text>
      <Text
        style={{
          maxWidth: "80%",
          marginTop: 20,
          textAlign: "center",
          color: "white",
        }}
      >
        Ensure You check Your Spam/Junk if you can't find the mail
      </Text>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: pryColor,
    justifyContent: "center",
  },
});
