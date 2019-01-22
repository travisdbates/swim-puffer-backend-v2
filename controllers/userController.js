module.exports = {
  getUserChildren: (req, res, next) => {
    const { parent_email } = req.params;
    const db = req.app.get("db");
    // console.log('Parent Email: ', parent_email)

    db
      .user_get_children([parent_email])
      .then(response => {
        // console.log(response)
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  updateNewNotice: (req, res, next) => {
    const { parent_email } = req.params;
    const db = req.app.get("db");
    // console.log('Parent Email: ', parent_email)

    db.user_update_notice([parent_email]).then(response => {
      res.status(200).send(response);
    });
  },
  updatePaid: (req, res, next) => {
    const { email } = req.body;
    const db = req.app.get("db");

    db.user_update_paid([email]).then(response => {
      res.status(200).send(response);
    });
  }
};
