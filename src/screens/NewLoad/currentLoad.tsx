import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FullScreenModal from "../../components/Modal";
import styles from "../../styles/style";
import COLORS from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "../../components/ProductCard";
import TextField from "../../components/TextField";
import { FilterByDateCalendar } from "../../components/FilterByDate";
import SignaturePad from "../../components/SignaturePad";
import { SignatureViewRef } from "react-native-signature-canvas";
import React from "react";

type ImageKey = 'potato' | 'oil' | 'box' | 'tape' | 'pallets' | 'plastic' | "detergent" | "hat" | "gloves" | "antifoam" | "saap" | "13mm-fries" | "15mm-fries";

interface CurrentLoadProp {
    date: string;
    id: number;
}
interface DateRangeProp {
    startDate: string | null,
    endDate: string | null
}
const CurrentLoad: React.FC<CurrentLoadProp> = ({ date, id }) => {
    const navigation = useNavigation();
    const driverSignature = useRef<string>("");
    
    const [dsign,setDSign] = useState<SignatureViewRef | null>();
    const [days, setDays] = useState('00');
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00');
    const [main, setMain] = useState(true);
    const [closeLoad, setCloseLoad] = useState(false);
    const [dateOfCloseLoad, setDateOfCloseLoad] = useState(false);
    const [signOfCloseLoad, setSignOfCloseLoad] = useState(false);
    const [box, setBox] = useState<string>('');
    const [tape, setTape] = useState<string>('');
    const [plastic, setPlastic] = useState<string>('');
    const [woodenPlattes, setWoodenPlattes] = useState<string>('');
    const [editBox, setEditBox] = useState<string>('');
    const [editTape, setEditTape] = useState<string>('');
    const [editPlastic, setEditPlastic] = useState<string>('');
    const [editWoodenPlattes, setEditWoodenPlattes] = useState<string>('');
    const [showDates, setShowDates] = useState(false);
    const [calendarDate, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [surname, setSurname] = useState<string>('');

    const imagePath: Record<ImageKey, any> = {
        "potato": require("../../assets/images/potato.png"),
        "oil": require("../../assets/images/oil.png"),
        "box": require("../../assets/images/box.png"),
        "tape": require("../../assets/images/tape.png"),
        "pallets": require("../../assets/images/pallets.png"),
        "plastic": require("../../assets/images/plastic.png"),
        "detergent": require("../../assets/images/detergent.png"),
        "hat": require("../../assets/images/hat.png"),
        "gloves": require("../../assets/images/gloves.png"),
        "antifoam": require("../../assets/images/antifoam.png"),
        "saap": require("../../assets/images/saap.png"),
        "13mm-fries": require("../../assets/images/13mm.png"),
        "15mm-fries": require("../../assets/images/15mm.png"),
    };

    interface FormData {
        box: string;
        tape: string;
        plastic: string;
        woodenPlattes: string;
        editBox: string;
        editTape: string;
        editPlatic: string;
        editWoodenPlattes: string;
    }

    interface ValidationRules {
        [key: string]: (value: string, formData: FormData) => string | undefined;
    }

     const [formData, setFormData] = useState<FormData>({
            box: '',
            tape: '',
            plastic: '',
            woodenPlattes: '',
            editBox: '',
            editTape: '',
            editPlatic: '',
            editWoodenPlattes:'',
        });

            const [errors, setErrors] = useState<FormErrors>({});
        

        
        const validationRules: ValidationRules = {
           
            box: (value: string) => {
                if (!value) return 'Box is required';
                if (isNaN(Number(value))) return 'Must be a number';
                if (Number(value) <= 0) return 'Must be greater than 0';
                return undefined;
            },
            tape: (value: string) => {
                if (!value) return 'Tape is required';
                if (isNaN(Number(value))) return 'Must be a number';
                if (Number(value) <= 0) return 'Must be greater than 0';
                return undefined;
            },
            plastic: (value: string) => {
                if (!value) return 'Plastic Wrap is required';
                if (isNaN(Number(value))) return 'Must be a number';
                if (Number(value) <= 0) return 'Must be greater than 0';
                return undefined;
            },
            woodenPlattes: (value: string) => {
                if (!value) return 'Wooden Pallets is required';
                if (isNaN(Number(value))) return 'Must be a number';
                if (Number(value) <= 0) return 'Must be greater than 0';
                return undefined;
            },
            editBox: (value: string) => {
                if (!value) return 'Editable Box is required';
                if (isNaN(Number(value))) return 'Must be a number';
                if (Number(value) <= 0) return 'Must be greater than 0';
                return undefined;
            },
            editTape: (value: string) => {
                if (!value) return 'Editable Tape is required';
                if (isNaN(Number(value))) return 'Must be a number';
                if (Number(value) <= 0) return 'Must be greater than 0';
                return undefined;
            },
            editPlastic: (value: string) => {
                if (!value) return 'Editable Plastic is required';
                if (isNaN(Number(value))) return 'Must be a number';
                if (Number(value) <= 0) return 'Must be greater than 0';
                return undefined;
            },
            editWoodenPlattes: (value: string) => {
                if (!value) return 'Editable Wooden Pallets is required';
                if (isNaN(Number(value))) return 'Must be a number';
                if (Number(value) <= 0) return 'Must be greater than 0';
                return undefined;
            }
        };

    useEffect(() => {
        const targetDate = new Date(date);

        const updateCountdown = () => {
            const now = new Date();
            const timeDiff = targetDate.getTime() - now.getTime();

            if (timeDiff <= 0) {
                clearInterval(intervalId);
                setDays("00");
                setHours("00");
                setMinutes("00");
                setSeconds("00");
                return;
            }

            const remainingDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const remainingHours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const remainingMinutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const remainingSeconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            setDays(String(remainingDays).padStart(2, "0"));
            setHours(String(remainingHours).padStart(2, "0"));
            setMinutes(String(remainingMinutes).padStart(2, "0"));
            setSeconds(String(remainingSeconds).padStart(2, "0"));
        };

        // Initial countdown update
        updateCountdown();

        // Set interval to update every second
        const intervalId = setInterval(updateCountdown, 1000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [date]); // Effect runs whenever `date` changes

    interface FormErrors {
        [key: string]: string | undefined;
    }

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


    const closeLoadFormHandler = () => {
        setCloseLoad(true);
        setMain(false);
        //navigation.goBack();
    }

    // const handleContinue = () => {
        
    // };
    const continueToDateHandler = () => {
        if (validateForm()) {
            // navigation.navigate('DocketDetailsPictureForm', formData);
        }
        setDateOfCloseLoad(true);
        setCloseLoad(false);
        //navigation.goBack();
    }
    const continueToDSignature = () => {
        setSignOfCloseLoad(true);
        setDateOfCloseLoad(false);
        //navigation.goBack();
    }
    const closeLoadHandler = () => {
        setSignOfCloseLoad(false);
        //navigation.goBack();
    }


    const onFilterChangeHandler = (range: DateRangeProp) => {
        setDate(range.startDate ?? "");
        setShowDates(false);
    }
    function alert(arg0: string) {
        throw new Error("Function not implemented.");
    }

    return (
        <>
            {main && <FullScreenModal onClose={() => { }} visible={main} hideClose>
                <>
                    <Text style={clStyles.heading}>Current workload is running!</Text>
                    <Text style={clStyles.subText}>Please stop the current worload in order to start a new one.</Text>
                    <View style={clStyles.border} />
                    <Text style={clStyles.heading}>Supplier Name</Text>
                    <Text style={clStyles.subText}>This load is running for</Text>

                    <View style={clStyles.clockContainer}>
                        <View>
                            <View style={clStyles.box}>
                                <Text style={clStyles.clockText}>{days}</Text>
                            </View>
                            <Text style={clStyles.clockSubText}>Days</Text>
                        </View>
                        <View>
                            <View style={clStyles.box}>
                                <Text style={clStyles.clockText}>{hours}</Text>
                            </View>
                            <Text style={clStyles.clockSubText}>Hours</Text>
                        </View>
                        <View>
                            <View style={clStyles.box}>
                                <Text style={clStyles.clockText}>{minutes}</Text>
                            </View>
                            <Text style={clStyles.clockSubText}>Minutes</Text>
                        </View>
                        <View>
                            <View style={clStyles.box}>
                                <Text style={clStyles.clockText}>{seconds}</Text>
                            </View>
                            <Text style={clStyles.clockSubText}>Seconds</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.btn} onPress={closeLoadFormHandler}>
                        <Text style={styles.btnText}>Close the current laod</Text>
                    </TouchableOpacity>
                </>
            </FullScreenModal>}

            {/* Close load form */}
            {closeLoad && <FullScreenModal onClose={() => { setCloseLoad(false); setMain(true)}} visible title="Close the Load">
                <>
                    <ScrollView style={{ height: 350 }}>
                        <Text style={[styles.text, { marginLeft: 5, marginBottom: 15 }]}>Good Stock</Text>

                        {errors.box && <Text style={{ color: 'red' }}>{errors.box}</Text>}
                        <View style={clStyles.itemContainer}>
                            <Image source={imagePath["box"]} style={clStyles.img} />
                            <Text style={[styles.text, styles.full]}>Boxes</Text>
                            <View style={clStyles.txtBox}>
                                <TextField value={box} Keyboardtypedefine= "numeric" setValue={setBox} placeholder="Enter a value" />
                            </View>
                        </View>

                        {errors.tape && <Text style={{ color: 'red' }}>{errors.tape}</Text>}
                        <View style={clStyles.itemContainer}>
                            <Image source={imagePath["tape"]} style={clStyles.img} />
                            <Text style={[styles.text, styles.full]}>Tape</Text>
                            <View style={clStyles.txtBox}>
                                <TextField value={tape} Keyboardtypedefine= "numeric" setValue={setTape} placeholder="Enter a value" />
                            </View>
                        </View>
                        
                        {errors.woodenPlattes && <Text style={{ color: 'red' }}>{errors.woodenPlattes}</Text>}
                        <View style={clStyles.itemContainer}>
                            <Image source={imagePath["pallets"]} style={clStyles.img} />
                            <Text style={[styles.text, styles.full]}>Wooden Pallets</Text>
                            <View style={clStyles.txtBox}>
                                <TextField value={woodenPlattes} Keyboardtypedefine= "numeric" setValue={setWoodenPlattes} placeholder="Enter a value" />
                            </View>
                        </View>

                        {errors.plastic && <Text style={{ color: 'red' }}>{errors.plastic}</Text>}
                        <View style={clStyles.itemContainer}>
                            <Image source={imagePath["plastic"]} style={clStyles.img} />
                            <Text style={[styles.text, styles.full]}>Plastic Wrap</Text>
                            <View style={clStyles.txtBox}>
                                <TextField value={plastic} Keyboardtypedefine= "numeric" setValue={setPlastic} placeholder="Enter a value" />
                            </View>
                        </View>

                        <Text style={[styles.text, { marginLeft: 5, marginBottom: 15, marginTop: 15 }]}>Editable Stock</Text>

                        {errors.editBox && <Text style={{ color: 'red' }}>{errors.editBox}</Text>}
                        <View style={clStyles.itemContainer}>
                            <Image source={imagePath["box"]} style={clStyles.img} />
                            <Text style={[styles.text, styles.full]}>Boxes</Text>
                            <View style={clStyles.txtBox}>
                                <TextField value={editBox} Keyboardtypedefine= "numeric" setValue={setEditBox} placeholder="Enter a value" />
                            </View>
                        </View>

                        {errors.editTape && <Text style={{ color: 'red' }}>{errors.editTape}</Text>}
                        <View style={clStyles.itemContainer}>
                            <Image source={imagePath["tape"]} style={clStyles.img} />
                            <Text style={[styles.text, styles.full]}>Tape</Text>
                            <View style={clStyles.txtBox}>
                                <TextField value={editTape} Keyboardtypedefine= "numeric" setValue={setEditTape} placeholder="Enter a value" />
                            </View>
                        </View>

                        <View style={clStyles.itemContainer}>
                        {errors.editPlastic && <Text style={{ color: 'red' }}>{errors.editPlastic}</Text>}
                            <Image source={imagePath["pallets"]} style={clStyles.img} />
                            <Text style={[styles.text, styles.full]}>Wooden Pallets</Text>
                            <View style={clStyles.txtBox}>
                                <TextField value={editWoodenPlattes} Keyboardtypedefine= "numeric" setValue={setEditWoodenPlattes} placeholder="Enter a value" />
                            </View>
                        </View>

                        {errors.editWoodenPlattes && <Text style={{ color: 'red' }}>{errors.editWoodenPlattes}</Text>}
                        <View style={clStyles.itemContainer}>
                            <Image source={imagePath["plastic"]} style={clStyles.img} />
                            <Text style={[styles.text, styles.full]}>Plastic Wrap</Text>
                            <View style={clStyles.txtBox}>
                                <TextField value={editPlastic} Keyboardtypedefine= "numeric" setValue={setEditPlastic} placeholder="Enter a value" />
                            </View>
                        </View>
                    </ScrollView>

                    <TouchableOpacity style={styles.btn} onPress={continueToDateHandler}>
                        <Text style={styles.btnText}>Continue</Text>
                    </TouchableOpacity>
                </>
            </FullScreenModal>}


            {/* Continue to Date */}
            {dateOfCloseLoad && <FullScreenModal onClose={() => { setDateOfCloseLoad(false); setMain(true)}} visible title="Close the Load">
                <>

                    <Text style={[styles.text]}>Date</Text>
                    <TouchableOpacity style={clStyles.goodsCard} onPress={() => setShowDates(true)}>
                        <Text style={clStyles.cardText}>{calendarDate}</Text>
                    </TouchableOpacity>

                    <Text style={[styles.text, clStyles.mt20]}>Closed By</Text>
                    <TextField placeholder="Enter a value"   value={surname} setValue={setSurname} styles={styles.full} />

                    <TouchableOpacity style={styles.btn} onPress={continueToDSignature}>
                        <Text style={styles.btnText}>Continue</Text>
                    </TouchableOpacity>
                </>
            </FullScreenModal>}
            {showDates && <FilterByDateCalendar title="Select Date" minimumToday isSingle onFilterChange={onFilterChangeHandler} closeFilter={() => setShowDates(false)} />}


            {/* Continue to Date */}
            {signOfCloseLoad && (
  <FullScreenModal
    onClose={() => {
      setSignOfCloseLoad(false);
      setMain(true);
    }}
    visible
    title="Close the Load"
  >
    <>
      <Text
        style={{
          fontWeight: "500",
          color: COLORS.text,
          marginLeft: 10,
          marginBottom: 15,
        }}
      >
        Put your signature here
      </Text>

      <SignaturePad
        label=""
        signatureValue={driverSignature}
        sign={dsign}
        returnSign={(s) => setDSign(s)}
      />

      {!dsign && (
        <Text style={{ color: "red", marginLeft: 10, marginBottom: 10 }}>
          Signature is required!
        </Text>
      )}

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (!dsign) {
            // alert("Please provide a signature before closing the load.");
            return;
          }
          closeLoadHandler();
        }}
      >
        <Text style={styles.btnText}>Close the load</Text>
      </TouchableOpacity>
    </>
  </FullScreenModal>
)}

            {/* {signOfCloseLoad && <FullScreenModal onClose={() => { setSignOfCloseLoad(false); setMain(true)}} visible title="Close the Load">
                <>

                    <Text style={{fontWeight:"500", color:COLORS.text, marginLeft:10,marginBottom:15}}>Put your signature here</Text>
                    
                <SignaturePad label="" signatureValue={driverSignature} sign={dsign} returnSign={s=> setDSign(s)}/>

                    
                    <TouchableOpacity style={styles.btn} onPress={closeLoadHandler}>
                        <Text style={styles.btnText}>Close the load</Text>
                    </TouchableOpacity>
                </>
            </FullScreenModal>} */}

        </>
    );
}

