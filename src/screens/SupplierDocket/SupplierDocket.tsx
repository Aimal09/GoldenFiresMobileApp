import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import ProductCard from "../../components/ProductCard";
import TopBar from "../../components/TopBar";
import styles from "../../styles/style";
import React from "react";

const SupplierDocket = ({ navigation }: any) => {
    return (
        <>
            <TopBar pageName="Supplier Docket" showBackButton={true}/>
            <ScrollView style={{ paddingHorizontal: 15, flex: 1 }}>
                <ProductCard title="Potato Docket" iconUrl={require('../../assets/images/potato.png')} onClick={() => { navigation.navigate('DocketDetailsForm', {title:"Potato Docket"})}} />
                <ProductCard title="Oil Docket" iconUrl={require('../../assets/images/oil.png')} onClick={() => { navigation.navigate('DocketDetailsForm', {title:"Oil Docket"})}} />
                <ProductCard title="Carton Docket" iconUrl={require('../../assets/images/boxes.png')} onClick={() => { navigation.navigate('DocketDetailsForm', {title:"Carton Docket"})}} />
                <ProductCard title="General Docket" iconUrl={require('../../assets/images/pallet.png')} onClick={() => { navigation.navigate('DocketDetailsForm', {title:"General Docket"})}} />
            </ScrollView>

            {/* <View style={{ padding:15}}>
                <TouchableOpacity style={styles.btn} onPress={() => {}}>
                    <Text style={styles.btnText}>Continue</Text>
                </TouchableOpacity>
            </View> */}
        </>
    );
}

export default SupplierDocket;