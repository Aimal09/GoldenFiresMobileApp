import React, { useRef, useState } from 'react';
import { View, Button, StyleSheet, Alert, Text, Image } from 'react-native';
import SignatureScreen, { SignatureViewRef } from 'react-native-signature-canvas';

interface Prop{
  label?:string;
  signatureValue?: React.MutableRefObject<string | null>;
  sign?:SignatureViewRef | null;
  returnSign?:(sign:SignatureViewRef|null)=>void;
}
const SignaturePad: React.FC<Prop> = ({label,signatureValue,sign, returnSign}) => {
  const signatureRef = useRef<SignatureViewRef>(sign ?? null);
  const [signature, setSignature] = useState<string | null>(null);


  const handleSignature = (signature: string) => {
    // This function is called with the base64-encoded signature when completed
    setSignature(signature);
    if (signatureValue) {
      signatureValue.current = signature; // Update the ref with the signature
    }
    if(returnSign) returnSign(signatureRef.current);
    // Alert.alert('Signature saved');
  };

  const handleClear = () => {
    // Clear the signature pad
    signatureRef.current?.clearSignature();
  };

  const handleConfirm = () => {
    // Save the current signature
    signatureRef.current?.readSignature();
  };
   
  // if(sign)
  // console.log("======+")
  // handleConfirm();

  return (
    <View style={{flexDirection: 'column', flex: 1}}>
      <View style={{flex: 1}}>{label && <Text style={styles.title}>{label}</Text>}</View>
      <View style={styles.signatureContainer}>
        <Image source={require("../assets/images/signaturebg.png")} style={styles.signaturebg}/>
        <SignatureScreen
          ref={signatureRef}
          onOK={handleSignature}
          onEmpty={() => Alert.alert('No signature captured')}
          onEnd={() => signatureRef.current?.readSignature()} // Automatically save signature on end
          descriptionText="Sign below"
          clearText="Clear"
          confirmText="Save"
          webStyle={webStyle}
        />
      </View>
      <View style={styles.buttons}>
        <Button title="Clear" onPress={handleClear} />
        <Button title="Save" onPress={handleConfirm} />
      </View>
    </View>
  );
};

export default SignaturePad;

const styles = StyleSheet.create({
  signatureContainer: {
    // height:200,
    // display:"flex",
    flex: 4,
    alignItems:"center",
    justifyContent:"center"
  },
  title: {
      fontSize: 20,
      color: "#444444",
      marginLeft: 25,
      fontWeight: "500",
      marginBottom: 5
  },
  signaturebg:{
    width:"90%",
    height:"90%",
    position:"absolute",
    left:"5%",
    top:"5%",
    zIndex:1
  },
  buttons:{
    display:"none"
  }
});

const webStyle = `
  .m-signature-pad--footer {
    display: none;
    margin: 0px;
  }
  .m-signature-pad--body {
    border: none;
    background-color:#f4f4f4;
    border-radius:15px;
    height:200px
  }
  .m-signature-pad {
    box-shadow: none;
    background:#0000;
    border: none;
  }
`;
