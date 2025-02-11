import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TopBar from "../../components/TopBar";
import { OverviewNavigationProp, OverviewRouteProp } from "../../navigations/Types";
import styles from "../../styles/style";
import { useNetwork } from '../../context/NetworkContext';
import { formatDate } from "../../utils";
import { useRealm } from "../../context/RealmContext";
import { ScrollView } from "react-native-gesture-handler";
import React from "react";

type Props = {
    navigation: OverviewNavigationProp;
    route: OverviewRouteProp;
};

const SupplierDocketSchema = {
    name: "SupplierDocket",
    primaryKey: "id",
    properties: {
        id: "int",
        supplierName: "string",
        potatoVariety: "string",
        docketNumber: "string",
        grossWeight: "string",
        nettWeight: "string",
        trailerRego: "string",
        docketPhoto: "string",
        driverSign: "string",
        recieverSign: "string"
    },
};

const Overview: React.FC<Props> = ({ navigation, route }) => {
    const data = route.params;
    const realm = useRealm();
    const { isConnected } = useNetwork();

    const sendToAPI = async (docket: any) => {
        // console.log("data: ",docket);

        // let res = api call here
        if (true) { // api res.ok
            // Clear the Realm data if the upload is successful
            // Realm.open({ schema: [SupplierDocketSchema] }).then(realm => {
            //     realm.write(() => {
            //         const allDockets = realm.objects("SupplierDocket");
            //         realm.delete(allDockets); // Delete all records from the realm
            //     });
            // });
            if (realm) {
                realm.write(() => {
                    const allDockets = realm.objects("SupplierDocket");
                    realm.delete(allDockets);
                });
            }
        }
    };

    const handleSend = () => {
        const payload = {
            supplierName: data.details.details.supplierName,
            variety: data.details.details.variety,
            docketNumber: data.details.details.docketNumber,
            weightBridgeDocketNumber: data.details.details.weightBridgeDocketNumber,
            grossWeight: data.details.details.grossWeight,
            nettWeight: data.details.details.nettWeight,
            trailerRego: data.details.details.trailerRego,
            driverName: data.details.details.driverName,
            receiverName: data.details.details.receiverName,
            docketPhotos: data.details.docketPhotos,
            driverSign: data.driverSign,
            recieverSign: data.recieverSign,
            comment: data.details.comment,
            isFlagged: data.details.isFlagged,
            date: new Date(),
        };
        // console.log('payload: ', JSON.stringify(payload));

        // if (isConnected) sendToAPI(paylaod);
        // else
        //     Realm.open({ schema: [SupplierDocketSchema] }).then(realm => {
        //         realm.write(() => {
        //             realm.create("SupplierDocket", {
        //                 id: 1,
        //                 ...paylaod
        //             });
        //         });
        //     });
        if (false) {
            sendToAPI(payload)
            navigation.navigate('View Docket');
        } else if (realm) {
            try {
                realm.write(() => {
                    realm.create("SupplierDocket", {
                        id: new Date().getTime(),
                        ...payload
                    });
                    navigation.navigate('View Docket');
                });
            } catch (e) {
                console.error('Realm write error:', e);
                Alert.alert('Error', 'Failed to save docket. Please try again.');
            }
        } else {
            console.log('no realm instance');
            Alert.alert('Error', 'Local Db issue');
        }
        
    }
    return (
        <>
            <TopBar pageName="Overview" showBackButton={false} />
            <ScrollView style={overviewStyles.mainContainer}>
            <View style={overviewStyles.mainContainer}>
                <View style={overviewStyles.container}>
                    <View style={overviewStyles.row}>

                    <View style={overviewStyles.half}>
                            <Text style={overviewStyles.heading}>Supplier Docket</Text>
                            <Text style={overviewStyles.heading}>{data.details.details.docketNumber}</Text>
                        </View>
                        <View style={overviewStyles.half}>
                            <View style={overviewStyles.photosRow}>
                                {data.details.docketPhotos.map((photo, index) => (
                                    <Image 
                                        key={index}
                                        source={{ uri: photo }} 
                                        style={overviewStyles.photo} 
                                    />
                                ))}
                            </View>                            
                        </View>
                    </View>
                    <View style={overviewStyles.row}>
                        <View style={overviewStyles.half}>
                            <Text style={overviewStyles.label}>Overview</Text>
                            <Text style={overviewStyles.heading}>{data.details.details.supplierName}</Text>
                        </View>
                        <View style={overviewStyles.half}>
                            <Text style={overviewStyles.label}>Product Name</Text>
                            <Text style={overviewStyles.heading}>{data.details.details.variety}</Text>
                        </View>
                    </View>
                    <View style={overviewStyles.row}>
                        <View style={overviewStyles.half}>
                            <Text style={overviewStyles.label}>Weight</Text>
                            <Text style={overviewStyles.heading}>{data.details.details.nettWeight}</Text>
                        </View>
                        <View style={overviewStyles.half}>
                            <Text style={overviewStyles.label}>Date</Text>
                            <Text style={overviewStyles.heading}>{formatDate(new Date())}</Text>
                        </View>
                    </View>
                    <View style={overviewStyles.row}>
                        <View style={overviewStyles.half}>
                            <Text style={overviewStyles.label}>Driver's Name</Text>
                            <Text style={overviewStyles.heading}>{data.details.details.driverName}</Text>
                        </View>
                        <View style={overviewStyles.half}>
                            <Text style={overviewStyles.label}>Receiver's Name</Text>
                            <Text style={overviewStyles.heading}>{data.details.details.receiverName}</Text>
                        </View>
                    </View>
                    <View style={overviewStyles.row}>
                        <View style={overviewStyles.half}>
                            <Text style={overviewStyles.label}>Comment</Text>
                            <Text style={overviewStyles.heading}>{data.details.comment}</Text>
                        </View>
                        <View style={overviewStyles.half}>
                            <Text style={overviewStyles.label}>Is Flagged?</Text>
                            <Text style={overviewStyles.heading}>{data.details.isFlagged ? 'Yes' : 'No'}</Text>
                        </View>
                    </View>
                    <View style={overviewStyles.row}>
                        <View style={overviewStyles.half}>
                            <Text style={overviewStyles.label}>Driver</Text>
                            <View >
                                <Image 
                                    source={{ uri: data.driverSign }} 
                                    resizeMode="contain" 
                                    style={{ width: "100%", height: 100, borderRadius: 10, backgroundColor: 'grey' }} />
                            </View>
                        </View>
                        <View style={overviewStyles.half}>
                            <Text style={overviewStyles.label}>Receiver</Text>
                            <Text style={overviewStyles.heading}>{data.details.details.supplierName}</Text>
                        </View>
                        <View style={overviewStyles.half}>
                        <Text style={overviewStyles.label}>Driver Sign</Text>

                            <Image source={{ uri: data.driverSign }} resizeMode="contain" style={{ width: "100%", aspectRatio: 1, height: 100, borderRadius: 10 }} />
                        </View>
                        <View style={overviewStyles.half}>
                        <Text style={overviewStyles.label}>Receiver Sign</Text>

                            <Image source={{ uri: data.recieverSign }} resizeMode="contain" style={{ width: "100%", aspectRatio: 1, height: 100, borderRadius: 10 }} />
                        </View>
                    </View>

                </View>
            </View>
            </ScrollView>
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
        marginTop:15,
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
        flexWrap: "wrap",
    },
    half: {
        width: "50%",
        paddingHorizontal: 10
    },
    label: {
        fontSize: 16,
        color: "#4448",
        marginBottom: 5
    },
    heading: {
        fontSize: 24,
        fontWeight: "500",
        color: "#444"
    },
    photosRow: {
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-between',
        width: '100%'
    },
    photo: {
        flex: 1,
        aspectRatio: 2,
        borderRadius: 10,
    }
});