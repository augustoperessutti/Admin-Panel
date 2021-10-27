const mongoose = require('mongoose');
const Component = require('../models/components.model');
const db = require('../config/db.config');

const infoHeader = {
    name: "header",
    slug: "header",
    data: {
        title: "Candela",
        subtitle: "Shop",
        url: "/home"
    }
};

const infoFooter = {
    name: "footer",
    slug: "footer",
    data: {
        copyright: "© 2021 Candela Shop. Todos los derechos reservados",
        icons: [
        {
          name: "carrito",
          navigate: "cart",
          icon: "https://res.cloudinary.com/dbtlofrll/image/upload/v1628781349/lcgkyagccuyw7i49oiwx.svg"
        },
        {
          name: "inicio",
          navigate: "home",
          icon: "https://res.cloudinary.com/dbtlofrll/image/upload/v1628781684/home_vaa5zg.svg"
        },
        {
          name: "favs",
          navigate: "favorites",
          icon: "https://res.cloudinary.com/dbtlofrll/image/upload/v1628781684/heart_pvglhy.svg"
        }
      ]
    }
};

const infoHome = {
    name: "home",
    slug: "home",
    data: {
        offerTitle: "Summer Vibes",
        offerImage: {
            src: "https://res.cloudinary.com/dbtlofrll/image/upload/v1629115347/summer-vibes-special-promotion_dkfrlc.jpg",
            alt: "Summer Vibes - Candela Shop"
        },
        rrssTitle: "Siguenos en nuestras redes!",
        rrss: [
        {
            name: "instagram",
            url: "https://instagram.com",
            icon: "https://res.cloudinary.com/dbtlofrll/image/upload/v1629108204/instagram_kugqgt.svg"
        },
        {
            name: "whatsapp",
            url: "https://whatsapp.com",
            icon: "https://res.cloudinary.com/dbtlofrll/image/upload/v1629108204/whatsapp_zhom8b.svg"
        },
        {
            name: "facebook",
            url: "https://facebook.com",
            icon: "https://res.cloudinary.com/dbtlofrll/image/upload/v1629108204/facebook_sprerw.svg"
        }
        ]
    }
}

mongoose
    .connect(db.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        const allComponents = await Component.find();

        if(allComponents.length != 0) {
            await Component.collection.drop();
            console.log('[Seed] Colección de componentes eliminada.')
        } else {
            console.log('[Seed] No se encontraron componentes.');
        }
    })
    .then(async () => {
        await Component.create(infoHeader);
        console.log('[Seed] Información del header añadida correctamente.');
    })
    .then(async () => {
        await Component.create(infoFooter);
        console.log('[Seed] Información del footer añadida correctamente.');
    })
    .then(async () => {
        await Component.create(infoHome);
        console.log('[Seed] Información del home añadida correctamente.');
    })
    .catch(error => console.log('[Seed]: Error añadiendo componentes', error))
    .finally(() => mongoose.disconnect());
