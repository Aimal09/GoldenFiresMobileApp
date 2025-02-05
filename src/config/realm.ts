// src/config/realm.ts
import Realm from 'realm';
import { AuthSchema } from '../context/AuthContext';

export const REALM_SCHEMA_VERSION = 1;

export const realmConfig = {
    schema: [AuthSchema],
    schemaVersion: REALM_SCHEMA_VERSION,
    onMigration: (oldRealm: Realm, newRealm: Realm) => {
        if (oldRealm.schemaVersion < 1) {
            const oldObjects = oldRealm.objects('Auth');
            const newObjects = newRealm.objects('Auth');

            for (const objectIndex in oldObjects) {
                const oldObject = oldObjects[objectIndex];
                const newObject = newObjects[objectIndex];
                newObject.accessToken = oldObject.authToken;
            }
        }
    }
};

export const getRealm = async () => {
    return await Realm.open(realmConfig);
};