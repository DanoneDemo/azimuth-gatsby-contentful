import React from 'react';
import _ from 'lodash';
import {graphql} from 'gatsby';

import {markdownify} from '../utils';

export const query = graphql`
  fragment SectionFaqFragment on ContentfulSectionFaq {
    sys {
      contentType {
        sys {
          id
        }
      }
    }
    section_id {
      section_id
    }
    title {
      title
    }
    subtitle {
      subtitle
    }
    bg
    faqitems {
      question {
        question
      }
      answer {
        answer
      }
    }
  }
`;

export default class SectionFaq extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        return (
            <section id={_.get(section, 'section_id.section_id')} className={'block faq-block bg-' + _.get(section, 'bg') + ' outer'}>
                <div className="inner-small">
                    <div className="block-header">
                        {_.get(section, 'title.title') &&
                        <h2 className="block-title">{_.get(section, 'title.title')}</h2>
                        }
                        {_.get(section, 'subtitle.subtitle') &&
                        <p className="block-subtitle">
                            {_.get(section, 'subtitle.subtitle')}
                        </p>
                        }
                    </div>
                    {_.get(section, 'faqitems') &&
                    <dl className="faq-accordion">
                        {_.map(_.get(section, 'faqitems'), (faqitem, faqitem_idx) => (
                            <React.Fragment key={faqitem_idx}>
                                <dt className="accordion-header">
                                    <button className="accordion-trigger">
                                        <div className="accordion-title">{_.get(faqitem, 'question.question')}</div>
                                        <div className="accordion-icon icon-plus" />
                                    </button>
                                </dt>
                                <dd className="accordion-panel">
                                    <div className="accordion-content">
                                        {markdownify(_.get(faqitem, 'answer.answer'))}
                                    </div>
                                </dd>
                            </React.Fragment>
                        ))}
                    </dl>
                    }
                </div>
            </section>
        );
    }
}
