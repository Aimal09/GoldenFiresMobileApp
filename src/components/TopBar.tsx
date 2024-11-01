import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { topbarStyles } from "../styles/componentStyle";

interface User {
  userName: string;
  profileImageUrl: any; // In React Native, images are imported and used as objects
}

interface TopBarProps {
  pageName?: string;
  showBackButton?:boolean;
}

const TopBar: React.FC<TopBarProps> = ({ pageName, showBackButton=true }) => {
  const navigation = useNavigation();
  const user: User = { userName: "User Name", profileImageUrl: require("../assets/images/profile-photo.png") };

  return (
    <View style={topbarStyles.topBar}>
      <View style={topbarStyles.leftSection}>
        {showBackButton &&<TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../assets/images/chevron-left.png")} style={topbarStyles.chevronIcon} />
        </TouchableOpacity>}
        <Text style={topbarStyles.pageTitle}>{pageName}</Text>
      </View>

      <View style={topbarStyles.rightSection}>
        <TouchableOpacity
          style={topbarStyles.profileSection}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image source={user.profileImageUrl} style={topbarStyles.profileImage} />
          <Text style={topbarStyles.userName}>{user.userName}</Text>
          <Image source={require("../assets/images/chevron-right.png")} style={topbarStyles.chevronIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={topbarStyles.notificationSection}
          onPress={() => navigation.navigate("Notification")}
        >
          <Image source={require("../assets/images/notification-icon.png")} style={topbarStyles.notificationIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopBar;
