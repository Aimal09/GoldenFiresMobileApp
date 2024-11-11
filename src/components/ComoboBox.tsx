import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
} from 'react-native';
import { comboBoxStyles } from '../styles/componentStyle';

// Define props and types for the component
interface ComboBoxProps {
    label?: string;
    options: OptionItem[];
    onDropdownChange: (option: string) => void;
    usePlaceholder?: boolean;
    placeholder?: string;
    isDark?:boolean;
}

interface OptionItem {
    value: string;
    name: string;
}

const ComboBox: React.FC<ComboBoxProps> = ({
    label,
    options,
    onDropdownChange,
    usePlaceholder = true,
    placeholder = '-- Select --',
    isDark = true
}) => {

    const initialOptions = usePlaceholder
        ? [{ value: '0', name: placeholder }, ...options]
        : options;

    const [selectedOption, setSelectedOption] = useState<OptionItem | undefined>(
        initialOptions[0]
    );
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const handleOptionSelect = (value: string) => {
        const option = initialOptions.find((opt) => opt.value === value);
        if (option) {
            setSelectedOption(option);
            onDropdownChange(value);
        }
        setIsModalVisible(false);
    };

    return (
        <View style={comboBoxStyles.container}>
            {label && <Text style={comboBoxStyles.label}>{label}</Text>}

            <TouchableOpacity
                style={isModalVisible ? (isDark ? comboBoxStyles.comboBoxOpen : comboBoxStyles.comboBoxOpenLight) : 
                    (isDark ? comboBoxStyles.comboBox : comboBoxStyles.comboBoxLight)}
                onPress={() => setIsModalVisible(!isModalVisible)}
            >
                <Text style={comboBoxStyles.selectedOption}>
                    {selectedOption?.name || placeholder}
                </Text>
                <Image source={require('../assets/images/down.png')} style={comboBoxStyles.icon} />
            </TouchableOpacity>

            <View style={isModalVisible ? (isDark ? comboBoxStyles.optionBox : comboBoxStyles.optionBoxLight) : { display: "none" }}>
                <FlatList
                    data={initialOptions}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={comboBoxStyles.option}
                            onPress={() => handleOptionSelect(item.value)}
                        >
                            <Text style={comboBoxStyles.optionText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
};

export default ComboBox;

