import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { DocketDetailsFormStyles } from "../styles/screensStyle";
import { Dispatch, SetStateAction } from "react";

interface TextFieldProp {
    label:string;
    value: string;
    setValue:Dispatch<SetStateAction<string>>;
    placeholder?:string;
    styles?:object;
    multiline?:boolean
    numberOfLine?:number
}

const TextField:React.FC<TextFieldProp> = ({label, value, setValue, placeholder, styles, multiline=false, numberOfLine=1}) => {

    return (
        <View style={styles}>
            <Text style={DocketDetailsFormStyles.label}>{label}</Text>
                <TextInput
                    placeholder={placeholder}
                    style={{...DocketDetailsFormStyles.input, paddingTop:20}}
                    value={value}
                    onChangeText={setValue}
                    multiline={multiline}
                    numberOfLines={numberOfLine}
                    textAlignVertical="top"
                />
           
        </View>
    );
}

export default TextField;