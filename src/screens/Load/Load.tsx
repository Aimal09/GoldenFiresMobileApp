import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TopBar from "../../components/TopBar";
import styles from "../../styles/style";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import Table from "../../components/Table";
import { processLoad } from "../../assets/Mock";
import { useEffect, useState } from "react";
import FullScreenModal from "../../components/Modal";
import TextBlock from "../../components/TextBlock";
import COLORS from "../../styles/colors";
import { FilterByDate, FilterByDateCalendar } from "../../components/FilterByDate";
import ComboBox from "../../components/ComoboBox";
import { LoadNavigationProp, LoadRouteProp } from "../../navigations/Types";

interface OptionItem {
    value: string;
    name: string;
}
interface Data {
    columns: Column[];
    details: object;
}
interface Column {
    title: string;
    value: string | number;
}
interface ProcessLoadDetail {
    title: string;
    productName: string;
    invoiceNo: string;
    weight: string;
    status: string;
    destination: string;
    dateFor: string;
    driver: AuthProfile;
    reciever: AuthProfile;
}
interface AuthProfile {
    name: string;
    signatureUrl: string;
}
interface InvertoryItem {
    title: string;
    icon: string;
    value: string;
}
interface DateRangeProp {
    startDate: string | null,
    endDate: string | null
}
interface DateRangeAsDateProp {
    startDate: Date | null,
    endDate: Date | null
}
type Props = {
    navigation: LoadNavigationProp;
    route: LoadRouteProp;
};
const Load:React.FC<Props> = ({navigation,route}) => {
    const rawData = processLoad.data;

    const [data, setData] = useState<Data[]>(rawData);
    const [selectedRow, setSelectedRow] = useState<Data>(rawData[0]);
    const [showRowDetails, setShowRowDetails] = useState<boolean>(false);
    const [showFilterByDate, setShowFilterByDate] = useState(false);
    const [filterRange, setFilterRange] = useState<DateRangeAsDateProp>();
    const [isFiltered, setIsFiltered] = useState(false);

    useEffect(() => {
        console.log(filterRange)
        if (filterRange?.startDate && filterRange?.endDate) {
            const _data = rawData.filter(d => {
                const date = new Date(d.details.dateFor.replaceAll('.', '-'));
                if (filterRange?.startDate && filterRange?.endDate) {
                    console.log(date >= filterRange?.startDate)
                    return date >= filterRange?.startDate && date <= filterRange.endDate
                }
            }
            )
            setData(_data);
            console.log(_data)
        }
        else
            setData(rawData);
    }, [filterRange, isFiltered]);

    const [comboOptions, setComboOptions] = useState<OptionItem[]>([
        { name: "All", value: "0" },
        { name: "Closed", value: "closed" },
        { name: "Running", value: "running" },
    ]);

    const onRowSelectHandler = () => { setShowRowDetails(true) }

    const onFilterChangeHandler = (range: DateRangeProp) => {
        setIsFiltered(true);
        const dates: DateRangeAsDateProp = {
            startDate: new Date(range.startDate || ""),
            endDate: new Date(range.endDate || "")
        }
        setFilterRange(dates);
    }

    const OnDropdownChange = (option: string) => {
        if (option === "0") setData(rawData);
        else setData(rawData.filter(d => d.details.status === option));
    }
    return (
        <>
            <TopBar pageName="Load" />

            {(showRowDetails) && <FullScreenModal title={(selectedRow.details as ProcessLoadDetail).title} onClose={() => { setShowRowDetails(false) }} visible={showRowDetails}>
                <>
                    <View style={loadStyles.popupCols}>
                        <TextBlock label="Product Name" value={(selectedRow.details as ProcessLoadDetail).productName || ""} styles={{ flex: 1 }} />
                        <TextBlock label="Destination" value={(selectedRow.details as ProcessLoadDetail).destination || ""} styles={{ flex: 1 }} />
                    </View>
                    <View style={loadStyles.popupCols}>
                        <TextBlock label="Supplier Name" value={selectedRow.columns.find(c => c.title === 'Supplier Name')?.value.toString() || ""} styles={{ flex: 1 }} />
                    </View>
                    <View style={loadStyles.popupCols}>
                        <TextBlock label="Date" value={(selectedRow.details as ProcessLoadDetail).dateFor} styles={{ flex: 1 }} />
                        <TextBlock label="Weight" value={(selectedRow.details as ProcessLoadDetail).weight} styles={{ flex: 1 }} />
                    </View>
                    <View style={loadStyles.popupCols}>
                        <View style={{ flex: 1 }}>
                            <TextBlock label="Driver" value={(selectedRow.details as ProcessLoadDetail).driver.name} styles={{ flex: 1 }} />
                            <Image source={{ uri: (selectedRow.details as ProcessLoadDetail).driver.signatureUrl }}
                                style={{ objectFit: "contain", width: 70 }} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextBlock label="Reciever" value={(selectedRow.details as ProcessLoadDetail).reciever.name} styles={{ flex: 1 }} />
                            <Image source={{ uri: (selectedRow.details as ProcessLoadDetail).reciever.signatureUrl }}
                                style={{ objectFit: "contain", width: 70 }} />
                        </View>
                    </View>
                </>
            </FullScreenModal>}

            {showFilterByDate && <FilterByDateCalendar onFilterChange={onFilterChangeHandler} closeFilter={() => setShowFilterByDate(false)} />}

            <GestureHandlerRootView style={styles.container}>
                <ScrollView
                
                horizontal = {true}
                contentContainerStyle = {
                    {
                        flexDirection : "row",
                        alignContent:"center",
                        height:65,
                        flex:0,
                        flexGrow:1,
                    }
                }
                >

                <View style={loadStyles.filterContainer}>
                    <Text style={loadStyles.text}>Filter: </Text>
                    <ComboBox label="" style={{ marginBottom: 0, minWidth: 140 }} options={comboOptions} onDropdownChange={OnDropdownChange} usePlaceholder={false} isDark={false} />
                    <View style={loadStyles.filterByDate}>
                        <FilterByDate onClick={() => setShowFilterByDate(true)} />
                        {isFiltered && <TouchableOpacity style={loadStyles.filter} onPress={() => { setIsFiltered(false); setFilterRange(undefined) }}>
                            <Text style={loadStyles.filterText}>Clear Filter</Text>
                            <Image source={require("../../assets/images/times.png")} style={loadStyles.filterCross} />
                        </TouchableOpacity>}
                    </View>
                    <TouchableOpacity style={[styles.btnSecondary, {marginLeft:"auto"}]} onPress={()=>navigation.navigate("NewLoad",{})}>
                        <Text>New</Text>
                    </TouchableOpacity>
                </View>

                </ScrollView>
                <GestureHandlerRootView>
                    <ScrollView>
                        <Table data={data} onRowSelect={onRowSelectHandler} />
                    </ScrollView>
                </GestureHandlerRootView>
               
            </GestureHandlerRootView>
        </>
    );
}

export default Load;



const loadStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    types: {
        display: "flex",
        flexDirection: "row",
        gap: 10
    },
    full: {
        flex: 1
    },
    text: {
        fontSize: 18,
        color: COLORS.text,
        fontWeight: "500"
    },
    filterContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 20
    },
    filter: {
        backgroundColor: COLORS.lightGrey,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: 110,
        borderRadius: 8,
        opacity: .8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        marginVertical: 10,
        marginRight: 10
    },
    filterText: {
        color: COLORS.text,
        textAlign: "center",
        fontWeight: "500"
    },
    filterCross: {
        width: 10,
        objectFit: "contain"
    },
    filterByDate: { display: "flex", flexDirection: "row", alignItems: 'center', gap: 10 },
    popupCols: { display: "flex", flexDirection: "row", gap: 10, marginBottom: 35 }
});

