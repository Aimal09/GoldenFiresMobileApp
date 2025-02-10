import { StyleSheet } from 'react-native';
import COLORS from './colors';

const styles = StyleSheet.create({
    butn:{
        backgroundColor:COLORS.yellow,
        padding:15,
        borderRadius:20
    },
    btn:{
        backgroundColor:COLORS.yellow,
        paddingHorizontal:20,
        paddingVertical:8,
        borderRadius:20,
        marginTop:20,
    },
    btnSecondary:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      borderRadius: 30,
      height:60,
      backgroundColor: '#ffffff',
    },
    btnText:{
        color:"#fff",
        fontSize:15,
        fontWeight:"600",
        textAlign:"center"
    },
    btnSecondaryText: {
        fontSize: 16,
        color: '#444',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#f4f4f4',
    },
    errorTxt: {
        fontSize:12, 
        paddingHorizontal:15, 
        color: COLORS.credited,
        opacity:.7
    },
    card:{
        padding:25,
        borderRadius:20,
        backgroundColor:COLORS.white
    },
    headText: {
        fontSize: 22,
        color: COLORS.text,
        fontWeight: "600",
        marginLeft:15,
        marginBottom:20
    },
    text: {
        fontSize: 18,
        color: COLORS.text,
        fontWeight: "500",
        marginLeft:15
    },
    full:{
        flex:1
    },
    photoSection: {
        marginBottom: 20,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        padding: 15
    },
    addMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    plusIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
        tintColor: COLORS.text
    },
    addMoreText: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: '500'
    }
})

export default styles;