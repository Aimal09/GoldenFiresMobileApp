import { Text, TouchableOpacity, View } from "react-native";
import TopBar from "../../components/TopBar";
import styles from "../../styles/style";
import ProductCard from "../../components/ProductCard";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import React from "react";

type ImageKey = 'potato' | 'oil' | 'box' | 'tape' | 'pallets' | 'plastic' | "detergent" | "hat" | "gloves" | "antifoam" | "saap" | "13mm-fries" | "15mm-fries";

const GoodStock = () => {
    const navigation = useNavigation();
    const [box, setBox] = useState<string>('');
    const [tape, setTape] = useState<string>('');
    const [plastic, setPlastic] = useState<string>('');

    const imagePath: Record<ImageKey, any> = {
        "potato": require("../../assets/images/potato.png"),
        "oil": require("../../assets/images/oil.png"),
        "box": require("../../assets/images/box.png"),
        "tape": require("../../assets/images/tape.png"),
        "pallets": require("../../assets/images/pallets.png"),
        "plastic": require("../../assets/images/plastic.png"),
        "detergent": require("../../assets/images/detergent.png"),
        "hat": require("../../assets/images/hat.png"),
        "gloves": require("../../assets/images/gloves.png"),
        "antifoam": require("../../assets/images/antifoam.png"),
        "saap": require("../../assets/images/saap.png"),
        "13mm-fries": require("../../assets/images/13mm.png"),
        "15mm-fries": require("../../assets/images/15mm.png"),
    };

    const startLoadHandler = () => { 
        //API Call to start load
        navigation.goBack(); 
    }
    return (
        <>
            <TopBar pageName="New Load" />

            <View style={styles.container}>
                <Text style={[styles.text, { marginBottom: 20 }]}>Good Stock {box}</Text>

                <View>
                    <ProductCard title="Boxes" iconUrl={imagePath['box']} onClick={() => { }} iconOnRight={false} textField textFieldValue={box} textFieldSetValue={setBox} />
                </View>
                <View>
                    <ProductCard title="Tape" iconUrl={imagePath['tape']} onClick={() => { }} iconOnRight={false} textField textFieldValue={tape} textFieldSetValue={setTape} />
                </View>
                <View>
                    <ProductCard title="Plastic wrap" iconUrl={imagePath['plastic']} onClick={() => { }} iconOnRight={false} textField textFieldValue={plastic} textFieldSetValue={setPlastic} />
                </View>
            </View>
            <View style={{ padding: 20, paddingTop: 0 }}>
                <TouchableOpacity style={styles.btn} onPress={startLoadHandler}>
                    <Text style={styles.btnText}>Start New Load</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default GoodStock;