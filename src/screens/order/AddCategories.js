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
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  SafeAreaView,
  Platform,
} from "react-native";
import * as Constant from "../../styles/globalStyles";
import { windowHeight, windowWidth } from "../utils/Dimentions";
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "../../provider/AuthProvider.ios";
import CONSTANT from "../../styles/local";
import images from "../../../assets/images";
import { setNavigation } from "../../utils/utiils";
import { ScrollView } from "react-native-virtualized-view";
import ImgToBase64 from "react-native-image-base64";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const { width } = Dimensions.get("window");

const AddCategories = ({ navigation, route }) => {
  const value = route.params?.value;
  console.log(value.firstname, "value");
  const { user, logout } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState("");
  const [variables, setVariables] = useState({
    avatar:
      Platform.OS === "ios"
        ? "file:///Users/amex/Library/Developer/CoreSimulator/Devices/1DC2B519-55F6-4F01-8B6D-3F26A9E2F9A7/data/Containers/Data/Application/6D38D9D2-71CE-442E-A268-BB1F289770EE/tmp/DB493A65-058D-4612-9918-E7A4B1ECEEEC.jpg"
        : "file:///data/user/0/com.mgl.tukotailor/cache/rn_image_picker_lib_temp_70f94396-15c7-4e92-8162-2cc954faacf5.jpg",
  });
  const [data, setData] = useState({
    avatar:
      Platform.OS === "ios"
        ? "file:///Users/amex/Library/Developer/CoreSimulator/Devices/1DC2B519-55F6-4F01-8B6D-3F26A9E2F9A7/data/Containers/Data/Application/6D38D9D2-71CE-442E-A268-BB1F289770EE/tmp/DB493A65-058D-4612-9918-E7A4B1ECEEEC.jpg"
        : "file:///data/user/0/com.mgl.tukotailor/cache/rn_image_picker_lib_temp_70f94396-15c7-4e92-8162-2cc954faacf5.jpg",
  });
  console.log(variables.avatar, "-----avatar");
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
      mur2: value.mur2,
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
        <View style={styles.backgroundName}>
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
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: Constant.gray90Color }}>примерка</Text>
          <View style={styles.background1}>
            <Text>{value.date}</Text>
          </View>
        </View>
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
            {label === "БЖ"
              ? value.weight
              : label === "ЦТ"
              ? value.tseej
              : label === "БТ"
              ? value.buselhii
              : label === "ӨТ"
              ? value.ugzug
              : label === "ЭӨ"
              ? value.engerUr
              : label === "АӨ"
              ? value.arUr
              : label === "Аh"
              ? value.arUn
              : label === "Хh"
              ? value.huhUn
              : label === "ХXЗ"
              ? value.huh
              : label === "МӨ"
              ? value.mur
              : label === "МХЗ"
              ? value.mur1
              : label === "ХУ"
              ? value.hantsui
              : label === "БуглТ"
              ? value.bugalag
              : label === "БугТ"
              ? value.bugui
              : label === "ХТ"
              ? value.engerH
              : label === "Захh"
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
              : label === "мөр"
              ? value.mur2
              : value.busad}
          </Text>
        </View>
      </View>
    );
  };
  const openGallery = () => {
    launchImageLibrary({ maxWidth: 600, maxHeight: 600 }, (response) => {
      if (response.didCancel) {
        navigation.goBack();
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        setImageUrl(response.assets[0]);
        const avatar = response.assets[0].uri;
        temp = { ...variables, avatar };
        setVariables(temp);
      }
    });
  };
  const handleUpload = () => {
    launchImageLibrary({ maxWidth: 600, maxHeight: 600 }, (response) => {
      if (response.didCancel) {
        navigation.goBack();
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        setImage(response.assets[0]);
        const avatar = response.assets[0].uri;
        variable = { ...data, avatar };
        setData(variable);
      }
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Constant.whiteColor }}>
      <ScrollView
        style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 30 }}
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
              width: width / 3,
            }}
          >
            Биеийн хэмжээ
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={{ marginVertical: 10 }}>Загварын зураг</Text>
            <TouchableOpacity onPress={() => openGallery()}>
              <Image
                source={{ uri: variables.avatar }}
                style={{ height: 230, width: 220 }}
              />
            </TouchableOpacity>
            <Text style={{ marginVertical: 10 }}>Материалын зураг</Text>

            <TouchableOpacity onPress={() => openGallery()}>
              <Image
                source={{ uri: data.avatar }}
                style={{ height: 180, width: 180 }}
              />
            </TouchableOpacity>
          </View>
          <View>
            {bodySize("БЖ")}
            {bodySize("ЦТ")}
            {bodySize("БТ")}
            {bodySize("ӨТ")}
            {bodySize("ЭӨ")}
            {bodySize("Эh")}
            {bodySize("АӨ")}
            {bodySize("Аh")}
            {bodySize("Хh")}
            {bodySize("ХXЗ")}
            {bodySize("МӨ")}
            {bodySize("МХЗ")}
            {bodySize("ХУ")}
            {bodySize("БуглТ")}
            {bodySize("БугТ")}
            {bodySize("ХТ")}
            {bodySize("Захh")}
            {bodySize("ЭУ")}
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
        {explain("мөр")}
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
    width: 45,
    backgroundColor: Constant.orderBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundName: {
    height: 30,
    width: width / 3,
    backgroundColor: Constant.orderBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  background1: {
    height: 30,
    width: width / 3 - 40,
    backgroundColor: Constant.orderBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  background2: {
    height: 30,
    width: 95,
    backgroundColor: Constant.orderBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  View2: {
    flexDirection: "row",
    justifyContent: "space-around",
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
