import { StyleSheet, Text, View } from "react-native";
import COLORS from "../styles/colors";

interface TextBlockProp {
    label:string;
    value?: string;
    styles?:object;
}

const TextBlock:React.FC<TextBlockProp> = ({label, value, styles}) => {

    return (
        <View style={styles}>
            <Text style={textBlockStyles.label}>{label}</Text>
            <Text style={textBlockStyles.value}>{value}</Text>
        </View>
    );
}

export default TextBlock;

const textBlockStyles = StyleSheet.create({
    label:{
        fontSize:16,
        fontWeight:"500",
        color:COLORS.text,
        opacity:.5
    },
    value:{
        fontSize:16,
        fontWeight:"500",
        color:COLORS.text,
        marginTop:10
    }
});