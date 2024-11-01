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

const DocketDetailsFormStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:20,
        backgroundColor: '#f4f4f4',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    dateText: {
        fontSize: 18,
        color: "#444",
        fontWeight: 'bold',
    },
    timeText: {
        fontSize: 18,
        color: "#444",
        fontWeight: 'bold',
    },
    docketNumber: {
        fontSize: 16,
        color: '#444',
        marginBottom: 20,
    },
    fieldContainer: {
        backgroundColor: '#fff',
        padding: 35,
        borderRadius: 30,
        flex: 1
    },
    label: {
        fontSize: 15,
        color: '#444',
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 15
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        gap: 10
    },
    inputContainer: {
        flex: 1,
    },
    input: {
        height: 60,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#f4f4f4',
        borderRadius: 30,
    },
});
export {dashboardStyles, DocketDetailsFormStyles}