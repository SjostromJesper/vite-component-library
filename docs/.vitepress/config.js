import links from './data.json' assert {type: 'json'};


module.exports = {
    title: 'whitepress',
        description: `Hey, I'm just playing around.`,
    themeConfig: {
    sidebar: [
        {
            text: 'Components',
            items: links
        }
    ]
}
}