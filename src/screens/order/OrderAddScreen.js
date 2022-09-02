import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { setNavigation } from "../../utils/utiils";
import * as Constant from "../../styles/globalStyles";
// import DatePicker from "react-native-neat-date-picker";
import Feather from "react-native-vector-icons/Feather";
import { Checkbox } from "react-native-ui-lib";

const { height, width } = Dimensions.get("window");

const OrderAddScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    setNavigation(navigation, "Захиалга оруулах хуудас", true);
  }, []);
  const [data, setData] = useState({
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
    notes: "",
    urid: "",
    ready: "",
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [check, setCheck] = useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setData({ ...data, date: date.dateString });
    hideDatePicker();
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
        <View
          style={{
            height: 44,
            width: width / 2 - 30,
            backgroundColor: Constant.orderBackground,
            justifyContent: "center",
            padding: 5,
          }}
        >
          <Text style={{ fontSize: 12 }}>{label}</Text>
          <TextInput
            value={
              label === "Нэр"
                ? data.firstname
                : label === "Биеийн өндөр"
                ? data.height
                : label === "Биеийн жин"
                ? data.weight
                : label === "Цээжний тойрог"
                ? data.tseej
                : label === "Өгзөгний тойрог"
                ? data.ugzug
                : label === "Энгэрийн тойрог"
                ? data.engerTo
                : label === "Энгэрийн өргөн"
                ? data.engerUr
                : label === "Энгэрийн өндөр"
                ? data.engerUn
                : label === "Арын өргөн"
                ? data.arUr
                : label === "Хөхний өндөр"
                ? data.huhUn
                : label === "Арын өндөр"
                ? data.arUn
                : data.buselhii
            }
            onChangeText={(t) =>
              label === "Нэр"
                ? setData({ ...data, firstname: t })
                : label === "Биеийн өндөр"
                ? setData({ ...data, height: t })
                : label === "Биеийн жин"
                ? setData({ ...data, weight: t })
                : label === "Цээжний тойрог"
                ? setData({ ...data, tseej: t })
                : label === "Өгзөгний тойрог"
                ? setData({ ...data, ugzug: t })
                : label === "Энгэрийн тойрог"
                ? setData({ ...data, engerTo: t })
                : label === "Энгэрийн өргөн"
                ? setData({ ...data, engerUr: t })
                : label === "Энгэрийн өндөр"
                ? setData({ ...data, engerUn: t })
                : label === "Арын өргөн"
                ? setData({ ...data, arUr: t })
                : label === "Хөхний өндөр"
                ? setData({ ...data, huhUn: t })
                : label === "Арын өндөр"
                ? setData({ ...data, arUn: t })
                : setData({ ...data, buselhii: t })
            }
          ></TextInput>
        </View>
        {label1 === undefined ? null : (
          <View
            style={{
              height: 44,
              width: width / 2 - 30,
              backgroundColor: Constant.orderBackground,
              justifyContent: "center",
              padding: 5,
            }}
          >
            <Text style={{ fontSize: 12 }}>{label1}</Text>
            <TextInput
              value={
                label1 === "Утас"
                  ? data.phone
                  : label1 === "Хөхний хоорондын зай"
                  ? data.huh
                  : label1 === "Мөрний өргөн"
                  ? data.mur
                  : label1 === "Мөр хоорондын зай"
                  ? data.mur1
                  : label1 === "Ханцуйн урт"
                  ? data.hantsui
                  : label1 === "Бугалагны тойрог"
                  ? data.bugalag
                  : label1 === "Бугуйн тойрог"
                  ? data.bugui
                  : label1 === "Энгэрийн хүзүүний тойрог"
                  ? data.engerH
                  : label1 === "Захны өндөр"
                  ? data.zah
                  : data.ed
              }
              onChangeText={(t) =>
                label1 === "Утас"
                  ? setData({ ...data, phone: t })
                  : label1 === "Хөхний хоорондын зай"
                  ? setData({ ...data, huh: t })
                  : label1 === "Мөрний өргөн"
                  ? setData({ ...data, mur: t })
                  : label1 === "Мөр хоорондын зай"
                  ? setData({ ...data, mur1: t })
                  : label1 === "Ханцуйн урт"
                  ? setData({ ...data, hantsui: t })
                  : label1 === "Бугалагны тойрог"
                  ? setData({ ...data, bugalag: t })
                  : label1 == "Бугуйн тойрог"
                  ? setData({ ...data, bugui: t })
                  : label1 == "Энгэрийн хүзүүний тойрог"
                  ? setData({ ...data, engerH: t })
                  : label1 == "Захны өндөр"
                  ? setData({ ...data, zah: t })
                  : setData({ ...data, ed: t })
              }
            ></TextInput>
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
        <View
          style={{
            height: 44,
            width: width / 2 + 40,
            backgroundColor: Constant.orderBackground,
            justifyContent: "center",
            padding: 5,
          }}
        >
          <Text style={{ fontSize: 12 }}>{label}</Text>
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
                : setData({ ...data, busad: t })
            }
          ></TextInput>
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
        <View
          style={{
            height: 44,
            width: width / 2 - 60,
            backgroundColor: Constant.orderBackground,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 5,
          }}
        >
          <View>
            <Text style={{ fontSize: 12 }}>{label}</Text>
            <TextInput
              value={label === "НӨАТ-гүй дүн" ? data.Nonote : data.note}
              onChangeText={(t) =>
                label === "НӨАТ-гүй дүн"
                  ? setData({ ...data, Nonote: t })
                  : setData({ ...data, note: t })
              }
            ></TextInput>
          </View>
          {label === "НӨАТ-гүй дүн" ? (
            <Checkbox
              color={Constant.primaryColor}
              iconColor={Constant.whiteColor}
              value={data.notes === "1" ? check : null}
              onValueChange={() => noNoteCheck()}
              borderRadius={5}
              size={24}
              style={{ marginVertical: 10 }}
            />
          ) : (
            <Checkbox
              color={Constant.primaryColor}
              iconColor={Constant.whiteColor}
              value={data.notes === "2" ? check : null}
              onValueChange={() => noteCheck()}
              borderRadius={5}
              size={24}
              style={{ marginVertical: 10 }}
            />
          )}
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
        }}
      >
        <View
          style={{
            height: 44,
            width: width / 2 - 60,
            backgroundColor: Constant.orderBackground,
            flexDirection: "row",
            padding: 5,
          }}
        >
          <Text style={{ fontSize: 12 }}>{label}</Text>
          <TextInput
            value={label === "Урьдчилгаа" ? data.uridchilgaa : data.belen}
            onChangeText={(t) =>
              label === "Урьдчилгаа"
                ? setData({ ...data, uridchilgaa: t })
                : setData({ ...data, belen: t })
            }
          ></TextInput>
        </View>
        {label === "Урьдчилгаа" ? (
          <>
            <Checkbox
              color={Constant.primaryColor}
              iconColor={Constant.whiteColor}
              value={data.urid === "1" ? check : null}
              label="Данс"
              onValueChange={() => dans()}
              borderRadius={5}
              size={24}
              style={{ marginVertical: 10 }}
            />
            <Checkbox
              color={Constant.primaryColor}
              iconColor={Constant.whiteColor}
              label="Пос"
              value={data.urid === "2" ? check : null}
              onValueChange={() => pos()}
              borderRadius={5}
              size={24}
              style={{ marginVertical: 10 }}
            />
            <Checkbox
              color={Constant.primaryColor}
              iconColor={Constant.whiteColor}
              label="Бэлэн"
              value={data.urid === "3" ? check : null}
              onValueChange={() => belen()}
              borderRadius={5}
              size={24}
              style={{ marginVertical: 10 }}
            />
          </>
        ) : (
          <>
            <Checkbox
              color={Constant.primaryColor}
              iconColor={Constant.whiteColor}
              value={data.ready === "1" ? check : null}
              label="Данс"
              onValueChange={() => dans1()}
              borderRadius={5}
              size={24}
              style={{ marginVertical: 10 }}
            />
            <Checkbox
              color={Constant.primaryColor}
              iconColor={Constant.whiteColor}
              label="Пос"
              value={data.ready === "2" ? check : null}
              onValueChange={() => pos1()}
              borderRadius={5}
              size={24}
              style={{ marginVertical: 10 }}
            />
            <Checkbox
              color={Constant.primaryColor}
              iconColor={Constant.whiteColor}
              label="Бэлэн"
              value={data.ready === "3" ? check : null}
              onValueChange={() => belen1()}
              borderRadius={5}
              size={24}
              style={{ marginVertical: 10 }}
            />
          </>
        )}
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Constant.whiteColor }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={{ marginHorizontal: 20, marginTop: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={{ marginBottom: 10, color: Constant.gray90Color }}>
            Үндсэн мэдээлэл
          </Text>
          {info("Нэр", "Утас")}
          <View
            style={{
              height: 44,
              width: width / 2 - 30,
              backgroundColor: Constant.orderBackground,
              justifyContent: "center",
              padding: 5,
              marginVertical: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setDatePickerVisibility(!isDatePickerVisible);
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text>{data.date}</Text>
              <Feather name="calendar" size={20} />
            </TouchableOpacity>

            {/* <DatePicker
              isVisible={isDatePickerVisible}
              mode={"single"}
              onCancel={hideDatePicker}
              onConfirm={handleConfirm}
            /> */}
          </View>

          <Text style={{ marginBottom: 10, color: Constant.gray90Color }}>
            Биеийн хэмжээ
          </Text>
          {info("Биеийн өндөр", "Хөхний хоорондын зай")}
          {info("Биеийн жин", "Мөрний өргөн")}
          {info("Цээжний тойрог", "Мөр хоорондын зай")}
          {info("Өгзөгний тойрог", "Ханцуйн урт")}
          {info("Энгэрийн тойрог", "Бугалагны тойрог")}
          {info("Энгэрийн өргөн", "Бугуйн тойрог")}
          {info("Энгэрийн өндөр", "Энгэрийн хүзүүний тойрог")}
          {info("Арын өргөн", "Захны өндөр")}
          {info("Арын өндөр", "Эдлэлийн урт")}
          {info("Хөхний өндөр", "Бүсэлхийн тойрог")}
          <Text style={{ marginBottom: 10, color: Constant.gray90Color }}>
            Бусад
          </Text>
          {other("Үндсэн материал")}
          {other("Эмжээр")}
          {other("Хавчаар")}
          {other("Товч шилбэ")}
          {other("Бүс")}
          {other("Хатгамал")}
          {other("Чимэглэл")}
          {other("Бусад")}
          <Text style={{ marginBottom: 10, color: Constant.gray90Color }}>
            Төлбөрийн мэдээлэл
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {payment("НӨАТ-гүй дүн")}
            {payment("НӨАТ-тэй дүн")}
          </View>
          {tulult("Урьдчилгаа")}
          {tulult("Бэлэн")}
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
export default OrderAddScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Constant.primaryColor,
    flex: 1,
  },
});
