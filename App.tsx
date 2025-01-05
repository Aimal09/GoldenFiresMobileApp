import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/navigations/Tabs';
import NetInfo from '@react-native-community/netinfo';
import Realm from "realm";


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

export default function App() {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        NetInfo.fetch().then(state => {
            setIsConnected(state.isConnected ?? false);
        });

        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected ?? false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        console.log("STATE: ", isConnected);
        if (isConnected) {
            syncDocketsIfNeeded();
        }
    }, [isConnected]);

    const syncDocketsIfNeeded = () => {
        if (isConnected) {
            Realm.open({ schema: [SupplierDocketSchema] }).then(realm => {
                const docket = realm.objects('SupplierDocket')[0]; // Get the first docket (assuming there's only one)
                if (docket) {
                    sendToAPI(docket);
                }
            });
        }
    };

    const sendToAPI = async (docket: any) => {
        console.log("\n\n\n\n\n\ndata: ",docket);

        // let res = api call here
        if (true) { // api res.ok
            // Clear the Realm data if the upload is successful
            Realm.open({ schema: [SupplierDocketSchema] }).then(realm => {
                realm.write(() => {
                    const allDockets = realm.objects("SupplierDocket");
                    realm.delete(allDockets); // Delete all records from the realm
                });
            });
        }
    };
    return (
        <NavigationContainer>
            <Tabs />
        </NavigationContainer>
    );
}