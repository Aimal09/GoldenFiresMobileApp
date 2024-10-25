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


const topbarStyles = StyleSheet.create({
    topBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
      marginBottom:20
    },
    leftSection: {
      flexDirection: "row",
      alignItems: "center",
    },
    rightSection: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor:"#fff",
      padding:10,
      borderRadius:50
    },
    pageTitle: {
      fontSize: 24,
      fontWeight: "600",
      marginLeft: 10,
      color:"#444"
    },
    profileSection: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 10,
      paddingRight:12,
      borderRightWidth:2,
      borderRightColor:"#eee"
    },
    profileImage: {
      width: 30,
      height: 30,
      borderRadius: 20,
    },
    userName: {
      marginLeft: 10,
      marginRight: 15,
      fontSize: 13,
    },
    chevronIcon: {
      width: 9,
      height: 15,
    },
    notificationSection: {
      padding: 5,
    },
    notificationIcon: {
      width: 20,
      height: 20,
    },
  });
  

  const cardStyles = StyleSheet.create({
    card: {
        width: '50%',
        flex:1,
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 250,
        aspectRatio:4 / 3,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    title: {
        paddingVertical: 20,
        fontSize: 18,
        fontWeight: '600',
        color:"#444444"
    },
    chevronIcon: {
      width: 8,
      height: 13,
    },
    titleContainer:{
        paddingHorizontal:25,
        display:"flex",
        flexDirection: 'row',
        justifyContent:"space-between",
        alignItems:"center"
    }
});
  export {topbarStyles,cardStyles}