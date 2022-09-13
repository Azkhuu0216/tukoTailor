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
  ActivityIndicator,
} from "react-native";
import * as Constant from "../../styles/globalStyles";
import { windowHeight, windowWidth } from "../utils/Dimentions";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { AuthContext } from "../../provider/AuthProvider.ios";
import CONSTANT from "../../styles/local";
import images from "../../../assets/images";
import { setNavigation } from "../../utils/utiils";
import { ScrollView } from "react-native-virtualized-view";
import ImgToBase64 from "react-native-image-base64";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ImagePicker from "react-native-image-crop-picker";
import Loader from "../../components/Loader";

const { width } = Dimensions.get("window");

const AddCategories = ({ navigation, route }) => {
  const value = route.params?.value;
  // console.log(value.notes, value.note, value.Nonote, "value");
  const { user, logout } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

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
  const [isLoader, setIsLoader] = useState(false);
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
  const niit =
    route.params?.ok === true
      ? value.niit
      : value.notes === "2"
      ? value.note
      : value.Nonote;

  const SubmiDataToServer = async () => {
    setIsLoader(true);
    const imageUrl = await uploadImage();
    const imageUrl1 = await uploadImage1();
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
      imageUrl: imageUrl,
      imageUrl1: imageUrl1,
      niit: niit,
      uridchilgaa: value.uridchilgaa,
      belen: value.belen,
      apparel_steps: [],
    });

    firestore()
      .collection("orders")
      .doc(user.uid)
      .set({
        selected_apparels: mainCategorymaleArray,
      })
      .then(() => {
        setIsLoader(false);

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
        <View style={{ width: width / 6 }}>
          <Text>{label}: </Text>
        </View>
        <View style={styles.backgroundName}>
          <Text>{label === "Нэр" ? value.firstname : value.phone}</Text>
        </View>
      </View>
    );
  };
  const ognoo = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.View1}>
          <View style={{ width: width / 6 }}>
            <Text>Огноо:</Text>
          </View>
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
      </ScrollView>
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
  const choosePictureFromGallery = async () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 1200,
      cropping: true,
    }).then((image) => {
      const imageUri = Platform.OS === "ios" ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };
  const handleUpload = async () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 1200,
      cropping: true,
    }).then((image) => {
      const imageUri = Platform.OS === "ios" ? image.sourceURL : image.path;
      setImageUrl(imageUri);
    });
  };
  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    console.log(image.replace("file://", ""));
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
    const extension = filename.split(".").pop();
    const name = filename.split(".").slice(0, -1).join(".");
    filename = name + Date.now() + "." + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`profile_image/${filename}`);
    const task = storageRef.putFile(uploadUri.replace("file://", ""));
    console.log(task, "Task----");
    task.on("state_changed", (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
      );
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100
      );
    });
    try {
      await task;
      const url = await storageRef.getDownloadURL();
      setUploading(false);
      return url;
    } catch (e) {
      console.log(e, "eroor-------");
      return null;
    }
  };
  const uploadImage1 = async () => {
    if (image == null) {
      return null;
    }
    console.log(image.replace("file://", ""));
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
    const extension = filename.split(".").pop();
    const name = filename.split(".").slice(0, -1).join(".");
    filename = name + Date.now() + "." + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`profile_image/${filename}`);
    const task = storageRef.putFile(uploadUri.replace("file://", ""));
    console.log(task, "Task----");
    task.on("state_changed", (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
      );
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100
      );
    });
    try {
      await task;
      const url = await storageRef.getDownloadURL();
      setUploading(false);
      return url;
    } catch (e) {
      console.log(e, "eroor-------");
      return null;
    }
  };
  if (isLoader) {
    return <Loader />;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Constant.whiteColor }}>
      <ScrollView
        style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {name("Нэр")}
        {name("Утас")}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {ognoo()}
        </ScrollView>
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={{ marginVertical: 10 }}>Загварын зураг</Text>
              <TouchableOpacity onPress={() => choosePictureFromGallery()}>
                {image == null ? (
                  <Image
                    style={{ height: 250, width: 140 }}
                    source={
                      value.imageUrl === undefined
                        ? images.clothes
                        : { uri: value.imageUrl }
                    }
                  />
                ) : (
                  <Image
                    style={{ height: 250, width: 140 }}
                    source={image != null ? { uri: image } : images.clothes}
                  />
                )}
              </TouchableOpacity>
              <Text style={{ marginVertical: 10 }}>Материалын зураг</Text>

              <TouchableOpacity onPress={() => handleUpload()}>
                {imageUrl == null ? (
                  <Image
                    style={{ height: 210, width: 118 }}
                    source={
                      value.imageUrl1 === undefined
                        ? images.clothes
                        : { uri: value.imageUrl1 }
                    }
                  />
                ) : (
                  <Image
                    style={{ height: 210, width: 118 }}
                    source={
                      imageUrl != null ? { uri: imageUrl } : images.clothes
                    }
                  />
                )}
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
        </ScrollView>
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {explain("үндсэн материал")}
          {explain("эмжээр")}
          {explain("хавчаар")}
          {explain("товч шилбэ")}
          {explain("бүс")}
          {explain("хатгамал")}
          {explain("чимэглэл")}
          {explain("мөр")}
          {explain("бусад")}
        </ScrollView>
        <Text
          style={{
            textAlign: "center",
            marginBottom: 10,
            color: Constant.gray90Color,
            marginTop: 10,
          }}
        >
          Төлбөрийн мэдээлэл
        </Text>
        <View
          style={{
            backgroundColor: Constant.orderBackground,
            height: 70,
            justifyContent: "space-between",
            padding: 5,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ marginRight: 45 }}>Нийт: </Text>
            <Text>
              {niit}{" "}
              {value.niit === undefined
                ? null
                : value.notes === "1"
                ? "/НӨАТ-гүй дүн/"
                : "/НӨАТ-тэй дүн/"}{" "}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>Урьдчилгаа: </Text>
            <Text>
              {value.uridchilgaa}{" "}
              {value.uridchilgaa === undefined
                ? null
                : value.urid === "1"
                ? "/Данс/"
                : value.urid === "2"
                ? "/Пос/"
                : "/Бэлэн/"}{" "}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ marginRight: 15 }}>Үлдэгдэл: </Text>
            <Text>
              {value.belen}{" "}
              {value.belen === undefined
                ? null
                : value.ready === "1"
                ? "/Данс/"
                : value.ready === "2"
                ? "/Пос/"
                : "/Бэлэн/"}
            </Text>
          </View>
        </View>
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
    width: width / 2 - 20,
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
    marginRight: 10,
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
    width: width / 3,
    backgroundColor: Constant.orderBackground,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 3,
  },
  background4: {
    height: 30,
    width: width - (width - 40) / 3,
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
