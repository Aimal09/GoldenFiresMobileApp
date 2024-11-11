import { Text, TouchableOpacity, View } from "react-native";
import ComboBox from "../../components/ComoboBox";
import TopBar from "../../components/TopBar";
import FilterByDate from "../../components/FilterByDate";
import { inventroyJson } from "../../assets/Mock";
import { useState } from "react";
import ProductCard from "../../components/ProductCard";

type ImageKey = 'potato' | 'oil';

interface OptionItem {
    value: string;
    name: string;
}

const GoodsTrack = () => {
    const rawData = inventroyJson;
    const imagePath: Record<ImageKey, any> = {
        "potato":require("../../assets/images/potato.png"),
        "oil":require("../../assets/images/oil.png"),
    };

    const [screenData, setScreenData] = useState(rawData.data && rawData.data[0]);
    const [comboOptions, setComboOptions] = useState<OptionItem[]>([{ name: "Editable Stock", value: "1" },
    { name: "Goods Stock", value: "2" },
    { name: "Cleaning Supplies", value: "3" },
    { name: "Ready Fries", value: "4" },
    { name: "SAAP", value: "5" }
    ]);

    const OnDropdownChange = (option: string) => {
        const filtered = rawData.data.find(d => d.id.toString() === option);
        filtered && setScreenData(filtered);
    }

    return (
        <>
            <TopBar pageName="Goods Track" />

            <View style={{ padding: 10 }}>
                <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                    <View style={{ flex: 1 }}>
                        <ComboBox label="" options={comboOptions} onDropdownChange={OnDropdownChange} usePlaceholder={false} isDark={false} />
                    </View>

                    <FilterByDate />
                </View>

                <View>
                    {screenData && screenData.items && screenData.items.map(item =>
                        <ProductCard key={item.title} iconUrl={imagePath[item.imageUrl as ImageKey]} title={item.title} onClick={()=>{}} isActive={item.imageUrl === "potato"}/>
                    )}
                </View>

                <View style={{display:"flex", flexDirection:"row", paddingHorizontal:20, marginTop:30, marginBottom:20}}>
                    <Text style={{flex:1, fontSize:23,fontWeight:'600',color:"#444",}}>Suppliers</Text>
                    <View style={{display:"flex", flexDirection:"row", gap:10, alignItems:"center"}}>
                        <TouchableOpacity><Text style={{fontSize:17,fontWeight:'600',color:"#444"}}>Potato</Text></TouchableOpacity>
                        <TouchableOpacity><Text style={{fontSize:17,fontWeight:'600',color:"#444"}}>Oil</Text></TouchableOpacity>
                    </View>
                </View>

                <View>
                    {screenData && screenData.items && screenData.items.map(item =>
                        <ProductCard key={item.title} iconUrl={imagePath[item.imageUrl as ImageKey]} title={item.title} onClick={()=>{}} />
                    )}
                </View>
            </View>
        </>
    );
}

export default GoodsTrack;