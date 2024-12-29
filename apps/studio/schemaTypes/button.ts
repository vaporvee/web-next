import { ComponentIcon } from '@sanity/icons'
import { Rule, StringRule } from 'sanity'
import { defineField, defineType } from 'sanity'
import { requiredLinkField } from 'sanity-plugin-link-field'

export default defineType({
    name: 'button',
    title: 'Button',
    type: 'document',
    icon: ComponentIcon,
    fields: [
        defineField({
            name: 'text',
            title: 'Title',
            type: 'string',
            validation: (Rule: StringRule) => Rule.required().error('Text is required')
        }),
        defineField({
            name: 'link',
            title: 'Link',
            type: 'link',
            validation: (rule: Rule) => rule.custom((field: any) => requiredLinkField(field)),
        }),
        defineField({
            name: 'color',
            title: 'Color',
            type: 'simplerColor',
        }),
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'icon',
        }),
        defineField({
            name: 'variant',
            title: 'Variant',
            type: 'string',
            placeholder: 'Default',
            options: {
                list: [
                    { title: 'Flat', value: 'flat' },
                    { title: 'Ghost', value: 'ghost' },
                    { title: 'Solid', value: 'solid' },
                    { title: 'Bordered', value: 'bordered' },
                    { title: 'Light', value: 'light' },
                    { title: 'Faded', value: 'faded' },
                    { title: 'Shadow', value: 'shadow' }
                ]
            }
        })
    ],
})
