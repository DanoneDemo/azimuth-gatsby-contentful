const path = require('path');
const _ = require('lodash');

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    const pageFields = `
    edges {
      node {
        contentful_id
        sys {
          contentType {
            sys {
              id
            }
          }
        }
        title {
          title
        }
        slug
      }
    }`;
    return graphql(`
    {
      allContentfulLanding {
        ${pageFields}
      }
      allContentfulPage {
        ${pageFields}
      }
      allContentfulBlog {
        ${pageFields}
      }
      allContentfulPost {
        ${pageFields}
      }
    }
    `).then(result => {
        if (result.errors) {
            return Promise.reject(result.errors);
        }

        const pageNodes = _.concat(
            _.map(result.data.allContentfulLanding.edges, ({node}) => node),
            _.map(result.data.allContentfulPage.edges, ({node}) => node),
            _.map(result.data.allContentfulBlog.edges, ({node}) => node),
            _.map(result.data.allContentfulPost.edges, ({node}) => node)
        );

        pageNodes.forEach(node => {
            const template = node.sys.contentType.sys.id;
            const contentfulId = node.contentful_id;
            const component = path.resolve(`./src/templates/${template}.js`);
            const slug = node.slug;
            const pagePath = template === 'post' ? `posts/${_.trim(slug, '/')}` : slug;

            const page = {
                path: pagePath,
                component: component,
                context: {
                    contentfulId: contentfulId,
                    slug: slug
                }
            };

            createPage(page);
        });
    });
};
