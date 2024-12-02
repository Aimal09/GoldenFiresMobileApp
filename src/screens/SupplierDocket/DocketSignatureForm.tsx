import { Text, TouchableOpacity, View } from "react-native";
import TopBar from "../../components/TopBar";
import { DocketSignatureFormNavigationProp, DocketSignatureFormRouteProp } from "../../navigations/Types";
import styles from "../../styles/style";
import SignaturePad from "../../components/SignaturePad";
import { useRef, useState } from "react";
import { signatureStyles } from "../../styles/componentStyle";
import { SignatureViewRef } from "react-native-signature-canvas";

type Props = {
    navigation: DocketSignatureFormNavigationProp;
    route: DocketSignatureFormRouteProp;
};
const DocketSignatureForm:React.FC<Props> = ({navigation,route}) => {
    const driverSignature = useRef<string>("");
    const recieverSignature = useRef<string>("");

    const [driverSign,setDriverSign] = useState("");
    const [recieverSign,setRecieverSign] = useState("");
    const [dsign,setDSign] = useState<SignatureViewRef | null>();
    const [dsign2,setDSign2] = useState<SignatureViewRef | null>();

    const data = route.params;
    
    const handleContinue = ()=>{
        setDriverSign(driverSignature.current);
        setRecieverSign(recieverSignature.current);
        //navigation.navigate("Overview", {details:data, driverSign:driverSignature.current,recieverSign:recieverSignature.current})
    }

    const clear = () => {
        driverSignature.current = "";
    }

    const setAgain = () => {
        setDSign2(dsign);
    }
    return (
        <>
        <TopBar pageName="Supplier Docket" showBackButton={false}/>
        <TouchableOpacity onPress={clear}><Text>clear</Text></TouchableOpacity>
        <TouchableOpacity onPress={setAgain}><Text>Again</Text></TouchableOpacity>
        <View style={signatureStyles.mainContainer}>
            <View style={signatureStyles.container}>
                <SignaturePad label="Driver Signature" signatureValue={driverSignature} sign={dsign} returnSign={s=> setDSign(s)}/>
                {dsign2&&<SignaturePad label="Reciever Signature" signatureValue={recieverSignature} sign={dsign2}/>}
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
