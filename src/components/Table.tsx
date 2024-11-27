import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../styles/colors";
import { useState } from "react";

interface TableProp {
    data: Data[];
    onRowSelect: (data:Data)=>void;
}
interface Data {
    columns: Column[];
    details: object;
}
interface Column {
    title: string;
    value: string | number;
}
const Table: React.FC<TableProp> = ({ data, onRowSelect }) => {
    if(!data || data.length == 0)
        return(<Text style={tableStyle.emptyTable}>No data found</Text>);
    
    
    
    return (
        <>
            {/* Header */}
            <View style={tableStyle.rowHeader}>
                {data[0].columns.map(col =>
                    <Text style={tableStyle.headerText} key={col.title}>{col.title}</Text>
                )}
                <Text></Text>
            </View>

            {/* Rows  */}
            {data.map((row,i) =>
                <TouchableOpacity key={i} style={[
                    tableStyle.rowHeader,
                    tableStyle.row
                ]} onPress={()=>onRowSelect(row)}>
                    {row.columns.map(col =>
                        col.title === 'Status' ?
                        <View key={col.title} style={tableStyle.statusBubbleContainer}><View 
                        style={[
                            tableStyle.statusBubble,
                            col.value === 'Completed' && tableStyle.statusCompleted,
                            col.value === 'Credited' && tableStyle.statusCredited,
                            col.value === 'Pending' && tableStyle.statusPending,
                        ]}></View></View> :
                        <Text key={col.title} style={tableStyle.text}>{col.value}</Text>
                    )}
                    <Image source={require("../assets/images/chevron-right.png")} style={tableStyle.chevronIcon} />

                </TouchableOpacity>
            )}
        </>
    );
}

export default Table;

const tableStyle = StyleSheet.create({
    emptyTable:{
        marginHorizontal:15,
        padding:10,
        borderRadius:7,
        textAlign:"center",
        backgroundColor:COLORS.disable
    },
    rowHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 25,
    },
    row: {
        borderRadius: 10,
        backgroundColor: "#fff",
        marginBottom: 10
    },
    chevronIcon: {
        width: 8,
        height: 13,
    },
    headerText: {
        color: "#444",
        fontWeight: "500",
        fontSize: 15
    },
    text: {
        color: "#444",
        fontWeight: "400",
        fontSize: 15
    },
    statusBubbleContainer:{
        width:50,
        alignItems:"center"
    },
    statusBubble:{
        width:10,
        height:10,
        borderRadius:10,
    },
    statusCompleted:{backgroundColor:COLORS.completed},
    statusCredited:{backgroundColor:COLORS.credited},
    statusPending:{backgroundColor:COLORS.pending}
});