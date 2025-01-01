import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TopBar from "../../components/TopBar";
import { OverviewNavigationProp, OverviewRouteProp } from "../../navigations/Types";
import styles from "../../styles/style";

type Props = {
    navigation: OverviewNavigationProp;
    route: OverviewRouteProp;
};

const Overview: React.FC<Props> = ({ navigation, route }) => {
    const data = route.params;

    const handleSend = () => { 
        navigation.reset({
            index:0,
            routes:[{name:"SupplierDocket"}]
        });
    }
    return (
        <>
            <TopBar pageName="Overview" showBackButton={false}/>
            <View style={overviewStyles.mainContainer}>
                <View style={overviewStyles.container}>
                    <View style={overviewStyles.row}>
                        <View style={overviewStyles.half}>
                            <Image source={{ uri: data.details.docketPhoto }} style={{ width: "100%", aspectRatio: 4 / 3, height: 140, borderRadius: 10 }} />
                        </View>
                        <View style={overviewStyles.half}>
                            <Text style={overviewStyles.heading}>Supplier Docket</Text>
                            <Text style={overviewStyles.heading}>004583</Text>
                        </View>
                    </View>
                    <View style={overviewStyles.row}>
                        <View style={overviewStyles.half}>
                            <Text style={overviewStyles.label}>Overview</Text>
                            <Text style={overviewStyles.heading}>{data.details.details.supplierName}</Text>
                        </View>
                        <View style={overviewStyles.half}>
                            <Text style={overviewStyles.label}>Product Name</Text>
                            <Text style={overviewStyles.heading}>{data.details.details.potatoVariety}</Text>
                        </View>
                    </View>
                    <View style={overviewStyles.row}>
                        <View style={overviewStyles.half}>
                            <Text style={overviewStyles.label}>Weight</Text>
                            <Text style={overviewStyles.heading}>{data.details.details.nettWeight}</Text>
                        </View>
                        <View style={overviewStyles.half}>
                            <Text style={overviewStyles.label}>Date</Text>
                            <Text style={overviewStyles.heading}>{data.details.details.supplierName}</Text>
                        </View>
                    </View>
                    <View style={overviewStyles.row}>
                        <View style={overviewStyles.half}>
                            <Text style={overviewStyles.label}>Driver</Text>
                            <Text style={overviewStyles.heading}>{data.details.details.nettWeight}</Text>
                        </View>
                        <View style={overviewStyles.half}>
                            <Text style={overviewStyles.label}>Receiver</Text>
                            <Text style={overviewStyles.heading}>{data.details.details.supplierName}</Text>
                        </View>
                        <View style={overviewStyles.half}>
                            <Image source={{ uri: data.driverSign }} resizeMode="contain" style={{ width: "100%", aspectRatio: 1, height: 100, borderRadius: 10 }} />
                        </View>
                        <View style={overviewStyles.half}>
                            <Image source={{ uri: data.recieverSign }} resizeMode="contain" style={{ width: "100%", aspectRatio: 1, height: 100, borderRadius: 10 }} />
                        </View>
                    </View>

                </View>
            </View>

            <View style={{ padding: 20, paddingTop: 0 }}>
                <TouchableOpacity style={styles.btn} onPress={handleSend}>
                    <Text style={styles.btnText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default Overview;

const overviewStyles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 20,
        flex: 1,
    },
    container: {
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        flex: 1,
        padding: 35,
        gap: 25
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap:"wrap"
    },
    half: {
        width: "50%",
        paddingHorizontal:10
    },
    label: {
        fontSize: 16,
        color: "#4448",
        marginBottom:7
    },
    heading: {
        fontSize: 24,
        fontWeight: "500",
        color: "#444"
    }
});