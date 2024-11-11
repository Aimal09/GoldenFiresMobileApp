import { Image, ImageSourcePropType, Text, Touchable, TouchableOpacity, View } from "react-native";
import { cardStyles, productCardStyles } from "../styles/componentStyle";

interface ProductCardProp {
    iconUrl?: ImageSourcePropType;
    title: string;
    onClick: () => void;
    isActive?: boolean
}
const ProductCard = ({ iconUrl, title, onClick, isActive = false }: ProductCardProp) => {
    return (
        <TouchableOpacity onPress={()=>onClick()} style={isActive ? productCardStyles.cardActive : productCardStyles.card}>
            {iconUrl && <View style={productCardStyles.icon}><Image source={iconUrl} style={productCardStyles.iconImage}/></View>}
            <Text style={productCardStyles.title}>{title}</Text>
            <Image source={require("../assets/images/chevron-right.png")} style={cardStyles.chevronIcon} />
        </TouchableOpacity>
    );
}

export default ProductCard;