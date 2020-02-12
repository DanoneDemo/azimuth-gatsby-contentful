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
            const url = node.slug;
            const template = node.sys.contentType.sys.id;
            const component = path.resolve(`./src/templates/${template}.js`);

            const page = {
                path: url,
                component: component,
                context: {
                    slug: url
                }
            };

            createPage(page);
        });
    });
};
