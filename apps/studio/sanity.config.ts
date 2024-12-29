import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'
import { codeInput } from '@sanity/code-input'
import { presentationTool } from 'sanity/presentation'
import { iconify } from 'sanity-plugin-iconify'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input'
import logo from './logo'
import { linkField } from 'sanity-plugin-link-field'
import AlignmentLeftIcon from './components/icons/alignment-left'
import { HomeIcon, MenuIcon, ProjectsIcon, TagsIcon, UsersIcon } from '@sanity/icons'
//import { deDELocale } from '@sanity/locale-de-de'

export default defineConfig({
  name: 'default',
  title: 'vaporvee\'s website',

  projectId: 'zk5oebdb',
  dataset: 'production',
  icon: logo,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Navbar')
              .icon(MenuIcon)
              .child(
                S.document()
                  .schemaType('navbar')
                  .documentId('navbar-1')
                  .title('Navbar')
              ),
            S.divider(),
            S.listItem()
              .title('Home')
              .icon(HomeIcon)
              .child(
                S.document()
                  .schemaType('home')
                  .documentId('home')
                  .title('Home')
              ),
            S.divider(),
            S.listItem()
              .title('Team')
              .icon(UsersIcon)
              .child(S.documentTypeList('author').title('Team')),
            S.divider(),
            S.listItem()
              .title('Blog posts')
              .child(S.documentTypeList('post').title('Posts')),
            S.listItem()
              .title('Projects')
              .icon(ProjectsIcon)
              .child(S.documentTypeList('project').title('Projects')),
          ]),
    }),
    //deDELocale(),
    simplerColorInput({ defaultColorFormat: 'hex' }),
    linkField(
      {
        linkableSchemaTypes: ['post', 'author'],
        customLinkTypes: [
          {
            title: 'Static page',
            value: 'static',
            icon: AlignmentLeftIcon,
            description: 'Link to an static page with dynamic content (Blog, Projects etc).',
            options: [
              {
                title: 'Home',
                value: '/',
              },
              {
                title: 'Blog',
                value: '/blog',
              },
              {
                title: 'Projects',
                value: '/projects',
              },
            ],
          },
        ],
      }),
    iconify(),
    codeInput(),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "https://web-vaporvee.vercel.app/api/draft-mode/enable",
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})