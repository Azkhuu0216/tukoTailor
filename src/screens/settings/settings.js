import React, { useState, useContext, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  FlatList,
  Modal,
  Switch,
} from "react-native";
import * as Constant from "../../styles/globalStyles";
import MainHeader from "../../components/MainHeader";
import MultiSelect from "react-native-multiple-select";
import * as CONSTANT from "../../styles/local";
import FormInput from "../../components/FormInput";
import FormButton from "../../components/FormButton";
import { windowHeight, windowWidth } from "../../utils/Dimentions";
import AntIcon from "react-native-vector-icons/AntDesign";
// import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "../../provider/AuthProvider.ios";
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
} from "react-native-popup-dialog";
import Entypo from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart";

const settings = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const [currency, setcurrency] = useState([]);
  const [showcurrency, setShowcurrency] = useState("");

  const [currencySymbol, setcurrencySymbol] = useState("");
  const [product, setProduct] = useState("");
  const [email, setEmail] = useState("");
  const [headingInitial, setHeadingInitial] = useState("");
  const [headingProcessing, setHeadingProcessing] = useState("");
  const [headingComplete, setHeadingComplete] = useState("");
  const [headingCancel, setHeadingCancel] = useState("");
  const [bodyProcessing, setBodyProcessing] = useState("");
  const [bodyComplete, setBodyComplete] = useState("");
  const [bodyCancel, setBodyCancel] = useState("");
  const [bodyPlacedOrder, setBodyPlacedOrder] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [generalSettingArray, setgeneralSettingArray] = useState([]);
  const [email_initialSettingArray, setemail_initialSettingArray] = useState(
    []
  );
  const [
    processing_order_emailSettingArray,
    setprocessing_order_emailSettingArray,
  ] = useState([]);
  const [
    completed_order_emaildSettingArray,
    setcompleted_order_emaildSettingArray,
  ] = useState([]);
  const [cancel_order_emailSettingArray, setcancel_order_emailSettingArray] =
    useState([]);
  const [api_key, setapi_key] = useState("");
  const [logo, setLogo] = useState("");
  const [dialoigeVisible, setDialoigeVisible] = useState(false);
  const [displayCompleteTemplate, setDisplayCompleteTemplate] = useState(false);
  const [displayProcessingTemplate, setDisplayProcessingTemplate] =
    useState(false);
  const [displayCancelTemplate, setDisplayCancelTemplate] = useState(false);
  const [displayOrderTemplate, setDisplayOrdertemplate] = useState(false);
  const [displayGeneralsettings, setDisplayGeneralsettings] = useState(false);
  const [activeTab, setActiveTab] = useState("email");
  const [isVisible, setIsVisible] = useState(false);
  const [showLanguage, setShowLanguage] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabledMode, setIsEnabledMode] = useState(false);
  const [currencyCode, setcurrencyCode] = useState("");
  const [languageArray, setLanguageArray] = useState([
    {
      name: "English",
      slug: "en",
    },
    {
      name: "Korean",
      slug: "ko",
    },
    {
      name: "Greek",
      slug: "el",
    },
    {
      name: "Turkish",
      slug: "tr",
    },
    {
      name: "French",
      slug: "fr",
    },
  ]);

  const [currencyCategories, setcurrencyeCategories] = useState([
    {
      symbol: "$",
      name: "US Dollar",
      symbol_native: "$",
      decimal_digits: 2,
      rounding: 0,
      code: "USD",
      name_plural: "US dollars",
    },
    {
      symbol: "CA$",
      name: "Canadian Dollar",
      symbol_native: "$",
      decimal_digits: 2,
      rounding: 0,
      code: "CAD",
      name_plural: "Canadian dollars",
    },
    {
      symbol: "€",
      name: "Euro",
      symbol_native: "€",
      decimal_digits: 2,
      rounding: 0,
      code: "EUR",
      name_plural: "euros",
    },
    {
      symbol: "AED",
      name: "United Arab Emirates Dirham",
      symbol_native: "د.إ.‏",
      decimal_digits: 2,
      rounding: 0,
      code: "AED",
      name_plural: "UAE dirhams",
    },
    {
      symbol: "Af",
      name: "Afghan Afghani",
      symbol_native: "؋",
      decimal_digits: 0,
      rounding: 0,
      code: "AFN",
      name_plural: "Afghan Afghanis",
    },
    {
      symbol: "ALL",
      name: "Albanian Lek",
      symbol_native: "Lek",
      decimal_digits: 0,
      rounding: 0,
      code: "ALL",
      name_plural: "Albanian lekë",
    },
    {
      symbol: "AMD",
      name: "Armenian Dram",
      symbol_native: "դր.",
      decimal_digits: 0,
      rounding: 0,
      code: "AMD",
      name_plural: "Armenian drams",
    },
    {
      symbol: "AR$",
      name: "Argentine Peso",
      symbol_native: "$",
      decimal_digits: 2,
      rounding: 0,
      code: "ARS",
      name_plural: "Argentine pesos",
    },
    {
      symbol: "AU$",
      name: "Australian Dollar",
      symbol_native: "$",
      decimal_digits: 2,
      rounding: 0,
      code: "AUD",
      name_plural: "Australian dollars",
    },
    {
      symbol: "man.",
      name: "Azerbaijani Manat",
      symbol_native: "ман.",
      decimal_digits: 2,
      rounding: 0,
      code: "AZN",
      name_plural: "Azerbaijani manats",
    },
    {
      symbol: "KM",
      name: "Bosnia-Herzegovina Convertible Mark",
      symbol_native: "KM",
      decimal_digits: 2,
      rounding: 0,
      code: "BAM",
      name_plural: "Bosnia-Herzegovina convertible marks",
    },
    {
      symbol: "Tk",
      name: "Bangladeshi Taka",
      symbol_native: "৳",
      decimal_digits: 2,
      rounding: 0,
      code: "BDT",
      name_plural: "Bangladeshi takas",
    },
    {
      symbol: "BGN",
      name: "Bulgarian Lev",
      symbol_native: "лв.",
      decimal_digits: 2,
      rounding: 0,
      code: "BGN",
      name_plural: "Bulgarian leva",
    },
    {
      symbol: "BD",
      name: "Bahraini Dinar",
      symbol_native: "د.ب.‏",
      decimal_digits: 3,
      rounding: 0,
      code: "BHD",
      name_plural: "Bahraini dinars",
    },
    {
      symbol: "FBu",
      name: "Burundian Franc",
      symbol_native: "FBu",
      decimal_digits: 0,
      rounding: 0,
      code: "BIF",
      name_plural: "Burundian francs",
    },
    {
      symbol: "BN$",
      name: "Brunei Dollar",
      symbol_native: "$",
      decimal_digits: 2,
      rounding: 0,
      code: "BND",
      name_plural: "Brunei dollars",
    },
    {
      symbol: "Bs",
      name: "Bolivian Boliviano",
      symbol_native: "Bs",
      decimal_digits: 2,
      rounding: 0,
      code: "BOB",
      name_plural: "Bolivian bolivianos",
    },
    {
      symbol: "R$",
      name: "Brazilian Real",
      symbol_native: "R$",
      decimal_digits: 2,
      rounding: 0,
      code: "BRL",
      name_plural: "Brazilian reals",
    },
    {
      symbol: "BWP",
      name: "Botswanan Pula",
      symbol_native: "P",
      decimal_digits: 2,
      rounding: 0,
      code: "BWP",
      name_plural: "Botswanan pulas",
    },
    {
      symbol: "Br",
      name: "Belarusian Ruble",
      symbol_native: "руб.",
      decimal_digits: 2,
      rounding: 0,
      code: "BYN",
      name_plural: "Belarusian rubles",
    },
    {
      symbol: "BZ$",
      name: "Belize Dollar",
      symbol_native: "$",
      decimal_digits: 2,
      rounding: 0,
      code: "BZD",
      name_plural: "Belize dollars",
    },
    {
      symbol: "CDF",
      name: "Congolese Franc",
      symbol_native: "FrCD",
      decimal_digits: 2,
      rounding: 0,
      code: "CDF",
      name_plural: "Congolese francs",
    },
    {
      symbol: "CHF",
      name: "Swiss Franc",
      symbol_native: "CHF",
      decimal_digits: 2,
      rounding: 0.05,
      code: "CHF",
      name_plural: "Swiss francs",
    },
    {
      symbol: "CL$",
      name: "Chilean Peso",
      symbol_native: "$",
      decimal_digits: 0,
      rounding: 0,
      code: "CLP",
      name_plural: "Chilean pesos",
    },
    {
      symbol: "CN¥",
      name: "Chinese Yuan",
      symbol_native: "CN¥",
      decimal_digits: 2,
      rounding: 0,
      code: "CNY",
      name_plural: "Chinese yuan",
    },
    {
      symbol: "CO$",
      name: "Colombian Peso",
      symbol_native: "$",
      decimal_digits: 0,
      rounding: 0,
      code: "COP",
      name_plural: "Colombian pesos",
    },
    {
      symbol: "₡",
      name: "Costa Rican Colón",
      symbol_native: "₡",
      decimal_digits: 0,
      rounding: 0,
      code: "CRC",
      name_plural: "Costa Rican colóns",
    },
    {
      symbol: "CV$",
      name: "Cape Verdean Escudo",
      symbol_native: "CV$",
      decimal_digits: 2,
      rounding: 0,
      code: "CVE",
      name_plural: "Cape Verdean escudos",
    },
    {
      symbol: "Kč",
      name: "Czech Republic Koruna",
      symbol_native: "Kč",
      decimal_digits: 2,
      rounding: 0,
      code: "CZK",
      name_plural: "Czech Republic korunas",
    },
    {
      symbol: "Fdj",
      name: "Djiboutian Franc",
      symbol_native: "Fdj",
      decimal_digits: 0,
      rounding: 0,
      code: "DJF",
      name_plural: "Djiboutian francs",
    },
    {
      symbol: "Dkr",
      name: "Danish Krone",
      symbol_native: "kr",
      decimal_digits: 2,
      rounding: 0,
      code: "DKK",
      name_plural: "Danish kroner",
    },
    {
      symbol: "RD$",
      name: "Dominican Peso",
      symbol_native: "RD$",
      decimal_digits: 2,
      rounding: 0,
      code: "DOP",
      name_plural: "Dominican pesos",
    },
    {
      symbol: "DA",
      name: "Algerian Dinar",
      symbol_native: "د.ج.‏",
      decimal_digits: 2,
      rounding: 0,
      code: "DZD",
      name_plural: "Algerian dinars",
    },
    {
      symbol: "Ekr",
      name: "Estonian Kroon",
      symbol_native: "kr",
      decimal_digits: 2,
      rounding: 0,
      code: "EEK",
      name_plural: "Estonian kroons",
    },
    {
      symbol: "EGP",
      name: "Egyptian Pound",
      symbol_native: "ج.م.‏",
      decimal_digits: 2,
      rounding: 0,
      code: "EGP",
      name_plural: "Egyptian pounds",
    },
    {
      symbol: "Nfk",
      name: "Eritrean Nakfa",
      symbol_native: "Nfk",
      decimal_digits: 2,
      rounding: 0,
      code: "ERN",
      name_plural: "Eritrean nakfas",
    },
    {
      symbol: "Br",
      name: "Ethiopian Birr",
      symbol_native: "Br",
      decimal_digits: 2,
      rounding: 0,
      code: "ETB",
      name_plural: "Ethiopian birrs",
    },
    {
      symbol: "£",
      name: "British Pound Sterling",
      symbol_native: "£",
      decimal_digits: 2,
      rounding: 0,
      code: "GBP",
      name_plural: "British pounds sterling",
    },
    {
      symbol: "GEL",
      name: "Georgian Lari",
      symbol_native: "GEL",
      decimal_digits: 2,
      rounding: 0,
      code: "GEL",
      name_plural: "Georgian laris",
    },
    {
      symbol: "GH₵",
      name: "Ghanaian Cedi",
      symbol_native: "GH₵",
      decimal_digits: 2,
      rounding: 0,
      code: "GHS",
      name_plural: "Ghanaian cedis",
    },
    {
      symbol: "FG",
      name: "Guinean Franc",
      symbol_native: "FG",
      decimal_digits: 0,
      rounding: 0,
      code: "GNF",
      name_plural: "Guinean francs",
    },
    {
      symbol: "GTQ",
      name: "Guatemalan Quetzal",
      symbol_native: "Q",
      decimal_digits: 2,
      rounding: 0,
      code: "GTQ",
      name_plural: "Guatemalan quetzals",
    },
    {
      symbol: "HK$",
      name: "Hong Kong Dollar",
      symbol_native: "$",
      decimal_digits: 2,
      rounding: 0,
      code: "HKD",
      name_plural: "Hong Kong dollars",
    },
    {
      symbol: "HNL",
      name: "Honduran Lempira",
      symbol_native: "L",
      decimal_digits: 2,
      rounding: 0,
      code: "HNL",
      name_plural: "Honduran lempiras",
    },
    {
      symbol: "kn",
      name: "Croatian Kuna",
      symbol_native: "kn",
      decimal_digits: 2,
      rounding: 0,
      code: "HRK",
      name_plural: "Croatian kunas",
    },
    {
      symbol: "Ft",
      name: "Hungarian Forint",
      symbol_native: "Ft",
      decimal_digits: 0,
      rounding: 0,
      code: "HUF",
      name_plural: "Hungarian forints",
    },
    {
      symbol: "Rp",
      name: "Indonesian Rupiah",
      symbol_native: "Rp",
      decimal_digits: 0,
      rounding: 0,
      code: "IDR",
      name_plural: "Indonesian rupiahs",
    },
    {
      symbol: "₪",
      name: "Israeli New Sheqel",
      symbol_native: "₪",
      decimal_digits: 2,
      rounding: 0,
      code: "ILS",
      name_plural: "Israeli new sheqels",
    },
    {
      symbol: "Rs",
      name: "Indian Rupee",
      symbol_native: "টকা",
      decimal_digits: 2,
      rounding: 0,
      code: "INR",
      name_plural: "Indian rupees",
    },
    {
      symbol: "IQD",
      name: "Iraqi Dinar",
      symbol_native: "د.ع.‏",
      decimal_digits: 0,
      rounding: 0,
      code: "IQD",
      name_plural: "Iraqi dinars",
    },
    {
      symbol: "IRR",
      name: "Iranian Rial",
      symbol_native: "﷼",
      decimal_digits: 0,
      rounding: 0,
      code: "IRR",
      name_plural: "Iranian rials",
    },
    {
      symbol: "Ikr",
      name: "Icelandic Króna",
      symbol_native: "kr",
      decimal_digits: 0,
      rounding: 0,
      code: "ISK",
      name_plural: "Icelandic krónur",
    },
    {
      symbol: "J$",
      name: "Jamaican Dollar",
      symbol_native: "$",
      decimal_digits: 2,
      rounding: 0,
      code: "JMD",
      name_plural: "Jamaican dollars",
    },
    {
      symbol: "JD",
      name: "Jordanian Dinar",
      symbol_native: "د.أ.‏",
      decimal_digits: 3,
      rounding: 0,
      code: "JOD",
      name_plural: "Jordanian dinars",
    },
    {
      symbol: "¥",
      name: "Japanese Yen",
      symbol_native: "￥",
      decimal_digits: 0,
      rounding: 0,
      code: "JPY",
      name_plural: "Japanese yen",
    },
    {
      symbol: "Ksh",
      name: "Kenyan Shilling",
      symbol_native: "Ksh",
      decimal_digits: 2,
      rounding: 0,
      code: "KES",
      name_plural: "Kenyan shillings",
    },
    {
      symbol: "KHR",
      name: "Cambodian Riel",
      symbol_native: "៛",
      decimal_digits: 2,
      rounding: 0,
      code: "KHR",
      name_plural: "Cambodian riels",
    },
    {
      symbol: "CF",
      name: "Comorian Franc",
      symbol_native: "FC",
      decimal_digits: 0,
      rounding: 0,
      code: "KMF",
      name_plural: "Comorian francs",
    },
    {
      symbol: "₩",
      name: "South Korean Won",
      symbol_native: "₩",
      decimal_digits: 0,
      rounding: 0,
      code: "KRW",
      name_plural: "South Korean won",
    },
    {
      symbol: "KD",
      name: "Kuwaiti Dinar",
      symbol_native: "د.ك.‏",
      decimal_digits: 3,
      rounding: 0,
      code: "KWD",
      name_plural: "Kuwaiti dinars",
    },
    {
      symbol: "KZT",
      name: "Kazakhstani Tenge",
      symbol_native: "тңг.",
      decimal_digits: 2,
      rounding: 0,
      code: "KZT",
      name_plural: "Kazakhstani tenges",
    },
    {
      symbol: "L.L.",
      name: "Lebanese Pound",
      symbol_native: "ل.ل.‏",
      decimal_digits: 0,
      rounding: 0,
      code: "LBP",
      name_plural: "Lebanese pounds",
    },
    {
      symbol: "SLRs",
      name: "Sri Lankan Rupee",
      symbol_native: "SL Re",
      decimal_digits: 2,
      rounding: 0,
      code: "LKR",
      name_plural: "Sri Lankan rupees",
    },
    {
      symbol: "Lt",
      name: "Lithuanian Litas",
      symbol_native: "Lt",
      decimal_digits: 2,
      rounding: 0,
      code: "LTL",
      name_plural: "Lithuanian litai",
    },
    {
      symbol: "Ls",
      name: "Latvian Lats",
      symbol_native: "Ls",
      decimal_digits: 2,
      rounding: 0,
      code: "LVL",
      name_plural: "Latvian lati",
    },
    {
      symbol: "LD",
      name: "Libyan Dinar",
      symbol_native: "د.ل.‏",
      decimal_digits: 3,
      rounding: 0,
      code: "LYD",
      name_plural: "Libyan dinars",
    },
    {
      symbol: "MAD",
      name: "Moroccan Dirham",
      symbol_native: "د.م.‏",
      decimal_digits: 2,
      rounding: 0,
      code: "MAD",
      name_plural: "Moroccan dirhams",
    },
    {
      symbol: "MDL",
      name: "Moldovan Leu",
      symbol_native: "MDL",
      decimal_digits: 2,
      rounding: 0,
      code: "MDL",
      name_plural: "Moldovan lei",
    },
    {
      symbol: "MGA",
      name: "Malagasy Ariary",
      symbol_native: "MGA",
      decimal_digits: 0,
      rounding: 0,
      code: "MGA",
      name_plural: "Malagasy Ariaries",
    },
    {
      symbol: "MKD",
      name: "Macedonian Denar",
      symbol_native: "MKD",
      decimal_digits: 2,
      rounding: 0,
      code: "MKD",
      name_plural: "Macedonian denari",
    },
    {
      symbol: "MMK",
      name: "Myanma Kyat",
      symbol_native: "K",
      decimal_digits: 0,
      rounding: 0,
      code: "MMK",
      name_plural: "Myanma kyats",
    },
    {
      symbol: "MOP$",
      name: "Macanese Pataca",
      symbol_native: "MOP$",
      decimal_digits: 2,
      rounding: 0,
      code: "MOP",
      name_plural: "Macanese patacas",
    },
    {
      symbol: "MURs",
      name: "Mauritian Rupee",
      symbol_native: "MURs",
      decimal_digits: 0,
      rounding: 0,
      code: "MUR",
      name_plural: "Mauritian rupees",
    },
    {
      symbol: "MX$",
      name: "Mexican Peso",
      symbol_native: "$",
      decimal_digits: 2,
      rounding: 0,
      code: "MXN",
      name_plural: "Mexican pesos",
    },
    {
      symbol: "RM",
      name: "Malaysian Ringgit",
      symbol_native: "RM",
      decimal_digits: 2,
      rounding: 0,
      code: "MYR",
      name_plural: "Malaysian ringgits",
    },
    {
      symbol: "MTn",
      name: "Mozambican Metical",
      symbol_native: "MTn",
      decimal_digits: 2,
      rounding: 0,
      code: "MZN",
      name_plural: "Mozambican meticals",
    },
    {
      symbol: "N$",
      name: "Namibian Dollar",
      symbol_native: "N$",
      decimal_digits: 2,
      rounding: 0,
      code: "NAD",
      name_plural: "Namibian dollars",
    },
    {
      symbol: "₦",
      name: "Nigerian Naira",
      symbol_native: "₦",
      decimal_digits: 2,
      rounding: 0,
      code: "NGN",
      name_plural: "Nigerian nairas",
    },
    {
      symbol: "C$",
      name: "Nicaraguan Córdoba",
      symbol_native: "C$",
      decimal_digits: 2,
      rounding: 0,
      code: "NIO",
      name_plural: "Nicaraguan córdobas",
    },
    {
      symbol: "Nkr",
      name: "Norwegian Krone",
      symbol_native: "kr",
      decimal_digits: 2,
      rounding: 0,
      code: "NOK",
      name_plural: "Norwegian kroner",
    },
    {
      symbol: "NPRs",
      name: "Nepalese Rupee",
      symbol_native: "नेरू",
      decimal_digits: 2,
      rounding: 0,
      code: "NPR",
      name_plural: "Nepalese rupees",
    },
    {
      symbol: "NZ$",
      name: "New Zealand Dollar",
      symbol_native: "$",
      decimal_digits: 2,
      rounding: 0,
      code: "NZD",
      name_plural: "New Zealand dollars",
    },
    {
      symbol: "OMR",
      name: "Omani Rial",
      symbol_native: "ر.ع.‏",
      decimal_digits: 3,
      rounding: 0,
      code: "OMR",
      name_plural: "Omani rials",
    },
    {
      symbol: "B/.",
      name: "Panamanian Balboa",
      symbol_native: "B/.",
      decimal_digits: 2,
      rounding: 0,
      code: "PAB",
      name_plural: "Panamanian balboas",
    },
    {
      symbol: "S/.",
      name: "Peruvian Nuevo Sol",
      symbol_native: "S/.",
      decimal_digits: 2,
      rounding: 0,
      code: "PEN",
      name_plural: "Peruvian nuevos soles",
    },
    {
      symbol: "₱",
      name: "Philippine Peso",
      symbol_native: "₱",
      decimal_digits: 2,
      rounding: 0,
      code: "PHP",
      name_plural: "Philippine pesos",
    },
    {
      symbol: "PKRs",
      name: "Pakistani Rupee",
      symbol_native: "₨",
      decimal_digits: 0,
      rounding: 0,
      code: "PKR",
      name_plural: "Pakistani rupees",
    },
    {
      symbol: "zł",
      name: "Polish Zloty",
      symbol_native: "zł",
      decimal_digits: 2,
      rounding: 0,
      code: "PLN",
      name_plural: "Polish zlotys",
    },
    {
      symbol: "₲",
      name: "Paraguayan Guarani",
      symbol_native: "₲",
      decimal_digits: 0,
      rounding: 0,
      code: "PYG",
      name_plural: "Paraguayan guaranis",
    },
    {
      symbol: "QR",
      name: "Qatari Rial",
      symbol_native: "ر.ق.‏",
      decimal_digits: 2,
      rounding: 0,
      code: "QAR",
      name_plural: "Qatari rials",
    },
    {
      symbol: "RON",
      name: "Romanian Leu",
      symbol_native: "RON",
      decimal_digits: 2,
      rounding: 0,
      code: "RON",
      name_plural: "Romanian lei",
    },
    {
      symbol: "din.",
      name: "Serbian Dinar",
      symbol_native: "дин.",
      decimal_digits: 0,
      rounding: 0,
      code: "RSD",
      name_plural: "Serbian dinars",
    },
    {
      symbol: "RUB",
      name: "Russian Ruble",
      symbol_native: "₽.",
      decimal_digits: 2,
      rounding: 0,
      code: "RUB",
      name_plural: "Russian rubles",
    },
    {
      symbol: "RWF",
      name: "Rwandan Franc",
      symbol_native: "FR",
      decimal_digits: 0,
      rounding: 0,
      code: "RWF",
      name_plural: "Rwandan francs",
    },
    {
      symbol: "SR",
      name: "Saudi Riyal",
      symbol_native: "ر.س.‏",
      decimal_digits: 2,
      rounding: 0,
      code: "SAR",
      name_plural: "Saudi riyals",
    },
    {
      symbol: "SDG",
      name: "Sudanese Pound",
      symbol_native: "SDG",
      decimal_digits: 2,
      rounding: 0,
      code: "SDG",
      name_plural: "Sudanese pounds",
    },
    {
      symbol: "Skr",
      name: "Swedish Krona",
      symbol_native: "kr",
      decimal_digits: 2,
      rounding: 0,
      code: "SEK",
      name_plural: "Swedish kronor",
    },
    {
      symbol: "S$",
      name: "Singapore Dollar",
      symbol_native: "$",
      decimal_digits: 2,
      rounding: 0,
      code: "SGD",
      name_plural: "Singapore dollars",
    },
    {
      symbol: "Ssh",
      name: "Somali Shilling",
      symbol_native: "Ssh",
      decimal_digits: 0,
      rounding: 0,
      code: "SOS",
      name_plural: "Somali shillings",
    },
    {
      symbol: "SY£",
      name: "Syrian Pound",
      symbol_native: "ل.س.‏",
      decimal_digits: 0,
      rounding: 0,
      code: "SYP",
      name_plural: "Syrian pounds",
    },
    {
      symbol: "฿",
      name: "Thai Baht",
      symbol_native: "฿",
      decimal_digits: 2,
      rounding: 0,
      code: "THB",
      name_plural: "Thai baht",
    },
    {
      symbol: "DT",
      name: "Tunisian Dinar",
      symbol_native: "د.ت.‏",
      decimal_digits: 3,
      rounding: 0,
      code: "TND",
      name_plural: "Tunisian dinars",
    },
    {
      symbol: "T$",
      name: "Tongan Paʻanga",
      symbol_native: "T$",
      decimal_digits: 2,
      rounding: 0,
      code: "TOP",
      name_plural: "Tongan paʻanga",
    },
    {
      symbol: "TL",
      name: "Turkish Lira",
      symbol_native: "TL",
      decimal_digits: 2,
      rounding: 0,
      code: "TRY",
      name_plural: "Turkish Lira",
    },
    {
      symbol: "TT$",
      name: "Trinidad and Tobago Dollar",
      symbol_native: "$",
      decimal_digits: 2,
      rounding: 0,
      code: "TTD",
      name_plural: "Trinidad and Tobago dollars",
    },
    {
      symbol: "NT$",
      name: "New Taiwan Dollar",
      symbol_native: "NT$",
      decimal_digits: 2,
      rounding: 0,
      code: "TWD",
      name_plural: "New Taiwan dollars",
    },
    {
      symbol: "TSh",
      name: "Tanzanian Shilling",
      symbol_native: "TSh",
      decimal_digits: 0,
      rounding: 0,
      code: "TZS",
      name_plural: "Tanzanian shillings",
    },
    {
      symbol: "₴",
      name: "Ukrainian Hryvnia",
      symbol_native: "₴",
      decimal_digits: 2,
      rounding: 0,
      code: "UAH",
      name_plural: "Ukrainian hryvnias",
    },
    {
      symbol: "USh",
      name: "Ugandan Shilling",
      symbol_native: "USh",
      decimal_digits: 0,
      rounding: 0,
      code: "UGX",
      name_plural: "Ugandan shillings",
    },
    {
      symbol: "$U",
      name: "Uruguayan Peso",
      symbol_native: "$",
      decimal_digits: 2,
      rounding: 0,
      code: "UYU",
      name_plural: "Uruguayan pesos",
    },
    {
      symbol: "UZS",
      name: "Uzbekistan Som",
      symbol_native: "UZS",
      decimal_digits: 0,
      rounding: 0,
      code: "UZS",
      name_plural: "Uzbekistan som",
    },
    {
      symbol: "Bs.F.",
      name: "Venezuelan Bolívar",
      symbol_native: "Bs.F.",
      decimal_digits: 2,
      rounding: 0,
      code: "VEF",
      name_plural: "Venezuelan bolívars",
    },
    {
      symbol: "₫",
      name: "Vietnamese Dong",
      symbol_native: "₫",
      decimal_digits: 0,
      rounding: 0,
      code: "VND",
      name_plural: "Vietnamese dong",
    },
    {
      symbol: "FCFA",
      name: "CFA Franc BEAC",
      symbol_native: "FCFA",
      decimal_digits: 0,
      rounding: 0,
      code: "XAF",
      name_plural: "CFA francs BEAC",
    },
    {
      symbol: "CFA",
      name: "CFA Franc BCEAO",
      symbol_native: "CFA",
      decimal_digits: 0,
      rounding: 0,
      code: "XOF",
      name_plural: "CFA francs BCEAO",
    },
    {
      symbol: "YR",
      name: "Yemeni Rial",
      symbol_native: "ر.ي.‏",
      decimal_digits: 0,
      rounding: 0,
      code: "YER",
      name_plural: "Yemeni rials",
    },
    {
      symbol: "R",
      name: "South African Rand",
      symbol_native: "R",
      decimal_digits: 2,
      rounding: 0,
      code: "ZAR",
      name_plural: "South African rand",
    },
    {
      symbol: "ZK",
      name: "Zambian Kwacha",
      symbol_native: "ZK",
      decimal_digits: 0,
      rounding: 0,
      code: "ZMK",
      name_plural: "Zambian kwachas",
    },
    {
      symbol: "ZWL$",
      name: "Zimbabwean Dollar",
      symbol_native: "ZWL$",
      decimal_digits: 0,
      rounding: 0,
      code: "ZWL",
      name_plural: "Zimbabwean Dollar",
    },
  ]);
  useEffect(() => {
    if (currency != "") {
      savecurrencySetting();
    }
    getEmailGridData();
    getcurrencyData();
    getLanguage();
    getPaymentSetting();
    getRestrictModeSetting();
  }, [currencySymbol, languageArray]);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    firestore()
      .collection("settings")
      .doc("payment_types")
      .set({
        payment_type: isEnabled == true ? false : true,
      })
      .then(() => {
        Alert.alert(CONSTANT.Submit, "Payment option updated Successfuly");
      });
  };
  const toggleSwitchMode = () => {
    setIsEnabledMode((previousState) => !previousState);
    firestore()
      .collection("settings")
      .doc("restrict_orders")
      .set({
        options: isEnabledMode == true ? false : true,
        message:
          "We are not accepting orders at the moment, because of order stack is full",
      })
      .then(() => {
        Alert.alert(CONSTANT.Submit, "Restriction Mode updated Successfuly");
      });
  };

  const getEmailGridData = async () => {
    try {
      await firestore()
        .collection("settings")
        .get()
        .then((querySnapshot) => {
          if (querySnapshot != null) {
            querySnapshot.forEach((documentSnapshot) => {
              if (documentSnapshot.id == "general") {
                setapi_key(documentSnapshot.data().settings[0].api_key);
                setLogo(documentSnapshot.data().settings[0].logo);
                setEmail(documentSnapshot.data().settings[0].email_address);
                setProduct(documentSnapshot.data().settings[0].product_title);
              } else if (documentSnapshot.id == "processing_order_email") {
                setHeadingProcessing(
                  documentSnapshot.data().settings[0].header
                );
                setBodyProcessing(documentSnapshot.data().settings[0].content);
              } else if (documentSnapshot.id == "cancel_order_email") {
                setHeadingCancel(documentSnapshot.data().settings[0].header);
                setBodyCancel(documentSnapshot.data().settings[0].content);
              } else if (documentSnapshot.id == "completed_order_email") {
                setHeadingComplete(documentSnapshot.data().settings[0].header);
                setBodyComplete(documentSnapshot.data().settings[0].content);
              } else if (documentSnapshot.id == "email_initial") {
                setHeadingInitial(documentSnapshot.data().settings[0].header);
                setBodyPlacedOrder(documentSnapshot.data().settings[0].content);
              }
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const choosePictureFromGallery = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 1200,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === "ios" ? image.sourceURL : image.path;
      setImage(imageUri);
      console.log("My image", image);
    });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);

    // Add timestamp to File Name
    const extension = filename.split(".").pop();
    const name = filename.split(".").slice(0, -1).join(".");
    filename = name + Date.now() + "." + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(
      `Setting SendGrid Image/${user.uid}/${filename}`
    );
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
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
      console.log(e);
      return null;
    }
  };
  const getcurrencySetting = () => {
    if (currency != "") {
      for (var i = 0; i < currencyCategories.length; i++) {
        if (currency == currencyCategories[i].symbol) {
          setcurrencySymbol(currencyCategories[i].symbol_native);
          setcurrencyCode(currencyCategories[i].code);
        }
      }
    } else {
      Alert.alert(CONSTANT.Oops, "Must Select the currency");
    }
  };
  const savecurrencySetting = () => {
    firestore()
      .collection("settings")
      .doc("currency")
      .set({
        currency: currencySymbol,
        code: currencyCode.toLowerCase(),
      })
      .then(() => {
        Alert.alert(CONSTANT.Submit, "currency updated Successfuly");
        getAddedCategoriesData();
      });
  };
  const getPaymentSetting = async () => {
    try {
      await firestore()
        .collection("settings")
        .get()
        .then((querySnapshot) => {
          if (querySnapshot != null) {
            querySnapshot.forEach((documentSnapshot) => {
              if (documentSnapshot.id == "payment_types") {
                setIsEnabled(documentSnapshot.data().payment_type);
              }
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  const getRestrictModeSetting = async () => {
    try {
      await firestore()
        .collection("settings")
        .get()
        .then((querySnapshot) => {
          if (querySnapshot != null) {
            querySnapshot.forEach((documentSnapshot) => {
              if (documentSnapshot.id == "restrict_orders") {
                setIsEnabledMode(documentSnapshot.data().options);
              }
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getcurrencyData = async () => {
    try {
      await firestore()
        .collection("settings")
        .get()
        .then((querySnapshot) => {
          if (querySnapshot != null) {
            querySnapshot.forEach((documentSnapshot) => {
              if (documentSnapshot.id == "currency") {
                setShowcurrency(documentSnapshot.data().currency[0]);
                currency.push(documentSnapshot.data().currency[0]);
              }
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const savegeneralSetting = async () => {
    if (product != "" && email != "" && api_key != "") {
      const imageUrl = await uploadImage();
      generalSettingArray[0] = {
        logo: imageUrl == null ? logo : imageUrl,
        product_title: product,
        email_address: email,
        api_key: api_key,
      };
      firestore()
        .collection("settings")
        .doc("general")
        .set({
          settings: generalSettingArray,
        })
        .then(() => {
          Alert.alert(CONSTANT.Submit, CONSTANT.Updated);
        })
        .catch((error) => {
          console.log(CONSTANT.categoriesSomethingwrongpostfirestore, error);
        });
    } else {
      Alert.alert(CONSTANT.Oops, CONSTANT.addMeasurementPleaseaddcompletedata);
    }
  };

  const saveemail_initialSetting = async () => {
    if (headingInitial != "" && bodyPlacedOrder != "") {
      email_initialSettingArray[0] = {
        header: headingInitial,
        content: bodyPlacedOrder,
      };
      firestore()
        .collection("settings")
        .doc("email_initial")
        .set({
          settings: email_initialSettingArray,
        })
        .then(() => {
          Alert.alert(CONSTANT.Submit, CONSTANT.Updated);
        })
        .catch((error) => {
          console.log(CONSTANT.categoriesSomethingwrongpostfirestore, error);
        });
    } else {
      Alert.alert(CONSTANT.Oops, CONSTANT.addMeasurementPleaseaddcompletedata);
    }
  };

  const saveprocessing_order_emailSetting = async () => {
    if (headingProcessing != "" && bodyProcessing != "") {
      processing_order_emailSettingArray[0] = {
        header: headingProcessing,
        content: bodyProcessing,
      };

      firestore()
        .collection("settings")
        .doc("processing_order_email")
        .set({
          settings: processing_order_emailSettingArray,
        })
        .then(() => {
          Alert.alert(CONSTANT.Submit, CONSTANT.Updated);
        })
        .catch((error) => {
          console.log(CONSTANT.categoriesSomethingwrongpostfirestore, error);
        });
    } else {
      Alert.alert(CONSTANT.Oops, CONSTANT.addMeasurementPleaseaddcompletedata);
    }
  };

  const savecompleted_order_emaildSetting = async () => {
    if (headingComplete != "" && bodyComplete != "") {
      completed_order_emaildSettingArray[0] = {
        header: headingComplete,
        content: bodyComplete,
      };

      firestore()
        .collection("settings")
        .doc("completed_order_email")
        .set({
          settings: completed_order_emaildSettingArray,
        })
        .then(() => {
          Alert.alert(CONSTANT.Submit, CONSTANT.Updated);
        })
        .catch((error) => {
          console.log(CONSTANT.categoriesSomethingwrongpostfirestore, error);
        });
    } else {
      Alert.alert(CONSTANT.Oops, CONSTANT.addMeasurementPleaseaddcompletedata);
    }
  };
  const savecancel_order_emailSetting = async () => {
    if (headingCancel != "" && bodyCancel != "") {
      cancel_order_emailSettingArray[0] = {
        header: headingCancel,
        content: bodyCancel,
      };

      firestore()
        .collection("settings")
        .doc("cancel_order_email")
        .set({
          settings: cancel_order_emailSettingArray,
        })
        .then(() => {
          Alert.alert(CONSTANT.Submit, CONSTANT.Updated);
        })
        .catch((error) => {
          console.log(CONSTANT.categoriesSomethingwrongpostfirestore, error);
        });
    } else {
      Alert.alert(CONSTANT.Oops, CONSTANT.addMeasurementPleaseaddcompletedata);
    }
  };

  const MakeDialogeBoxVisible = () => {
    setDialoigeVisible(true);
  };
  const CancleDialouge = () => {
    setDialoigeVisible(false);
  };
  const ManageLanguage = async (slug) => {
    AsyncStorage.setItem("Language", slug);
    RNRestart.Restart();
  };
  const getLanguage = async () => {
    const slug = await AsyncStorage.getItem("Language");

    if (slug == "en") {
      setShowLanguage("English");
    } else if (slug == "el") {
      setShowLanguage("Greek");
    } else if (slug == "fr") {
      setShowLanguage("French");
    } else if (slug == "tr") {
      setShowLanguage("Turkish");
    } else if (slug == "ko") {
      setShowLanguage("Korean");
    } else {
      setShowLanguage("English");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader title={CONSTANT.settingHeading} back={true} />
      <ScrollView>
        <View>
          <View
            style={{
              backgroundColor: Constant.darkBlueClor,
              marginTop: 10,
              marginHorizontal: 10,
              borderRadius: 6,
            }}
          >
            <View style={{ marginTop: 10, marginHorizontal: 10 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "800",
                  color: Constant.whiteColor,
                }}
              >
                {CONSTANT.settingcurrency}
              </Text>
            </View>
            <View style={styles.MultiSelectArea}>
              <MultiSelect
                onSelectedItemsChange={(value) => setcurrency(value)}
                uniqueKey="symbol"
                items={currencyCategories}
                selectedItems={currency}
                borderBottomWidth={0}
                single={true}
                searchInputPlaceholderText={CONSTANT.settingselectcurrency}
                selectText={CONSTANT.settingselectcurrency}
                styleListContainer={{ maxHeight: 220 }}
                styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                styleDropdownMenuSubsection={
                  styles.MultiSelectstyleDropdownMenuSubsection
                }
                styleSelectorContainer={{ marginTop: 10 }}
                onChangeInput={(text) => console.log(text)}
                displayKey="name"
                submitButtonText={CONSTANT.Submit}
              />
            </View>
            <View
              style={{
                marginBottom: 20,
                marginHorizontal: 10,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: Constant.whiteColor,
                  }}
                >
                  {CONSTANT.settingselectedcurrency}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: Constant.whiteColor,
                  }}
                >
                  {" "}
                  {showcurrency}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => getcurrencySetting()}
                style={styles.buttonContainerOne}
              >
                <Text style={styles.buttonText}>{CONSTANT.settingsave}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              backgroundColor: Constant.darkBlueClor,
              marginTop: 10,
              marginHorizontal: 10,
              borderRadius: 6,
            }}
          >
            <View style={{ marginTop: 10, marginHorizontal: 10 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: Constant.whiteColor,
                }}
              >
                {CONSTANT.settingChangeLanguage}
              </Text>
            </View>
            <View
              style={{
                marginBottom: 20,
                marginHorizontal: 10,
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: Constant.whiteColor,
                  }}
                >
                  {CONSTANT.settingselectedLanguage}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: Constant.whiteColor,
                  }}
                >
                  {" "}
                  {showLanguage}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => MakeDialogeBoxVisible()}
                style={styles.buttonContainerOne}
              >
                <Text style={styles.buttonText}>
                  {CONSTANT.settingLanguages}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              backgroundColor: Constant.darkBlueClor,
              marginTop: 10,
              marginHorizontal: 10,
              borderRadius: 6,
            }}
          >
            <View
              style={{
                marginHorizontal: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: Constant.whiteColor,
                }}
              >
                Online Payment:
              </Text>
              <Switch
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                trackColor={{
                  false: Constant.darkGrayColor,
                  true: Constant.whiteColor,
                }}
                thumbColor={
                  isEnabled ? Constant.buttonColor : Constant.whiteColor
                }
                ios_backgroundColor={Constant.darkGrayColor}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: Constant.darkBlueClor,
              marginVertical: 10,
              marginHorizontal: 10,
              borderRadius: 6,
            }}
          >
            <View
              style={{
                marginHorizontal: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: Constant.whiteColor,
                }}
              >
                Restrict Mode:
              </Text>
              <Switch
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                trackColor={{
                  false: Constant.darkGrayColor,
                  true: Constant.whiteColor,
                }}
                thumbColor={
                  isEnabledMode ? Constant.buttonColor : Constant.whiteColor
                }
                ios_backgroundColor={Constant.darkGrayColor}
                onValueChange={toggleSwitchMode}
                value={isEnabledMode}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              setDisplayGeneralsettings(!displayGeneralsettings);
              setDisplayCancelTemplate(false);
              setDisplayOrdertemplate(false);
              setDisplayProcessingTemplate(false);
              setDisplayCompleteTemplate(false);
            }}
            style={{
              backgroundColor: Constant.whiteColor,
              marginVertical: 10,
              marginHorizontal: 10,
              borderRadius: 6,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                height: 70,
                justifyContent: "space-between",
                marginLeft: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "700",
                  color: Constant.primaryColor,
                }}
              >
                {CONSTANT.settingGeneralEmailsettings}
              </Text>
              <Icon
                name="expand-more"
                size={35}
                color={Constant.primaryColor}
              />
            </View>
          </TouchableOpacity>
          {displayGeneralsettings == true && (
            <View
              style={{
                backgroundColor: Constant.whiteColor,
                marginVertical: 10,
                marginHorizontal: 10,
                borderRadius: 6,
              }}
            >
              <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                <View style={styles.inputContainer}>
                  <Text
                    style={{
                      color: Constant.primaryColor,
                      fontSize: 15,
                      fontWeight: "700",
                    }}
                  >
                    {CONSTANT.settingAddLogo}
                  </Text>
                  <View
                    style={{
                      flex: 2,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {}}
                      style={{
                        flex: 1,
                        height: 150,
                        borderRadius: 4,
                        width: 150,
                        marginRight: 10,
                        borderstyle: "dashed",
                        borderWidth: 1,
                        borderColor: Constant.darkGrayColor,
                        marginTop: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AntIcon
                        name="plus"
                        size={25}
                        color={Constant.darkGrayColor}
                      />
                    </TouchableOpacity>
                    {image == null ? (
                      <Image
                        style={{
                          height: 150,
                          flex: 1,
                          borderRadius: 4,
                          width: 150,
                          marginTop: 10,
                        }}
                        source={
                          logo != null
                            ? { uri: logo }
                            : require("../../../assets/default-img.jpg")
                        }
                      />
                    ) : (
                      <Image
                        style={{
                          height: 150,
                          flex: 1,
                          borderRadius: 4,
                          width: 150,
                          marginTop: 10,
                        }}
                        source={
                          image != null
                            ? { uri: image }
                            : require("../../../assets/default-img.jpg")
                        }
                      />
                    )}
                  </View>
                </View>
              </View>
              <View style={{ marginHorizontal: 10 }}>
                <FormInput
                  labelValue={api_key}
                  onChangeText={(key) => setapi_key(key)}
                  placeholderText={CONSTANT.settingapi_key}
                  keyboardType="email-address"
                  autoCorrect={false}
                />
              </View>
              <View style={{ marginHorizontal: 10 }}>
                <FormInput
                  labelValue={product}
                  onChangeText={(header) => setProduct(header)}
                  placeholderText={CONSTANT.settingproduct_title}
                  keyboardType="email-address"
                  autoCorrect={false}
                />
              </View>
              <View style={{ marginHorizontal: 10 }}>
                <FormInput
                  labelValue={email}
                  onChangeText={(userEmail) => setEmail(userEmail)}
                  placeholderText={CONSTANT.loginEmail}
                  keyboardType="email-address"
                  autoCorrect={false}
                />
              </View>

              <View
                style={{
                  marginBottom: 20,
                  marginHorizontal: 10,
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  onPress={() => savegeneralSetting()}
                  style={styles.buttonContainer}
                >
                  <Text style={styles.buttonText}>{CONSTANT.settingsave}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <TouchableOpacity
            onPress={() => {
              setDisplayOrdertemplate(!displayOrderTemplate);
              setDisplayCancelTemplate(false);
              setDisplayGeneralsettings(false);
              setDisplayProcessingTemplate(false);
              setDisplayCompleteTemplate(false);
            }}
            style={{
              backgroundColor: Constant.whiteColor,
              marginVertical: 10,
              marginHorizontal: 10,
              borderRadius: 6,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                height: 70,
                justifyContent: "space-between",
                marginLeft: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "700",
                  color: Constant.primaryColor,
                }}
              >
                {CONSTANT.settingOrderPlacedTemplate}
              </Text>
              <Icon
                name="expand-more"
                size={35}
                color={Constant.primaryColor}
              />
            </View>
          </TouchableOpacity>
          {displayOrderTemplate == true && (
            <View
              style={{
                backgroundColor: Constant.whiteColor,
                marginVertical: 10,
                marginHorizontal: 10,
                borderRadius: 6,
              }}
            >
              <View
                style={{
                  backgroundColor: Constant.whiteColor,
                  marginVertical: 10,
                  marginHorizontal: 10,
                  borderRadius: 6,
                  borderColor: Constant.gray80Color,
                  borderRadius: 5,
                  borderWidth: 1,
                }}
              >
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                  <Text style={{ fontWeight: "700", marginBottom: 10 }}>
                    {CONSTANT.settingDynamicparams}
                  </Text>
                  <View style={{ flexDirection: "row", flex: 3 }}>
                    <View style={{ flex: 1 }}>
                      <Text>{CONSTANT.settingParamsOne}</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                      <Text>{CONSTANT.settingParamsName}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", flex: 3 }}>
                    <View style={{ flex: 1 }}>
                      <Text>{CONSTANT.settingParamsTwo}</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                      <Text>{CONSTANT.settingParamsorder_id}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", flex: 3 }}>
                    <View style={{ flex: 1 }}>
                      <Text>{CONSTANT.settingParamsThree}</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                      <Text>{CONSTANT.settingParamsCategory}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ marginHorizontal: 10 }}>
                <FormInput
                  labelValue={headingInitial}
                  onChangeText={(header) => setHeadingInitial(header)}
                  placeholderText={CONSTANT.settingEmailSubject}
                  keyboardType="email-address"
                  autoCorrect={false}
                />
              </View>
              <View
                style={{
                  marginHorizontal: 10,
                  marginVertical: 5,
                  marginBottom: 10,
                  backgroundColor: Constant.whiteColor,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  borderColor: Constant.gray80Color,
                  borderRadius: 5,
                  borderWidth: 1,
                }}
              >
                <TextInput
                  style={styles.input}
                  value={bodyPlacedOrder}
                  onChangeText={(body) => setBodyPlacedOrder(body)}
                  placeholder={CONSTANT.settingEmailContent}
                  placeholderTextColor="#767676"
                  multiline={true}
                  underlineColorAndroid="transparent"
                />
              </View>
              <View
                style={{
                  marginBottom: 20,
                  marginHorizontal: 10,
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  onPress={() => saveemail_initialSetting()}
                  style={styles.buttonContainer}
                >
                  <Text style={styles.buttonText}>{CONSTANT.settingsave}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <TouchableOpacity
            onPress={() => {
              setDisplayProcessingTemplate(!displayProcessingTemplate);
              setDisplayCancelTemplate(false);
              setDisplayGeneralsettings(false);
              setDisplayOrdertemplate(false);
              setDisplayCompleteTemplate(false);
            }}
            style={{
              backgroundColor: Constant.whiteColor,
              marginVertical: 10,
              marginHorizontal: 10,
              borderRadius: 6,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                height: 70,
                justifyContent: "space-between",
                marginLeft: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "700",
                  color: Constant.primaryColor,
                }}
              >
                {CONSTANT.settingProcessingOrderTemplate}
              </Text>
              <Icon
                name="expand-more"
                size={35}
                color={Constant.primaryColor}
              />
            </View>
          </TouchableOpacity>
          {displayProcessingTemplate == true && (
            <View
              style={{
                backgroundColor: Constant.whiteColor,
                marginVertical: 10,
                marginHorizontal: 10,
                borderRadius: 6,
              }}
            >
              <View
                style={{
                  backgroundColor: Constant.whiteColor,
                  marginVertical: 10,
                  marginHorizontal: 10,
                  borderRadius: 6,
                  borderColor: Constant.gray80Color,
                  borderRadius: 5,
                  borderWidth: 1,
                }}
              >
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                  <Text style={{ fontWeight: "700", marginBottom: 10 }}>
                    {CONSTANT.settingDynamicparams}
                  </Text>
                  <View style={{ flexDirection: "row", flex: 3 }}>
                    <View style={{ flex: 1 }}>
                      <Text>{CONSTANT.settingParamsOne}</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                      <Text>{CONSTANT.settingParamsName}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", flex: 3 }}>
                    <View style={{ flex: 1 }}>
                      <Text>{CONSTANT.settingParamsTwo}</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                      <Text>{CONSTANT.settingParamsorder_id}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", flex: 3 }}>
                    <View style={{ flex: 1 }}>
                      <Text>{CONSTANT.settingParamsThree}</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                      <Text>{CONSTANT.settingParamsCategory}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ marginHorizontal: 10 }}>
                <FormInput
                  labelValue={headingProcessing}
                  onChangeText={(header) => setHeadingProcessing(header)}
                  placeholderText={CONSTANT.settingEmailSubject}
                  keyboardType="email-address"
                  autoCorrect={false}
                />
              </View>
              <View
                style={{
                  marginHorizontal: 10,
                  marginVertical: 5,
                  marginBottom: 10,
                  backgroundColor: Constant.whiteColor,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  borderColor: Constant.gray80Color,
                  borderRadius: 5,
                  borderWidth: 1,
                }}
              >
                <TextInput
                  style={styles.input}
                  value={bodyProcessing}
                  onChangeText={(body) => setBodyProcessing(body)}
                  placeholder={CONSTANT.settingEmailContent}
                  placeholderTextColor="#767676"
                  multiline={true}
                  underlineColorAndroid="transparent"
                />
              </View>
              <View
                style={{
                  marginBottom: 20,
                  marginHorizontal: 10,
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  onPress={() => saveprocessing_order_emailSetting()}
                  style={styles.buttonContainer}
                >
                  <Text style={styles.buttonText}>{CONSTANT.settingsave}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <TouchableOpacity
            onPress={() => {
              setDisplayCompleteTemplate(!displayCompleteTemplate);
              setDisplayCancelTemplate(false);
              setDisplayGeneralsettings(false);
              setDisplayOrdertemplate(false);
              setDisplayProcessingTemplate(false);
            }}
            style={{
              backgroundColor: Constant.whiteColor,
              marginVertical: 10,
              marginHorizontal: 10,
              borderRadius: 6,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                height: 70,
                justifyContent: "space-between",
                marginLeft: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "700",
                  color: Constant.primaryColor,
                }}
              >
                {CONSTANT.settingCompleteOrderTemplate}
              </Text>
              <Icon
                name="expand-more"
                size={35}
                color={Constant.primaryColor}
              />
            </View>
          </TouchableOpacity>
          {displayCompleteTemplate == true && (
            <View
              style={{
                backgroundColor: Constant.whiteColor,
                marginVertical: 10,
                marginHorizontal: 10,
                borderRadius: 6,
              }}
            >
              <View
                style={{
                  backgroundColor: Constant.whiteColor,
                  marginVertical: 10,
                  marginHorizontal: 10,
                  borderRadius: 6,
                  borderColor: Constant.gray80Color,
                  borderRadius: 5,
                  borderWidth: 1,
                }}
              >
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                  <Text style={{ fontWeight: "700", marginBottom: 10 }}>
                    {CONSTANT.settingDynamicparams}
                  </Text>
                  <View style={{ flexDirection: "row", flex: 3 }}>
                    <View style={{ flex: 1 }}>
                      <Text>{CONSTANT.settingParamsOne}</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                      <Text>{CONSTANT.settingParamsName}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", flex: 3 }}>
                    <View style={{ flex: 1 }}>
                      <Text>{CONSTANT.settingParamsTwo}</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                      <Text>{CONSTANT.settingParamsorder_id}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", flex: 3 }}>
                    <View style={{ flex: 1 }}>
                      <Text>{CONSTANT.settingParamsThree}</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                      <Text>{CONSTANT.settingParamsCategory}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ marginHorizontal: 10 }}>
                <FormInput
                  labelValue={headingComplete}
                  onChangeText={(header) => setHeadingComplete(header)}
                  placeholderText={CONSTANT.settingEmailSubject}
                  keyboardType="email-address"
                  autoCorrect={false}
                />
              </View>
              <View
                style={{
                  marginHorizontal: 10,
                  marginVertical: 5,
                  marginBottom: 10,
                  backgroundColor: Constant.whiteColor,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  borderColor: Constant.gray80Color,
                  borderRadius: 5,
                  borderWidth: 1,
                }}
              >
                <TextInput
                  style={styles.input}
                  value={bodyComplete}
                  onChangeText={(body) => setBodyComplete(body)}
                  placeholder={CONSTANT.settingEmailContent}
                  placeholderTextColor="#767676"
                  multiline={true}
                  underlineColorAndroid="transparent"
                />
              </View>
              <View
                style={{
                  marginBottom: 20,
                  marginHorizontal: 10,
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  onPress={() => savecompleted_order_emaildSetting()}
                  style={styles.buttonContainer}
                >
                  <Text style={styles.buttonText}>{CONSTANT.settingsave}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <TouchableOpacity
            onPress={() => {
              setDisplayCancelTemplate(!displayCancelTemplate);
              setDisplayGeneralsettings(false);
              setDisplayOrdertemplate(false);
              setDisplayProcessingTemplate(false);
              setDisplayCompleteTemplate(false);
            }}
            style={{
              backgroundColor: Constant.whiteColor,
              marginVertical: 10,
              marginHorizontal: 10,
              borderRadius: 6,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                height: 70,
                justifyContent: "space-between",
                marginLeft: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "700",
                  color: Constant.primaryColor,
                }}
              >
                {CONSTANT.settingCancelledOrderTemplate}
              </Text>
              <Icon
                name="expand-more"
                size={35}
                color={Constant.primaryColor}
              />
            </View>
          </TouchableOpacity>
          {displayCancelTemplate == true && (
            <View
              style={{
                backgroundColor: Constant.whiteColor,
                marginVertical: 10,
                marginHorizontal: 10,
                borderRadius: 6,
              }}
            >
              <View
                style={{
                  backgroundColor: Constant.whiteColor,
                  marginVertical: 10,
                  marginHorizontal: 10,
                  borderRadius: 6,
                  borderColor: Constant.gray80Color,
                  borderRadius: 5,
                  borderWidth: 1,
                }}
              >
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                  <Text style={{ fontWeight: "700", marginBottom: 10 }}>
                    {CONSTANT.settingDynamicparams}
                  </Text>
                  <View style={{ flexDirection: "row", flex: 3 }}>
                    <View style={{ flex: 1 }}>
                      <Text>{CONSTANT.settingParamsOne}</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                      <Text>{CONSTANT.settingParamsName}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", flex: 3 }}>
                    <View style={{ flex: 1 }}>
                      <Text>{CONSTANT.settingParamsTwo}</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                      <Text>{CONSTANT.settingParamsorder_id}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", flex: 3 }}>
                    <View style={{ flex: 1 }}>
                      <Text>{CONSTANT.settingParamsThree}</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                      <Text>{CONSTANT.settingParamsCategory}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ marginHorizontal: 10 }}>
                <FormInput
                  labelValue={headingCancel}
                  onChangeText={(header) => setHeadingCancel(header)}
                  placeholderText={CONSTANT.settingEmailSubject}
                  keyboardType="email-address"
                  autoCorrect={false}
                />
              </View>
              <View
                style={{
                  marginHorizontal: 10,
                  marginVertical: 5,
                  marginBottom: 10,
                  backgroundColor: Constant.whiteColor,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  borderColor: Constant.gray80Color,
                  borderRadius: 5,
                  borderWidth: 1,
                }}
              >
                <TextInput
                  style={styles.input}
                  value={bodyCancel}
                  onChangeText={(body) => setBodyCancel(body)}
                  placeholder={CONSTANT.settingEmailContent}
                  placeholderTextColor="#767676"
                  multiline={true}
                  underlineColorAndroid="transparent"
                />
              </View>
              <View
                style={{
                  marginBottom: 20,
                  marginHorizontal: 10,
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  onPress={() => savecancel_order_emailSetting()}
                  style={styles.buttonContainer}
                >
                  <Text style={styles.buttonText}>{CONSTANT.settingsave}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <Dialog
        onTouchOutside={() => {
          setDialoigeVisible(false);
        }}
        dialogStyle={{
          marginHorizontal: 20,
          backgroundColor: Constant.primaryColor,
          borderColor: Constant.buttonColor,
          borderWidth: 2,
          overflow: "hidden",
        }}
        visible={dialoigeVisible}
        footer={
          <DialogFooter>
            <DialogButton
              textStyle={{
                fontSize: 15,
                fontWeight: "700",
                color: Constant.whiteColor,
              }}
              text={CONSTANT.orderlistNothanks}
              onPress={() => CancleDialouge()}
            />
          </DialogFooter>
        }
      >
        <DialogContent>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              marginVertical: 10,
              color: Constant.buttonColor,
            }}
          >
            {CONSTANT.settingChangeLanguage}
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginVertical: 10,
              color: Constant.whiteColor,
            }}
          >
            {CONSTANT.settingPleaseSelectchangeanguage}
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ maxHeight: 200 }}
            data={languageArray}
            keyExtractor={(x, i) => i.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => ManageLanguage(item.slug)}
                style={styles.checkBoxStyle}
              >
                <Text
                  style={{
                    fontSize: 17,
                    color: Constant.whiteColor,
                    fontWeight: "700",
                  }}
                >
                  {item.name}
                </Text>
                <View
                  style={[
                    styles.checkBoxSelectorStyle,
                    {
                      backgroundColor: Constant.whiteColor,
                    },
                  ]}
                >
                  <Entypo name="check" size={17} color={Constant.whiteColor} />
                </View>
              </TouchableOpacity>
            )}
          />
        </DialogContent>
      </Dialog>
    </SafeAreaView>
  );
};
export default settings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constant.primaryColor,
    flex: 1,
  },
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 0,
    width: "100%",
    borderColor: Constant.gray80Color,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: Constant.whiteColor,
    padding: 10,
  },
  input: {
    height: windowHeight / 5,
    borderRadius: 5,
    fontSize: 17,
    color: "#062347",
    fontFamily: "SourceSansPro-Regular",
    textAlignVertical: "top",
  },
  MultiSelectArea: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
    marginTop: 10,
    marginHorizontal: 10,
  },
  MultiSelectstyleMainWrapper: {
    backgroundColor: Constant.whiteColor,
    borderRadius: 4,
    overflow: "hidden",
    width: "100%",
  },
  MultiSelectstyleDropdownMenuSubsection: {
    backgroundColor: Constant.whiteColor,
    paddingRight: -7,
    height: 70,
    paddingLeft: 10,
    paddingTop: 15,
    borderWidth: 0.5,
    borderColor: Constant.GainsboroColor,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 10,
    width: "100%",
    height: windowHeight / 18,
    backgroundColor: "#f1c40f",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonContainerOne: {
    marginTop: 10,
    width: "35%",
    height: windowHeight / 18,
    backgroundColor: "#f1c40f",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },

  buttonText: {
    fontSize: 17,
    color: Constant.primaryColor,
    fontFamily: "Lato-Bold",
    fontWeight: "700",
  },
  checkBoxStyle: {
    marginTop: 5,
    marginBottom: 10,
    height: windowHeight / 15,
    borderColor: Constant.gray80Color,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  checkBoxSelectorStyle: {
    height: 25,
    width: 25,
    borderColor: Constant.GainsboroColor,
    borderWidth: 1,
    borderRadius: 25 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
