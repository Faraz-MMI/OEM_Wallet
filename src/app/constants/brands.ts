import { ImageSourcePropType } from "react-native";

export type Brand = {
    id: string;
    name: string;
    vehicle: string;
    icon: ImageSourcePropType;
    color: string;
    displayName: string;
};

export const OEM_LIST = [
    {
        id: 'mmi',
        name: 'MMI OEM Wallet',
        vehicle: 'Generic Vehicle',
        icon: require('../../assets/brands/mappls.png'),
        color: '#004A99',
        displayName: 'MMI'
    },
    {
        id: 'suzuki',
        name: 'Suzuki OEM Wallet',
        vehicle: 'Suzuki Grand Vitara',
        icon: require('../../assets/brands/suzuki.png'),
        color: '#004A99',
        displayName: 'Suzuki'
    },
    {
        id: 'mahindra',
        name: 'Mahindra OEM Wallet',
        vehicle: 'Mahindra Scorpio N',
        icon: require('../../assets/brands/mahindra.jpg'),
        color: '#A00D25',
        displayName: 'Mahindra'
    },
    {
        id: 'tata',
        name: 'Tata OEM Wallet',
        vehicle: 'Tata Sierra',
        icon: require('../../assets/brands/tata.jpg'),
        color: '#004580',
        displayName: 'TATA'
    },
    {
        id: 'byd',
        name: 'BYD OEM Wallet',
        vehicle: 'BYD Sealion 7',
        icon: require('../../assets/brands/byd.jpg'),
        color: '#333333',
        displayName: 'BYD'
    },
    {
        id: 'citroen',
        name: 'Citroen OEM Wallet',
        vehicle: 'Basalt X',
        icon: require('../../assets/brands/citroen.png'),
        color: '#B80023',
        displayName: 'Citreon'
    },

    {
        id: 'honda',
        name: 'Honda OEM Wallet',
        vehicle: 'Civic',
        icon: require('../../assets/brands/honda.png'),
        color: '#A60000',
        displayName: 'Honda'
    },
    {
        id: 'hyundai',
        name: 'Hyundai OEM Wallet',
        vehicle: 'Ioniq 6',
        icon: require('../../assets/brands/hyundai.jpg'),
        color: '#001D40',
        displayName: 'Hyundai'
    },
    {
        id: 'kia',
        name: 'KIA OEM Wallet',
        vehicle: 'EV6',
        icon: require('../../assets/brands/kia.png'),
        color: '#991123',
        displayName: 'KIA'
    },
    {
        id: 'nissan',
        name: 'Nissan OEM Wallet',
        vehicle: 'Sunny',
        icon: require('../../assets/brands/nissan.png'),
        color: '#9E0026',
        displayName: 'NISSAN'
    },
    {
        id: 'renault',
        name: 'Renault OEM Wallet',
        vehicle: 'Duster',
        icon: require('../../assets/brands/renault.png'),
        color: '#D4A800',
        displayName: 'RENAULT'
    },
    {
        id: 'skoda',
        name: 'SKODA OEM Wallet',
        vehicle: 'Slavia',
        icon: require('../../assets/brands/skoda.jpg'),
        color: '#3C8725',
        displayName: 'SKODA'
    },
    {
        id: 'volkswagen',
        name: 'Volkswagen OEM Wallet',
        vehicle: 'Golf GTI',
        icon: require('../../assets/brands/volkwagen.jpg'),
        color: '#001238',
        displayName: 'Volkswagen'
    },

];