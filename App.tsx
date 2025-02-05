import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import Realm from "realm";
import { AuthProvider } from './src/context/AuthContext';
import { NetworkProvider, useNetwork } from './src/context/NetworkContext';
import { useAuth } from './src/context/AuthContext';
import Login from './src/screens/Auth/Login';
import Tabs from './src/navigations/Tabs';

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
    return (
        <NetworkProvider>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </NetworkProvider>
    );
}

const AppContent = () => {
    const { isConnected } = useNetwork();
    const { accessToken, isLoading } = useAuth();

    console.log('auh token: ', accessToken);
    useEffect(() => {
        if (isConnected) {
            syncDocketsIfNeeded();
        }
    }, [isConnected]);

    const syncDocketsIfNeeded = () => {
        if (isConnected) {
            Realm.open({ schema: [SupplierDocketSchema] }).then(realm => {
                const docket = realm.objects('SupplierDocket')[0];
                if (docket) {
                    sendToAPI(docket);
                }
            });
        }
    };

    const sendToAPI = async (docket: any) => {
        try {
            // let res = api call here
            if (true) { // api res.ok
                const realm = await Realm.open({ schema: [SupplierDocketSchema] });
                realm.write(() => {
                    const allDockets = realm.objects("SupplierDocket");
                    realm.delete(allDockets);
                });
                realm.close();
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
