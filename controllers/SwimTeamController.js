module.exports = {
  getSwimTeamTimes: (req, res, next) => {
    const db = req.app.get('db');

    db
      .swim_team_get_all()
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  swimTeamSignUp: (req, res, next) => {
    const db = req.app.get('db');
    console.log(req.body);
    const { parent_email, paid } = req.params;
    const { sessions } = req.body;
    console.log('Parent email: ', parent_email);
    console.log('Id array: ', req.body.sessions);
    sessions.map(id => {
      console.log(id);
      db.swim_team_sign_up([id, parent_email, paid]);
      db.swim_team_reserve_update([id]);
    });
    res.status(200).send('Complete');
  },
  swimTeamGetByUser: (req, res, next) => {
    const db = req.app.get('db');
    const { parent_email } = req.params;
    db.swim_team_get_by_user([parent_email]).then(response => {
      res.status(200).send(response);
    });
  },
};
