import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TopBar from '../../components/TopBar';
import Table from '../../components/Table';

interface Notification {
    notification: string;
    time: string;
    date: string;
    type: 'oil' | 'good' | 'load';
}

interface NotificationResponse {
    nextPage: boolean;
    data: Notification[];
}
interface Column {
    title: string;
    value: string | number;
}

interface TableData {
    columns: Column[];
    details: object;
}

const Notifications = () => {
    const [tableData, setTableData] = useState<TableData[]>([]);

    const formatDataForTable = (notifications: Notification[]): TableData[] => {
        return notifications.map(item => ({
            columns: [
                { title: 'Notification', value: item.notification },
                { title: 'Time', value: item.time },
                { title: 'Date', value: item.date },
                { title: 'Type', value: item.type.toUpperCase() }
            ],
            details: item
        }));
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            // Replace with your actual API call
            const response = await fetch('YOUR_API_ENDPOINT/notifications');
            const data: NotificationResponse = await response.json();
            setTableData(formatDataForTable(data.data));
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    };

    const handleRowSelect = (row: TableData) => {
        console.log('Selected notification:', row.details);
    };

    return (
        <View style={styles.container}>
            <TopBar pageName="Notifications" showBackButton={true} />
            <Table
                data={tableData}
                onRowSelect={handleRowSelect}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default Notifications;