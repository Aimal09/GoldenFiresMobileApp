// screens/SupplierDocket/DocketCommentForm.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import TopBar from "../../components/TopBar";
import TextField from "../../components/TextField";
import styles from "../../styles/style";
import COLORS from "../../styles/colors";
import { DocketCommentFormNavigationProp, DocketCommentFormRouteProp } from '../../navigations/Types';

type Props = {
    navigation: DocketCommentFormNavigationProp;
    route: DocketCommentFormRouteProp;
};

const DocketCommentForm: React.FC<Props> = ({ navigation, route }) => {
    const data = route.params;
    const [comment, setComment] = useState('');
    const [isFlagged, setIsFlagged] = useState(false);
    const [errors, setErrors] = useState({
        comment: false,
        flag: false
    });

    const handleContinue = () => {
        if (!comment.trim()) {
            setErrors(prev => ({ ...prev, comment: true }));
            return;
        }

        navigation.navigate('DocketSignatureForm', {
            details: data.details,
            docketPhotos: data.docketPhotos,
            comment,
            isFlagged
        });
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <TopBar pageName="Supplier Docket" showBackButton={true} />
            
            <View style={commentStyles.container}>
                {errors.comment && 
                    <Text style={styles.errorTxt}>Please add a comment</Text>
                }
                
                <TextField 
                    label="Comment"
                    placeholder="Enter your comment here"
                    value={comment}
                    setValue={setComment}
                    multiline={true}
                    numberOfLine={4}
                    styles={commentStyles.textField}
                />

                <View style={commentStyles.flagContainer}>
                    <Text style={commentStyles.label}>Flag this docket?</Text>
                    <View style={commentStyles.buttonGroup}>
                        <TouchableOpacity 
                            style={[
                                commentStyles.flagButton,
                                isFlagged && commentStyles.flagButtonActive
                            ]}
                            onPress={() => setIsFlagged(true)}
                        >
                            <Text style={[
                                commentStyles.flagButtonText,
                                isFlagged && commentStyles.flagButtonTextActive
                            ]}>Yes</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={[
                                commentStyles.flagButton,
                                !isFlagged && commentStyles.flagButtonActive
                            ]}
                            onPress={() => setIsFlagged(false)}
                        >
                            <Text style={[
                                commentStyles.flagButtonText,
                                !isFlagged && commentStyles.flagButtonTextActive
                            ]}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <TouchableOpacity 
                style={styles.btn} 
                onPress={handleContinue}
            >
                <Text style={styles.btnText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

const commentStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: 30,
        padding: 25,
        marginBottom: 20
    },
    textField: {
        marginBottom: 20,
        minHeight: 120
    },
    flagContainer: {
        marginTop: 20
    },
    label: {
        fontSize: 16,
        color: COLORS.text,
        marginBottom: 10,
        fontWeight: '500'
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 10
    },
    flagButton: {
        flex: 1,
        padding: 15,
        borderRadius: 30,
        backgroundColor: COLORS.background,
        alignItems: 'center'
    },
    flagButtonActive: {
        backgroundColor: COLORS.yellow
    },
    flagButtonText: {
        fontSize: 16,
        color: COLORS.text,
        fontWeight: '500'
    },
    flagButtonTextActive: {
        color: COLORS.white
    }
});

export default DocketCommentForm;