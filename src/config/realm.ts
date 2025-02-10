// src/config/realm.ts
// import Realm from 'realm';
// import { AuthSchema } from '../context/AuthContext';

// export const REALM_SCHEMA_VERSION = 1;

// export const realmConfig = {
//     schema: [AuthSchema],
//     schemaVersion: REALM_SCHEMA_VERSION,
//     onMigration: (oldRealm: Realm, newRealm: Realm) => {
//         if (oldRealm.schemaVersion < 1) {
//             const oldObjects = oldRealm.objects('Auth');
//             const newObjects = newRealm.objects('Auth');

//             for (const objectIndex in oldObjects) {
//                 const oldObject = oldObjects[objectIndex];
//                 const newObject = newObjects[objectIndex];
//                 newObject.accessToken = oldObject.authToken;
//             }
//         }
//     }
// };

// export const getRealm = async () => {
//     return await Realm.open(realmConfig);
// };

// src/config/realm.ts
import Realm from 'realm';

export const AuthSchema = {
   name: "Auth",
   primaryKey: "id",
   properties: {
       id: "string",
       userProfile: "mixed?",
       accessToken: "string?",
       refreshToken: "string?",
       tokenExpiry: "int?",
   }
};

export const SupplierDocketSchema = {
   name: "SupplierDocket",
   primaryKey: "id",
   properties: {
       id: "int",
       supplierName: "string",
       variety: "string",
       docketNumber: "string",
       weightBridgeDocketNumber: "string",
       grossWeight: "string",
       nettWeight: "string",
       driverName: "string",
       receiverName: "string",
       trailerRego: "string",
       docketPhotos: "string[]",
       driverSign: "string",
       recieverSign: "string",
       date: "date"
   }
};

export const REALM_SCHEMA_VERSION = 3;

export const realmConfig = {
   schema: [AuthSchema, SupplierDocketSchema],
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
       if (oldRealm.schemaVersion < 2) {
            const oldDockets = oldRealm.objects('SupplierDocket');
            const newDockets = newRealm.objects('SupplierDocket');

            for (const objectIndex in oldDockets) {
                const oldObject = oldDockets[objectIndex];
                const newObject = newDockets[objectIndex];
                if (oldObject.potatoVariety) {
                    newObject.variety = oldObject.potatoVariety;
                }
                newObject.weightBridgeDocketNumber = '';
                newObject.date = new Date();
            }
        }
        if (oldRealm.schemaVersion < 3) {
            const oldDockets = oldRealm.objects('SupplierDocket');
            const newDockets = newRealm.objects('SupplierDocket');
 
            for (const objectIndex in oldDockets) {
                const oldObject = oldDockets[objectIndex];
                const newObject = newDockets[objectIndex];
                // Convert single photo to array
                if (oldObject.docketPhoto) {
                    newObject.docketPhotos = [oldObject.docketPhoto];
                } else {
                    newObject.docketPhotos = [];
                }
            }
        }
   }
};

export const getRealm = async () => {
   return await Realm.open(realmConfig);
};