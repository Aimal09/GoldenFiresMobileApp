import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Alert
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import TopBar from '../../components/TopBar';

interface UserWithAccess {
    email: string;
    access: number[];
}

interface UserProfile {
    fullName: string;
    phoneNumber: string;
    email: string;
    role: string;
    profileImage: string;
    access: number[];
    userWithAccess: UserWithAccess[];
}
const UserProfile = () => {
    const { userProfile, updateProfile } = useAuth();
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState<UserProfile>({
        fullName: userProfile?.fullName || '',
        phoneNumber: userProfile?.phoneNumber || '',
        profileImage: userProfile?.profileImage || '',
        email: userProfile?.email || '',
        role: userProfile?.role || '',
        access: userProfile?.access || [],
        userWithAccess: userProfile?.userWithAccess || [],
    });

    const handleUpdate = async () => {
        try {
            if (!formData.fullName.trim()) {
                Alert.alert('Error', 'Full name is required');
                return;
            }

            await updateProfile({
                ...userProfile!,
                ...formData,
            });
            setEditing(false);
            Alert.alert('Success', 'Profile updated successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to update profile');
        }
    };

    return (
        <>
            <TopBar pageName="Profile" showBackButton={true} />
            <ScrollView style={styles.container}>
                <View style={styles.profileHeader}>
                    <Image
                        source={
                            formData.profileImage
                                ? { uri: formData.profileImage }
                                : require('../assets/default-avatar.png')
                        }
                        style={styles.profileImage}
                    />
                    <Text style={styles.role}>{userProfile?.role}</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Full Name</Text>
                        {editing ? (
                            <TextInput
                                style={styles.input}
                                value={formData.fullName}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, fullName: text }))}
                                placeholder="Enter full name"
                            />
                        ) : (
                            <Text style={styles.value}>{formData.fullName}</Text>
                        )}
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Phone Number</Text>
                        {editing ? (
                            <TextInput
                                style={styles.input}
                                value={formData.phoneNumber}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, phoneNumber: text }))}
                                placeholder="Enter phone number"
                                keyboardType="phone-pad"
                            />
                        ) : (
                            <Text style={styles.value}>{formData.phoneNumber}</Text>
                        )}
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Email</Text>
                        <Text style={[styles.value, styles.readonly]}>{userProfile?.email}</Text>
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Access Level</Text>
                        <Text style={[styles.value, styles.readonly]}>
                            {userProfile?.access?.join(', ')}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.button, editing ? styles.saveButton : styles.editButton]}
                    onPress={() => {
                        if (editing) {
                            handleUpdate();
                        } else {
                            setEditing(true);
                        }
                    }}
                >
                    <Text style={styles.buttonText}>
                        {editing ? 'Save Changes' : 'Edit Profile'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    profileHeader: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    role: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    form: {
        backgroundColor: '#fff',
        marginTop: 10,
        padding: 20,
    },
    fieldContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        color: '#333',
        paddingVertical: 8,
    },
    readonly: {
        color: '#666',
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    button: {
        margin: 20,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#007AFF',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default UserProfile;