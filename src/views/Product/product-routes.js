//引入 SFC 元件
import Products from "./Products.vue";
import ProductDetail from "./ProductDetail.vue";
import BestSell from "./BestProducts.vue";
import DiscountSell from "./DiscountProducts.vue";
import PreorderSell from "./PreorderProducts.vue";
import ChineseProduct from "./ChineseProduct.vue"
import JpKrProduct from "./JpKrProduct.vue";
import EnglishProduct from "./EnglishProduct.vue";
import SearchProduct from "./CriteriaSearch.vue";
import WishList from "./WishList.vue";
import Recommend from "./Recommend.vue";
import Rock from "./RockProducts.vue";
import Pops from "./PopProducts.vue";


export default [
    { name: "prod-link", path: "/products", component: Products },
    { name: "prodDetail-link", path: "/product/detail", component: ProductDetail },
    { name: "isBest-link", path: "/product/isBest", component: BestSell },
    { name: "isDiscount-link", path: "/product/isDiscount", component: DiscountSell },
    { name: "isPreorder-link", path: "/product/isPreorder", component: PreorderSell },
    { name: "prodCN-link", path: "/product/cn", component: ChineseProduct },
    { name: "prodJPKR-link", path: "/product/JpKr", component: JpKrProduct },
    { name: "prodEN-link", path: "/product/en", component: EnglishProduct },
    { name: "prodSearch-link", path: "/product/search", component: SearchProduct },
    { name: "wishList-link", path: "/wishList", component: WishList },
    { name: "recommend-link", path: "/recommend", component: Recommend },
    { name: "rock-link", path: "/rock", component: Rock },
    { name: "pop-link", path: "/pops", component: Pops },

]
