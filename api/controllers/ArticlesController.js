/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: async function (req, res) {
    try {
      var art = await Articles.find({});
      res.view('list', { articles: art });
    } catch (err) {
      res.serverError(err);
    }
  },
  add: async function (req, res) {
    res.view('add');
  },
  create: async function (req, res) {
    var title = req.body.title;
    var body = req.body.body;

    Articles.create({ title: title, body: body }).exec((err) => {
      if (err) {
        res.serverError(err);
      }
      res.redirect('/articles/list');
    });
  },
  delete: async function (req, res) {
    Articles.destroy({ id: req.params.id }).exec((err) => {
      if (err) {
        res.serverError(err);
      }
      res.redirect('/articles/list');
    });
    return false;
  },
};
