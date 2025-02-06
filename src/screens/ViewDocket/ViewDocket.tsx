import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TopBar from "../../components/TopBar";
import ComboBox from "../../components/ComoboBox";
import { FilterByDate, FilterByDateCalendar } from "../../components/FilterByDate";
import { useEffect, useState } from "react";
import { deliveryOutbound, promotion, supplierInbound } from "../../assets/Mock";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import ProductCard from "../../components/ProductCard";
import Table from "../../components/Table";
import FullScreenModal from "../../components/Modal";
import TextField from "../../components/TextField";
import TextBlock from "../../components/TextBlock";
import COLORS from "../../styles/colors";
import { useRealm } from "../../context/RealmContext";
import { formatDate } from "../../utils";

type ImageKey = "box" | "palette";

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
interface DeliveryOutboundDetail {
    title: string;
    weight: string;
    approvedBy: string;
    signatureUrl: string;
    invertoryItems: InvertoryItem[];
}
interface DetalisDate {
    date: string;
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

interface RealmDocket {
    id: number;
    supplierName: string;
    variety: string;
    docketNumber: string;
    weightBridgeDocketNumber: string;
    grossWeight: string;
    nettWeight: string;
    trailerRego: string;
    docketPhoto: string;
    driverSign: string;
    recieverSign: string;
    date: Date;
 }

const ViewDocket = () => {
    const promotionRaw = promotion.data;
    const deliveryOutboundRaw = deliveryOutbound.data;
    const supplierInboundRaw = supplierInbound.data;
    const imagePath: Record<ImageKey, any> = {
        "box": require("../../assets/images/goods-track-icon.png"),
        "palette": require("../../assets/images/palette.png"),
    };
    
    const [showFilterByDate, setShowFilterByDate] = useState(false);
    const [selectedOptionData, setselectedOptionData] = useState<Data[]>(supplierInboundRaw);
    const [selectedOption, setselectedOption] = useState<string>("1");
    const [showRowDetails, setShowRowDetails] = useState<boolean>(false);
    const [selectedRow, setSelectedRow] = useState<Data>(deliveryOutboundRaw[0]);
    const [total, setTotal] = useState<number>(0);
    const [isFiltered, setIsFiltered] = useState(false);
    const [filterRange, setFilterRange] = useState<DateRangeAsDateProp>();
    const realm = useRealm();

    useEffect(()=>{
        OnDropdownChange(selectedOption);
    }, [isFiltered,selectedOption]);

    const [comboOptions, setComboOptions] = useState<OptionItem[]>([
        { name: "Supplier Inbound", value: "1" },
        { name: "Delivery Outbound", value: "2" },
        { name: "Promotions", value: "3" }
    ]);

    // useEffect(() => {
    //     if (realm) {
    //         const dockets = realm.objects('SupplierDocket');
    //         const updateDockets = () => {
    //             if (selectedOption === "1") {
    //                 const docketData: Data[] = Array.from(dockets).map((docket) => ({
    //                     columns: [
    //                         { title: 'Supplier Name', value: (docket as unknown as RealmDocket).supplierName },
    //                         { title: 'Variety', value: (docket as unknown as RealmDocket).variety },
    //                         { title: 'Weight', value: (docket as unknown as RealmDocket).nettWeight },
    //                         { title: 'Date', value: formatDate((docket as unknown as RealmDocket).date) }
    //                     ],
    //                     details: {
    //                         date: (docket as unknown as RealmDocket).date
    //                     }
    //                 }));
    //                 setselectedOptionData(getData(docketData));
    //             }
    //         };
    
    //         dockets.addListener(updateDockets);
    
    //         return () => {
    //             dockets.removeListener(updateDockets);
    //         };
    //     }
    // }, [realm]);

    // useEffect(() => {
    //     if (realm && selectedOption === "1") {
    //         const dockets = realm.objects('SupplierDocket').sorted('date', true);
    //         const docketData: Data[] = Array.from(dockets).map((docket) => ({
    //             columns: [
    //                 { title: 'Supplier Name', value: (docket as unknown as RealmDocket).supplierName },
    //                 { title: 'Variety', value: (docket as unknown as RealmDocket).variety },
    //                 { title: 'Weight', value: (docket as unknown as RealmDocket).nettWeight },
    //                 { title: 'Date', value: formatDate((docket as unknown as RealmDocket).date) }
    //             ],
    //             details: {
    //                 date: (docket as unknown as RealmDocket).date
    //             }
    //         }));
    //         setselectedOptionData(getData(docketData));
    //     } else {
    //         OnDropdownChange(selectedOption);
    //     }
    // }, [realm, selectedOption, isFiltered]);

    useEffect(() => {
        if (realm) {
            const dockets = realm.objects('SupplierDocket');
            
            const updateDockets = () => {
                if (selectedOption === "1") {
                    const docketData: Data[] = Array.from(dockets.sorted('date', true)).map((docket) => ({
                        columns: [
                            { title: 'Supplier Name', value: (docket as unknown as RealmDocket).supplierName },
                            { title: 'Variety', value: (docket as unknown as RealmDocket).variety },
                            { title: 'Weight', value: (docket as unknown as RealmDocket).nettWeight },
                            { title: 'Date', value: formatDate((docket as unknown as RealmDocket).date) }
                        ],
                        details: {
                            date: (docket as unknown as RealmDocket).date,
                            fullDetails: docket 
                        }
                    }));
                    setselectedOptionData(getData(docketData));
                }
            };
    
            updateDockets(); // Initial load
            dockets.addListener(updateDockets); // Listen for changes
    
            return () => {
                dockets.removeListener(updateDockets);
            };
        }
    }, [realm, selectedOption, isFiltered]);

    const OnDropdownChange = (option: string) => {
        if (option === "1" && realm) {
            const dockets = realm.objects('SupplierDocket');
            const docketData: Data[] = Array.from(dockets).map((docket) => ({
                columns: [
                    { title: 'Supplier Name', value: (docket as unknown as RealmDocket).supplierName },
                    { title: 'Variety', value: (docket as unknown as RealmDocket).variety },
                    { title: 'Weight', value: (docket as unknown as RealmDocket).nettWeight },
                    { title: 'Date', value: formatDate((docket as unknown as RealmDocket).date) }
                ],
                details: {
                    date: (docket as unknown as RealmDocket).date
                }
            }));
            setselectedOptionData(getData(docketData));
        } else if (option === "2") {
            setselectedOptionData(getData(deliveryOutboundRaw));
        } else if (option === "3") {
            setselectedOptionData(getData(promotionRaw));
        }
        setselectedOption(option);
    };
    // const OnDropdownChange = (option: string) => {
    //     if (option === "1")
    //         setselectedOptionData(getData(supplierInboundRaw));
    //     else if (option === "2")
    //         setselectedOptionData(getData(deliveryOutboundRaw));
    //     else if (option === "3")
    //         setselectedOptionData(getData(promotionRaw));

    //     setselectedOption(option);
    // }

    const onRowSelectHandler = (data: Data) => {
        if (selectedOption === "2") {
            const _total = (data.details as DeliveryOutboundDetail).invertoryItems.map(item => parseFloat(item.value)).reduce((a, b) => a + b);
            setTotal(_total);
            setSelectedRow(data);
            setShowRowDetails(true);
            console.log(data)
        }
        if (selectedOption === "1") {
            // console.log("daata 2: ", JSON.stringify(data.details));
            setSelectedRow(data);
            setShowRowDetails(true)
        }
    }

    const onFilterChangeHandler = (range: DateRangeProp) => {
        setIsFiltered(true);
        const dates: DateRangeAsDateProp = {
            startDate: new Date(range.startDate || ""),
            endDate: new Date(range.endDate || "")
        }
        setFilterRange(dates);
    }

    const getData = (data: Data[]) => {
        console.log("data " +isFiltered)
        if (isFiltered) {
            return data.filter(row => {
                const rowDate = new Date((row.details as DetalisDate).date)
                if (filterRange?.startDate && filterRange.endDate)
                    return rowDate >= filterRange?.startDate && rowDate <= filterRange?.endDate;
                else if (filterRange?.startDate)
                    return rowDate >= filterRange?.startDate;
                else if (filterRange?.endDate)
                    return rowDate >= filterRange?.endDate;
            }
            )
        }
        else {
            return data
        }
    }

    return (
        <>
            {(showRowDetails && selectedOption === "2") && 
                <FullScreenModal 
                    title={(selectedRow.details as DeliveryOutboundDetail).title} 
                    onClose={() => { setShowRowDetails(false) }} 
                    visible={showRowDetails}
                >
                <>
                    <View style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 35 }}>
                        <TextBlock label="Product Name" value={selectedRow.columns.find(c => c.title === 'Product Name')?.value.toString() || ""} styles={{ flex: 1 }} />
                        <TextBlock label="Destination" value={selectedRow.columns.find(c => c.title === 'Destination')?.value.toString() || ""} styles={{ flex: 1 }} />
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 35 }}>
                        <TextBlock label="Approved Date" value={selectedRow.columns.find(c => c.title === 'Approved Date')?.value.toString() || ""} styles={{ flex: 1 }} />
                        <TextBlock label="Weight" value={(selectedRow.details as DeliveryOutboundDetail).weight} styles={{ flex: 1 }} />
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 35 }}>
                        <TextBlock label="Approved By" value={(selectedRow.details as DeliveryOutboundDetail).approvedBy} styles={{ flex: 1 }} />
                        <View style={{ flex: 1 }}>
                            <Image source={{ uri: (selectedRow.details as DeliveryOutboundDetail).signatureUrl }}
                                style={{ objectFit: "contain", width: 70 }} />
                        </View>
                    </View>

                    <View style={{ borderTopWidth: 2, borderBottomWidth: 2, borderColor: "#c7c7c7", paddingVertical: 20, gap: 20 }}>
                        {(selectedRow.details as DeliveryOutboundDetail).invertoryItems.map(item =>
                            <View style={{ display: "flex", alignItems: "center", flexDirection: "row", gap: 15 }} key={item.icon}>
                                <Image style={{ width: 20, height: 20, objectFit: "cover" }} source={imagePath[item.icon as ImageKey]} />
                                <Text style={[{ flex: 1 }, VDstyles.text]}>{item.title}</Text>
                                <Text style={VDstyles.text}>{item.value}</Text>
                            </View>
                        )
                        }
                    </View>

                    <View style={{ paddingVertical: 20, marginTop: 10, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={VDstyles.text}>Total</Text>
                        <Text style={VDstyles.text}>{total}</Text>
                    </View>
                </>
            </FullScreenModal>}

            {(showRowDetails && selectedOption === "1") && 
                <FullScreenModal 
                    title={`Docket ${(selectedRow.details as { fullDetails?: RealmDocket }).fullDetails?.docketNumber}`} 
                    onClose={() => { setShowRowDetails(false) }} 
                    visible={showRowDetails}
                >
                <>
                <ScrollView style={{flex: 1, padding: 20}}>
                    <View style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 35 }}>
                        <TextBlock label="Supplier Name" value={(selectedRow.details as { fullDetails?: RealmDocket })?.fullDetails?.supplierName ?? ""} styles={{ flex: 1, alignItems: 'center' }} />
                        <TextBlock label="Product Name" value={(selectedRow.details as { fullDetails?: RealmDocket })?.fullDetails?.variety ?? ""} styles={{ flex: 1, alignItems: 'center' }}/>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 35 }}>
                        <TextBlock label="Weight Bridge Docket" value={(selectedRow.details as { fullDetails?: RealmDocket })?.fullDetails?.weightBridgeDocketNumber ?? ""} styles={{ flex: 1, alignItems: 'center' }} />
                        <TextBlock label="Gross Weight" value={(selectedRow.details as { fullDetails?: RealmDocket })?.fullDetails?.grossWeight ?? ""} styles={{ flex: 1, alignItems: 'center' }} />
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 35 }}>
                        <TextBlock label="Nett Weight" value={(selectedRow.details as { fullDetails?: RealmDocket })?.fullDetails?.nettWeight ?? ""} styles={{ flex: 1, alignItems: 'center' }} />
                        <TextBlock label="Trailer Rego" value={(selectedRow.details as { fullDetails?: RealmDocket })?.fullDetails?.trailerRego ?? ""} styles={{ flex: 1, alignItems: 'center' }} />
                        {/* <View style={{ flex: 1 }}>
                            <Image source={{ uri: (selectedRow.details as DeliveryOutboundDetail).signatureUrl }}
                                style={{ objectFit: "contain", width: 70 }} />
                        </View> */}
                    </View>

                    <View style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 35 }}>
                        <View style={{ flex: 1 }}>
                            <TextBlock label="Docket Photo" styles={{ flex: 1, alignItems: 'center' }}/>
                            <Image 
                                source={{ uri: (selectedRow.details as { fullDetails?: RealmDocket })?.fullDetails?.docketPhoto }}
                                resizeMode='contain'
                                style={{ width: "100%", height: 100, borderRadius: 10 }} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextBlock label="Driver Sign" styles={{ flex: 1, alignItems: 'center' }}/>
                            <Image 
                                source={{ uri: (selectedRow.details as { fullDetails?: RealmDocket })?.fullDetails?.driverSign }}
                                resizeMode='contain'
                                style={{ width: "100%", height: 100, borderRadius: 10 }} />
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 35 }}>
                        <View style={{ flex: 1 }}>
                        <TextBlock label="Receiver Sign" styles={{ flex: 1, alignItems: 'center' }}/>
                            <Image 
                                source={{ uri: (selectedRow.details as { fullDetails?: RealmDocket })?.fullDetails?.recieverSign }}
                                resizeMode='contain'
                                style={{ width: "100%", height: 100, borderRadius: 10 }} />
                        </View>
                        <TextBlock label="Date" value={(selectedRow.details as { fullDetails?: RealmDocket })?.fullDetails?.date.toDateString() ?? ""} styles={{ flex: 1, alignItems: 'center'}} />

                    </View>
                    </ScrollView>
                </>
            </FullScreenModal>}


            <GestureHandlerRootView style={VDstyles.container}>
                <TopBar pageName="View Docket" />

                {showFilterByDate && <FilterByDateCalendar maximumToday onFilterChange={onFilterChangeHandler} closeFilter={() => setShowFilterByDate(false)} />}

                <View style={VDstyles.types}>
                    <View style={VDstyles.full}>
                        <ComboBox label="" options={comboOptions} onDropdownChange={OnDropdownChange} usePlaceholder={false} isDark={false} />
                    </View>
                    <View style={VDstyles.filterContainer}>
                        <FilterByDate onClick={() => setShowFilterByDate(true)} />
                        {isFiltered && <TouchableOpacity style={VDstyles.filter} onPress={()=>setIsFiltered(false)}>
                            <Text style={VDstyles.filterText}>Clear Filter</Text>
                            <Image source={require("../../assets/images/times.png")} style={VDstyles.filterCross}/>
                        </TouchableOpacity>}
                    </View>
                </View>

                <GestureHandlerRootView>
                    <ScrollView>
                        <Table data={selectedOptionData} onRowSelect={onRowSelectHandler} />
                    </ScrollView>
                </GestureHandlerRootView>
            </GestureHandlerRootView>

        </>
    );
}

export default ViewDocket;


const VDstyles = StyleSheet.create({
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
    filterContainer:{
        alignItems:"flex-end"
    },
    filter:{
        backgroundColor:COLORS.lightGrey,
        paddingHorizontal:10,
        paddingVertical:5,
        width:110,
        borderRadius:8,
        opacity:.8,
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:5,
        marginVertical:10,
        marginRight:10
    },
    filterText:{
        color:COLORS.text,
        textAlign:"center",
        fontWeight:"500"
    },
    filterCross:{
        width:10,
        objectFit:"contain"
    }
});