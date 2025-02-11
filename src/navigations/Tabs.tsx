// navigations/Tabs.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import COLORS from '../styles/colors';

// Screens
import Dashboard from '../screens/Dashboard';
import SupplierDocket from '../screens/SupplierDocket/SupplierDocket';
import GoodsTrack from '../screens/GoodsTrack/GoodsTrack';
import ViewDocket from '../screens/ViewDocket/ViewDocket';
import Load from '../screens/Load/Load';
import DocketDetailsForm from '../screens/SupplierDocket/DocketDetailsForm';
import DocketDetailsPictureForm from '../screens/SupplierDocket/DocketDetailsPictureForm';
import DocketSignatureForm from '../screens/SupplierDocket/DocketSignatureForm';
import Overview from '../screens/SupplierDocket/Overview';
import NewLoad from '../screens/NewLoad';
import GoodStock from '../screens/NewLoad/goodStock';

// Navigation Types
import { SupplierDocketStackParamList, TabParamList, LoadStackParamList } from './Types';
import DocketCommentForm from '../screens/SupplierDocket/DocketCommentForm';

const Tab = createBottomTabNavigator<TabParamList>();
const SupplierStack = createStackNavigator<SupplierDocketStackParamList>();
const LoadStack = createStackNavigator<LoadStackParamList>();

const tabOptions = {
    headerShown: false,
    tabBarStyle: {
        height: 90,
        paddingBottom: 15,
        paddingTop: 15
    }
};

const SupplierDocketStack = () => (
    <SupplierStack.Navigator screenOptions={{ headerShown: false }}>
        <SupplierStack.Screen 
            name='SupplierDocket' 
            component={SupplierDocket}
        />
        <SupplierStack.Screen name='DocketDetailsForm' component={DocketDetailsForm} />
        <SupplierStack.Screen name='DocketDetailsPictureForm' component={DocketDetailsPictureForm} />
        <SupplierStack.Screen 
            name='DocketCommentForm' 
            component={DocketCommentForm} 
        />
        <SupplierStack.Screen name='DocketSignatureForm' component={DocketSignatureForm} />
        <SupplierStack.Screen name='Overview' component={Overview} />
    </SupplierStack.Navigator>
);

const LoadStackNavigator = () => (
    <LoadStack.Navigator screenOptions={{ headerShown: false }}>
        <LoadStack.Screen name='Load' component={Load} />
        <LoadStack.Screen name='NewLoad' component={NewLoad} />
        <LoadStack.Screen name='GoodStock' component={GoodStock} />
    </LoadStack.Navigator>
);

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    switch (route.name) {
                        case 'Dashboard':
                            iconName = require('../assets/images/dashboard-icon.png');
                            break;
                        case 'Supplier Docket':
                            iconName = require('../assets/images/supplier-docket-icon.png');
                            break;
                        case 'Goods Track':
                            iconName = require('../assets/images/goods-track-icon.png');
                            break;
                        case 'View Docket':
                            iconName = require('../assets/images/view-docket-icon.png');
                            break;
                        case 'Load':
                            iconName = require('../assets/images/load-icon.png');
                            break;
                        default:
                            iconName = require('../assets/images/dashboard-icon.png');
                    }
                    return (
                        <Image 
                            source={iconName} 
                            style={{ 
                                width: 30, 
                                height: 30, 
                                paddingVertical: 10,
                                opacity: focused ? 1 : 0.5 
                            }} 
                        />
                    );
                },
                tabBarActiveTintColor: COLORS.yellow,
                tabBarInactiveTintColor: COLORS.grey,
                unmountOnBlur: true,
                ...tabOptions
            })}
        >
            <Tab.Screen name="Dashboard" component={Dashboard} />
            <Tab.Screen name="Supplier Docket" component={SupplierDocketStack} />
            <Tab.Screen name="Goods Track" component={GoodsTrack} />
            <Tab.Screen name="View Docket" component={ViewDocket} />
            <Tab.Screen name="Load" component={LoadStackNavigator} />
        </Tab.Navigator>
    );
};

