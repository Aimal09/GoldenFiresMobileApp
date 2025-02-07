// import { Keyboard, Text, View } from "react-native";
// import { TextInput } from "react-native-gesture-handler";
// import { DocketDetailsFormStyles } from "../styles/screensStyle";
// import { Dispatch, SetStateAction } from "react";

// interface TextFieldProp {
//     label?:string;
//     value: string;
//     setValue:Dispatch<SetStateAction<string>>;
//     placeholder?:string;
//     styles?:object;
//     multiline?:boolean
//     numberOfLine?:number
//     Keyboardtypedefine?:string
// }

// const TextField:React.FC<TextFieldProp> = ({label, value, Keyboardtypedefine, setValue, placeholder, styles, multiline=false, numberOfLine=1}) => {

//     return (
//         <View style={styles}>
//             {label&&<Text style={DocketDetailsFormStyles.label}>{label}</Text>}
//                 <TextInput
//                     placeholder={placeholder}
//                     style={{...DocketDetailsFormStyles.input, paddingTop:20}}
//                     value={value}
//                     onChangeText={setValue}
//                     multiline={multiline}
//                     numberOfLines={numberOfLine}
//                     textAlignVertical="top"
//                     keyboardType={Keyboardtypedefine}
//                 />
           
//         </View>
//     );
// }

// export default TextField;



import { Keyboard, Text, View, TextInput } from "react-native";
import { DocketDetailsFormStyles } from "../styles/screensStyle";
import { Dispatch, SetStateAction } from "react";

interface TextFieldProp {
    label?: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    placeholder?: string;
    styles?: object;
    multiline?: boolean;
    numberOfLine?: number;
    Keyboardtypedefine?: "default" | "numeric" | "email-address" | "phone-pad" | "ascii-capable" | "numbers-and-punctuation" | "url";  // Define specific string values for keyboardType
}

const TextField: React.FC<TextFieldProp> = ({
    label,
    value,
    Keyboardtypedefine = "default",  // Default to normal keyboard if not provided
    setValue,
    placeholder,
    styles,
    multiline = false,
    numberOfLine = 1,
}) => {
    const handleChange = (text: string) => {
        // Allow only numbers
        // if (/^\d*$/.test(text)) {
            setValue(text);
        // }
    };

    return (
        <View style={styles}>
            {label && <Text style={DocketDetailsFormStyles.label}>{label}</Text>}
            <TextInput
                placeholder={placeholder}
                style={{ ...DocketDetailsFormStyles.input, paddingTop: 20 }}
                value={value}
                onChangeText={handleChange}  // Call the handleChange function to validate input
                multiline={multiline}
                numberOfLines={numberOfLine}
                textAlignVertical="top"
                keyboardType={Keyboardtypedefine}  // Ensure numeric keyboard
            />
        </View>
    );
};

export default TextField;

