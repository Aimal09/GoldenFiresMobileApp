import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TopBar from "../../components/TopBar";
import { DocketSignatureFormNavigationProp, DocketSignatureFormRouteProp } from "../../navigations/Types";
import styles from "../../styles/style";
import SignaturePad from "../../components/SignaturePad";
import { WebView } from 'react-native-webview';
import { useRef, useState } from "react";

type Props = {
    navigation: DocketSignatureFormNavigationProp;
    route: DocketSignatureFormRouteProp;
};
const DocketSignatureForm:React.FC<Props> = ({navigation,route}) => {
    const driverSignature = useRef<string>("");
    const recieverSignature = useRef<string>("");

    const [driverSign,setDriverSign] = useState("");
    const [recieverSign,setRecieverSign] = useState("");

    const data = route.params;

    const handleContinue = ()=>{
        setDriverSign(driverSignature.current);
        setRecieverSign(driverSignature.current);
        // navigation.navigate("")
    }
    return (
        <>
        <TopBar pageName="Supplier Docket" />

        <View style={signatureStyles.mainContainer}>
            <View style={signatureStyles.container}>
                <SignaturePad label="Driver Signature" signatureValue={driverSignature}/>
                <SignaturePad label="Reciever Signature" signatureValue={recieverSignature}/>
            </View>
        </View>

        <View style={{ padding: 20, paddingTop: 0 }}>
                <TouchableOpacity style={styles.btn} onPress={handleContinue}>
                    <Text style={styles.btnText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default DocketSignatureForm;

const signatureStyles = StyleSheet.create({
    mainContainer:{
        paddingHorizontal:20,
        flex:1,
    },
    container:{
        backgroundColor:"#FFFFFF",
        borderRadius:30,
        flex:1,
        padding:25,
        gap:25
    }
});