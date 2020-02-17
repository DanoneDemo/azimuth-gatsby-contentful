const { withPrefix } = require('gatsby');

const _ = require('lodash');

export default function(post) {
    const slug = _.trim(_.get(post, 'slug'), '/');
    return withPrefix(`posts/${slug}`);
}
