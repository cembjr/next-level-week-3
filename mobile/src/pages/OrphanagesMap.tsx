import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import {
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";

import mapMarker from "../images/map-marker.png";
import { useNavigation } from "@react-navigation/native";
import { loadAsync, useFonts } from "expo-font";

export const OrphanagesMap: React.FC = () => {
  const navigation = useNavigation();

  const handleNatigateToOrphanageDetail = () => {
    navigation.navigate("OrphanageDetails");
  };

  loadAsync({
    Nunito_700Bold
  })

  return (
    <>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: -23.5068782,
            longitude: -46.8867987,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
        >
          <Marker
            icon={mapMarker}
            coordinate={{
              latitude: -23.5068782,
              longitude: -46.8867987,
            }}
          >
            <Callout tooltip onPress={handleNatigateToOrphanageDetail}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}> Orfanato Inspire</Text>
              </View>
            </Callout>
          </Marker>
        </MapView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>2 orfanatos encontrados</Text>

          <TouchableOpacity
            style={styles.createOrphanageButton}
            onPress={handleNatigateToOrphanageDetail}
          >
            <Feather name="plus" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  calloutContainer: {
    width: 160,
    height: 50,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255,255,255, 0.8)",
    borderRadius: 16,
    justifyContent: "center",
    elevation: 3,
  },

  calloutText: {
    color: "#0089a5",
    fontSize: 14,
    fontFamily: "Nunito_700Bold",
  },

  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: "#FFF",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 3,
  },
  footerText: {
    color: "#8fa7b3",
    fontFamily: "Nunito_700Bold",
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});