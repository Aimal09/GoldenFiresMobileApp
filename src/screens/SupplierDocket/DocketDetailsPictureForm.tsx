import { DocketDetailsPictureFormNavigationProp, DocketDetailsPictureFormRouteProp } from "../../navigations/Types";
import React, { useEffect, useState } from 'react';
import { View, Image, Alert, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { launchCamera, CameraOptions } from 'react-native-image-picker';
import TopBar from "../../components/TopBar";
import styles from "../../styles/style";
import { DocketDetailsPictureFormStyles } from "../../styles/componentStyle";

type Props = {
    navigation: DocketDetailsPictureFormNavigationProp;
    route: DocketDetailsPictureFormRouteProp;
};

const DocketDetailsPictureForm: React.FC<Props> = ({ navigation, route }) => {
    const data = route.params;
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [photoUriV, setPhotoUriV] = useState(false);

    useEffect(()=>{
        setPhotoUriV(false);
    },[photoUri]);
    const openCamera = async () => {
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
            const uri = result.assets[0].uri;
            setPhotoUri(uri || null);
        }
    };

    const handleContinue = () => {
        if (photoUri === null || photoUri === '') setPhotoUriV(true);
        else navigation.navigate("DocketSignatureForm", { details: data, docketPhoto: photoUri ?? "" });
    }

    return (
    //     <SafeAreaView style={DocketDetailsPictureFormStyles.container}>
    //        <TopBar pageName="Supplier Docket" showBackButton={true} />
           
    //        <View style={DocketDetailsPictureFormStyles.contentContainer}>
    //            <Text style={DocketDetailsPictureFormStyles.title}>Docket Photo</Text>
               
    //            {photoUriV && <Text style={styles.errorTxt}>Photo is required *</Text>}
               
    //            <TouchableOpacity 
    //                style={DocketDetailsPictureFormStyles.photoContainer} 
    //                onPress={openCamera}
    //            >
    //                {!photoUri && (
    //                    <Image 
    //                        source={require("../../assets/images/camera.png")} 
    //                        style={DocketDetailsPictureFormStyles.camera} 
    //                    />
    //                )}
    //                {photoUri && (
    //                    <Image 
    //                        source={{ uri: photoUri }} 
    //                        style={DocketDetailsPictureFormStyles.image} 
    //                    />
    //                )}
    //            </TouchableOpacity>

    //            <View style={DocketDetailsPictureFormStyles.infoContainer}>
    //                <Text style={DocketDetailsPictureFormStyles.infoIcon}>i</Text>
    //                <Text style={DocketDetailsPictureFormStyles.infoText}>
    //                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    //                </Text>
    //            </View>
    //        </View>

    //        <View style={DocketDetailsPictureFormStyles.buttonContainer}>
    //            <TouchableOpacity 
    //                style={styles.btnSecondary} 
    //                onPress={() => { setPhotoUri(null); openCamera(); }}
    //            >
    //                <Text style={styles.btnSecondaryText}>
    //                    {photoUri ? "Retake Photo" : "Take Photo"}
    //                </Text>
    //            </TouchableOpacity>

    //            <TouchableOpacity 
    //                style={styles.btn} 
    //                onPress={handleContinue}
    //            >
    //                <Text style={styles.btnText}>Continue</Text>
    //            </TouchableOpacity>
    //        </View>
    //    </SafeAreaView>
        <View style={{padding: 20, flex: 1}}>
            <TopBar pageName="Supplier Docket" showBackButton={true} />

            
            <View style={{ paddingHorizontal: 20, flex: 1 }}>
                <View style={DocketDetailsPictureFormStyles.container}>
                    {photoUriV && <Text style={styles.errorTxt}>Photo is required *</Text>}
                    <Text style={DocketDetailsPictureFormStyles.title}>Docket Photo</Text>
                    <TouchableOpacity style={DocketDetailsPictureFormStyles.button} onPress={openCamera}>
                        {!photoUri && <Image source={require("../../assets/images/camera.png")} style={DocketDetailsPictureFormStyles.camera} />}
                        {photoUri && (
                            <Image source={{ uri: photoUri }} style={DocketDetailsPictureFormStyles.image} />
                        )}
                    </TouchableOpacity>

                    {/* <View style={{padding: 0}}> */}
                    <TouchableOpacity style={styles.btn} onPress={() => { setPhotoUri(null); openCamera(); }}>
                        <Text style={styles.btnText}>{photoUri == null ? "Take Photo" : "Retake Photo"}</Text>
                    </TouchableOpacity>
                    {/* </View> */}
                    {/* <View style={DocketDetailsPictureFormStyles.info}>
                        <Text style={DocketDetailsPictureFormStyles.infoIcon}>i</Text>
                        <Text style={DocketDetailsPictureFormStyles.infoText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Text>
                    </View> */}
                </View>
            </View>


            <View style={{ padding: 20, paddingTop: 0 }}>
                <TouchableOpacity style={styles.btn} onPress={() => handleContinue()}>
                    <Text style={styles.btnText}>Continue</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

export default DocketDetailsPictureForm;
