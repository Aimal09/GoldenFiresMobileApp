import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type SupplierDocketProp = {
    title: string;
}
type DocketDetailsFormProp = {
    title: string;
}
type DocketDetailsPictureFormProp = {
    supplierName: string;
    potatoVariety: string;
    docketNumber: string;
    grossWeight: string;
    nettWeight: string;
    trailerRego: string;
}
type DocketSignatureFormProp = {
    details: DocketDetailsPictureFormProp;
    docketPhoto:string;
}
type OverviewProp = {
    details: DocketSignatureFormProp;
    driverSign:string;
    recieverSign:string;
}
// Define the types of parameters each screen expects
export type RootStackParamList = {
    'SupplierDocket': SupplierDocketProp;
    'DocketDetailsForm': DocketDetailsFormProp;
    "DocketDetailsPictureForm": DocketDetailsPictureFormProp;
    "DocketSignatureForm" : DocketSignatureFormProp;
    "Overview":OverviewProp;
};

export type DocketDetailsFormNavigationProp = StackNavigationProp<RootStackParamList, 'DocketDetailsForm'>;
export type DocketDetailsFormRouteProp = RouteProp<RootStackParamList, 'DocketDetailsForm'>;

export type DocketDetailsPictureFormNavigationProp = StackNavigationProp<RootStackParamList, 'DocketDetailsPictureForm'>;
export type DocketDetailsPictureFormRouteProp = RouteProp<RootStackParamList, 'DocketDetailsPictureForm'>;

export type DocketSignatureFormNavigationProp = StackNavigationProp<RootStackParamList, 'DocketSignatureForm'>;
export type DocketSignatureFormRouteProp = RouteProp<RootStackParamList, 'DocketSignatureForm'>;

export type OverviewNavigationProp = StackNavigationProp<RootStackParamList, 'Overview'>;
export type OverviewRouteProp = RouteProp<RootStackParamList, 'Overview'>;
