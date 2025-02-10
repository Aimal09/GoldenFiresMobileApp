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
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    const [driverSign, setDriverSign] = useState("");
    const [recieverSign, setRecieverSign] = useState("");
    const [dsign, setDSign] = useState<SignatureViewRef | null>();
    const [dsign2, setDSign2] = useState<SignatureViewRef | null>();
    const [error, setError] = useState(false); // Error state

    const data = route.params;
    
    const validateForm = (): boolean => {
        const newErrors: {[key: string]: string} = {};
        let isValid = true;
 
        if (!driverSignature.current) {
            newErrors.driver = "Driver signature is required";
            isValid = false;
        }
        if (!recieverSignature.current) {
            newErrors.receiver = "Receiver signature is required"; 
            isValid = false;
        }
 
        setErrors(newErrors);
        return isValid;
    };

    const handleContinue = ()=>{
        
        // navigation.navigate("Overview", {details:data, driverSign:driverSignature.current,recieverSign:recieverSignature.current})
        if (validateForm()) {
        //     setDriverSign(driverSignature.current);
        // setRecieverSign(recieverSignature.current);
            navigation.navigate("Overview", {
                details: data,
                driverSign: driverSignature.current,
                recieverSign: recieverSignature.current
            });
        }
    }

    return (
        <>
        <TopBar pageName="Supplier Docket" showBackButton={true}/>

        {/* <View style={{flex: 1,flexDirection: 'row',}}> */}
            <View style={signatureStyles.mainContainer}>
                <View style={signatureStyles.container}>
                    {errors.driver && <Text style={styles.errorTxt}>{errors.driver}</Text>}
                    <SignaturePad label="Driver Signature" signatureValue={driverSignature} sign={dsign} returnSign={s=> setDSign(s)}/>
                </View>
                <View style={signatureStyles.container}>
                    {errors.receiver && <Text style={styles.errorTxt}>{errors.receiver}</Text>}
                    <SignaturePad label="Reciever Signature" signatureValue={recieverSignature} sign={dsign2} returnSign={s=> setDSign2(s)}/>                    
                </View>
            </View>

            <View style={{ padding: 20, paddingTop: 0}}>
                <TouchableOpacity style={styles.btn} onPress={handleContinue}>
                    <Text style={styles.btnText}>Continue</Text>
                </TouchableOpacity>
            </View>
            {/* </View> */}
        </>
    );
};

export default DocketSignatureForm;
