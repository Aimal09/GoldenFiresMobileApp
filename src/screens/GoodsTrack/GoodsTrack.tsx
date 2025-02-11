import { Text, TouchableOpacity, View } from "react-native";
import ComboBox from "../../components/ComoboBox";
import TopBar from "../../components/TopBar";
import {FilterByDate, FilterByDateCalendar} from "../../components/FilterByDate";
import { inventroyJson } from "../../assets/Mock";
import { useState } from "react";
import ProductCard from "../../components/ProductCard";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { GoodsTrackStyles } from "../../styles/screensStyle";
import FullScreenModal from "../../components/Modal";
import TextField from "../../components/TextField";
import styles from "../../styles/style";
import SignaturePad from "../../components/SignaturePad";
import SpecialProductCard from "../../components/SpecialProductCard";
import React from "react";

type ImageKey = 'potato' | 'oil' | 'box' | 'tape' | 'pallets' | 'plastic' | "detergent" | "hat" | "gloves" | "antifoam" | "saap" | "13mm-fries" | "15mm-fries";

interface OptionItem {
    value: string;
    name: string;
}
interface Item {
    title: string,
    imageUrl: string,
    amount: string,
    description: string | null,
    suppliers: Supplier[] | null,
    packages: string | null,
    boxes: string | null,
    palettes: string | null,
    city: City[] | null
}
interface Supplier {
    name: string,
    total: string
}
interface City {
    cityId: number,
    amount: string,
    suppliers: null,
    packages: string,
    boxes: string,
    palettes: string
}

interface DateRangeProp {
    startDate:string | null,
    endDate:string | null
}

