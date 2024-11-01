import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';
import { cardStyles } from '../styles/componentStyle';

interface CardProps {
    title: string;
    image: any;
    onPress: () => void;
}

const Card: React.FC<CardProps> = ({ title, image, onPress }) => {
    return (
        <TouchableOpacity style={cardStyles.card} onPress={onPress}>
            <Image source={image} style={cardStyles.image} />
            <View style={cardStyles.titleContainer}>
                <Text style={cardStyles.title}>{title}</Text>
                <Image source={require("../assets/images/chevron-right.png")} style={cardStyles.chevronIcon} />
            </View>
        </TouchableOpacity>
    );
};


export default Card;
