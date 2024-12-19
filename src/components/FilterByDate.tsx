import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/style";
import FullScreenModal from "./Modal";
import { useState } from "react";
import { Calendar } from "react-native-calendars";

interface FilterByDateCalendarProp {
    title?:string;
    onFilterChange: (range: DateRangeProp) => void;
    closeFilter: () => void;
    minimumToday?: boolean;
    maximumToday?: boolean;
    isSingle?:boolean;
}
interface FilterByDateProp {
    onClick: () => void;
}
interface DateRangeProp {
    startDate: string | null,
    endDate: string | null
}

const FilterByDateCalendar: React.FC<FilterByDateCalendarProp> = ({ title="Filter By Date" ,onFilterChange, closeFilter, minimumToday = false, maximumToday = false, isSingle = false }) => {
    const [selectedRange, setSelectedRange] = useState<DateRangeProp>({
        startDate: null,
        endDate: null,
    });

    const onDayPress = (day: any) => {
        if(isSingle){
            setSelectedRange({ startDate: day.dateString, endDate: day.dateString });
            return;
        }
        
        const { startDate, endDate } = selectedRange;
        if (!startDate || (startDate && endDate)) {
            setSelectedRange({ startDate: day.dateString, endDate: null });
        } else {
            setSelectedRange({ startDate, endDate: day.dateString+"T23:59:59.999" });
        }
    };

    const isStartOfRange = (dateString: string) =>
        dateString === selectedRange.startDate;
    const isEndOfRange = (dateString: string) =>
        dateString === selectedRange.endDate;
    const isInRange = (dateString: string) => {
        const { startDate, endDate } = selectedRange;
        if (startDate && endDate) {
            return (
                dateString >= startDate &&
                dateString <= endDate
            );
        }
        return false;
    };

    const CustomDayComponent = ({ date, state, onPress }: any) => {
        const { dateString } = date;

        // Determine if the day is start, end, or in the range
        const isStart = isStartOfRange(dateString);
        const isEnd = isEndOfRange(dateString);
        const inRange = isInRange(dateString);

        return (
            <TouchableOpacity
                onPress={() => onPress(date)} // Ensure onPress is passed and called
                style={[
                    styles1.dayContainer,
                    inRange && styles1.inRangeDayContainer,
                    isStart && styles1.startDayContainer,
                    isEnd && styles1.endDayContainer,
                ]}
            >
                <View
                    style={[
                        isStart && styles1.startDayItem,
                        isEnd && styles1.endDayItem,
                    ]}
                >
                    <Text
                        style={[
                            styles1.dayText,
                            state === "disabled" && styles1.disabledDayText,
                        ]}
                    >
                        {date.day}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const handleContinue = () => {
        onFilterChange(selectedRange);
        closeFilter();
    }
    return (
        <>
            {/* */}
            <FullScreenModal title={title} onClose={() => { closeFilter() }} visible={true}>
                <Calendar
                    current={(new Date('2024-12-15T23:59:59.000').toISOString().split("T")[0])}
                    maxDate={maximumToday?(new Date().toISOString().split("T")[0]):null}
                    minDate={minimumToday?(new Date().toISOString().split("T")[0]):null}
                    onDayPress={onDayPress}
                    markingType={"custom"} // Custom marking
                    dayComponent={CustomDayComponent} // Custom day component
                    
                    theme={{
                        backgroundColor: "#ffffff",
                        calendarBackground: "#ffffff",
                        arrowColor: "#ffcb3b",
                        textDayFontFamily: "Arial",
                        textDayFontWeight: "300",
                        textDayFontSize: 16,
                        monthTextColor: "#444444",
                        textMonthFontFamily: "Arial",
                        textMonthFontWeight: "bold",
                        textMonthFontSize: 20,
                        textDayHeaderFontSize: 16,
                        textDayHeaderFontWeight: "300",
                        textDayHeaderTextColor: "#ffffff"
                    }}
                />
                <TouchableOpacity style={styles.btn} onPress={handleContinue}><Text style={styles.btnText}>Continue</Text></TouchableOpacity>
            </FullScreenModal>
        </>
    );
};


const FilterByDate:React.FC<FilterByDateProp> = ({onClick}) => {
    return (
        <TouchableOpacity style={{ ...styles.btnSecondary, alignItems: "center" }} onPress={() => onClick()}>
            <Text style={styles.btnSecondaryText}>Filter by Date</Text>
            <Image
                source={require("../assets/images/chevron-right.png")}
                style={{
                    height: 11,
                    width: 7,
                    marginLeft: 10,
                    marginBottom: -2,
                }}
            />
        </TouchableOpacity>
    )
}
export {FilterByDate, FilterByDateCalendar};

const styles1 = StyleSheet.create({
    dayContainer: {
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    startDayContainer: {
        borderRadius: 60,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    startDayItem: {
        backgroundColor: "#FFCB3B",
        padding: 18,
        borderRadius: 60,
        aspectRatio: 1,
        alignItems: "center"
    },
    endDayContainer: {
        borderRadius: 60,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
    endDayItem: {
        backgroundColor: "#FFCB3B",
        padding: 20,
        borderRadius: 60,
        aspectRatio: 1,
        alignItems: "center"
    },
    inRangeDayContainer: {
        backgroundColor: "#FFE4A3", // Highlight in-between days
    },
    dayText: {
        fontSize: 16,
        color: "#444",
    },
    disabledDayText: {
        color: "#d9e1e8",
    },
});
