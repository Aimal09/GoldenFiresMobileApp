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
        gap: 10,
        marginBottom: 10
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
        paddingHorizontal: 20,
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
        minHeight: 60,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#f4f4f4',
        borderRadius: 30,
    },
});


const GoodsTrackStyles = StyleSheet.create({
    container: { padding: 10 },
    full: { flex: 1 },
    types: { display: "flex", flexDirection: "row", gap: 10 },
    filterContainer: { display: "flex", flexDirection: "row", paddingHorizontal: 20, marginTop: 30, marginBottom: 20 },
    filters: {
        fontSize: 17, fontWeight: '600', color: COLORS.text
    },
    filterItems: { display: "flex", flexDirection: "row", gap: 10, alignItems: "center" },
    active: {
        borderBottomWidth: 2, borderBottomColor: COLORS.yellow
    },
    heading: { flex: 1, fontSize: 23, fontWeight: '600', color: COLORS.text, },
    supplierBox: { height: 300 },
    supplierGestureBox: { height: "100%" },
    totalRow:{display:"flex",flexDirection:"row", justifyContent:"space-between", paddingHorizontal:25, marginVertical:20},
    totalHeading: { fontSize: 26, fontWeight: '600', color: COLORS.text },
    filterBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical:12,
        borderRadius: 30,
        backgroundColor: COLORS.white,
    },
    filterBtnActive: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical:12,
        borderRadius: 30,
        backgroundColor: COLORS.yellow,
    }
});
export { dashboardStyles, DocketDetailsFormStyles, GoodsTrackStyles }