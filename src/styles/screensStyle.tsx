import { StyleSheet } from 'react-native';
import COLORS from './colors';

const dashboardStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#f4f4f4',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    userName: {
        fontSize: 18,
        fontWeight: '600',
    },
    notificationButton: {
        padding: 10,
    },
    bellIcon: {
        width: 24,
        height: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap:10,
        marginBottom:10
    },
    newLoadButton: {
        backgroundColor: '#f2b233',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
    },
    newLoadButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export {dashboardStyles}