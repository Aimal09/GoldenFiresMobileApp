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
        paddingVertical:25,
        borderRadius:20,
        marginTop:20
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
        fontSize:22,
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
    }
})

export default styles;