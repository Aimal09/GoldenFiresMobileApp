import { Image, Text, TouchableOpacity } from "react-native";
import styles from "../styles/style";

const FilterByDate = () => {
    return(
        <>
        <TouchableOpacity style={{...styles.btnSecondary, alignItems:"center"}}>
            <Text style={styles.btnSecondaryText}>Filter by Date</Text>
            <Image source={require("../assets/images/chevron-right.png")} style={{height:11, width:7, marginLeft:10, marginBottom:-2 }} />
        </TouchableOpacity>    
        </>
    );
}


export default FilterByDate;