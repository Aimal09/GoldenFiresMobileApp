import { Image, ImageSourcePropType, Text, Touchable, TouchableOpacity, View } from "react-native";
import { cardStyles, productCardStyles } from "../styles/componentStyle";
import TextField from "./TextField";
import COLORS from "../styles/colors";
import { Dispatch, SetStateAction } from "react";

interface ProductCardProp {
    iconUrl?: ImageSourcePropType;
    title: string;
    onClick: () => void;
    isActive?: boolean;
    description?:string;
    amount?:string;
    iconOnRight?:boolean;
    textField?:boolean;
    textFieldValue?:string;
    Keyboardtypedefine?: "default" | "numeric" | "email-address" | "phone-pad" | "ascii-capable" | "numbers-and-punctuation" | "url";  // Define specific string values for keyboardType

    textFieldSetValue?:Dispatch<SetStateAction<string>>;
}
const ProductCard = ({ iconUrl, title, onClick, isActive = false, description, amount, iconOnRight=true, textField=false, textFieldValue, textFieldSetValue,Keyboardtypedefine }: ProductCardProp) => {
    const setHandler = ()=>{}
    return (
        <TouchableOpacity onPress={()=>onClick()} style={isActive ? productCardStyles.cardActive : productCardStyles.card}>
            {iconUrl && <View style={productCardStyles.icon}><Image source={iconUrl} style={productCardStyles.iconImage}/></View>}
            <View style={productCardStyles.titleBox}>
                <Text style={productCardStyles.title}>{title}</Text>
                {description && <Text>{description}</Text>}
            </View>
            {amount && <Text style={productCardStyles.amount}>{amount}</Text>}
            {iconOnRight&&<Image source={require("../assets/images/chevron-right.png")} style={cardStyles.chevronIcon} />}
            {textField&&<TextField Keyboardtypedefine={Keyboardtypedefine} value={textFieldValue??""} setValue={textFieldSetValue??setHandler} styles={{borderRadius:10,backgroundColor:COLORS.background}} placeholder="Enter a value"/>}
        </TouchableOpacity>
    );
}

export default ProductCard;