module.exports = {
    pathPrefix: '/',
    siteMetadata: {},
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        {
            resolve: 'gatsby-source-contentful',
            options: {
                spaceId: process.env.CONTENTFUL_SPACE_ID,
                environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
                accessToken: process.env.CONTENTFUL_PREVIEW ? process.env.CONTENTFUL_PREVIEW_TOKEN : process.env.CONTENTFUL_DELIVERY_TOKEN,
                host: process.env.CONTENTFUL_PREVIEW ? 'preview.contentful.com' : 'cdn.contentful.com',
                useNameForId: false
            },
        }
    ]
};
