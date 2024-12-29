import { LinkIcon, MenuIcon } from "@sanity/icons"
import { defineField, defineType, Rule, StringRule } from "sanity"
import { requiredLinkField } from "sanity-plugin-link-field"

export default defineType({
    name: 'navbar',
    title: 'Navbar',
    type: 'document',
    icon: MenuIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            initialValue: 'Navbar',
            readOnly: true,
            hidden: true,
        }),
        defineField({
            name: 'links',
            title: 'Links',
            icon: LinkIcon,
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Link',
                    icon: LinkIcon,
                    fields: [
                        defineField({
                            name: 'text',
                            title: 'Text',
                            type: 'string',
                            validation: (Rule: StringRule) => Rule.required().error('Text is required'),
                        }),
                        defineField({
                            name: 'link',
                            title: 'Link',
                            type: 'link',
                            validation: (rule: Rule) => rule.custom((field: any) => requiredLinkField(field))
                        }),
                        defineField({
                            name: 'sublinks',
                            title: 'Sublinks',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    title: 'Sublink',
                                    icon: LinkIcon,
                                    fields: [
                                        defineField({
                                            name: 'text',
                                            title: 'Text',
                                            type: 'string',
                                            validation: (Rule: StringRule) => Rule.required().error('Text is required')
                                        }),
                                        defineField({
                                            name: 'link',
                                            title: 'Link',
                                            type: 'link',
                                            validation: (rule: Rule) => rule.custom((field: any) => requiredLinkField(field))
                                        }),
                                    ],
                                },
                            ],
                        }),
                    ],
                },
            ],
        }),
    ],
})