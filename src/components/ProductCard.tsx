import { Image, ImageSourcePropType, Text, Touchable, TouchableOpacity, View } from "react-native";
import { cardStyles, productCardStyles } from "../styles/componentStyle";

interface ProductCardProp {
    iconUrl?: ImageSourcePropType;
    title: string;
    onClick: () => void;
}
const ProductCard = ({ iconUrl, title, onClick }: ProductCardProp) => {
    return (
        <TouchableOpacity onPress={()=>onClick()} style={productCardStyles.card}>
            {iconUrl && <View style={productCardStyles.icon}><Image source={iconUrl} style={productCardStyles.iconImage}/></View>}
            <Text style={productCardStyles.title}>{title}</Text>
            <Image source={require("../assets/images/chevron-right.png")} style={cardStyles.chevronIcon} />
        </TouchableOpacity>
    );
}

export default ProductCard;