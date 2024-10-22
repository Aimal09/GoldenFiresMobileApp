import { StyleSheet } from 'react-native';
import COLORS from './colors';

export const loginStyle = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
        paddingHorizontal: 60,
    },
    title: {
        fontSize: 38,
        fontWeight: "500",
        marginBottom: 50,
        color: COLORS.text
    },
    tabContainer: {
        flexDirection: "row",
    },
    tab: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.white,
        cursor:"pointer"
    },
    tabInactive: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: COLORS.background,
    },
    tabText: {
        fontSize: 17,
        fontWeight: "500",
        color: COLORS.text
    },
    tabTextInactive: {
        fontSize: 17,
        fontWeight: "400",
        color: COLORS.textLight,
    },
    inputContainer: {
        width: "100%",
        backgroundColor: COLORS.white,
        paddingVertical: 60,
        paddingHorizontal: 30,
        borderRadius: 30
    },
    label: {
        fontSize: 17,
        fontWeight: "500",
        marginLeft: 30,
        marginBottom: 15,
        color: COLORS.text
    },
    input: {
        width: "100%",
        paddingVertical: 22,
        paddingHorizontal: 30,
        borderRadius: 40,
        backgroundColor: COLORS.background,
        color: COLORS.text,
        marginBottom: 20,
        fontSize: 14,
    },
    confirmButton: {
        backgroundColor: COLORS.yellow,
        paddingVertical: 25,
        borderRadius: 40,
        alignItems: "center",
        marginTop: 20,
    },
    confirmButtonText: {
        color: COLORS.white,
        fontSize: 19,
        fontWeight: "500",
    },
});
