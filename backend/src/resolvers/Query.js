const { forwardTo } = require('prisma-binding')
const fetch = require('node-fetch')

const Query = {
  //example of using already creating query in prisma
  //users: forwardTo('db'),
  me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    )
  },
  async getArticles(parent, { term }, ctx, info) {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${term}&apiKey=a76f13b0fea54c40983c0b2982f032dd`
    )
    let data = await response.json()
    data = data.articles
    // allows for a nice query due to nested results
    for (let key in data) {
      data[key].source = data[key].source.name
    }
    return data
  },
}

module.exports = Query
