// import { Text, TouchableOpacity, View } from "react-native";
// import TopBar from "../../components/TopBar";
// import { DocketSignatureFormNavigationProp, DocketSignatureFormRouteProp } from "../../navigations/Types";
// import styles from "../../styles/style";
// import SignaturePad from "../../components/SignaturePad";
// import { useRef, useState } from "react";
// import { signatureStyles } from "../../styles/componentStyle";
// import { SignatureViewRef } from "react-native-signature-canvas";
// import { ScrollView } from "react-native-gesture-handler";

// type Props = {
//     navigation: DocketSignatureFormNavigationProp;
//     route: DocketSignatureFormRouteProp;
// };
// const DocketSignatureForm:React.FC<Props> = ({navigation,route}) => {
//     const driverSignature = useRef<string>("");
//     const recieverSignature = useRef<string>("");

//     const [driverSign,setDriverSign] = useState("");
//     const [recieverSign,setRecieverSign] = useState("");
//     const [dsign,setDSign] = useState<SignatureViewRef | null>();
//     const [dsign2,setDSign2] = useState<SignatureViewRef | null>();

//     const data = route.params;
    
//     const handleContinue = ()=>{
//         setDriverSign(driverSignature.current);
//         setRecieverSign(recieverSignature.current);
//         navigation.navigate("Overview", {details:data, driverSign:driverSignature.current,recieverSign:recieverSignature.current})
//     }

//     return (
//         <>
//         <TopBar pageName="Supplier Docket" showBackButton={false}/>

//         <View style={signatureStyles.mainContainer}>
//             <View style={signatureStyles.container}>
//                 <SignaturePad label="Driver Signature" signatureValue={driverSignature} sign={dsign} returnSign={s=> setDSign(s)}/>
//                 {<SignaturePad label="Reciever Signature" signatureValue={recieverSignature} sign={dsign2}/>}
//             </View>
//         </View>

//         <View style={{ padding: 10, paddingTop: 0 }}>
//                 <TouchableOpacity style={styles.btn} onPress={handleContinue}>
//                     <Text style={styles.btnText}>Continue</Text>
//                 </TouchableOpacity>
//             </View>
//         </>
//     );
// }

// export default DocketSignatureForm;





import { Text, TouchableOpacity, View } from "react-native";
import TopBar from "../../components/TopBar";
import { DocketSignatureFormNavigationProp, DocketSignatureFormRouteProp } from "../../navigations/Types";
import styles from "../../styles/style";
import SignaturePad from "../../components/SignaturePad";
import { useRef, useState } from "react";
import { signatureStyles } from "../../styles/componentStyle";
import { SignatureViewRef } from "react-native-signature-canvas";
import { ScrollView } from "react-native-gesture-handler";
import React from "react";

type Props = {
    navigation: DocketSignatureFormNavigationProp;
    route: DocketSignatureFormRouteProp;
};

const DocketSignatureForm: React.FC<Props> = ({ navigation, route }) => {
    const driverSignature = useRef<string>("");
    const recieverSignature = useRef<string>("");

    const [driverSign, setDriverSign] = useState("");
    const [recieverSign, setRecieverSign] = useState("");
    const [dsign, setDSign] = useState<SignatureViewRef | null>();
    const [dsign2, setDSign2] = useState<SignatureViewRef | null>();
    const [error, setError] = useState(false); // Error state

    const data = route.params;

    const handleContinue = () => {
        if (!driverSignature.current || !recieverSignature.current) {
            setError(true); // Show error message
            return;
        }
        setError(false); // Hide error if valid
        setDriverSign(driverSignature.current);
        setRecieverSign(recieverSignature.current);
        navigation.navigate("Overview", { details: data, driverSign: driverSignature.current, recieverSign: recieverSignature.current });
    };

    return (
        <>
            <TopBar pageName="Supplier Docket" showBackButton={false} />
                <View style={signatureStyles.mainContainer}>
                    <View style={signatureStyles.container}>
                        {/* Driver Signature */}
                        {error && !driverSignature.current && (
                            <Text style={{ color: "red", marginBottom: 1 }}>Driver signature is required</Text>
                        )}
                        <SignaturePad label="Driver Signature" signatureValue={driverSignature} sign={dsign} returnSign={(s) => setDSign(s)} />

                        {/* Receiver Signature */}
                        {error && !recieverSignature.current && (
                            <Text style={{ color: "red", marginBottom: 1 }}>Receiver signature is required</Text>
                        )}
                        <SignaturePad label="Receiver Signature" signatureValue={recieverSignature} sign={dsign2} />
                    </View>
                </View>

            <View style={{ padding: 20, paddingTop: 0 }}>
                <TouchableOpacity style={styles.btn} onPress={handleContinue}>
                    <Text style={styles.btnText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default DocketSignatureForm;
