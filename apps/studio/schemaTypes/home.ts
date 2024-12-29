import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'home',
    title: 'Home',
    type: 'document',
    icon: HomeIcon,
    initialValue: {
        title: 'Home',
    },
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'pagetitle',
            title: 'Title',
            type: 'string'
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
        }),
        defineField({
            name: 'owner',
            title: 'Owner',
            type: 'reference',
            to: { type: 'author' },
        }),
        defineField({
            name: 'buttons',
            title: 'Buttons',
            type: 'array',
            of: [{ type: 'button' }],
        }),
    ],
})
