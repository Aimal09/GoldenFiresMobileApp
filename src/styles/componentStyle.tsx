import { StyleSheet } from 'react-native';
import COLORS from './colors';

export const loginStyle = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    paddingHorizontal: 60,
  },
  title: {
    fontSize: 38,
    fontWeight: "500",
    marginBottom: 50,
    color: COLORS.text
  },
  tabContainer: {
    flexDirection: "row",
  },
  tab: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.white,
    cursor: "pointer"
  },
  tabInactive: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: COLORS.background,
  },
  tabText: {
    fontSize: 17,
    fontWeight: "500",
    color: COLORS.text
  },
  tabTextInactive: {
    fontSize: 17,
    fontWeight: "400",
    color: COLORS.textLight,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: COLORS.white,
    paddingVertical: 60,
    paddingHorizontal: 30,
    borderRadius: 30
  },
  label: {
    fontSize: 17,
    fontWeight: "500",
    marginLeft: 30,
    marginBottom: 15,
    color: COLORS.text
  },
  input: {
    width: "100%",
    paddingVertical: 22,
    paddingHorizontal: 30,
    borderRadius: 40,
    backgroundColor: COLORS.background,
    color: COLORS.text,
    marginBottom: 20,
    fontSize: 14,
  },
  confirmButton: {
    backgroundColor: COLORS.yellow,
    paddingVertical: 25,
    borderRadius: 40,
    alignItems: "center",
    marginTop: 20,
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: "500",
  },
});


const topbarStyles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginBottom: 20
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginLeft: 20,
    color: "#444"
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    paddingRight: 12,
    borderRightWidth: 2,
    borderRightColor: "#eee"
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  userName: {
    marginLeft: 10,
    marginRight: 15,
    fontSize: 13,
  },
  chevronIcon: {
    width: 9,
    height: 15,
  },
  notificationSection: {
    padding: 5,
  },
  notificationIcon: {
    width: 20,
    height: 20,
  },
});


const cardStyles = StyleSheet.create({
  card: {
    width: '50%',
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 225,
    aspectRatio: 4 / 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    paddingVertical: 20,
    fontSize: 18,
    fontWeight: '600',
    color: "#444444",
    fontFamily: "Satoshi-Light"
  },
  chevronIcon: {
    width: 8,
    height: 13,
  },
  titleContainer: {
    paddingHorizontal: 25,
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center"
  }
});

const productCardStyles = StyleSheet.create({
  card:{
    backgroundColor:COLORS.white,
    paddingHorizontal:20,
    marginBottom:8,
    paddingVertical:15,
    borderRadius:28,
    display:"flex",
    flexDirection:"row",
    alignItems:"center"
  },
  cardActive:{
    backgroundColor:COLORS.white,
    paddingHorizontal:20,
    marginBottom:8,
    paddingVertical:15,
    borderRadius:28,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    borderWidth:2,
    borderColor:COLORS.yellow
  },
  titleBox:{
    marginLeft:18,
    flex:1
  },
  title:{
    fontSize:23,
    fontWeight:'600',
    color:COLORS.text,
  },
  amount:{
    marginLeft:20,
    marginRight:40,
    fontSize:27,
    color:"#444",
    fontWeight:"500"
  },
  icon:{
    width:65,
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    height:65,
  },
  iconImage:{
    maxWidth:65,
    maxHeight:65,
    objectFit:"contain"    
  }
});
const comboBoxStyles = StyleSheet.create({
  container: {
      marginBottom: 20,
  },
  label: {
      fontSize: 15,
      color: '#444',
      fontWeight: 'bold',
      marginBottom: 10,
      marginLeft: 15
  },
  comboBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
      borderRadius: 30,
      height:60,
      backgroundColor: '#f4f4f4',
  },
  comboBoxLight: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
      borderRadius: 30,
      height:60,
      backgroundColor: '#ffffff',
  },
  comboBoxOpen: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
      borderTopLeftRadius: 30,
      borderTopRightRadius:30,
      height:60,
      backgroundColor: '#f4f4f4',
  },
  comboBoxOpenLight: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
      borderTopLeftRadius: 30,
      borderTopRightRadius:30,
      height:60,
      backgroundColor: '#ffffff',
  },
  selectedOption: {
      fontSize: 16,
      color: '#444',
  },
  icon: {
      width: 12,
      height: 7,
      tintColor: '#444',
  },
  modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  optionBox: {
      width: '100%',
      maxHeight:150,
      backgroundColor: '#f4f4f4',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius:30,
      position:"absolute",
      top:"100%",
      zIndex:2,
      paddingVertical: 10,
      paddingHorizontal: 20,
  },
  optionBoxLight: {
      width: '100%',
      maxHeight:150,
      backgroundColor: '#ffffff',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius:30,
      position:"absolute",
      top:"100%",
      zIndex:2,
      paddingVertical: 10,
      paddingHorizontal: 20,
  },
  option: {
      paddingVertical: 12,
      paddingHorizontal: 8,
  },
  optionText: {
      fontSize: 16,
      color: '#444',
  },
});


const DocketDetailsPictureFormStyles = StyleSheet.create({
  container: {
      backgroundColor: "#ffffff",
      borderRadius: 30,
      padding: 40
  },
  title: {
      fontSize: 22,
      color: "#444444",
      marginLeft: 15,
      fontWeight: "500",
      marginBottom: 10
  },
  camera: {
      width: 80,
      height: 80
  },
  button: {
      backgroundColor: '#f4f4f4',
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: "center",
      marginBottom: 20,
      height: 250
  },
  buttonText: {
      color: '#fff',
      fontSize: 16,
  },
  image: {
      width: "100%",
      height: "100%",
      borderRadius: 15,
  },
  info:{
      display:"flex",
      flexDirection:"row",
      gap:20,
      marginTop:30
  },
  infoIcon:{
      color:"#8e8e8e",
      backgroundColor:"#f4f4f4",
      borderRadius:40,
      paddingHorizontal:10,
      paddingTop:2,
      height:24
  },
  infoText:{
      color:"#8e8e8e"
  }
});

const signatureStyles = StyleSheet.create({
  mainContainer:{
      paddingHorizontal:20,
      flex:1,
  },
  container:{
      backgroundColor:"#FFFFFF",
      borderRadius:30,
      flex:1,
      padding:25,
      gap:25
  }
});

export { topbarStyles, cardStyles, productCardStyles, comboBoxStyles, DocketDetailsPictureFormStyles, signatureStyles }