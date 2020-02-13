import React from 'react';
import _ from 'lodash';
import {graphql} from 'gatsby';

import {Link, safePrefix, htmlToReact} from '../utils';
import Social from './Social';
import SubscribeForm from './SubscribeForm';
import Action from './Action';

export const query = graphql`
  fragment FooterFragment on ContentfulConfig {
    header {
      title {
        title
      }
    }
    footer {
      logo_img {
        file {
          url
        }
      }
      tagline {
        tagline
      }
      has_nav
      nav_title {
        nav_title
      }
      nav_links {
        ...ActionFragment
      }
      has_social
      social_title {
        social_title
      }
      social_links {
        ...ActionFragment
      }
      has_subscribe
      subscribe_title {
        subscribe_title
      }
      subscribe_content {
        subscribe_content
      }
      content {
        content
      }
      links {
        ...ActionFragment
      }
    }
  }
`;

export default class Footer extends React.Component {
    render() {
        return (
            <footer id="colophon" className="site-footer">
                <div className="footer-top outer">
                    <div className="inner">
                        <div className="footer-widgets">
                            <div className="widget footer-branding">
                                {_.get(this.props, 'config.footer.logo_img') ?
                                    <p className="site-logo">
                                        <Link to={safePrefix('/')}><img src={_.get(this.props, 'config.footer.logo_img.file.url')} alt="Logo" /></Link>
                                    </p>
                                    :
                                    <p className="site-title">
                                        <Link to={safePrefix('/')}>{_.get(this.props, 'config.header.title.title')}</Link>
                                    </p>
                                }
                                {_.get(this.props, 'config.footer.tagline.tagline') &&
                                <p className="site-description">
                                    {_.get(this.props, 'config.footer.tagline.tagline')}
                                </p>
                                }
                            </div>
                            {((_.get(this.props, 'config.footer.nav_links') && _.get(this.props, 'config.footer.has_nav')) || _.get(this.props, 'config.footer.has_social')) &&
                            <nav className="widget footer-navigation">
                                <div className="footer-nav-inside">
                                    {(_.get(this.props, 'config.footer.nav_links') && _.get(this.props, 'config.footer.has_nav')) &&
                                    <div className="secondary-nav">
                                        <h2 className="widget-title">{_.get(this.props, 'config.footer.nav_title.nav_title')}</h2>
                                        <ul className="secondary-menu">
                                            {_.map(_.get(this.props, 'config.footer.nav_links'), (action, action_idx) => (
                                                <li key={action_idx}>
                                                    <Action action={action}/>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    }
                                    {_.get(this.props, 'config.footer.has_social') &&
                                    <div className="social-nav">
                                        <h2 className="widget-title">{_.get(this.props, 'config.footer.social_title.social_title')}</h2>
                                        <Social socialLinks={_.get(this.props, 'config.footer.social_links')} />
                                    </div>
                                    }
                                </div>
                            </nav>
                            }
                            {_.get(this.props, 'config.footer.has_subscribe') &&
                            <div className="widget footer-subscribe">
                                <h2 className="widget-title">{_.get(this.props, 'config.footer.subscribe_title.subscribe_title')}</h2>
                                {_.get(this.props, 'config.footer.subscribe_content') &&
                                <p>{htmlToReact(_.get(this.props, 'config.footer.subscribe_content.subscribe_content'))}</p>
                                }
                                <SubscribeForm {...this.props} />
                            </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="site-info outer">
                    <div className="inner">
                        {htmlToReact(_.get(this.props, 'config.footer.content.content'))}
                        &nbsp;
                        {_.map(_.get(this.props, 'config.footer.links'), (link, link_idx) => (
                            <React.Fragment key={link_idx}>
                                <Action key={link_idx} action={link}/>.
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </footer>
        );
    }
}
