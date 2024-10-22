import React, { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { loginStyle } from "../../styles/componentStyle";
import styles from "../../styles/style";

const Login = () => {
    const [userType, setUserType] = useState("regular");
    return (
        <View style={loginStyle.main}>
            <Text style={loginStyle.title}>Log In</Text>

            <View style={loginStyle.tabContainer}>
                <TouchableOpacity style={userType === "regular" ? loginStyle.tab : loginStyle.tabInactive} onPress={()=>setUserType("regular")}>
                    <Text style={userType === "regular" ? loginStyle.tabText: loginStyle.tabTextInactive}>Regular User</Text>
                </TouchableOpacity>
                <TouchableOpacity style={userType !== "regular" ? loginStyle.tab : loginStyle.tabInactive} onPress={()=>setUserType("super")}>
                    <Text style={userType !== "regular" ? loginStyle.tabText: loginStyle.tabTextInactive}>Super User</Text>
                </TouchableOpacity>
            </View>

            <View style={loginStyle.inputContainer}>
                <Text style={loginStyle.label}>Full Name</Text>
                <TextInput style={loginStyle.input} placeholder="Enter your full name here" />

                <Text style={loginStyle.label}>Password</Text>
                <TextInput
                    style={loginStyle.input}
                    placeholder="Enter your password here"
                    secureTextEntry
                />

                <TouchableOpacity style={loginStyle.confirmButton}>
                    <Text style={loginStyle.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;
