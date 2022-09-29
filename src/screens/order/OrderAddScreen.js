import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  CheckBox,
  Platform,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { setNavigation } from "../../utils/utiils";
import * as Constant from "../../styles/globalStyles";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

const { height, width } = Dimensions.get("window");
const OrderAdd = ({ navigation }) => {
  useLayoutEffect(() => {
    setNavigation(navigation, "Захиалга оруулах хуудас", true);
  }, []);
  const [data, setData] = useState({
    oydol: "",
    firstname: "",
    phone: "",
    height: "",
    huh: "",
    weight: "",
    mur: "",
    tseej: "",
    mur1: "",
    ugzug: "",
    hantsui: "",
    engerTo: "",
    bugalag: "",
    engerUr: "",
    bugui: "",
    engerUn: "",
    engerH: "",
    arUr: "",
    zah: "",
    arUn: "",
    huhUn: "",
    buselhii: "",
    ed: "",
    undsen: "",
    towch: "",
    emjeer: "",
    havchaar: "",
    bus: "",
    hatgamal: "",
    chimeglel: "",
    busad: "",
    note: "",
    Nonote: "",
    uridchilgaa: "",
    belen: "",
    date: "DD/MM/YYYY",
    date1: "DD/MM/YYYY",
    date2: "DD/MM/YYYY",
    notes: "",
    urid: "",
    ready: "",
    mur2: "",
  });
  const [check, setCheck] = useState(false);
  const [datePicker, setDatePicker] = useState({
    showGive: false,
    showPremirka: false,
    showTake: false,
  });

  const hideGive = () => {
    setDatePicker({ ...datePicker, showGive: false });
  };
  const handleGive = (date) => {
    const give = moment(date).format("DD/MM/YYYY");
    setData({ ...data, date: give });
    hideGive();
  };
  const hidePremirka = () => {
    setDatePicker({ ...datePicker, showPremirka: false });
  };
  const handlePremirka = (date) => {
    const premirka = moment(date).format("DD/MM/YYYY");
    setData({ ...data, date: premirka });
    setData({ ...data, date1: premirka });
    hidePremirka();
  };
  const hideTake = () => {
    setDatePicker({ ...datePicker, showTake: false });
  };
  const handleTake = (date) => {
    const take = moment(date).format("DD/MM/YYYY");
    setData({ ...data, date: take });
    setData({ ...data, date2: take });
    hideTake();
  };
  const info = (label, label1) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <View>
          <Text style={{ fontSize: 12, marginBottom: 10 }}>{label}</Text>

          <View style={styles.infoBack}>
            <TextInput
              value={
                label === "Нэр"
                  ? data.firstname
                  : label === "Бh"
                  ? data.height
                  : label === "БЖ"
                  ? data.weight
                  : label === "ЦТ"
                  ? data.tseej
                  : label === "ӨТ"
                  ? data.ugzug
                  : label === "ЭТ"
                  ? data.engerTo
                  : label === "ЭӨ"
                  ? data.engerUr
                  : label === "Эh"
                  ? data.engerUn
                  : label === "АӨ"
                  ? data.arUr
                  : label === "Хh"
                  ? data.huhUn
                  : data.arUn
              }
              onChangeText={(t) =>
                label === "Нэр"
                  ? setData({ ...data, firstname: t })
                  : label === "Бh"
                  ? setData({ ...data, height: t })
                  : label === "БЖ"
                  ? setData({ ...data, weight: t })
                  : label === "ЦТ"
                  ? setData({ ...data, tseej: t })
                  : label === "ӨТ"
                  ? setData({ ...data, ugzug: t })
                  : label === "ЭТ"
                  ? setData({ ...data, engerTo: t })
                  : label === "ЭӨ"
                  ? setData({ ...data, engerUr: t })
                  : label === "Эh"
                  ? setData({ ...data, engerUn: t })
                  : label === "АӨ"
                  ? setData({ ...data, arUr: t })
                  : label === "Хh"
                  ? setData({ ...data, huhUn: t })
                  : setData({ ...data, arUn: t })
              }
              style={{ height: 40 }}
            ></TextInput>
          </View>
        </View>

        {label1 === undefined ? null : (
          <View>
            <Text style={{ fontSize: 12, marginBottom: 10 }}>{label1}</Text>

            <View style={styles.infoBack}>
              <TextInput
                value={
                  label1 === "Утас"
                    ? data.phone
                    : label1 === "ХХЗ"
                    ? data.huh
                    : label1 === "МӨ"
                    ? data.mur
                    : label1 === "МХЗ"
                    ? data.mur1
                    : label1 === "ХУ"
                    ? data.hantsui
                    : label1 === "БуглТ"
                    ? data.bugalag
                    : label1 === "БугТ"
                    ? data.bugui
                    : label1 === "ЭХТ"
                    ? data.engerH
                    : label1 === "Зh"
                    ? data.zah
                    : label1 == "ЭУ"
                    ? data.ed
                    : data.buselhii
                }
                onChangeText={(t) =>
                  label1 === "Утас"
                    ? setData({ ...data, phone: t })
                    : label1 === "ХХЗ"
                    ? setData({ ...data, huh: t })
                    : label1 === "МӨ"
                    ? setData({ ...data, mur: t })
                    : label1 === "МХЗ"
                    ? setData({ ...data, mur1: t })
                    : label1 === "ХУ"
                    ? setData({ ...data, hantsui: t })
                    : label1 === "БуглТ"
                    ? setData({ ...data, bugalag: t })
                    : label1 == "БугТ"
                    ? setData({ ...data, bugui: t })
                    : label1 == "ЭХТ"
                    ? setData({ ...data, engerH: t })
                    : label1 == "Зh"
                    ? setData({ ...data, zah: t })
                    : label1 == "ЭУ"
                    ? setData({ ...data, ed: t })
                    : setData({ ...data, buselhii: t })
                }
                style={{ height: 40 }}
              ></TextInput>
            </View>
          </View>
        )}
      </View>
    );
  };
  const noNoteCheck = () => {
    setCheck(true);
    setData({ ...data, notes: "1" });
  };
  const noteCheck = () => {
    setCheck(true);
    setData({ ...data, notes: "2" });
  };
  const dans = () => {
    setCheck(true);
    setData({ ...data, urid: "1" });
  };
  const pos = () => {
    setCheck(true);
    setData({ ...data, urid: "2" });
  };
  const belen = () => {
    setCheck(true);
    setData({ ...data, urid: "3" });
  };
  const dans1 = () => {
    setCheck(true);
    setData({ ...data, ready: "1" });
  };
  const pos1 = () => {
    setCheck(true);
    setData({ ...data, ready: "2" });
  };
  const belen1 = () => {
    setCheck(true);
    setData({ ...data, ready: "3" });
  };
  const other = (label) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <View>
          <Text style={{ fontSize: 12, marginBottom: 10 }}>{label}</Text>

          <View
            style={{
              height: 44,
              width: width / 2 + 40,
              backgroundColor: Constant.orderBackground,
              justifyContent: "center",
              padding: 5,
            }}
          >
            <TextInput
              value={
                label === "Үндсэн материал"
                  ? data.undsen
                  : label === "Эмжээр"
                  ? data.emjeer
                  : label === "Хавчаар"
                  ? data.havchaar
                  : label === "Товч шилбэ"
                  ? data.towch
                  : label === "Бүс"
                  ? data.bus
                  : label === "Хатгамал"
                  ? data.hatgamal
                  : label === "Чимэглэл"
                  ? data.chimeglel
                  : label === "Мөр"
                  ? data.mur2
                  : data.busad
              }
              onChangeText={(t) =>
                label === "Үндсэн материал"
                  ? setData({ ...data, undsen: t })
                  : label === "Эмжээр"
                  ? setData({ ...data, emjeer: t })
                  : label === "Хавчаар"
                  ? setData({ ...data, havchaar: t })
                  : label === "Товч шилбэ"
                  ? setData({ ...data, towch: t })
                  : label === "Бүс"
                  ? setData({ ...data, bus: t })
                  : label === "Хатгамал"
                  ? setData({ ...data, hatgamal: t })
                  : label === "Чимэглэл"
                  ? setData({ ...data, chimeglel: t })
                  : label === "Мөр"
                  ? setData({ ...data, mur2: t })
                  : setData({ ...data, busad: t })
              }
              style={{ height: 40 }}
            ></TextInput>
          </View>
        </View>
      </View>
    );
  };
  const payment = (label) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <View>
          <Text style={{ fontSize: 12, marginBottom: 10 }}>{label}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 44,
                width: width / 2 - 60,
                backgroundColor: Constant.orderBackground,
                padding: 5,
              }}
            >
              <View style={{ flex: 1 }}>
                <TextInput
                  value={label === "НӨАТ-гүй дүн" ? data.Nonote : data.note}
                  onChangeText={(t) =>
                    label === "НӨАТ-гүй дүн"
                      ? setData({ ...data, Nonote: t })
                      : setData({ ...data, note: t })
                  }
                  style={{ height: 40 }}
                ></TextInput>
              </View>
            </View>
            {label === "НӨАТ-гүй дүн" ? (
              <TouchableOpacity onPress={() => noNoteCheck()}>
                <MaterialCommunityIcons
                  name={
                    data.notes === "1"
                      ? "checkbox-outline"
                      : "checkbox-blank-outline"
                  }
                  size={30}
                  color={Constant.primaryColor}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => noteCheck()}>
                <MaterialCommunityIcons
                  name={
                    data.notes === "2"
                      ? "checkbox-outline"
                      : "checkbox-blank-outline"
                  }
                  size={30}
                  color={Constant.primaryColor}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };
  const tulult = (label) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
          alignItems: "flex-end",
        }}
      >
        <View>
          <Text style={{ fontSize: 12, marginBottom: 10 }}>{label}</Text>

          <View
            style={{
              height: 44,
              width: width / 2 - 60,
              backgroundColor: Constant.orderBackground,
              flexDirection: "row",
              padding: 5,
            }}
          >
            <TextInput
              value={label === "Урьдчилгаа" ? data.uridchilgaa : data.belen}
              onChangeText={(t) =>
                label === "Урьдчилгаа"
                  ? setData({ ...data, uridchilgaa: t })
                  : setData({ ...data, belen: t })
              }
              style={{ height: 40, width: "100%" }}
            ></TextInput>
          </View>
        </View>
        {label === "Урьдчилгаа" ? (
          <>
            <TouchableOpacity onPress={() => dans()}>
              <MaterialCommunityIcons
                name={
                  data.urid === "1"
                    ? "checkbox-outline"
                    : "checkbox-blank-outline"
                }
                size={25}
                color={Constant.primaryColor}
              />
              <Text>Данс</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pos()}>
              <MaterialCommunityIcons
                name={
                  data.urid === "2"
                    ? "checkbox-outline"
                    : "checkbox-blank-outline"
                }
                size={25}
                color={Constant.primaryColor}
              />
              <Text>Пос</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => belen()}>
              <MaterialCommunityIcons
                name={
                  data.urid === "3"
                    ? "checkbox-outline"
                    : "checkbox-blank-outline"
                }
                size={25}
                color={Constant.primaryColor}
              />
              <Text>Бэлэн</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => dans1()}>
              <MaterialCommunityIcons
                name={
                  data.ready === "1"
                    ? "checkbox-outline"
                    : "checkbox-blank-outline"
                }
                size={25}
                color={Constant.primaryColor}
              />
              <Text>Данс</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pos1()}>
              <MaterialCommunityIcons
                name={
                  data.ready === "2"
                    ? "checkbox-outline"
                    : "checkbox-blank-outline"
                }
                size={25}
                color={Constant.primaryColor}
              />
              <Text>Пос</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => belen1()}>
              <MaterialCommunityIcons
                name={
                  data.ready === "3"
                    ? "checkbox-outline"
                    : "checkbox-blank-outline"
                }
                size={25}
                color={Constant.primaryColor}
              />
              <Text>Бэлэн</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };
  const date = (label) => {
    return (
      <View>
        <Text>{label}</Text>
        <View
          style={{
            height: 44,
            width: width / 3,
            backgroundColor: Constant.orderBackground,
            justifyContent: "center",
            padding: 5,
            marginVertical: 10,
            marginRight: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              label === "Өгсөн"
                ? setDatePicker({ ...datePicker, showGive: true })
                : label === "Премирка"
                ? setDatePicker({ ...datePicker, showPremirka: true })
                : setDatePicker({ ...datePicker, showTake: true });
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text>
              {label === "Өгсөн"
                ? data.date
                : label === "Премирка"
                ? data.date1
                : data.date2}
            </Text>
            <Feather name="calendar" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Constant.whiteColor }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 30 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.title}>Үндсэн мэдээлэл</Text>
            <View>
              <Text style={{ marginBottom: 10 }}>Оёдолчны нэр</Text>
              <View style={styles.infoBack}>
                <TextInput
                  value={data.oydol}
                  onChangeText={(t) => setData({ ...data, oydol: t })}
                  style={{ height: 40 }}
                />
              </View>
            </View>
          </View>
          {info("Нэр", "Утас")}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: width - 40,
            }}
          >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {date("Өгсөн")}
              {date("Премирка")}
              {date("Авах")}
            </ScrollView>
            <DateTimePicker
              isVisible={datePicker.showGive}
              mode="date"
              onCancel={hideGive}
              onConfirm={handleGive}
            />
            <DateTimePicker
              isVisible={datePicker.showPremirka}
              mode="date"
              onCancel={hidePremirka}
              onConfirm={handlePremirka}
            />
            <DateTimePicker
              isVisible={datePicker.showTake}
              mode="date"
              onCancel={hideTake}
              onConfirm={handleTake}
            />
          </View>

          <Text style={styles.title}>Биеийн хэмжээ</Text>
          {info("Бh", "ХХЗ")}
          {info("БЖ", "МӨ")}
          {info("ЦТ", "МХЗ")}
          {info("ӨТ", "ХУ")}
          {info("ЭТ", "БуглТ")}
          {info("ЭӨ", "БугТ")}
          {info("Эh", "ЭХТ")}
          {info("АӨ", "Зh")}
          {info("Аh", "ЭУ")}
          {info("Хh", "БТ")}
          <Text style={styles.title}>Бусад</Text>
          {other("Үндсэн материал")}
          {other("Эмжээр")}
          {other("Хавчаар")}
          {other("Товч шилбэ")}
          {other("Бүс")}
          {other("Хатгамал")}
          {other("Чимэглэл")}
          {other("Мөр")}
          {other("Бусад")}
          <Text style={styles.title}>Төлбөрийн мэдээлэл</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {payment("НӨАТ-гүй дүн")}
            {payment("НӨАТ-тэй дүн")}
          </View>
          {tulult("Урьдчилгаа")}
          {tulult("Үлдэгдэл")}
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
            onPress={() =>
              navigation.navigate("AddCategories", { value: data })
            }
          >
            <Text style={{ color: Constant.whiteColor, fontSize: 20 }}>
              Үргэлжлүүлэх
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OrderAdd;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constant.primaryColor,
    flex: 1,
  },
  infoBack: {
    height: 40,
    width: width / 2 - 30,
    backgroundColor: Constant.orderBackground,
    justifyContent: "center",
    padding: 5,
  },
  title: {
    marginBottom: 10,
    color: Constant.gray90Color,
    fontWeight: "bold",
    fontSize: 16,
  },
});
