import { DocketDetailsPictureFormNavigationProp, DocketDetailsPictureFormRouteProp } from "../../navigations/Types";
import React, { useEffect, useState } from 'react';
import { View, Image, Alert, TouchableOpacity, Text, SafeAreaView, PermissionsAndroid, Platform } from 'react-native';
import { launchCamera, CameraOptions } from 'react-native-image-picker';
import TopBar from "../../components/TopBar";
import styles from "../../styles/style";
import { DocketDetailsPictureFormStyles } from "../../styles/componentStyle";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
    navigation: DocketDetailsPictureFormNavigationProp;
    route: DocketDetailsPictureFormRouteProp;
};

const DocketDetailsPictureForm: React.FC<Props> = ({ navigation, route }) => {
    const data = route.params;
    const [photos, setPhotos] = useState<(string | null)[]>([null]);
    const [showError, setShowError] = useState(false);
    // plus.tsx
    const plusIcon = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVR4nO2UQQrCMBBFc4SeQHsE7yReQryCJ/ImWq/RE1QPIDhZBMZApE1Mogi68EGgafP/n59MiPlHAS7AG1hKuTe2ZAZcgWeH5AHsgLkW3oB7h6CpD8BSA58DkrpegblG4FXcgWOXxEKinv+QmEjcJLYSqyQrgRdwSwVfAsuhy0k9tmP7+SQxkWwuMPsWvExg2hwtJEPho0//i1yVxhxpYsmkRYoJeQPJNlKEBkKPFQAAAABJRU5ErkJggg==`;
    useEffect(()=>{
        setShowError(false);
    },[ photos]);

    const addMorePhotos = () => {
        if (photos.length < 3) {
            setPhotos(prev => [...prev, null]);
        }
    };

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: "Camera Permission",
                        message: "App needs access to your camera",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return true;
    };

    const openCamera = async (index: number) => {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) {
            Alert.alert('Permission Denied', 'Please grant camera permission to use this feature');
            return;
        }

        const options: CameraOptions = {
            mediaType: 'photo',
            saveToPhotos: true,
            cameraType: 'back',
        };

        const result = await launchCamera(options);

        if (result.didCancel) {
            Alert.alert('Camera was closed or action canceled');
        } else if (result.errorCode) {
            Alert.alert('Error', result.errorMessage || 'Unknown error');
        } else if (result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri || null;
            setPhotos(prev => {
                const newPhotos = [...prev];
                newPhotos[index] = uri;
                return newPhotos;
            });
        }
    };

    const handleContinue = () => {
        // if (photoUri === null || photoUri === '') setPhotoUriV(true);
        // else navigation.navigate("DocketSignatureForm", { details: data, docketPhoto: photoUri ?? "" });

        const hasAtLeastOnePhoto = photos.some(photo => photo !== null);
        
        if (!hasAtLeastOnePhoto) {
            setShowError(true);
            return;
        }

        // navigation.navigate("DocketSignatureForm", { 
        //     details: data, 
        //     docketPhotos: photos.filter(photo => photo !== null)
        // });

        navigation.navigate("DocketCommentForm", { 
            details: data,
            docketPhotos: photos.filter(photo => photo !== null) // Only send non-null photos
        });
    }
    const renderPhotoContent = (index: number) => {
        const hasPhoto = photos[index] !== null;
        const isLastPhoto = index === photos.length - 1;
        const canAddMore = photos.length < 3;

        return (
            <React.Fragment key={index}>
                <View style={styles.photoSection}>
                    <Text style={DocketDetailsPictureFormStyles.title}>
                        {index === 0 ? 'Docket Photo' : `Additional Photo ${index}`}
                    </Text>
                    <TouchableOpacity 
                        style={DocketDetailsPictureFormStyles.button} 
                        onPress={() => openCamera(index)}
                    >
                        {!photos[index] ? (
                            <Image 
                                source={require("../../assets/images/camera.png")} 
                                style={DocketDetailsPictureFormStyles.camera} 
                            />
                        ) : (
                            <Image 
                                source={{ uri: photos[index] }} 
                                style={DocketDetailsPictureFormStyles.image} 
                            />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.btn} 
                        onPress={() => {
                            setPhotos(prev => {
                                const newPhotos = [...prev];
                                newPhotos[index] = null;
                                return newPhotos;
                            });
                            openCamera(index);
                        }}
                    >
                        <Text style={styles.btnText}>
                            {hasPhoto ? "Retake Photo" : "Take Photo"}
                        </Text>
                    </TouchableOpacity>
                </View>

                {hasPhoto && isLastPhoto && canAddMore && (
                    <TouchableOpacity 
                        style={styles.addMoreButton} 
                        onPress={addMorePhotos}
                    >
                        <Image 
                            source={{uri: plusIcon}} 
                            style={styles.plusIcon} 
                        />
                        <Text style={styles.addMoreText}>Add More Photos</Text>
                    </TouchableOpacity>
                )}
            </React.Fragment>
        );
    };
    
    return (
        <View style={{padding: 20, flex: 1}}>
            <TopBar pageName="Supplier Docket" showBackButton={true} />

            <ScrollView style={{ paddingHorizontal: 20, flex: 1 }}>
                <View style={DocketDetailsPictureFormStyles.container}>
                    {showError && <Text style={styles.errorTxt}>At least one photo is required *</Text>}
                    {photos.map((_, index) => renderPhotoContent(index))}
                </View>
            </ScrollView>

            <View style={{ padding: 20, paddingTop: 0 }}>
                <TouchableOpacity style={styles.btn} onPress={() => handleContinue()}>
                    <Text style={styles.btnText}>Continue</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

export default DocketDetailsPictureForm;
