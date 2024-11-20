import { Image, ImageSourcePropType, Text, Touchable, TouchableOpacity, View } from "react-native";
import { cardStyles, productCardStyles } from "../styles/componentStyle";

interface SpecialProductCardProp {
    iconUrl?: ImageSourcePropType;
    title: string;
    onClick: () => void;
    isActive?: boolean;
    data?: CityProp[] | null
}
interface CityProp {
    cityId: number;
    amount: string;
    suppliers: null;
    packages: string;
    boxes: string;
    palettes: string;
}
const SpecialProductCard = ({ iconUrl, title, onClick, isActive = false, data }: SpecialProductCardProp) => {
    const amount = data?.reduce((sum, city) => sum + parseInt(city.amount.replace(',', '')), 0) || 0;
    const packages = data?.reduce((sum, city) => sum + parseInt(city.packages.replace(',', '')), 0) || 0;
    const boxes = data?.reduce((sum, city) => sum + parseInt(city.boxes.replace(',', '')), 0) || 0;
    const palettes = data?.reduce((sum, city) => sum + parseInt(city.palettes.replace(',', '')), 0) || 0;
    return (
        <TouchableOpacity onPress={() => onClick()} style={isActive ? productCardStyles.specialCardActive : productCardStyles.specialCard}>
            <View style={productCardStyles.specialProductTitleBox}>
                <Text style={productCardStyles.title}>{title}</Text>
                {iconUrl && <View style={productCardStyles.specialProductImageContainer}><Image source={iconUrl} style={productCardStyles.specialProductImage} /></View>}
            </View>
            <View style={{paddingLeft:30}}>
                <Text style={productCardStyles.specialProductAmount}>{amount} kg</Text>
                <Text style={productCardStyles.details}>{packages} packages</Text>
                <Text style={productCardStyles.details}>{boxes} boxes</Text>
                <Text style={productCardStyles.details}>{palettes} palettes</Text>
            </View>
        </TouchableOpacity>
    );
}

export default SpecialProductCard;