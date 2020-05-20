import React from 'react'
import Home from "./Home";
import ModCalulator from "./ModCalulator";
import ModInverse from "./ModInverse";
import ModPrimitiveRoot from "./ModPrimitiveRoot";
import ModLogarit from "./ModLogarit";
import EncryptRSA from "./EncryptRSA";
import EncryptDH from "./EncryptDH";
import EncryptE from "./EncryptE";

const routerURL = [
    {
        path: '/',
        exact: true,
        main: () => <Home/>
    },
    {
        path: '/mod-calculator',
        exact: true,
        main: () => <ModCalulator/>
    },
    {
        path: '/mod-inverse',
        exact: true,
        main: () => <ModInverse/>
    },
    {
        path: '/mod-primitive-root',
        exact: true,
        main: () => <ModPrimitiveRoot/>
    },
    {
        path: '/mod-logarit',
        exact: true,
        main: () => <ModLogarit/>
    },
    {
        path: '/encrypt-RSA',
        exact: true,
        main: () => <EncryptRSA/>
    },
    {
        path: '/encrypt-Diffie-Hellman',
        exact: true,
        main: () => <EncryptDH/>
    },
    {
        path: '/encrypt-Elgaman',
        exact: true,
        main: () => <EncryptE/>
    }
];

export default routerURL;