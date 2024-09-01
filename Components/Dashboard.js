import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DashboardScreen = () => {
  const [location, setLocation] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const handleNavigation = (screen) => {
    closeDrawer();
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      {/* Hamburger Menu Button */}
      <TouchableOpacity style={styles.drawerButton} onPress={toggleDrawer}>
        <Ionicons name="menu-outline" size={30} color="white" />
      </TouchableOpacity>

      {/* Map Display */}
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your Location"
            pinColor="blue"
          />
        </MapView>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}

      {/* Bottom Navigation Components */}
      <ScrollView
        style={styles.bottomDrawer}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="map-outline" size={24} color="black" />
          <Text style={styles.navText}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="compass-outline" size={24} color="black" />
          <Text style={styles.navText}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="heart-outline" size={24} color="black" />
          <Text style={styles.navText}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('EventsScreen')}
        >
          <Ionicons name="calendar-outline" size={24} color="black" />
          <Text style={styles.navText}>Events</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Custom Drawer */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={drawerVisible}
        onRequestClose={toggleDrawer}
      >
        <View style={styles.modalContainer}>
          <View style={styles.drawer}>
            <TouchableOpacity onPress={closeDrawer} style={styles.closeButton}>
              <Ionicons name="close-outline" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNavigation("Dashboard")}
              style={styles.drawerItem}
            >
              <Ionicons name="map-outline" size={24} color="white" />
              <Text style={styles.drawerText}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNavigation("ActivitiesScreen")}
              style={styles.drawerItem}
            >
              <Ionicons name="walk-outline" size={24} color="white" />
              <Text style={styles.drawerText}>Activities</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNavigation("CommunityFeedbackScreen")}
              style={styles.drawerItem}
            >
              <Ionicons name="people-outline" size={24} color="white" />
              <Text style={styles.drawerText}>Community Feedback</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNavigation("TrailReportsScreen")}
              style={styles.drawerItem}
            >
              <Ionicons name="alert-circle-outline" size={24} color="white" />
              <Text style={styles.drawerText}>Trail Reports</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNavigation("Eventcreat")}
              style={styles.drawerItem}
            >
              <Ionicons name="calendar-outline" size={24} color="white" />
              <Text style={styles.drawerText}>Create Events</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNavigation("BadgesScreen")}
              style={styles.drawerItem}
            >
              <Ionicons name="trophy-outline" size={24} color="white" />
              <Text style={styles.drawerText}>Badges & Contests</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNavigation("UserProfile")}
              style={styles.drawerItem}
            >
              <Ionicons name="person-outline" size={24} color="white" />
              <Text style={styles.drawerText}>Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNavigation("Settings")}
              style={styles.drawerItem}
            >
              <Ionicons name="settings-outline" size={24} color="white" />
              <Text style={styles.drawerText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNavigation("Login")}
              style={styles.drawerItem}
            >
              <Ionicons name="log-out-outline" size={24} color="white" />
              <Text style={styles.drawerText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleNavigation("EmergencyScreen")}
              style={styles.emergencyButton}
            >
              <Ionicons name="alert-circle-outline" size={24} color="white" />
              <Text style={styles.emergencyButtonText}>Emergency Info</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  drawerButton: {
    position: "absolute",
    top: 15,
    left: 16,
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 50,
  },
  loadingText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    color: "white",
  },
  bottomDrawer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
  },
  scrollViewContent: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  navButton: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  navText: {
    marginTop: 5,
    color: "black",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawer: {
    flex: 1,
    backgroundColor: "#022B42",
    paddingTop: 20,
    paddingLeft: 20,
  },
  closeButton: {
    marginBottom: 20,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  drawerText: {
    color: "white",
    marginLeft: 20,
    fontSize: 18,
  },
  emergencyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: "70%",
  },
  emergencyButtonText: {
    color: "white",
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DashboardScreen;