const GoodsTrack = () => {
    const rawData = inventroyJson;
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

    const initFilterByDate = {startDate:null,endDate:null};
    const [screenData, setScreenData] = useState(rawData.data && rawData.data[0]);
    const [comboOptions, setComboOptions] = useState<OptionItem[]>([{ name: "Editable Stock", value: "1" },
    { name: "Goods Stock", value: "2" },
    { name: "Cleaning Supplies", value: "3" },
    { name: "Ready Fries", value: "4" },
    { name: "SAAP", value: "5" }
    ]);
    const [esActiveProduct, setEsActiveProduct] = useState<Item>(screenData.items[0]);
    const [esActiveProductSupplier, setEsActiveProductSupplier] = useState<Supplier>();
    const [showForm, setShowForm] = useState(false);
    const [showSignForm, setShowSignForm] = useState(false);
    const [qty, setQty] = useState('');
    const [comment, setComment] = useState('');
    const [updatedBy, setUpdatedBy] = useState('');
    const [val, setVal] = useState('');
    const [selectedCityId, setSelectedCityId] = useState(0);
    const [filterByDate, setFilterByDate] = useState<DateRangeProp>(initFilterByDate);
    const [showFilterByDate,setShowFilterByDate] = useState(false);


    const OnDropdownChange = (option: string) => {
        const filtered = rawData.data.find(d => d.id.toString() === option);
        filtered && setScreenData(filtered);
    }
    const handleProductClick = (item: Item) => {
        setEsActiveProduct(item);
        if (screenData.inventoryType !== "Edible Stocks") setShowForm(true);
    }

    const handleSupplierClick = (supplier: Supplier) => {
        setEsActiveProductSupplier(supplier);
        setShowForm(true);
    }

    const handleContinueClick = () => {
        setShowForm(false);
        setShowSignForm(true);
    }

    const handleUpdateClick = () => {
        setShowSignForm(false);
    }

    const handleCityFilter = (id:number)=>{
        if(selectedCityId === id) setSelectedCityId(0);
        else setSelectedCityId(id);
    }

    const handleClosed= ()=>{
        setShowForm(false);
        setQty("");
        setComment("");
        setUpdatedBy("");
        setVal("");
        setSelectedCityId(0);
        setFilterByDate(initFilterByDate);
        setShowFilterByDate(false)
    }

    return (
        <>
            <TopBar pageName="Goods Track" />


            {showForm && <FullScreenModal title="Item" onClose={handleClosed} visible={true}>
                <View>
                    <TextField label="Quantity" Keyboardtypedefine="numeric" value={qty} setValue={setQty} placeholder="Enter a value" styles={{ marginBottom: 15 }} />
                    <TextField label="Date" value={val} setValue={setVal} placeholder="10.05.2024" styles={{ marginBottom: 15 }} />
                    <TextField label="Updated By" value={updatedBy} setValue={setUpdatedBy} placeholder="Enter Name Surename" styles={{ marginBottom: 15 }} />
                    <TextField label="Comment" value={comment} setValue={setComment} placeholder="Reason for change" styles={{ marginBottom: 15 }} multiline={true} numberOfLine={6} />
                    <TouchableOpacity style={styles.btn} onPress={handleContinueClick}><Text style={styles.btnText}>Continue</Text></TouchableOpacity>
                </View>

            </FullScreenModal>}

            {showSignForm &&
                <FullScreenModal title="Item" onClose={() => { setShowSignForm(false) }} visible={true}>
                    <View>
                        <SignaturePad />
                        <TouchableOpacity style={styles.btn}><Text style={styles.btnText} onPress={handleUpdateClick}>Update</Text></TouchableOpacity>
                    </View>
                </FullScreenModal>
            }

            {showFilterByDate && <FilterByDateCalendar maximumToday onFilterChange={(range)=>setFilterByDate(range)} closeFilter={()=>setShowFilterByDate(false)}/>}

            <GestureHandlerRootView style={{...GoodsTrackStyles.container,flex:1}}>

                <View style={GoodsTrackStyles.types}>
                    <View style={GoodsTrackStyles.full}>
                        <ComboBox label="" options={comboOptions} onDropdownChange={OnDropdownChange} usePlaceholder={false} isDark={false} />
                    </View>
                    <FilterByDate onClick={()=>setShowFilterByDate(true)}/>
                </View>


                {screenData.cities && <View style={GoodsTrackStyles.types}>
                    {screenData.cities && screenData.cities.map(city =>
                        <TouchableOpacity key={city.name} style={city.id === selectedCityId ? GoodsTrackStyles.filterBtnActive : GoodsTrackStyles.filterBtn} onPress={()=>handleCityFilter(city.id)}><Text style={city.id === selectedCityId ?  {...styles.btnSecondaryText, color:"#fff"}: styles.btnSecondaryText}>{city.name}</Text></TouchableOpacity>
                    )}
                </View>}

                {screenData.total && <View style={GoodsTrackStyles.totalRow}>
                    <Text style={GoodsTrackStyles.totalHeading}>Total</Text>
                    <Text style={GoodsTrackStyles.totalHeading}>{screenData.total}</Text>
                </View>}

                {/* Main card */}
                <View >
                <ScrollView>
                    {screenData && screenData.items && screenData.items.map(item =>
                                screenData.inventoryType !== "Ready Fries" ?
                                    <ProductCard key={item.title} iconUrl={imagePath[item.imageUrl as ImageKey]} title={item.title} onClick={() => { handleProductClick(item) }} isActive={item.title === esActiveProduct?.title} amount={item.amount} /> :
                                    <SpecialProductCard key={item.title} iconUrl={imagePath[item.imageUrl as ImageKey]} title={item.title} onClick={() => { handleProductClick(item) }} isActive={item.title === esActiveProduct?.title} data={selectedCityId === 0 ? item.city : item.city?.filter(city=>city.cityId === selectedCityId)} />
                                )}
                                </ScrollView>
                </View>

                {/* Editable Stocks supplier cards */}
                {screenData.inventoryType === "Edible Stocks" && <>
                    <View style={GoodsTrackStyles.filterContainer}>
                        <Text style={GoodsTrackStyles.heading}>Suppliers</Text>
                        <View style={GoodsTrackStyles.filterItems}>

                            {screenData && screenData.items && screenData.items.map(item =>
                                <TouchableOpacity key={item.imageUrl} onPress={() => { setEsActiveProduct(item) }}><Text style={esActiveProduct?.title === item.title ? { ...GoodsTrackStyles.filters, ...GoodsTrackStyles.active } : GoodsTrackStyles.filters}>{item.title}</Text></TouchableOpacity>
                            )}
                        </View>
                    </View>

                    <View style={GoodsTrackStyles.supplierBox}>
                        <View style={GoodsTrackStyles.supplierGestureBox}>
                            <ScrollView >
                                {screenData && esActiveProduct.suppliers && esActiveProduct.suppliers.map(supplier =>
                                    <ProductCard key={supplier.name} iconUrl={imagePath[esActiveProduct.imageUrl as ImageKey]} title={esActiveProduct.title} onClick={() => { handleSupplierClick(supplier) }} description={supplier.name} amount={supplier.total} />
                                )}
                            </ScrollView>
                        </View>
                    </View>
                </>
                }
            </GestureHandlerRootView>

        </>
    );
}

export default GoodsTrack;

