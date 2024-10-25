import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard';
import SupplierDocket from '../screens/Dashboard/SupplierDocket';
import GoodsTrack from '../screens/Dashboard/GoodsTrack';
import ViewDocket from '../screens/Dashboard/ViewDocket';
import Load from '../screens/Dashboard/Load';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    if (route.name === 'Dashboard') {
                        iconName = require('../assets/images/dashboard-icon.png');
                    } else if (route.name === 'Supplier Docket') {
                        iconName = require('../assets/images/supplier-docket-icon.png');
                    } else if (route.name === 'Goods Track') {
                        iconName = require('../assets/images/goods-track-icon.png');
                    } else if (route.name === 'View Docket') {
                        iconName = require('../assets/images/view-docket-icon.png');
                    } else if (route.name === 'Load') {
                        iconName = require('../assets/images/load-icon.png');
                    }

                    return <Image source={iconName} style={{ width: 30, height: 30, paddingVertical:10 }} />;
                },
                tabBarActiveTintColor: '#f2b233',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}} />
            <Tab.Screen name="Supplier Docket" component={SupplierDocket} options={{headerShown:false}} />
            <Tab.Screen name="Goods Track" component={GoodsTrack} options={{headerShown:false}} />
            <Tab.Screen name="View Docket" component={ViewDocket} options={{headerShown:false}} />
            <Tab.Screen name="Load" component={Load} options={{headerShown:false}} />
        </Tab.Navigator>
    );
};

export default Tabs;
