import Nav from "../Nav/Nav";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Keyboard, Pagination, Navigation } from "swiper";
import { useTranslation } from "react-i18next";
import CardImg2 from "../../img/CardImg2.png";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import SortIcon from '@mui/icons-material/Sort';
import Brands from "../Brands/Brands";
import Footer from "../Footer/Footer";
import UserContext from '../../context/userContext';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./areas.scss";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init(1000);

export default function Areas() {
  const { t } = useTranslation();

  const userCtx = useContext(UserContext);
  const { sportTypeId } = userCtx;

  const [data, setData] = useState([]);
  const [search1, setSearch1] = useState("");
  useEffect(() => {
    axios
      .get(`https://skerio.uz/api/complexCategory/${sportTypeId}`)
      .then((res) => {
        setData(res.data.data);
        setData2(res.data.data);
        setRegion(res.data.data);
        setSingleData(res.data.data)
      })
      .catch((err) => console.error(err));

  }, [sportTypeId]);

  const keys = [
    "name",
    "description_uz",
    "description_ru",
    "description_en",
    "location",
    "price",
    "address",
  ];

  const [region, setRegion] = useState([]);
  const [data2, setData2] = useState([]);
  const [hasRegion, setHasRegion] = useState("");

  const regionFilter = function (e) {
    const filtered = data2.filter(item => {
      if (e === "") {
        return item;
      } else if (item.area_id === e) {
        return item.area_id === e
      } else if (item.area_id !== e) {
        return setHasRegion("Xech qanday ma'lumot topilmadi");
      }
    });
    setRegion(filtered);
  }

  const searchHandle = function (data) {
    return data?.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(search1))
    );
  };
  const data1 = searchHandle(region);
  const [getState, setGetState] = useState(false);

  const getStateWithBtns = function (btn) {
    if (btn === "andijon") {
      setGetState(!getState);
    } else {
      setGetState(false);
    }
  }
  const [singleData, setSingleData] = useState([])

  const getAsingleItem = function (e) {
    const filtered = data1.filter((item) => {
      if (item.id === e) {
        return item.id === e;
      } else {
        return null;
      }
    });
    setSingleData(filtered);
  }

  return (
    <section id="areas">
      <div>
        <Nav />
      </div>
      <div className="areas-wrapper">
        <div className="title-buttons">
          <div className="states">
            <label htmlFor=""><SortIcon /></label>
            <select onChange={e => getStateWithBtns(e.target.value)}>
              <option selected value="">{t("state")}</option>
              <option value="andijon">Andijon </option>
              <option value="Buxoro">Buxoro</option>
              <option value="asaka tumani">Fargʻona</option>
              <option value="boston tumani">Jizzax</option>
              <option value="buloqboshi tumani">Urganch</option>
              <option value="izboskan tumani">Namangan</option>
              <option value="izboskan tumani">Navoiy</option>
              <option value="izboskan tumani">Qarshi</option>
              <option value="izboskan tumani">Nukus</option>
              <option value="izboskan tumani">Samarqand</option>
              <option value="izboskan tumani">Guliston</option>
              <option value="izboskan tumani">Termiz</option>
            </select>
          </div>
          <div className="region">
            <select name="region" className={getState ? "active-state" : "state"} onChange={(e) => regionFilter(e.target.value)} id="region">
              <option selected value="">{t("city")}</option>
              <option value="1">Andijon Sh</option>
              <option value="2">Andijon T</option>
              <option value="3">Asaka T</option>
              <option value="4">Baliqchi T</option>
              <option value="5">Buloqboshi T</option>
              <option value="6">Bo'ston T</option>
              <option value="7">Izbosgan T</option>
              <option value="8">Jalaquduq T</option>
              <option value="9">Xo'jaobod T</option>
              <option value="10">Qo'rgontepa T</option>
              <option value="11">Marhamat T</option>
              <option value="12">Oltinko'l T</option>
              <option value="13">Paxtaobod T</option>
              <option value="14">Shaxrixon T</option>
              <option value="15">Ulug'nor T</option>
              <option value="16">Madaniyat T</option>
            </select>
          </div>
          <div class="box">
            <form name="search">
              <input
                type="text"
                class="input"
                name="txt"
                onmouseout="this.value = ''; this.blur();"
                onChange={(e) => setSearch1(e.target.value)}
                placeholder={t("search")}
              />
            </form>
            <i class="fas fa-search"></i>
          </div>
        </div>
        {/* --main areas-- */}
        <h1>{hasRegion}</h1>
        <div className="main-cards">
          {/* ---card--- */}
          {data1?.map((item) => (
            <div className="areas-cards" data-aos="fade-left" key={item.id}>
              <div className="card-img">
                <Swiper
                  style={{
                    "--swiper-pagination-color": "#fff",
                    "--swiper-navigation-color": "#ffff",
                  }}
                  slidesPerView={1}
                  spaceBetween={30}
                  keyboard={{
                    enabled: true,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Keyboard, Pagination, Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <img
                      src={
                        "https://skerio.uz/admin/images/complexes/" + item.image
                      }
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={CardImg2} />
                  </SwiperSlide>
                </Swiper>
              </div>
              <div className="card-information">
                <div className="card-title">
                  <h3>{item.name}</h3>
                </div>
                <div className="others">
                  <div className="left">
                    <p>
                      <LocalOfferIcon /> {item.price} 1 hour
                    </p>
                    <p>
                      <LocalPhoneIcon /> {item.phone}
                    </p>
                    <p>
                      <LocationOnIcon /> {item.address}
                    </p>
                  </div>
                  <div className="right">
                    <p>
                      <MeetingRoomIcon /> Dress room: {item.dress_room}
                    </p>
                    <p>
                      <AddLocationAltIcon />{" "}
                      <a href={item.location}>Location</a>
                    </p>
                    <p>
                      <FastfoodIcon /> Food: {item.food}.
                    </p>
                  </div>
                </div>
                <div className="buttons">
                  <Link to={"/areas/mapping/" + item.id}>
                    <button onClick={() => getAsingleItem(item.id)}>Contact Us</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {/* mapping */}
          {/* <div className="mapping">
            <div className="initMap">
              <YMaps>
                <div style={{ width: "50%", height: "50%" }}>
                  <Map defaultState={{ center: [72.359477, 19.52], zoom: 9 }} style={{ width: "600px", height: "400px" }} />
                </div>
              </YMaps>
            </div>
          </div> */}
        </div>

      </div>
      <div>
        <Brands />
        <Footer />
      </div>
    </section>
  );
}