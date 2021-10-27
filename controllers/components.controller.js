const Component = require('../models/components.model');

const headerGetJson = async (req, res, next) => {
    try {
        const infoHeader = await Component.findOne( { slug: 'header' }, 'data' );
        
        return res.status(200).json(infoHeader);
    } catch (error) {
        return next(error);
    }
};

const headerGet = async (req, res, next) => {
    try {
        const infoHeader = await Component.findOne( { slug: 'header' }, 'data' );
        
        return res.render('comps/header', { infoHeader });
    } catch (error) {
        return next(error);
    }
};

const headerPut = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, subtitle, url } = req.body

        const infoHeader = await Component.findOne({ slug: 'header' });

        if(title) infoHeader.data.title = title;
        if(subtitle) infoHeader.data.subtitle = subtitle;
        if(url) infoHeader.data.url = url;

        await Component.findByIdAndUpdate(id, infoHeader, { new: true });

        return res.redirect('/components/header');
    } catch (error) {
        return next(error);
    }
};

const footerGetJson = async (req, res, next) => {
    try {
        const infoFooter = await Component.findOne( { slug: 'footer' }, 'data' )
        return res.status(200).json(infoFooter)

    } catch (error) {
        return next(error);
    }
};

const footerGet = async (req, res, next) => {
    try {
        const infoFooter = await Component.findOne( { slug: 'footer' }, 'data' )
        return res.render('comps/footer', { infoFooter });

    } catch (error) {
        return next(error);
    }
};

const footerPut = async (req, res, next) => {
    try {
        const { name, navigate, copyright } = req.body;
        const { queryUrl } = req.query;

        const infoFooter = await Component.findOne({ slug: 'footer' });

        if(copyright) infoFooter.data.copyright = copyright;

        infoFooter.data.icons.forEach((e, i) => {
            if(e.navigate == queryUrl) {
                if(name) e.name = name;
                if(navigate) e.navigate = navigate;
                if(req.imageUrl) e.icon = req.imageUrl;
            }
        });

        await Component.findOneAndUpdate({ slug: 'footer' }, infoFooter);

        return res.redirect('/components/footer');
    } catch (error) {
        return next(error);
    }
};

const homeGetJson = async (req, res, next) => {
    try {
        const infoHome = await Component.findOne( { slug: 'home' }, 'data' )
        return res.status(200).json(infoHome)

    } catch (error) {
        return next(error);
    }
};

const homeGet = async (req, res, next) => {
    try {
        const infoHome = await Component.findOne( { slug: 'home' }, 'data' )
        return res.render('comps/home', { infoHome });

    } catch (error) {
        return next(error);
    }
};

const homePut = async (req, res, next) => {
    try {
        const { offerTitle, alt, name, url, rrssTitle } = req.body;
        const { queryUrl } = req.query;

        const infoHome = await Component.findOne({ slug: 'home' });

        if(offerTitle) infoHome.data.offerTitle = offerTitle;
        if(alt) infoHome.data.offerImage.alt = alt;
        if(rrssTitle) infoHome.data.rrssTitle = rrssTitle
        if(req.imageUrl) infoHome.data.offerImage.src = req.imageUrl;

        infoHome.data.rrss.forEach((e, i) => {
            if(e.name == queryUrl) {
                if(name) e.name = name;
                if(url) e.url = url;
                if(req.imageUrl) e.icon = req.imageUrl;
            }
        });

        await Component.findOneAndUpdate({ slug: 'home' }, infoHome);

        return res.redirect('/components/home');
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    headerGetJson,
    headerGet,
    headerPut,
    footerGetJson,
    footerGet,
    footerPut,
    homeGetJson,
    homeGet,
    homePut,
}