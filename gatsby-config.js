/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @emails react-core
 */

'use strict';

module.exports = {
  siteMetadata: {
    title: 'React: A JavaScript library for building user interfaces',
    siteUrl: 'https://it.reactjs.org',
    rssFeedTitle: 'React',
    rssFeedDescription: 'A JavaScript library for building user interfaces',
  },
  mapping: {
    'MarkdownRemark.frontmatter.author': 'AuthorYaml',
  },
  plugins: [
    'gatsby-source-react-error-codes',
    'gatsby-transformer-authors-yaml',
    'gatsby-transformer-home-example-code',
    'gatsby-transformer-versions-yaml',
    'gatsby-plugin-netlify',
    'gatsby-plugin-glamor',
    'gatsby-plugin-twitter',
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#61dafb',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-responsive-iframe',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 840,
            },
          },
          'gatsby-remark-external-links',
          'gatsby-remark-header-custom-ids',
          {
            resolve: 'gatsby-remark-code-repls',
            options: {
              defaultText: '<b>Prova su CodePen</b>',
              directory: `${__dirname}/examples/`,
              externals: [
                `//unpkg.com/react/umd/react.development.js`,
                `//unpkg.com/react-dom/umd/react-dom.development.js`,
              ],
              dependencies: [`react`, `react-dom`],
              redirectTemplate: `${__dirname}/src/templates/codepen-example.js`,
              target: '_blank',
            },
          },
          {
            resolve: 'gatsby-remark-embedded-codesandbox',
            options: {
              directory: `${__dirname}/examples/`,
              protocol: 'embedded-codesandbox://',
              embedOptions: {
                view: 'preview',
                hidenavigation: 1,
                fontsize: 13,
              },
              getIframe: url =>
                `<iframe src="${url}" style="width: 100%; overflow:hidden; display:block;max-width: none;" height="600" class="embedded-codesandbox" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>`,
            },
          },
          {
            resolve: 'gatsby-remark-embed-snippet',
            options: {
              classPrefix: 'gatsby-code-',
              directory: `${__dirname}/examples/`,
            },
          },
          'gatsby-remark-use-jsx',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'gatsby-code-',
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-41298772-1',
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
         {
          site {
            siteMetadata {
              title: rssFeedTitle
              description: rssFeedDescription
              siteUrl
              site_url: siteUrl
            }
          }
        }`,
        feeds: [
          {
            serialize: ({query: {site, allMarkdownRemark}}) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign(
                  {},
                  {
                    title: edge.node.frontmatter.title,
                    description: edge.node.html,
                    date: require('moment')(edge.node.fields.date).format(
                      'MMMM DD, YYYY, h:mm A',
                    ),
                    url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                    guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  },
                );
              });
            },
            query: `
              {
                  allMarkdownRemark
                  (limit: 10,
                  filter: {fileAbsolutePath: {regex: "/blog/"}},
                  sort: {fields: [fields___date],
                  order: DESC}) {
                    edges {
                      node {
                        fields {
                          date
                          slug
                        }
                        frontmatter {
                          title
                        }
                        html
                      }
                    }
                  }
                }
            `,
            output: '/feed.xml',
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
  ],
};
