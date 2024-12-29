import { ProjectsIcon } from '@sanity/icons'
import { defineField, defineType, StringRule } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project',
    icon: ProjectsIcon,
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: StringRule) => Rule.required().error('Title is required')
        }),
        defineField({
            name: 'link',
            title: 'Link',
            type: 'link'
        }),
        defineField({
            name: 'tools',
            title: 'Tools',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'tool' } }],
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'blockContent',
            validation: (Rule: any) => Rule.required()
        }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image' }],
        }),
    ],
})
