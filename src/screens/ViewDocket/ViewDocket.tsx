import { StyleSheet, View } from "react-native";
import TopBar from "../../components/TopBar";
import ComboBox from "../../components/ComoboBox";
import { FilterByDate, FilterByDateCalendar } from "../../components/FilterByDate";
import { useState } from "react";
import { deliveryOutbound, promotion } from "../../assets/Mock";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import ProductCard from "../../components/ProductCard";
import Table from "../../components/Table";

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
const ViewDocket = () => {
    const promotionRaw = promotion.data;
    const deliveryOutboundRaw = deliveryOutbound.data;

    const [showFilterByDate, setShowFilterByDate] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Data[]>(promotionRaw);

    const [comboOptions, setComboOptions] = useState<OptionItem[]>([{ name: "Delivery Outbound", value: "1" },
    { name: "Promotions", value: "2" }
    ]);

    const OnDropdownChange = (option: string) => {
        if (option === "1")
            setSelectedOption(deliveryOutboundRaw);
        else if (option === "2")
            setSelectedOption(promotionRaw);
    }

    return (
        <>
            <View style={VDstyles.container}>
                <TopBar pageName="View Docket" />

                {showFilterByDate && <FilterByDateCalendar onFilterChange={() => { }} closeFilter={() => setShowFilterByDate(false)} />}

                <View style={VDstyles.types}>
                    <View style={VDstyles.full}>
                        <ComboBox label="" options={comboOptions} onDropdownChange={OnDropdownChange} usePlaceholder={false} isDark={false} />
                    </View>
                    <FilterByDate onClick={() => setShowFilterByDate(true)} />
                </View>

                <GestureHandlerRootView>
                    <ScrollView>
                        <Table data={selectedOption} />
                    </ScrollView>
                </GestureHandlerRootView>
            </View>

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
    }
});