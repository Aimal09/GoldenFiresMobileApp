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
    btnText:{
        color:"#fff",
        fontSize:22,
        fontWeight:"600",
        textAlign:"center"
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#f4f4f4',
    }
})

export default styles;