import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { loginStyle } from "../../styles/componentStyle";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
    const { login } = useAuth();
    const [userType, setUserType] = useState("regular");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!fullName || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        try {
            setIsLoading(true);
            await login({
                email: fullName, 
                password: password
            });

        } catch (error) {
            Alert.alert("Login Failed", "Please check your credentials and try again");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={loginStyle.main}>
            <Text style={loginStyle.title}>Log In</Text>

            <View style={loginStyle.tabContainer}>
                <TouchableOpacity 
                    style={userType === "regular" ? loginStyle.tab : loginStyle.tabInactive} 
                    onPress={() => setUserType("regular")}
                >
                    <Text style={userType === "regular" ? loginStyle.tabText : loginStyle.tabTextInactive}>
                        Regular User
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={userType !== "regular" ? loginStyle.tab : loginStyle.tabInactive} 
                    onPress={() => setUserType("super")}
                >
                    <Text style={userType !== "regular" ? loginStyle.tabText : loginStyle.tabTextInactive}>
                        Super User
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={loginStyle.inputContainer}>
                <Text style={loginStyle.label}>Full Name</Text>
                <TextInput 
                    style={loginStyle.input} 
                    placeholder="Enter your full name here"
                    value={fullName}
                    onChangeText={setFullName}
                />

                <Text style={loginStyle.label}>Password</Text>
                <TextInput
                    style={loginStyle.input}
                    placeholder="Enter your password here"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity 
                    style={[
                        loginStyle.confirmButton,
                        isLoading && { opacity: 0.7 }
                    ]}
                    onPress={handleLogin}
                    disabled={isLoading}
                >
                    <Text style={loginStyle.confirmButtonText}>
                        {isLoading ? "Loading..." : "Confirm"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;
