import React from "react";
import { Text, View } from "react-native";

export const OrphanageDetails: React.FC = () => {
  return (
    <>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          height: '100%'
        }}
      >
        <Text style={{ color: "#FFF" }}>Orphanage Details</Text>
      </View>
    </>
  );
};
