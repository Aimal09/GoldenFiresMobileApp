import { Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import TopBar from "../../components/TopBar";
import styles from "../../styles/style";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import ComboBox from "../../components/ComoboBox";
import { useState } from "react";
import TextField from "../../components/TextField";
import { FilterByDateCalendar } from "../../components/FilterByDate";
import { NewLoadNavigationProp, NewLoadRouteProp } from "../../navigations/Types";
import CurrentLoad from "./currentLoad";
import React from "react";

type ImageKey = 'potato' | 'oil' | 'box' | 'tape' | 'pallets' | 'plastic' | "detergent" | "hat" | "gloves" | "antifoam" | "saap" | "13mm-fries" | "15mm-fries";

type Props = {
    navigation: NewLoadNavigationProp;
    route: NewLoadRouteProp;
};
interface OptionItem {
    value: string;
    name: string;
}

interface DateRangeProp {
    startDate: string | null,
    endDate: string | null
}
const NewLoad:React.FC<Props> = ({navigation,route}) => {
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
    const options: OptionItem[] = [{ name: "Suranme lastname", value: "Suranme lastname" }, { name: "Suranme lastname", value: "Suranme lastname" }, { name: "Suranme lastname", value: "Suranme lastname" }, { name: "Suranme lastname", value: "Suranme lastname" }, { name: "Firstname Lastname", value: "Suranme lastname" }]
    const [supplierName, setSupplierName] = useState('');
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [showDates, setShowDates] = useState(false);
    const [loadRunning, setLoadRunning] = useState(true);


    const onFilterChangeHandler = (range: DateRangeProp) => {
        setDate(range.startDate??"");
        setShowDates(false);
    }

    const continueHandler = () => { 
        if(weight&&supplierName)
            navigation.navigate("GoodStock",{})
    }

    return (
        <>
            <TopBar pageName="New Load" />

            {showDates && <FilterByDateCalendar title="Select Date" minimumToday isSingle onFilterChange={onFilterChangeHandler} closeFilter={() => setShowDates(false)} />}

            {loadRunning && <CurrentLoad date="2024-12-17 11:23:00" id={1}/>}

            <GestureHandlerRootView style={styles.container}>
                <ScrollView style={[styles.card, { flex: 1 }]}>
                    <Text style={styles.headText}>Goods Available</Text>

                    <View style={nlStyles.row}>
                        <View style={nlStyles.goodsCard}>
                            <Image source={imagePath["potato"]} style={nlStyles.cardImg} />
                            <Text style={nlStyles.cardText}>2,345</Text>
                        </View>
                        <View style={nlStyles.goodsCard}>
                            <Image source={imagePath["oil"]} style={nlStyles.cardImg} />
                            <Text style={nlStyles.cardText}>2,345</Text>
                        </View>
                    </View>
                    <View style={nlStyles.row}>
                        <View style={nlStyles.goodsCard}>
                            <Image source={imagePath["box"]} style={nlStyles.cardImg} />
                            <Text style={nlStyles.cardText}>2,345</Text>
                        </View>
                        <View style={nlStyles.goodsCard}>
                            <Image source={imagePath["tape"]} style={nlStyles.cardImg} />
                            <Text style={nlStyles.cardText}>2,345</Text>
                        </View>
                    </View>
                    <View style={nlStyles.row}>
                        <View style={nlStyles.goodsCard}>
                            <Image source={imagePath["pallets"]} style={nlStyles.cardImg} />
                            <Text style={nlStyles.cardText}>2,345</Text>
                        </View>
                        <View style={nlStyles.goodsCard}>
                            <Image source={imagePath["plastic"]} style={nlStyles.cardImg} />
                            <Text style={nlStyles.cardText}>2,345</Text>
                        </View>
                    </View>

                    <Text style={[styles.headText, nlStyles.mt20]}>Supplier</Text>
                    <ComboBox placeholder="-- Select supplier name" options={options} onDropdownChange={(v) => { setSupplierName(v) }} />

                    <View style={nlStyles.row}>
                        <View style={styles.full}>
                            <Text style={[styles.headText, nlStyles.mt20]}>Weight</Text>
                            <TextField placeholder="Enter a value" Keyboardtypedefine="numeric" value={weight} setValue={setWeight} styles={styles.full} />
                        </View>
                        <View style={styles.full}>
                            <Text style={[styles.headText, nlStyles.mt20]}>Date</Text>
                            <TouchableOpacity style={nlStyles.goodsCard} onPress={()=>setShowDates(true)}>
                                <Text style={nlStyles.cardText}>{date}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </GestureHandlerRootView>

            <View style={{ padding: 20, paddingTop: 0 }}>
                <TouchableOpacity style={styles.btn} onPress={continueHandler}>
                    <Text style={styles.btnText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default NewLoad;

const nlStyles = StyleSheet.create({
    goodsCard: {
        minHeight: 60,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#f4f4f4',
        borderRadius: 30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1
    },
    cardImg: {
        width: 40,
        height: 40,
        objectFit: "contain"
    },
    cardText: {
        fontSize: 18,
        fontWeight: "500",
    },
    row: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        marginBottom: 30
    },
    mt20: {
        marginTop: 20
    }
});