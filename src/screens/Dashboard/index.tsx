import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Card from '../../components/Card'; 
import TopBar from '../../components/TopBar';
import { dashboardStyles } from '../../styles/screensStyle';
import styles from '../../styles/style';

const Dashboard = ({ navigation }:any) => {
    return (
        
        <ScrollView style={dashboardStyles.container}>
            {/* Top Profile and Notification Section */}
            <TopBar pageName='Dashboard' showBackButton={false}/>


            <View style={dashboardStyles.cardsContainer}>
                <Card
                    title="Supplier Inbound"
                    image={require('../../assets/images/supplier-inbound.png')}
                    onPress={() => navigation.navigate('Supplier Docket')}
                />
                <Card
                    title="Goods Track"
                    image={require('../../assets/images/goods-track.png')}
                    onPress={() => navigation.navigate('GoodsTrack')}
                />
            </View>
            <View style={dashboardStyles.cardsContainer}>
                <Card
                    title="View Docket"
                    image={require('../../assets/images/view-docket.png')}
                    onPress={() => navigation.navigate('ViewDocket')}
                />
                <Card
                    title="Load"
                    image={require('../../assets/images/load.png')}
                    onPress={() => navigation.navigate('LoadPanel')}
                />
            </View>

            {/* New Load Button */}
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('NewLoad')}>
                <Text style={styles.btnText}>New Load</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};


export default Dashboard;
