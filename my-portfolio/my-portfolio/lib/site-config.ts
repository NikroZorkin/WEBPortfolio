export const siteConfig = {
  name: 'Jane Doe',
  title: 'Jane Doe | Freelance UX/UI Designer & Coder',
  description:
    'Freelance UX/UI designer and developer creating intuitive, beautiful digital experiences. View my portfolio and get in touch.',
  url: 'https://janedoe.com', // TODO: Replace with actual domain
  ogImage: '/og.png',
  keywords: ['UX Designer', 'UI Designer', 'Freelance Designer', 'Portfolio'],
  author: {
    name: 'Jane Doe',
    email: 'hello@janedoe.com',
    telegram: 'https://t.me/janedoe',
  },
  links: {
    email: 'mailto:hello@janedoe.com',
    telegram: 'https://t.me/janedoe',
    // Add social links as needed
  },
  contact: {
    email: 'danilzorkin1402@gmail.com',
    subject: 'Portfolio inquiry — UX/UI design',
    body: `Hi Danil,
I'd like to discuss a UX/UI project.

Company:
Budget range:
Timeline:
Brief / link:`,
  },
}

export type SiteConfig = typeof siteConfig

