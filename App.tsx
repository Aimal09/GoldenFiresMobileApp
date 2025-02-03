import React, { useEffect } from 'react';
import Realm from "realm";
import { AuthProvider } from './src/context/AuthContext';
import { NetworkProvider, useNetwork } from './src/context/NetworkContext';
import { useAuth } from './src/context/AuthContext';


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
    const { authToken, isLoading } = useAuth();

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
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}
