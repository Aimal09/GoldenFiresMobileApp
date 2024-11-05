import { DocketDetailsPictureFormNavigationProp, DocketDetailsPictureFormRouteProp } from "../../navigations/Types";
import React, { useState } from 'react';
import { View, Image, Alert, TouchableOpacity, Text } from 'react-native';
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

    return (
        <>
            <TopBar pageName="Supplier Docket" />

            <View style={{ paddingHorizontal: 20, flex: 1 }}>
                <View style={DocketDetailsPictureFormStyles.container}>
                    <Text style={DocketDetailsPictureFormStyles.title}>Docket Photo</Text>
                    <TouchableOpacity style={DocketDetailsPictureFormStyles.button} onPress={openCamera}>
                        {!photoUri && <Image source={require("../../assets/images/camera.png")} style={DocketDetailsPictureFormStyles.camera} />}
                        {photoUri && (
                            <Image source={{ uri: photoUri }} style={DocketDetailsPictureFormStyles.image} />
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={() => { setPhotoUri(null); openCamera(); }}>
                        <Text style={styles.btnText}>{photoUri ==null ? "Take Photo" : "Retake Photo" }</Text>
                    </TouchableOpacity>

                    <View style={DocketDetailsPictureFormStyles.info}>
                        <Text style={DocketDetailsPictureFormStyles.infoIcon}>i</Text>
                        <Text style={DocketDetailsPictureFormStyles.infoText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Text>
                    </View>
                </View>
            </View>


            <View style={{ padding: 20, paddingTop: 0 }}>
                <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate("DocketSignatureForm", {details:data, docketPhoto:photoUri??""}) }}>
                    <Text style={styles.btnText}>Continue</Text>
                </TouchableOpacity>
            </View>

        </>
    );
}

export default DocketDetailsPictureForm;
