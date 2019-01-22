module.exports = {
  getAllChildren: (req, res, next) => {
    const db = req.app.get('db');

    db
      .child_get_all()
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  addChild: (req, res, next) => {
    const { first_name, age, parent_email } = req.body;
    const { paid } = req.params;
    // console.log(req.body);
    // console.log(req.parms);
    const db = req.app.get('db');

    db
      .child_create_child([first_name, age, parent_email, paid])
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  addSession: (req, res, next) => {
    const { kid_id, sessions, time, timeNotes } = req.body;
    // console.log(Date.now());
    const db = req.app.get('db');
    // console.log(req.body);
    sessions.map((session, index) => {
      db.session_sign_up([kid_id, session, time[index], timeNotes[index]]);
    });
    res.status(200).send('Complete');
  },
};
