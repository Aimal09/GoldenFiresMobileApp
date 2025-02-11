import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type SupplierDocketProp = {
    title: string;
}
type DocketDetailsFormProp = {
    title: string;
}
type DocketDetailsPictureFormProp = {
    supplierName: string;
    variety: string;
    docketNumber: string;
    grossWeight: string;
    nettWeight: string;
    trailerRego: string;
    weightBridgeDocketNumber: string;
    driverName: string;
    receiverName: string;
}
type DocketSignatureFormProp = {
    details: DocketDetailsPictureFormProp;
    docketPhotos:string [];
    comment:string,
    isFlagged:boolean
}
type OverviewProp = {
    details: DocketSignatureFormProp;
    driverSign:string;
    recieverSign:string;
}

// Tab Navigation Types
export type TabParamList = {
    'Dashboard': undefined;
    'Supplier Docket': undefined;
    'Goods Track': undefined;
    'View Docket': undefined;
    'Load': undefined;
};

export type DocketCommentFormProp = {
    details: DocketDetailsPictureFormProp;
    docketPhotos: string[];
    comment: string;
    isFlagged: boolean;
};

// Stack Navigation Types
export type SupplierDocketStackParamList = {
    'SupplierDocket': SupplierDocketProp;
    'DocketDetailsForm': DocketDetailsFormProp;
    'DocketDetailsPictureForm': DocketDetailsPictureFormProp;
    'DocketSignatureForm': DocketSignatureFormProp;
    'Overview': OverviewProp;
    'DocketCommentForm': {
        details: DocketDetailsPictureFormProp;
        docketPhotos: string[];
    };
};

export type LoadStackParamList = {
    'Load': object;
    'NewLoad': object;
    'GoodStock': object;
};

// // Define the types of parameters each screen expects
// export type RootStackParamList = {
//     'SupplierDocket': SupplierDocketProp;
//     'DocketDetailsForm': DocketDetailsFormProp;
//     "DocketDetailsPictureForm": DocketDetailsPictureFormProp;
//     "DocketSignatureForm" : DocketSignatureFormProp;
//     "Overview":OverviewProp;
//     "Load":object;
//     "NewLoad":object;
//     "GoodStock":object;
//     "View Docket": object;
// };

// export type TabParamList = {
//     "Dashboard": undefined;
//     'Supplier Docket': undefined;
//     'Goods Track': undefined;
//     'View Docket': undefined;
//     "Load": undefined;
// }

export type DocketCommentFormNavigationProp = CompositeNavigationProp<
    StackNavigationProp<SupplierDocketStackParamList, 'DocketCommentForm'>,
    BottomTabNavigationProp<TabParamList>
>;

export type DocketCommentFormRouteProp = RouteProp<SupplierDocketStackParamList, 'DocketCommentForm'>;

// Combined Navigation Types
export type SupplierDocketNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList>,
    StackNavigationProp<SupplierDocketStackParamList>
>;

// Individual Screen Navigation Props
export type DocketDetailsFormNavigationProp = CompositeNavigationProp<
    StackNavigationProp<SupplierDocketStackParamList, 'DocketDetailsForm'>,
    BottomTabNavigationProp<TabParamList>
>;

export type DocketDetailsPictureFormNavigationProp = CompositeNavigationProp<
    StackNavigationProp<SupplierDocketStackParamList, 'DocketDetailsPictureForm'>,
    BottomTabNavigationProp<TabParamList>
>;

export type DocketSignatureFormNavigationProp = CompositeNavigationProp<
    StackNavigationProp<SupplierDocketStackParamList, 'DocketSignatureForm'>,
    BottomTabNavigationProp<TabParamList>
>;

export type OverviewNavigationProp = CompositeNavigationProp<
    StackNavigationProp<SupplierDocketStackParamList, 'Overview'>,
    BottomTabNavigationProp<TabParamList>
>;

// Route Props
export type DocketDetailsFormRouteProp = RouteProp<SupplierDocketStackParamList, 'DocketDetailsForm'>;
export type DocketDetailsPictureFormRouteProp = RouteProp<SupplierDocketStackParamList, 'DocketDetailsPictureForm'>;
export type DocketSignatureFormRouteProp = RouteProp<SupplierDocketStackParamList, 'DocketSignatureForm'>;
export type OverviewRouteProp = RouteProp<SupplierDocketStackParamList, 'Overview'>;

// export type DocketDetailsFormNavigationProp = StackNavigationProp<RootStackParamList, 'DocketDetailsForm'>;
// export type DocketDetailsFormRouteProp = RouteProp<RootStackParamList, 'DocketDetailsForm'>;

// export type DocketDetailsPictureFormNavigationProp = StackNavigationProp<RootStackParamList, 'DocketDetailsPictureForm'>;
// export type DocketDetailsPictureFormRouteProp = RouteProp<RootStackParamList, 'DocketDetailsPictureForm'>;

// export type DocketSignatureFormNavigationProp = StackNavigationProp<RootStackParamList, 'DocketSignatureForm'>;
// export type DocketSignatureFormRouteProp = RouteProp<RootStackParamList, 'DocketSignatureForm'>;

// export type OverviewNavigationProp = StackNavigationProp<RootStackParamList, 'Overview'>;
// export type OverviewRouteProp = RouteProp<RootStackParamList, 'Overview'>;

// export type LoadNavigationProp = StackNavigationProp<RootStackParamList, 'NewLoad'>;
// export type LoadRouteProp = RouteProp<RootStackParamList, 'Load'>;

// export type NewLoadNavigationProp = StackNavigationProp<RootStackParamList, 'GoodStock'>;
// export type NewLoadRouteProp = RouteProp<RootStackParamList, 'NewLoad'>;
