module.exports = {
    pathPrefix: '/',
    siteMetadata: {},
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-source-contentful`,
            options: {
                spaceId: process.env.CONTENTFUL_SPACE_ID,
                environment: `master`,
                accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
                host: `cdn.contentful.com`,
                useNameForId: false
            },
        }
    ]
};
