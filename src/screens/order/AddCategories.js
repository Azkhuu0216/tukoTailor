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
import Carousel from "react-native-snap-carousel-v4";
import Feather from "react-native-vector-icons/Feather";

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
  const [position, setPosition] = useState(false);
  useEffect(() => {
    getAddedCategoriesData();
    getAddedUserAccess();
  }, []);
  useLayoutEffect(() => {
    setNavigation(navigation, "Захиалга харах хуудас", true);
  }, []);

  const getAddedUserAccess = async () => {
    try {
      await firestore()
        .collection("users")
        .onSnapshot((querySnapshot) => {
          if (querySnapshot != null) {
            querySnapshot.forEach((documentSnapshot) => {
              if (documentSnapshot.id == user.uid) {
                // console.log(documentSnapshot.data().position, "----------");
                documentSnapshot.data().position === "Захирал"
                  ? setPosition(true)
                  : documentSnapshot.data().position === "ҮАХЗахирал"
                  ? setPosition(true)
                  : documentSnapshot.data().position === "Ерөнхий менежер"
                  ? setPosition(true)
                  : documentSnapshot.data().position === "Дизайнер"
                  ? setPosition(true)
                  : documentSnapshot.data().position === "Гар чимэглэчин"
                  ? setPosition(true)
                  : setPosition(false);
              }
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
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
      apparel_steps: Math.random(),
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
            {label === "БТ"
              ? value.height
              : label === "БЖ"
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
              : label === "ханцуй"
              ? value.hantsui1
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
      multiple: true,
    }).then((res) => {
      let imageList = [];
      res.map((image) => {
        imageList.push({
          fileCopyUri: Platform.OS === "ios" ? image.sourceURL : image.path,
        });
      });
      setImage(imageList);
    });
  };
  const handleUpload = async () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 1200,
      cropping: true,
      multiple: true,
    }).then((res) => {
      let List = [];
      res.map((image) => {
        List.push({
          fileCopyUri: Platform.OS === "ios" ? image.sourceURL : image.path,
        });
      });
      setImageUrl(List);
    });
  };
  const uploadImage = async () => {
    if (image == null) {
      return null;
    }

    const modifyArr = Promise.all(
      image.map(async (element) => {
        const uploadUri = element.fileCopyUri;
        let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
        const extension = filename.split(".").pop();
        const name = filename.split(".").slice(0, -1).join(".");
        filename = name + Date.now() + "." + extension;

        setUploading(true);
        setTransferred(0);

        const storageRef = storage().ref(`myfiles/${filename}`);
        const task = storageRef.putFile(uploadUri.replace("file://", ""));
        task.on("state_changed", (taskSnapshot) => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
          );
          setTransferred(
            Math.round(
              taskSnapshot.bytesTransferred / taskSnapshot.totalBytes
            ) * 100
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
      })
    );
    return modifyArr;
  };
  const uploadImage1 = async () => {
    if (imageUrl == null) {
      return null;
    }

    const modifyArr = Promise.all(
      imageUrl.map(async (element) => {
        const uploadUri = element.fileCopyUri;
        let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
        const extension = filename.split(".").pop();
        const name = filename.split(".").slice(0, -1).join(".");
        filename = name + Date.now() + "." + extension;

        setUploading(true);
        setTransferred(0);

        const storageRef = storage().ref(`myfiles1/${filename}`);
        const task = storageRef.putFile(uploadUri.replace("file://", ""));
        task.on("state_changed", (taskSnapshot) => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
          );
          setTransferred(
            Math.round(
              taskSnapshot.bytesTransferred / taskSnapshot.totalBytes
            ) * 100
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
      })
    );
    return modifyArr;
  };
  if (isLoader) {
    return <Loader />;
  }

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide} key={index}>
        <Image
          source={{ uri: item.fileCopyUri }}
          style={{ width: 140, height: 200 }}
        />
      </View>
    );
  };

  function mapToObj(inputMap) {
    let data = [];
    let obj = {};

    inputMap?.map(function (value, key) {
      let fileCopyUri = (obj["fileCopyUri"] = value);
      data.push({
        fileCopyUri,
      });
    });
    return data;
  }
  function mapToObj1(input) {
    let data = [];
    let obj = {};

    input?.map(function (value, key) {
      let fileCopyUri = (obj["fileCopyUri"] = value);
      data.push({
        fileCopyUri,
      });
    });
    return data;
  }

  let ImageData = [];
  let ImageData1 = [];

  const Urls = mapToObj(value.imageUrl);
  ImageData = Urls;
  const Urls1 = mapToObj1(value.imageUrl1);
  ImageData1 = Urls1;
  // console.log(ImageData, "url-----");
  // console.log(imageUrl, "url-----");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Constant.whiteColor }}>
      <ScrollView
        style={{
          marginHorizontal: 20,
          marginTop: 20,
        }}
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
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: width / 2 - 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ marginVertical: 10 }}>Загварын зураг</Text>
              <Feather
                name="upload-cloud"
                size={24}
                onPress={() => choosePictureFromGallery()}
              />
            </View>
            {image == null ? (
              <Carousel
                data={ImageData}
                renderItem={_renderItem}
                sliderWidth={160}
                itemWidth={160}
              />
            ) : (
              <Carousel
                data={image}
                renderItem={_renderItem}
                sliderWidth={160}
                itemWidth={160}
              />
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ marginVertical: 10 }}>Материалын зураг</Text>
              <Feather
                name="upload-cloud"
                size={24}
                onPress={() => handleUpload()}
              />
            </View>
            {imageUrl == null ? (
              <Carousel
                data={ImageData1}
                renderItem={_renderItem}
                sliderWidth={140}
                itemWidth={140}
              />
            ) : (
              <Carousel
                data={imageUrl}
                renderItem={_renderItem}
                sliderWidth={160}
                itemWidth={160}
              />
            )}
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {bodySize("Бh")}
            {bodySize("БЖ")}
            {bodySize("ЦТ")}
            {bodySize("БТ")}
            {bodySize("ӨТ")}
            {bodySize("ЭӨ")}
            {bodySize("Эh")}
            {bodySize("АӨ")}
            {bodySize("Аh")}
            {bodySize("ХXЗ")}
            {bodySize("Хh")}
            {bodySize("МХЗ")}
            {bodySize("МӨ")}
            {bodySize("ХУ")}
            {bodySize("БуглТ")}
            {bodySize("БугТ")}
            {bodySize("ХТ")}
            {bodySize("Захh")}
            {bodySize("ЭУ")}
          </ScrollView>
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {explain("үндсэн материал")}
          {explain("эмжээр")}
          {explain("хавчаар")}
          {explain("товч шилбэ")}
          {explain("бүс")}
          {explain("хатгамал")}
          {explain("чимэглэл")}
          {explain("мөр")}
          {explain("ханцуй")}
          {explain("бусад")}
        </ScrollView>
        {position ? (
          <>
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
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View style={styles.TulburView}>
                  <Text style={{ marginRight: 45 }}>Нийт: </Text>
                </View>
                <View style={styles.Mungundun}>
                  <View style={styles.TulburView}>
                    <Text style={{ marginRight: 45 }}> {niit} </Text>
                  </View>
                  <View style={styles.TulburView}>
                    <Text>
                      {niit === undefined
                        ? null
                        : value.notes === "1"
                        ? "/НӨАТ-гүй дүн/"
                        : "/НӨАТ-тэй дүн/"}{" "}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.TulburView}>
                  <Text>Урьдчилгаа: </Text>
                </View>
                <View style={styles.Mungundun}>
                  <View style={styles.TulburView}>
                    <Text style={{ marginRight: 45 }}>
                      {value.uridchilgaa}{" "}
                    </Text>
                  </View>
                  <View style={styles.TulburView}>
                    <Text>
                      {value.uridchilgaa === undefined
                        ? null
                        : value.urid === "1"
                        ? "/Данс/"
                        : value.urid === "2"
                        ? "/Пос/"
                        : "/Бэлэн/"}{" "}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.TulburView}>
                  <Text style={{ marginRight: 15 }}>Үлдэгдэл: </Text>
                </View>
                <View style={styles.Mungundun}>
                  <View style={styles.TulburView}>
                    <Text>{value.belen}</Text>
                  </View>
                  <View style={styles.TulburView}>
                    <Text>
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
              </View>
            </ScrollView>
          </>
        ) : null}
      </ScrollView>
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
          }}
          onPress={() => SubmiDataToServer()}
        >
          <Text style={{ color: Constant.whiteColor, fontSize: 20 }}>
            Захиалах
          </Text>
        </TouchableOpacity>
      )}
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
  TulburView: {
    backgroundColor: Constant.orderBackground,
    paddingVertical: 5,
    marginRight: 3,
    marginBottom: 3,
    width: 120,
  },
  Mungundun: { flexDirection: "row", marginRighy: 3 },
  slide: {
    marginLeft: 10,
  },
});
