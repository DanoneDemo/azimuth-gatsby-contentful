import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import {graphql} from 'gatsby';

import {Layout} from '../components/index';
import {Link, markdownify, safePrefix} from '../utils';
export const query = graphql`
  query BlogQuery($slug: String!) {
    contentfulConfig {
      ...LayoutFragment
    }
    contentfulBlog(slug: { eq: $slug }) {
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
    allContentfulPost(
      sort: {
        fields: [date]
        order: DESC
      }
    ) {
      edges {
        node {
          thumb_img_path {
            file {
              url
            }
          }
          slug
          title {
            title
          }
          excerpt {
            excerpt
          }
          date
        }
      }
    }
  }
`;

export default class Blog extends React.Component {
    render() {
        const config = _.get(this.props, 'data.contentfulConfig');
        const page = _.get(this.props, 'data.contentfulBlog');
        const postPages = _.map(_.get(this.props, 'data.allContentfulPost.edges'), ({node}) => node);
        return (
            <Layout page={page} config={config}>
                <div className="outer">
                    <div className="inner">
                        <div className="post-feed">
                            {_.map(postPages, (post, post_idx) => (
                                <article key={post_idx} className="post post-card">
                                    <div className="post-card-inside">
                                        {_.get(post, 'thumb_img_path') &&
                                        <Link className="post-card-thumbnail" to={safePrefix(_.get(post, 'slug'))}>
                                            <img className="thumbnail" src={_.get(post, 'thumb_img_path.file.url')} alt={_.get(post, 'title.title')} />
                                        </Link>
                                        }
                                        <div className="post-card-content">
                                            <header className="post-header">
                                                <h2 className="post-title"><Link to={safePrefix(_.get(post, 'slug'))} rel="bookmark">{_.get(post, 'title.title')}</Link></h2>
                                            </header>
                                            <div className="post-excerpt">
                                                {markdownify(_.get(post, 'excerpt.excerpt'))}
                                            </div>
                                            <footer className="post-meta">
                                                <time className="published"
                                                      dateTime={moment(_.get(post, 'date')).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(post, 'date')).strftime('%B %d, %Y')}</time>
                                            </footer>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}
