import TopBar from "../../components/TopBar";
import { DocketDetailsFormNavigationProp, DocketDetailsFormRouteProp } from '../../navigations/Types';
import styles from "../../styles/style";
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import ComboBox from "../../components/ComoboBox";
import { DocketDetailsFormStyles } from "../../styles/screensStyle";
import { ScrollView } from "react-native-gesture-handler";
import { docketOptions } from "../../assets/Mock/docketOptions";
import { formatDate, formatTime, generateDocketNumber } from "../../utils";

type Props = {
    navigation: DocketDetailsFormNavigationProp;
    route: DocketDetailsFormRouteProp;
};

interface FormData {
    supplierName: string;
    variety: string;
    docketNumber: string;
    grossWeight: string;
    nettWeight: string;
    trailerRego: string;
    weightBridgeDocketNumber: string;
    driverName: string;
    receiverName: string;
}

interface FormErrors {
    [key: string]: string | undefined;
}

interface ValidationRules {
    [key: string]: (value: string, formData: FormData) => string | undefined;
}

const DocketDetailsForm: React.FC<Props> = ({ navigation, route }) => {
    const data = route.params;
    const docketType = data.title.split(' ')[0];
    const currentOptions = docketOptions[data.title];
    const [currentDate, setCurrentDate] = useState(new Date());
    const [docketNumber, setDocketNumber] = useState('');

    const [formData, setFormData] = useState<FormData>({
        supplierName: '',
        variety: '',
        docketNumber: '',
        grossWeight: '',
        nettWeight: '',
        trailerRego: '',
        weightBridgeDocketNumber: '',
        driverName: '',
        receiverName: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const validationRules: ValidationRules = {
        grossWeight: (value: string) => {
            if (!value) return 'Gross Weight is required';
            if (isNaN(Number(value))) return 'Must be a number';
            if (Number(value) <= 0) return 'Must be greater than 0';
            return undefined;
        },
        nettWeight: (value: string, formData: FormData) => {
            if (!value) return 'Nett Weight is required';
            if (isNaN(Number(value))) return 'Must be a number';
            if (Number(value) <= 0) return 'Must be greater than 0';
            if (Number(value) >= Number(formData.grossWeight)) 
                return 'Must be less than Gross Weight';
            return undefined;
        },
        supplierName: (value: string) => {
            if (!value) return 'Supplier name is required';
            return undefined;
        },
        variety: (value: string) => {
            if (!value) return `${docketType} Variety is required`;
            return undefined;
        },
        docketNumber: (value: string) => {
            if (!value) return 'Docket number is required';
            return undefined;
        },
        weightBridgeDocketNumber: (value: string) => {
            if (!value) return 'Wightbridge Docket is required';
            return undefined;
        },
        trailerRego: (value: string) => {
            if (!value) return 'Trailer Rego is required';
            return undefined;
        },
        driverName: (value: string) => {
            if (!value) return `Driver's name is required`;
            return undefined;
        },
        receiverName: (value: string) => {
            if (!value) return `Receiver's name is required`;
            return undefined;
        }
    };

    const updateField = (field: keyof FormData, value: string) => {
        // setFormData(prev => ({ ...prev, [field]: value }));
        // // Clear error when field is updated
        // setErrors(prev => ({ ...prev, [field]: undefined }));
        if (field === 'supplierName' || field === 'variety') {
            // Find selected option to get name
            const option = currentOptions[field === 'supplierName' ? 'suppliers' : 'varieties']
                .find(opt => opt.value === value);
            
            if (option) {
                setFormData(prev => ({ ...prev, [field]: option.name }));
                setErrors(prev => ({ ...prev, [field]: undefined }));
            }
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        Object.keys(formData).forEach(key => {
            const fieldKey = key as keyof FormData;
            if (validationRules[fieldKey]) {
                const error = validationRules[fieldKey](formData[fieldKey], formData);
                if (error) {
                    newErrors[fieldKey] = error;
                    isValid = false;
                }
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleContinue = () => {
        if (validateForm()) {
            navigation.navigate('DocketDetailsPictureForm', formData);
        }
    };

    useEffect(() => {
        // Generate docket number on mount
        setDocketNumber(generateDocketNumber());

        // Timer for date/time updates
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 60000);

        return () => {
            clearInterval(timer);
            setFormData({
                supplierName: '',
                variety: '',
                docketNumber: '',
                grossWeight: '',
                nettWeight: '',
                trailerRego: '',
                weightBridgeDocketNumber: '',
                driverName: '',
                receiverName: ''
            });
            setErrors({});
        };
    }, []);

    return (
        <>
            <TopBar pageName={data.title} showBackButton={true} />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView style={DocketDetailsFormStyles.container}>
                    <View style={DocketDetailsFormStyles.fieldContainer}>
                        <View style={DocketDetailsFormStyles.headerContainer}>
                            <Text style={DocketDetailsFormStyles.dateText}>{formatDate(currentDate)}</Text>
                            <Text style={DocketDetailsFormStyles.timeText}>{formatTime(currentDate)}</Text>
                        </View>
                        {/* <Text style={DocketDetailsFormStyles.docketNumber}>Docket number: {docketNumber}</Text> */}
                        <View style={DocketDetailsFormStyles.row}>
                        <View style={DocketDetailsFormStyles.inputContainer}>
                            {errors.docketNumber && <Text style={styles.errorTxt}>{errors.docketNumber}</Text>}
                            <Text style={DocketDetailsFormStyles.label}>Docket number</Text>
                            <TextInput
                                placeholder="Enter Docket number"
                                style={DocketDetailsFormStyles.input}
                                value={formData.docketNumber}
                                onChangeText={(v) => updateField('docketNumber', v)}
                                keyboardType="number-pad"
                            />
                        </View>
                        </View>
                        {errors.supplierName && <Text style={styles.errorTxt}>{errors.supplierName}</Text>}
                        <ComboBox 
                            label="Supplier Name" 
                            placeholder="Select supplier name" 
                            options={currentOptions.suppliers}
                            onDropdownChange={(v) => updateField('supplierName', v)}
                        />

                        {errors.variety && <Text style={styles.errorTxt}>{errors.variety}</Text>}
                        <ComboBox
                            label={`${docketType} Variety`}
                            placeholder={`Select ${docketType} variety`}
                            options={currentOptions.varieties}
                            onDropdownChange={(v) => updateField('variety', v)}
                        />

                        <View style={DocketDetailsFormStyles.row}>
                            <View style={DocketDetailsFormStyles.inputContainer}>
                                {errors.weightBridgeDocketNumber && <Text style={styles.errorTxt}>{errors.weightBridgeDocketNumber}</Text>}
                                <Text style={DocketDetailsFormStyles.label}>Driver's Name</Text>
                                <TextInput
                                    placeholder="Enter Driver's Name"
                                    style={DocketDetailsFormStyles.input}
                                    value={formData.driverName}
                                    onChangeText={(v) => updateField('driverName', v)}
                                />
                            </View>

                            <View style={DocketDetailsFormStyles.inputContainer}>
                                {errors.grossWeight && <Text style={styles.errorTxt}>{errors.grossWeight}</Text>}
                                <Text style={DocketDetailsFormStyles.label}>Receiver's Name</Text>
                                <TextInput
                                    placeholder="Enter Receiver's Name"
                                    style={DocketDetailsFormStyles.input}
                                    value={formData.receiverName}
                                    onChangeText={(v) => updateField('receiverName', v)}
                                />
                            </View>
                        </View>

                        <View style={DocketDetailsFormStyles.row}>
                            <View style={DocketDetailsFormStyles.inputContainer}>
                                {errors.weightBridgeDocketNumber && <Text style={styles.errorTxt}>{errors.weightBridgeDocketNumber}</Text>}
                                <Text style={DocketDetailsFormStyles.label}>Weightbridge Docket No.</Text>
                                <TextInput
                                    placeholder="Enter Docket No."
                                    style={DocketDetailsFormStyles.input}
                                    value={formData.weightBridgeDocketNumber}
                                    onChangeText={(v) => updateField('weightBridgeDocketNumber', v)}
                                    keyboardType="number-pad"
                                />
                            </View>

                            <View style={DocketDetailsFormStyles.inputContainer}>
                                {errors.grossWeight && <Text style={styles.errorTxt}>{errors.grossWeight}</Text>}
                                <Text style={DocketDetailsFormStyles.label}>Gross Weight</Text>
                                <TextInput
                                    placeholder="Enter Gross Weight"
                                    style={DocketDetailsFormStyles.input}
                                    value={formData.grossWeight}
                                    onChangeText={(v) => updateField('grossWeight', v)}
                                    keyboardType="decimal-pad"
                                />
                            </View>
                        </View>

                        <View style={DocketDetailsFormStyles.row}>
                            <View style={DocketDetailsFormStyles.inputContainer}>
                                {errors.nettWeight && <Text style={styles.errorTxt}>{errors.nettWeight}</Text>}
                                <Text style={DocketDetailsFormStyles.label}>Nett Weight</Text>
                                <TextInput
                                    placeholder="Enter Nett Weight"
                                    style={DocketDetailsFormStyles.input}
                                    value={formData.nettWeight}
                                    onChangeText={(v) => updateField('nettWeight', v)}
                                    keyboardType="decimal-pad"
                                />
                            </View>

                            <View style={DocketDetailsFormStyles.inputContainer}>
                                {errors.trailerRego && <Text style={styles.errorTxt}>{errors.trailerRego}</Text>}
                                <Text style={DocketDetailsFormStyles.label}>Trailer Rego</Text>
                                <TextInput
                                    placeholder="Enter Trailer Rego"
                                    style={DocketDetailsFormStyles.input}
                                    value={formData.trailerRego}
                                    onChangeText={(v) => updateField('trailerRego', v)}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <View style={{ padding: 20, paddingTop: 0 }}>
                <TouchableOpacity style={styles.btn} onPress={handleContinue}>
                    <Text style={styles.btnText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default DocketDetailsForm;