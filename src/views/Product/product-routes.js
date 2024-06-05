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
import ChineseProductInf from "./ChineseProductInf.vue";
import JpKrProductInf from "./JpKrProductInf.vue";
import EnglishProductInf from "./EnglishProductInf.vue";
import PopsInf from "./PopProductsInf.vue";
import RockInf from "./RockProductsInf.vue"
import MoreTypes from "./MoreTypes.vue";
import TaiwaneseProductInf from "./TaiwaneseProductInf.vue";
import PureProductInf from "./PureProductInf.vue";


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
    { name: "prodCNinf-link", path: "/product/cnInf", component: ChineseProductInf },
    { name: "prodTWinf-link", path: "/product/twInf", component: TaiwaneseProductInf },
    { name: "prodJPKRinf-link", path: "/product/JpKrInf", component: JpKrProductInf },
    { name: "prodENinf-link", path: "/product/enInf", component: EnglishProductInf },
    { name: "prodPureinf-link", path: "/product/pureInf", component: PureProductInf },
    { name: "popInf-link", path: "/popsInf", component: PopsInf },
    { name: "rockInf-link", path: "/rockInf", component: RockInf },
    { name: "moreTypes-link", path: "/moreTypes", component: MoreTypes },


]
