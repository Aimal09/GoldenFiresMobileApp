import TopBar from "../../components/TopBar";
import { DocketDetailsFormNavigationProp, DocketDetailsFormRouteProp } from '../../navigations/Types';
import styles from "../../styles/style";
import React, { useState } from 'react';
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
    const [potatoVariety, setPotatoVariety] = useState('');
    const [docketNumber, setDocketNumber] = useState('');
    const [grossWeight, setGrossWeight] = useState('');
    const [nettWeight, setNettWeight] = useState('');
    const [trailerRego, setTrailerRego] = useState('');
    const data = route.params;
    const options:OptionItem[] = [{name:"Suranme lastname", value:"1"},{name:"Firstname Lastname", value:"2"}]
    return (
        <>
            <TopBar pageName={data.title} />

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

                    <ComboBox label="Supplier Name" placeholder="Select supplier name" options={options} onDropdownChange={(v)=>{setSupplierName(v)}}/>

                    <ComboBox label="Potato Variety" placeholder="Select potato variety" options={options} onDropdownChange={(v)=>{setPotatoVariety(v)}}/>

                    <View style={DocketDetailsFormStyles.row}>
                        <View style={DocketDetailsFormStyles.inputContainer}>
                            <Text style={DocketDetailsFormStyles.label}>Wightbridge Docket N°</Text>
                            <TextInput
                                placeholder="Enter Docket N°"
                                style={DocketDetailsFormStyles.input}
                                value={docketNumber}
                                onChangeText={setDocketNumber}
                            />
                        </View>

                        <View style={DocketDetailsFormStyles.inputContainer}>
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
                <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('DocketDetailsPictureForm', {supplierName,potatoVariety,docketNumber,grossWeight,nettWeight,trailerRego})}}>
                    <Text style={styles.btnText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default DocketDetailsForm;