export default CurrentLoad;

const clStyles = StyleSheet.create({
    goodsCard: {
        minHeight: 60,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#f4f4f4',
        borderRadius: 30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1
    },
    cardText: {
        fontSize: 18,
        fontWeight: "500",
    },
    txtBox: { backgroundColor: COLORS.background, borderRadius: 10 },
    img: { width: 55, height: 55, objectFit: "contain" },
    itemContainer: { display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 5 },
    box: {
        backgroundColor: COLORS.background,
        padding: 10,
        borderRadius: 8,
        width: 45,
        height: 45,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    clockSubText: {
        textAlign: "center",
        fontSize: 11,
        color: COLORS.text,
        fontWeight: "400",
        marginTop: 5
    },
    clockText: {
        fontSize: 22,
        fontWeight: "600",
        color: COLORS.text
    },
    heading: {
        fontSize: 24,
        fontWeight: "500",
        color: COLORS.text,
        textAlign: "center",
        width: "70%",
        alignSelf: "center",
        marginBottom: 25,
        marginTop: 10
    },
    subText: {
        width: "50%",
        alignSelf: "center",
        textAlign: "center",
    },
    border: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGrey,
        marginTop: 35,
        marginBottom: 20
    },
    clockContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        width: "70%",
        alignSelf: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 30
    },
    mt20: {
        marginTop: 20
    }
});