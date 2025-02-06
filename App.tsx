import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import Realm from "realm";
import { AuthProvider } from './src/context/AuthContext';
import { NetworkProvider, useNetwork } from './src/context/NetworkContext';
import { useAuth } from './src/context/AuthContext';
import Login from './src/screens/Auth/Login';
import Tabs from './src/navigations/Tabs';
import { RealmProvider, useRealm } from './src/context/RealmContext';

// const SupplierDocketSchema = {
//     name: "SupplierDocket",
//     primaryKey: "id",
//     properties: {
//         id: "int",
//         supplierName: "string",
//         Variety: "string",
//         docketNumber: "string",
//         weightBridgeDocketNumber: "string",
//         grossWeight: "string",
//         nettWeight: "string",
//         trailerRego: "string",
//         docketPhoto: "string",
//         driverSign: "string",
//         recieverSign: "string"
//     },
// };

export default function App() {
    return (
        <RealmProvider>
            <NetworkProvider>
                <AuthProvider>
                    <AppContent />
                </AuthProvider>
            </NetworkProvider>
        </RealmProvider>
    );
}

const AppContent = () => {
    const { isConnected } = useNetwork();
    const { accessToken, isLoading } = useAuth();
    const realm = useRealm();

    console.log('auh token: ', accessToken);
    useEffect(() => {
        if (isConnected && realm) {
            syncDocketsIfNeeded(realm);
        }
    }, [isConnected]);

    const syncDocketsIfNeeded = (realmInstance: Realm) => {
        // if (isConnected) {
        //     Realm.open({ schema: [SupplierDocketSchema] }).then(realm => {
        //         const docket = realm.objects('SupplierDocket')[0];
        //         if (docket) {
        //             sendToAPI(docket);
        //         }
        //     });
        // }
        const docket = realmInstance.objects('SupplierDocket')[0];
        if (docket) {
            sendToAPI(realmInstance, docket);
        }
    };

    const sendToAPI = async (realmInstance: Realm, docket: any) => {
        try {
            // let res = api call here
            if (true) { // api res.ok
                // const realm = await Realm.open({ schema: [SupplierDocketSchema] });
                // realm.write(() => {
                //     const allDockets = realm.objects("SupplierDocket");
                //     realm.delete(allDockets);
                // });
                // realm.close();
                realmInstance.write(() => {
                    const allDockets = realmInstance.objects("SupplierDocket");
                    realmInstance.delete(allDockets);
                });
            }
        } catch (error) {
            console.error('Error sending to API:', error);
        }
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {accessToken ? <Tabs /> : <Login />}
        </NavigationContainer>
    );
};
