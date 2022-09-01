import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  SafeAreaView,
} from "react-native";
import * as Constant from "../../styles/globalStyles";
import { windowHeight, windowWidth } from "../utils/Dimentions";
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "../../provider/AuthProvider.ios";
import * as CONSTANT from "../../styles/local";
import images from "../../../assets/images";
import { setNavigation } from "../../utils/utiils";

const { width } = Dimensions.get("window");

const AddCategories = ({ navigation, route }) => {
  const value = route.params?.value;
  console.log(value.firstname, "value");
  const { user, logout } = useContext(AuthContext);

  const [mainCategorymaleArray, setMainCategorymaleArray] = useState([]);
  const [mainCategoryfemaleArray, setMainCategoryfemaleArray] = useState([]);
  const [subCategorymaleArray, setSubCategorymaleArray] = useState([]);
  const [subCategoryfemaleArray, setSubCategoryfemaleArray] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [mainStepsCategorymaleArray, setMainStepsCategorymaleArray] = useState(
    []
  );
  const [mainStepsCategoryfemaleArray, setMainStepsCategoryfemaleArray] =
    useState([]);
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    getAddedCategoriesData();
  }, []);
  useLayoutEffect(() => {
    setNavigation(navigation, "Захиалга харах хуудас", true);
  }, []);

  const getAddedCategoriesData = async () => {
    if (mainCategorymaleArray != null || mainCategoryfemaleArray != null) {
      try {
        await firestore()
          .collection("orders")
          .onSnapshot((querySnapshot) => {
            if (querySnapshot != null) {
              querySnapshot.forEach((documentSnapshot) => {
                console.log(
                  documentSnapshot.data().selected_apparels,
                  "Dataa shidej bgn----"
                );
                if (documentSnapshot.id == user.uid) {
                  setMainCategorymaleArray(
                    documentSnapshot.data().selected_apparels
                  );
                  setSubCategorymaleArray(
                    documentSnapshot.data().selected_apparels
                  );
                  setMainStepsCategorymaleArray(
                    documentSnapshot.data().selected_apparels
                  );
                } else {
                  setMainCategoryfemaleArray(
                    documentSnapshot.data().selected_apparels
                  );
                  setSubCategoryfemaleArray(
                    documentSnapshot.data().selected_apparels
                  );
                  setMainStepsCategoryfemaleArray(
                    documentSnapshot.data().selected_apparels
                  );
                }
              });
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const SubmiDataToServer = async () => {
    mainCategorymaleArray.push({
      // id: user.uid,
      firstname: value.firstname,
      phone: value.phone,
      weight: value.weight,
      date: value.date,
      tseej: value.tseej,
      ugzug: value.ugzug,
      engerUr: value.engerUr,
      engerUn: value.engerUn,
      arUr: value.arUr,
      arUn: value.arUn,
      huhUn: value.huhUn,
      buselhii: value.buselhii,
      huh: value.huh,
      mur: value.mur,
      mur1: value.mur1,
      hantsui: value.hantsui,
      bugalag: value.bugalag,
      bugui: value.bugui,
      engerH: value.engerH,
      zah: value.zah,
      ed: value.ed,
      undsen: value.undsen,
      emjeer: value.emjeer,
      havchaar: value.havchaar,
      towch: value.towch,
      bus: value.bus,
      hatgamal: value.hatgamal,
      chimeglel: value.chimeglel,
      busad: value.busad,
      apparel_steps: [],
    });

    firestore()
      .collection("orders")
      .doc(user.uid)
      .set({
        selected_apparels: mainCategorymaleArray,
      })
      .then(() => {
        setSpinner(false);
        // setPrice("");
        Alert.alert(
          CONSTANT.categoriesCategoryadded,
          CONSTANT.categoriesAddedsuccessfully
        );
        getAddedCategoriesData();
      })
      .catch((error) => {
        console.log(CONSTANT.categoriesSomethingwrongpostfirestore, error);
      });
  };

  const name = (label) => {
    return (
      <View style={styles.View}>
        <Text>{label}: </Text>
        <View style={styles.background}>
          <Text>{label === "Нэр" ? value.firstname : value.phone}</Text>
        </View>
      </View>
    );
  };
  const ognoo = () => {
    return (
      <View style={styles.View1}>
        <Text>Огноо:</Text>
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: Constant.gray90Color }}>өгсөн</Text>
          <View style={styles.background1}>
            <Text>{value.date}</Text>
          </View>
        </View>
        {/* <View style={{ alignItems: "center" }}>
          <Text style={{ color: Constant.gray90Color }}>примерка</Text>
          <View style={styles.background1}>
            <Text>{value.date}</Text>
          </View>
        </View> */}
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: Constant.gray90Color }}>авах</Text>
          <View style={styles.background1}>
            <Text>{value.date}</Text>
          </View>
        </View>
      </View>
    );
  };
  const bodySize = (label) => {
    return (
      <View style={styles.View2}>
        <View style={styles.background}>
          <Text style={styles.text}>{label}</Text>
        </View>
        <View style={styles.background2}>
          <Text>
            {label === "биеийн жин"
              ? value.weight
              : label === "цээжний тойрог"
              ? value.tseej
              : label === "бүсэлхийн тойрог"
              ? value.buselhii
              : label === "өгзөгний тойрог"
              ? value.ugzug
              : label === "энгэрийн өргөн"
              ? value.engerUr
              : label === "арын өргөн"
              ? value.arUr
              : label === "арын өндөр"
              ? value.arUn
              : label === "хөхний өндөр"
              ? value.huhUn
              : label === "хөх хоорондын зай"
              ? value.huh
              : label === "мөрний өргөн"
              ? value.mur
              : label === "мөр хоорондын зай"
              ? value.mur1
              : label === "ханцуйн урт"
              ? value.hantsui
              : label === "бугалагны тойрог"
              ? value.bugalag
              : label === "бугуйн тойрог"
              ? value.bugui
              : label === "хүзүүний тойрог"
              ? value.engerH
              : label === "захны өндөр"
              ? value.zah
              : value.ed}
          </Text>
        </View>
      </View>
    );
  };
  const explain = (label) => {
    return (
      <View style={styles.View4}>
        <View style={styles.background3}>
          <Text>{label}</Text>
        </View>
        <View style={styles.background4}>
          <Text>
            {label === "үндсэн материал"
              ? value.undsen
              : label === "эмжээр"
              ? value.emjeer
              : label === "хавчаар"
              ? value.havchaar
              : label === "товч шилбэ"
              ? value.towch
              : label === "бүс"
              ? value.bus
              : label === "хатгамал"
              ? value.hatgamal
              : label === "чимэглэл"
              ? value.chimeglel
              : value.busad}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Constant.whiteColor }}>
      <ScrollView
        style={{ marginHorizontal: 20, marginTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {name("Нэр")}
        {name("Утас")}
        {ognoo()}
        <View style={{ alignItems: "flex-end", marginRight: 20 }}>
          <Text
            style={{
              marginBottom: 10,
              color: Constant.gray90Color,
              width: width / 2 - 40,
            }}
          >
            Биеийн хэмжээ
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Image source={images.clothes} />
          <View>
            {bodySize("биеийн жин")}
            {bodySize("цээжний тойрог")}
            {bodySize("бүсэлхийн тойрог")}
            {bodySize("өгзөгний тойрог")}
            {bodySize("энгэрийн өргөн")}
            {bodySize("энгэрийн өндөр")}
            {bodySize("арын өргөн")}
            {bodySize("арын өндөр")}
            {bodySize("хөхний өндөр")}
            {bodySize("хөх хоорондын зай")}
            {bodySize("мөрний өргөн")}
            {bodySize("мөр хоорондын зай")}
            {bodySize("ханцуйн урт")}
            {bodySize("бугалагны тойрог")}
            {bodySize("бугуйн тойрог")}
            {bodySize("хүзүүний тойрог")}
            {bodySize("захны өндөр")}
            {bodySize("эдлэлийн урт")}
          </View>
        </View>
        <View style={{ alignItems: "center", width: width - 40 }}>
          <Text
            style={{
              marginBottom: 10,
              color: Constant.gray90Color,
              marginTop: 30,
            }}
          >
            Тайлбар
          </Text>
        </View>
        {explain("үндсэн материал")}
        {explain("эмжээр")}
        {explain("хавчаар")}
        {explain("товч шилбэ")}
        {explain("бүс")}
        {explain("хатгамал")}
        {explain("чимэглэл")}
        {explain("бусад")}

        {route.params?.ok === true ? null : (
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              height: 50,
              width: width - 40,
              backgroundColor: Constant.primaryColor,
              borderRadius: 10,
              marginTop: 40,
            }}
            onPress={() => SubmiDataToServer()}
          >
            <Text style={{ color: Constant.whiteColor, fontSize: 20 }}>
              Захиалах
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddCategories;

const styles = StyleSheet.create({
  View: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width / 2,
    marginBottom: 10,
  },
  View1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  background: {
    height: 30,
    width: width / 3,
    backgroundColor: Constant.orderBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  background1: {
    height: 30,
    width: width / 3,
    backgroundColor: Constant.orderBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  background2: {
    height: 30,
    width: 45,
    backgroundColor: Constant.orderBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  View2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
    width: width / 2 - 20,
    marginLeft: 20,
  },

  text: {
    fontSize: 14,
  },
  background3: {
    height: 30,
    width: (width - 40) / 3,
    backgroundColor: Constant.orderBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  background4: {
    height: 30,
    width: width - (width - 40) / 3 - 24,
    backgroundColor: Constant.orderBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  View4: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width - 20,
    marginBottom: 3,
  },
});