export default Tabs;

// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Dashboard from '../screens/Dashboard';
// import SupplierDocket from '../screens/SupplierDocket/SupplierDocket';
// import GoodsTrack from '../screens/GoodsTrack/GoodsTrack';
// import ViewDocket from '../screens/ViewDocket/ViewDocket';
// import Load from '../screens/Load/Load';
// import { Image } from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
// import DocketDetailsForm from '../screens/SupplierDocket/DocketDetailsForm';
// import { RootStackParamList } from './Types';
// import DocketDetailsPictureForm from '../screens/SupplierDocket/DocketDetailsPictureForm';
// import DocketSignatureForm from '../screens/SupplierDocket/DocketSignatureForm';
// import Overview from '../screens/SupplierDocket/Overview';
// import NewLoad from '../screens/NewLoad';
// import GoodStock from '../screens/NewLoad/goodStock';

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator<RootStackParamList>();
// const tabOptions = {headerShown:false,tabBarStyle:{height:90,paddingBottom:15,paddingTop:15}};

// const SupplierDocketStack = () => 
//     <Stack.Navigator>
//         <Stack.Screen name='SupplierDocket' component={SupplierDocket} options={tabOptions}/>
//         <Stack.Screen name='DocketDetailsForm' component={DocketDetailsForm} options={tabOptions}/>
//         <Stack.Screen name='DocketDetailsPictureForm' component={DocketDetailsPictureForm} options={tabOptions}/>
//         <Stack.Screen name='DocketSignatureForm' component={DocketSignatureForm} options={tabOptions}/>
//         <Stack.Screen name='Overview' component={Overview} options={tabOptions}/>
//         <Stack.Screen name='View Docket' component={ViewDocket} options={tabOptions}/>

//     </Stack.Navigator>

// const NewLoadStack = () => 
//     <Stack.Navigator>
//         <Stack.Screen name='Load' component={Load} options={tabOptions}/>
//         <Stack.Screen name='NewLoad' component={NewLoad} options={tabOptions}/>
//         <Stack.Screen name='GoodStock' component={GoodStock} options={tabOptions}/>
//     </Stack.Navigator>


// const Tabs = () => {
//     return (
//         <Tab.Navigator
//             screenOptions={({ route }) => ({
//                 tabBarIcon: ({ focused }) => {
//                     let iconName;
//                     if (route.name === 'Dashboard') {
//                         iconName = require('../assets/images/dashboard-icon.png');
//                     } else if (route.name === 'Supplier Docket') {
//                         iconName = require('../assets/images/supplier-docket-icon.png');
//                     } else if (route.name === 'Goods Track') {
//                         iconName = require('../assets/images/goods-track-icon.png');
//                     } else if (route.name === 'View Docket') {
//                         iconName = require('../assets/images/view-docket-icon.png');
//                     } else if (route.name === 'Load') {
//                         iconName = require('../assets/images/load-icon.png');
//                     }

//                     return <Image source={iconName} style={{ width: 30, height: 30, paddingVertical:10 }} />;
//                 },
//                 tabBarActiveTintColor: '#f2b233',
//                 tabBarInactiveTintColor: 'gray',
//             })}
//         >
//             <Tab.Screen name="Dashboard" component={Dashboard} options={tabOptions} />
//             <Tab.Screen name="Supplier Docket" component={SupplierDocketStack} options={tabOptions} />
//             <Tab.Screen name="Goods Track" component={GoodsTrack} options={tabOptions} />
//             <Tab.Screen name="View Docket" component={ViewDocket} options={tabOptions} />
//             <Tab.Screen name="Load" component={NewLoadStack} options={tabOptions} />
//         </Tab.Navigator>
//     );
// };

// export default Tabs;
