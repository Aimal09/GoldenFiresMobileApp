import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

interface ModalProps {
    title?: string;
    children: React.ReactNode;
    onClose: () => void;
    visible: boolean;
    hideClose?: boolean;
}

const { height: screenHeight } = Dimensions.get('window');

const FullScreenModal: React.FC<ModalProps> = ({ title, children, onClose, visible, hideClose=false }) => {
    return (

        <GestureHandlerRootView style={styles.modalContainerMain}>
            <SafeAreaView style={{flex:1}}>
                <View style={styles.modalContainer}>
                    {/* Title Section */}
                    {(title && !hideClose )&& <View style={styles.header}>
                        {title&&<Text style={styles.title}>{title}</Text>}
                        {!hideClose&&<TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeText}>x</Text>
                        </TouchableOpacity>}
                    </View>}

                    {/* Modal Content */}
                    <View style={styles.contentContainer}>
                        <ScrollView>
                            {children}
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    modalContainerMain: {
        flex: 1,
        backgroundColor: "#0005",
        position: "absolute",
        zIndex: 2,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        padding: 60,
        paddingBottom: 30,
        flexDirection:"row",
        alignItems:"center"
    },
    modalContainer: {
        flex: 0,
        borderRadius: 25,
        backgroundColor: 'white',
        paddingTop: 20,
        height: "auto",
        overflow: "hidden",
        display: "flex",
        padding: 30
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
    },
    closeButton: {
        backgroundColor: "#eee",
        borderRadius: 70,
        width: 35,
        aspectRatio: 1 / 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    closeText: {
        fontSize: 22,
        color: '#444',
        marginTop: -6
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#444',
    },
    contentContainer: {
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default FullScreenModal;
