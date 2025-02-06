// src/context/RealmContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import Realm from 'realm';
import { getRealm } from '../config/realm';

interface RealmContextType {
    realm: Realm | null;
}

const RealmContext = createContext<RealmContextType>({ realm: null });

export const RealmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [realm, setRealm] = useState<Realm | null>(null);

    useEffect(() => {
        const initRealm = async () => {
            try {
                console.log('Attempting to initialize Realm');
                const realmInstance = await getRealm();
                console.log('Realm instance created:', !!realmInstance);
                setRealm(realmInstance);
            } catch (error) {
                console.error('Realm initialization failed:', error);
            }
        };
        initRealm();

        return () => {
            realm?.close();
        };
    }, []);

    return (
        <RealmContext.Provider value={{ realm }}>
            {children}
        </RealmContext.Provider>
    );
};

export const useRealm = () => {
    const context = useContext(RealmContext);
    if (!context) {
        throw new Error('useRealm must be used within a RealmProvider');
    }
    return context.realm;
};