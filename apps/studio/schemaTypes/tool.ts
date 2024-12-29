import { WrenchIcon } from '@sanity/icons'
import { UrlRule } from 'sanity'
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'tool',
    title: 'Tool',
    type: 'document',
    icon: WrenchIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string'
        }),
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'icon',
        }),
        defineField({
            name: 'url',
            title: 'URL',
            type: 'url',
            validation: (Rule: UrlRule) => Rule.uri({
                scheme: ['https']
            })
        }),
        defineField({
            name: 'color',
            title: 'Color',
            type: 'simplerColor',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
    ],
})
