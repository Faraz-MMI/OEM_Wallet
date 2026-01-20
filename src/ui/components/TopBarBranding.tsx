import { Brand, OEM_LIST } from "../../app/constants/brands";
import AppText from "./AppText";
import { vw } from "../theme/dimensions";
import { Fonts } from "../theme/fonts";

export default function TopBarBranding({
    brand }:
    { brand: Brand }) {

    const getBrand = () => {
        return { icon: brand.icon, name: brand.displayName };
    }
    return (
        <AppText
            style={{
                fontSize: vw(6),
                fontFamily: Fonts.bold,
                color: '#005ABF',
                marginRight: vw(3),
            }}
        >
            {getBrand().name}
        </AppText>
    );
}