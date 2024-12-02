import TopBar from "../../components/TopBar";
import { DocketDetailsFormNavigationProp, DocketDetailsFormRouteProp } from '../../navigations/Types';
import styles from "../../styles/style";
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import ComboBox from "../../components/ComoboBox";
import { DocketDetailsFormStyles } from "../../styles/screensStyle";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
    navigation: DocketDetailsFormNavigationProp;
    route: DocketDetailsFormRouteProp;
};
interface OptionItem {
    value: string;
    name: string;
}

const DocketDetailsForm: React.FC<Props> = ({ navigation, route }) => {
    const [supplierName, setSupplierName] = useState('');
    const [supplierNameV, setSupplierNameV] = useState(false);
    const [potatoVariety, setPotatoVariety] = useState('');
    const [potatoVarietyV, setPotatoVarietyV] = useState(false);
    const [docketNumber, setDocketNumber] = useState('');
    const [docketNumberV, setDocketNumberV] = useState(false);
    const [grossWeight, setGrossWeight] = useState('');
    const [grossWeightV, setGrossWeightV] = useState(false);
    const [nettWeight, setNettWeight] = useState('');
    const [nettWeightV, setNettWeightV] = useState(false);
    const [trailerRego, setTrailerRego] = useState('');
    const [trailerRegoV, setTrailerRegoV] = useState(false);
    const data = route.params;
    const options: OptionItem[] = [{ name: "Suranme lastname", value: "Suranme lastname" }, { name: "Suranme lastname", value: "Suranme lastname" }, { name: "Suranme lastname", value: "Suranme lastname" }, { name: "Suranme lastname", value: "Suranme lastname" }, { name: "Firstname Lastname", value: "Suranme lastname" }]

    useEffect(()=>{
        setSupplierNameV(false);
    },[supplierName]);
    useEffect(()=>{
        setPotatoVarietyV(false);
    },[potatoVariety]);
    useEffect(()=>{
        setDocketNumberV(false);
    },[docketNumber]);
    useEffect(()=>{
        setGrossWeightV(false);
    },[grossWeight]);
    useEffect(()=>{
        setNettWeightV(false);
    },[nettWeight]);
    useEffect(()=>{
        setTrailerRegoV(false);
    },[trailerRego]);


    const handleContinue = () => {
        if (supplierName === '' ||
            potatoVariety === '' ||
            docketNumber === '' ||
            grossWeight === '' ||
            nettWeight === '' ||
            trailerRego === ''
        ) {
            setSupplierNameV(supplierName === '');
            setPotatoVarietyV(potatoVariety === '');
            setDocketNumberV(docketNumber === '');
            setGrossWeightV(grossWeight === '');
            setNettWeightV(nettWeight === '');
            setTrailerRegoV(trailerRego === '');
        }
        else
            navigation.navigate('DocketDetailsPictureForm', { supplierName, potatoVariety, docketNumber, grossWeight, nettWeight, trailerRego });
    }
    return (
        <>
            <TopBar pageName={data.title} showBackButton={false} />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ensure proper behavior for both iOS and Android
            >
                <ScrollView style={DocketDetailsFormStyles.container}>
                    <View style={DocketDetailsFormStyles.fieldContainer}>
                        <View style={DocketDetailsFormStyles.headerContainer}>
                            <Text style={DocketDetailsFormStyles.dateText}>24.05.2024</Text>
                            <Text style={DocketDetailsFormStyles.timeText}>5:30 p.m</Text>
                        </View>
                        <Text style={DocketDetailsFormStyles.docketNumber}>Docket number: 0034935</Text>

                        {supplierNameV && <Text style={styles.errorTxt}>Supplier name is required *</Text>}
                        <ComboBox label="Supplier Name" placeholder="Select supplier name" options={options} onDropdownChange={(v) => { setSupplierName(v) }} />

                        {potatoVarietyV && <Text style={styles.errorTxt}>Potato Variety is required *</Text>}
                        <ComboBox label="Potato Variety" placeholder="Select potato variety" options={options} onDropdownChange={(v) => { setPotatoVariety(v) }} />

                        <View style={DocketDetailsFormStyles.row}>
                            <View style={DocketDetailsFormStyles.inputContainer}>
                                {docketNumberV && <Text style={styles.errorTxt}>Wightbridge Docket is required *</Text>}
                                <Text style={DocketDetailsFormStyles.label}>Wightbridge Docket N°</Text>
                                <TextInput
                                    placeholder="Enter Docket N°"
                                    style={DocketDetailsFormStyles.input}
                                    value={docketNumber}
                                    onChangeText={setDocketNumber}
                                />
                            </View>

                            <View style={DocketDetailsFormStyles.inputContainer}>
                                {grossWeightV && <Text style={styles.errorTxt}>Gross Weight is required *</Text>}
                                <Text style={DocketDetailsFormStyles.label}>Gross Weight</Text>
                                <TextInput
                                    placeholder="Enter Gross Weight"
                                    style={DocketDetailsFormStyles.input}
                                    value={grossWeight}
                                    onChangeText={setGrossWeight}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        <View style={DocketDetailsFormStyles.row}>
                            <View style={DocketDetailsFormStyles.inputContainer}>
                                {nettWeightV && <Text style={styles.errorTxt}>Nett Weight is required *</Text>}
                                <Text style={DocketDetailsFormStyles.label}>Nett Weight</Text>
                                <TextInput
                                    placeholder="Enter Nett Weight"
                                    style={DocketDetailsFormStyles.input}
                                    value={nettWeight}
                                    onChangeText={setNettWeight}
                                    keyboardType="numeric"
                                />
                            </View>

                            <View style={DocketDetailsFormStyles.inputContainer}>
                                {trailerRegoV && <Text style={styles.errorTxt}>Trailer Rego is required *</Text>}
                                <Text style={DocketDetailsFormStyles.label}>Trailer Rego</Text>
                                <TextInput
                                    placeholder="Enter Trailer Rego"
                                    style={DocketDetailsFormStyles.input}
                                    value={trailerRego}
                                    onChangeText={setTrailerRego}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <View style={{ padding: 20, paddingTop: 0 }}>
                <TouchableOpacity style={styles.btn} onPress={() => handleContinue()}>
                    <Text style={styles.btnText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default DocketDetailsForm;