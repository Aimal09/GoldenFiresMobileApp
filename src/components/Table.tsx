import { Image, StyleSheet, Text, View } from "react-native";

interface TableProp {
    data: Data[];
}
interface Data {
    columns: Column[];
    details: object;
}
interface Column {
    title: string;
    value: string | number;
}
const Table: React.FC<TableProp> = ({ data }) => {
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
            {data.map((rows,i) =>
                <View key={i} style={[
                    tableStyle.rowHeader,
                    tableStyle.row
                ]}>
                    {rows.columns.map(col =>
                        <Text style={tableStyle.text}>{col.value}</Text>
                    )}
                    <Image source={require("../assets/images/chevron-right.png")} style={tableStyle.chevronIcon} />

                </View>
            )}
        </>
    );
}

export default Table;

const tableStyle = StyleSheet.create({
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
    }
});